from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import scipy.stats
import redis
from redis.commands.search.query import Query
from sentence_transformers import SentenceTransformer
import mysql.connector
import json
from redis.commands.search.query import Query
import requests
import sys
import re

INDEX_NAME = 'idx:product-name'
DOC_PREFIX = 'ecommerce:product:'

def create_query_table(query, encoded_queries, extra_params = {}):
    itemRealSearch = []
    for i, encoded_query in enumerate(encoded_queries):
        result_docs = client.ft(INDEX_NAME).search(query, {'query_vector': np.array(encoded_query, dtype=np.float32).tobytes()} | extra_params).docs
        for doc in result_docs:
            vector_score = round(1 - float(doc.vector_score), 2)
            description_embeddings = client.json().get(f'{doc.id}', '$.name_embeddings')
            itemRealSearch.append((description_embeddings[0], (doc.id).split(":")[-1], vector_score))

    return itemRealSearch

def ranking_items(itemSessionVector, itemRealSearch):
    scoreList = []
    itemScoreList = []
    if len(itemSessionVector) == 0:
        for i in itemRealSearch:
            itemScoreList.append(i[1])
        return itemScoreList[:50]
    
    for i in itemRealSearch:
        for j in itemSessionVector:
            score = cosine_similarity([i[0]],[j[0]])*j[1]
            scoreList.append(score)
            itemScoreList.append(i[1])

    rank = scipy.stats.rankdata(scoreList)

    # List of index of rank => find item id in itemScoreList (top 10)
    rankScoreIndex = []
    for i in range(1, len(rank) + 1):
        a = np.where(rank == i)
        if len(a) > 0:
            rankScoreIndex = np.append(rankScoreIndex,a)
        else:
            break

    # List of item id in itemScoreList ranked base-on score (de-duplicated)
    rankItemId = []
    for i in rankScoreIndex:
        if int(itemScoreList[int(i)]) not in rankItemId:
            rankItemId.append(int(itemScoreList[int(i)]))
            if len (rankItemId) == 50:
                break
        else:
            continue

    return rankItemId

def getInfo4Session(cusID, redis_client, mysql_config={}):
    cnx = mysql.connector.connect(**mysql_config)
    cursor = cnx.cursor(dictionary=True)
    query_info_4Session = f'''
        SELECT sa.type, sa.productID
        FROM SessionActivity sa
        JOIN ecommerce.Session s ON sa.sessionID = s.id
        WHERE s.customerID = {cusID}
        AND s.createdAt IN (
            SELECT DISTINCT createdAt
            FROM (
                SELECT createdAt
                FROM ecommerce.Session
                WHERE customerID = {cusID}
                ORDER BY createdAt DESC
                LIMIT 4
            ) AS RecentTimestamps
        )
        ORDER BY s.createdAt DESC, sa.productID, sa.type;
    '''
    cursor.execute(query_info_4Session)
    res4Session = cursor.fetchall()
    itemSessionVector = [(redis_client.json().get(f'ecommerce:product:{item["productID"]}')['name_embeddings'], type_to_weight[item['type']]) for item in res4Session]
    return itemSessionVector

def getSearhContent(cusID, mysql_config={}):
    cnx = mysql.connector.connect(**mysql_config)
    cursor = cnx.cursor(dictionary=True)
    query_get_search = f'''
        SELECT content
        FROM SearchSession ss JOIN ecommerce.Session s ON ss.sessionID = s.id
        WHERE customerID = {cusID} 
        and TIME_TO_SEC(TIMEDIFF(NOW(), searchTime)) <= 1800
        and (sessionID in (select distinct id
                            from Session 
                            where customerID = {cusID}
                                and createdAt = (select max(createdAt) 
                                                from Session 
                                                where customerID = {cusID})))
        ORDER BY s.createdAt desc, searchTime desc
    '''
    cursor.execute(query_get_search)
    searchContent = cursor.fetchall()
    if len(searchContent) == 0:
        query_get_search = f'''
            Select content
            from SearchSession ss JOIN ecommerce.Session s ON ss.sessionID = s.id
            where customerID = {cusID}
            order by searchTime desc
            limit 10;
        '''
        cursor.execute(query_get_search)
        searchContent = cursor.fetchall()

    res = []
    for i in range(len(searchContent)):
        res.append(searchContent[i]['content'])
    return res

def get_predicted_ratings(user_id, item_ids, mysql_config={}):
    # Connect to MySQL
    cnx = mysql.connector.connect(**mysql_config)
    cursor = cnx.cursor(dictionary=True)

    # Get average ratings of all users
    query_avg_ratings = "SELECT user_id, avg_rating FROM AVGRating"
    cursor.execute(query_avg_ratings)
    avg_ratings = cursor.fetchall()
    avg_ratings_dict = {str(row['user_id']): float(row['avg_rating']) for row in avg_ratings}

    # Get training data
    query_training_data = "SELECT user_id, item_id, rating, timestamp FROM TrainingData"
    cursor.execute(query_training_data)
    training_data = cursor.fetchall()
    training_data_dict = {(row['user_id'], row['item_id']): row['rating'] for row in training_data}

    query_get_sim = f'''
        select user_v, sim
        from Sim
        where user_u = {user_id};
    '''
    
    cursor.execute(query_get_sim)
    similar_users = cursor.fetchall()
    if len(similar_users) != 0:
        similar_users_tuples = [(int(user['user_v']), user['sim']) for user in similar_users]
        similar_users_tuples = sorted(similar_users_tuples, key=lambda x: x[1], reverse=True)
        
        cursor.close()
        cnx.close()
        # Function to calculate predicted rating
        def calculate_predict_rating(product_id):
            numerator = 0
            denominator = 0
            k = 0
            for user_v, sim in similar_users_tuples:
                if k == 50:
                    break
                if (str(user_v), str(product_id)) in training_data_dict:
                    rv_i = training_data_dict[(str(user_v), str(product_id))]
                    mu_v = avg_ratings_dict.get(str(user_v), 0)
                    numerator += float(sim) * (rv_i - mu_v)
                    denominator += abs(float(sim))
                    k+=1

            user_avg_rating = avg_ratings_dict.get(str(user_id), 0)
            predict_sim = user_avg_rating + numerator / denominator if denominator != 0 else user_avg_rating
            predict_sim = max(1, min(predict_sim, 5))
            return predict_sim

        # Calculate predicted ratings for the provided item_ids
        unrated_products = []
        for product_id in item_ids:
            predicted_rating = calculate_predict_rating(product_id)
            unrated_products.append({'product_id': str(product_id), 'predict_rating': str(predicted_rating)})

        sorted_result = sorted(unrated_products, key=lambda x: float(x['predict_rating']), reverse=True)
        json_result = json.dumps(sorted_result[:25], ensure_ascii=False, indent=4)
        res ={'customer_id': user_id, 'list': json_result}
        res_json = json.dumps(res, ensure_ascii=False, indent=4)
        return res_json
    else:
        rec_product = []
        for product_id in item_ids:
            rec_product.append({'product_id': str(product_id), 'predict_rating': '5'})
        json_result = json.dumps(rec_product, ensure_ascii=False, indent=4)
        res ={'customer_id': user_id, 'list': json_result}
        res_json = json.dumps(res, ensure_ascii=False, indent=4)
        return res_json

def get_all_keys(pattern, redis_client):
    cursor = '0'
    keys = []
    while cursor != 0:
        cursor, partial_keys = redis_client.scan(cursor=cursor, match=pattern)
        keys.extend([key for key in partial_keys])
    return keys

def extract_ids(keys):
    pattern = re.compile(r'ecommerce:product:(\d+)')
    ids = [pattern.search(str(key)).group(1) for key in keys if pattern.search(key)]
    return ids

def update_product(redis_client, cursor, embedder):
    pattern = 'ecommerce:product:*'
    all_keys = get_all_keys(pattern, redis_client)

    redis_product_ids = extract_ids(all_keys)
    
    query_get_product_mysql = '''
        select distinct id, name from Product
    '''
    cursor.execute(query_get_product_mysql)
    product_mysql_dict = [data for data in cursor.fetchall()]
    new_products = [product for product in product_mysql_dict if str(product['id']) not in redis_product_ids]

    pipeline = redis_client.pipeline(transaction=False)
    i = 0
    for product in new_products:
        name_embedding = embedder.encode(product['name']).astype(np.float32).tolist()  
        product_key = f"ecommerce:product:{product['id']}"
        product_data = {
            'id': product['id'],
            'name': product['name'],
            'name_embeddings': name_embedding
        }
        print(f"{i}. New product added - ID: {product['id']}, Name: {product['name']}")
        pipeline.json().set(product_key, '$', product_data)
        pipeline.execute()
        i += 1

if __name__ == "__main__":
    # mysql_config = {
    #     'user': 'root',
    #     'password': '1234',
    #     'host': 'localhost',
    #     'database': 'ecommerce',
    # }
    
    mysql_config = {
        'user': 'avnadmin',
        'password': 'AVNS_SQHY8Ivz7J5kp9ElUF2',
        'host': 'mysql-ecommerce-nhut0789541410-f8ba.e.aivencloud.com',
        'database': 'ecommerce',
        "port": '27163'
    }
    
    cnx = mysql.connector.connect(**mysql_config)
    cursor = cnx.cursor(dictionary=True)
    
    client = redis.Redis(host = 'localhost', port=6379, decode_responses=True)

    # params = sys.argv[1]
    # customerID = params
    customerID = '10577013'
    weight = {
            'w_click' : 0.2,
            'w_favorite': 0.3,
            'w_buy': 0.5
        }
    
    type_to_weight = {
        0: weight['w_click'],    # type 0 -> w_click
        1: weight['w_buy'],      # type 1 -> w_buy
        2: weight['w_favorite']  # type 2 -> w_favorite
    }
    
    print("Get search content...")
    search_content = getSearhContent(customerID, mysql_config)
    print(search_content)
    
    if(search_content): 
        print("Load model...")
        embedder = SentenceTransformer('keepitreal/vietnamese-sbert')
        query = (
            Query('(*)=>[KNN 100 @vector_name $query_vector AS vector_score]')
                .sort_by('vector_score')
                .return_fields('vector_score', 'id', 'name')
                .paging(0, 100)
                .dialect(2)
        )
        
        print("Updating new product embeddings...")
        update_product(client, cursor, embedder)
        
        print("Get items 4 SS...")
        itemSessionVector = getInfo4Session(customerID, client, mysql_config)
        
        while(True):
            print("Encode search...")
            encoded_queries = embedder.encode(search_content)
            print(len(encoded_queries))
            print("Search 50 items...")
            itemRealSearch = create_query_table(query, encoded_queries)
            print("Ranking...")
            rankingItems = ranking_items(itemSessionVector, itemRealSearch)
            
            if (len(rankingItems)) > 0:
                break
        
        print(tuple(rankingItems))
        
        print("Check items...")
        
        query_rated_item = f'''
            select distinct productID
            from ProductReview
            where customerID = {customerID} and productID in {tuple(rankingItems)};
        '''
        cursor.execute(query_rated_item)
        ListRated = cursor.fetchall()
        print(ListRated)
        
        ListPredict = [index for index in rankingItems if index not in ListRated]
        print(ListPredict)
        
        print("Predict rating...")
        result = get_predicted_ratings(customerID, ListPredict, mysql_config = mysql_config)

        data = {'data': result}
        res = requests.post('http://127.0.0.1:8080/api/simulating-3session-recommend', json=data)
    else:
        json_result = json.dumps([{'product_id': '', 'predict_rating': ''}], ensure_ascii=False, indent=4)
        res ={'customer_id': customerID, 'list': json_result}
        res_json = json.dumps(res, ensure_ascii=False, indent=4)
        data = {'data': res_json}
        res = requests.post('http://127.0.0.1:8080/api/simulating-3session-recommend', json=data)