import mysql.connector
import redis
import json
import requests
import sys

def get_unrated_products_and_predict(user_id, redis_host='localhost', redis_port=6379, mysql_config={}):
    # Connect to MySQL
    cnx = mysql.connector.connect(**mysql_config)
    cursor = cnx.cursor(dictionary=True)

    # Get average ratings of all users
    query_avg_ratings = "SELECT user_id, avg_rating FROM AVGRating"
    cursor.execute(query_avg_ratings)
    avg_ratings = cursor.fetchall()
    avg_ratings_dict = {row['user_id']: row['avg_rating'] for row in avg_ratings}

    # Get training data
    query_training_data = "SELECT user_id, item_id, rating, review_date FROM TrainingData"
    cursor.execute(query_training_data)
    training_data = cursor.fetchall()
    training_data_dict = {(row['user_id'], row['item_id']): row['rating'] for row in training_data}
    
    # Connect to Redis
    r = redis.Redis(host=redis_host, port=redis_port, db=0)

    # Get top 10 similar users from Redis
    sim_key_pattern = f'ecommerce:sim:{user_id}:*'
    similar_users = []
    for key in r.scan_iter(sim_key_pattern):
        key_str = key.decode() if isinstance(key, bytes) else key
        user_v = key_str.split(':')[-1]
        sim_value = r.execute_command('JSON.GET', key_str)
        if sim_value:
            sim_data = json.loads(sim_value)
            sim = sim_data.get('mfps')
            if sim is not None:
                similar_users.append((int(user_v), sim))
    
    similar_users = sorted(similar_users, key=lambda x: -x[1])[:10]  # Sort and get top 10

    similar_user_ids = [user_v for user_v, _ in similar_users]
    similar_user_ids_str = ', '.join(map(str, similar_user_ids))

    # Get products rated by similar users but not rated by the current user
    
    query_unrated_products = f"""
    SELECT DISTINCT pr.productID as product_id 
    FROM ProductReview pr JOIN TrainingData p ON pr.productID = p.item_id 
    WHERE pr.customerID IN ({similar_user_ids_str}) 
    AND pr.productID NOT IN (SELECT productID 
        FROM ProductReview 
        WHERE customerID = {user_id});
    """
    cursor.execute(query_unrated_products)
    unrated_products = cursor.fetchall()

    cursor.close()
    cnx.close()

    def calculate_predict_rating(product_id):
        user_j_top_k = [user_v for user_v, _ in similar_users]
        
        if not user_j_top_k:
            return -1
        
        numerator = 0
        denominator = 0
        
        for user_v, sim in similar_users:
            if (str(user_v), str(product_id)) in training_data_dict:
                rv_i = training_data_dict[(str(user_v), str(product_id))]
                mu_v = avg_ratings_dict.get(str(user_v), 0)
                numerator += sim * (rv_i - mu_v)
                denominator += abs(sim)

        user_avg_rating = avg_ratings_dict.get(str(user_id), 0)
        predict_sim = user_avg_rating + numerator / denominator if denominator != 0 else user_avg_rating
        predict_sim = max(1, min(predict_sim, 5))
        return predict_sim

    for product in unrated_products:
        product_id = product['product_id']
        product['product_id'] = str(product_id)
        product['predict_rating'] = str(calculate_predict_rating(product_id))

        # Sort the list in descending order by 'predict_rating'
    sorted_result = sorted(unrated_products, key=lambda x: float(x['predict_rating']), reverse=True)

    # Convert the sorted list to a JSON string
    json_result = json.dumps(sorted_result[:10], ensure_ascii=False, indent=4)
    res ={'customer_id': user_id, 'list': json_result}
    res_json = json.dumps(res, ensure_ascii=False, indent=4)
    return res_json


def get_predicted_ratings(user_id, item_ids, redis_host='localhost', redis_port=6379, mysql_config={}):
    # Connect to MySQL
    cnx = mysql.connector.connect(**mysql_config)
    cursor = cnx.cursor(dictionary=True)

    # Get average ratings of all users
    query_avg_ratings = "SELECT user_id, avg_rating FROM AVGRating"
    cursor.execute(query_avg_ratings)
    avg_ratings = cursor.fetchall()
    avg_ratings_dict = {row['user_id']: row['avg_rating'] for row in avg_ratings}

    # Get training data
    query_training_data = "SELECT user_id, item_id, rating, review_date FROM TrainingData"
    cursor.execute(query_training_data)
    training_data = cursor.fetchall()
    training_data_dict = {(row['user_id'], row['item_id']): row['rating'] for row in training_data}
    
    # Connect to Redis
    r = redis.Redis(host=redis_host, port=redis_port, db=0)

    # Get top 10 similar users from Redis
    sim_key_pattern = f'ecommerce:sim:{user_id}:*'
    similar_users = []
    for key in r.scan_iter(sim_key_pattern):
        key_str = key.decode() if isinstance(key, bytes) else key
        user_v = key_str.split(':')[-1]
        sim_value = r.execute_command('JSON.GET', key_str)
        if sim_value:
            sim_data = json.loads(sim_value)
            sim = sim_data.get('mfps')
            if sim is not None:
                similar_users.append((int(user_v), sim))
    
    similar_users = sorted(similar_users, key=lambda x: -x[1])[:10]  # Sort and get top 10

    similar_user_ids = [user_v for user_v, _ in similar_users]
    
    # Function to calculate predicted rating
    def calculate_predict_rating(product_id):
        user_j_top_k = [user_v for user_v, _ in similar_users]
        
        if not user_j_top_k:
            return -1
        
        numerator = 0
        denominator = 0
        
        for user_v, sim in similar_users:
            if (str(user_v), str(product_id)) in training_data_dict:
                rv_i = training_data_dict[(str(user_v), str(product_id))]
                mu_v = avg_ratings_dict.get(str(user_v), 0)
                numerator += sim * (rv_i - mu_v)
                denominator += abs(sim)

        user_avg_rating = avg_ratings_dict.get(str(user_id), 0)
        predict_sim = user_avg_rating + numerator / denominator if denominator != 0 else user_avg_rating
        predict_sim = max(1, min(predict_sim, 5))
        return predict_sim

    # Calculate predicted ratings for the provided item_ids
    unrated_products = []
    for product_id in item_ids:
        predicted_rating = calculate_predict_rating(product_id)
        unrated_products.append({'product_id': str(product_id), 'predict_rating': str(predicted_rating)})

    cursor.close()
    cnx.close()

    sorted_result = sorted(unrated_products, key=lambda x: float(x['predict_rating']), reverse=True)

    # Convert the sorted list to a JSON string
    json_result = json.dumps(sorted_result[:10], ensure_ascii=False, indent=4)

    return json_result

    
if __name__ == '__main__':

    mysql_config = {
        'user': 'root',
        'password': 'Password@123',
        'host': 'localhost',
        'database': 'ecommerce',
    }

    #print(sys.argv[1])
    params = sys.argv[1]
    user_id = params
    #user_id_1 = '2415'

    result = get_unrated_products_and_predict(user_id, mysql_config=mysql_config)
    a = {'data': result}
    res = requests.post('http://127.0.0.1:8080/api/recommend', json=a)
    print("OK")
