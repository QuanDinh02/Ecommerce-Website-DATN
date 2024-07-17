import redis
import numpy as np
from scipy.spatial.distance import cosine
from sentence_transformers import SentenceTransformer
from redis.commands.search.query import Query
import json
import mysql.connector
import sys

def get_name_embedding(redis_client, key):
    data = redis_client.json().get(key)
    if data:
        return np.array(data.get('name_embeddings'), dtype=np.float32)
    return None

def extract_product_id(key):
    return int(key.decode('utf-8').split(':')[-1])

# Hàm tính cosine similarity
def cosine_similarity(vec1, vec2):
    return 1 - cosine(vec1, vec2)


def create_query_table(client, query, encoded_name_product, extra_params = {}, INDEX_NAME = 'idx:product-name1'):
    itemSimilarity = []
    results_list = []
    result_docs = client.ft(INDEX_NAME).search(query, {'query_vector': np.array(encoded_name_product, dtype=np.float32).tobytes()} | extra_params).docs
    for doc in result_docs:
        vector_score = round(1 - float(doc.vector_score), 2)
        results_list.append({
                'score': vector_score, 
                'id': doc.id,
                'name': doc.name,
            })
        # itemSimilarity.append(((doc.id).split(":")[-1], doc.name, vector_score))
        itemSimilarity.append((doc.id).split(":")[-1])
        
    return itemSimilarity

if __name__ == '__main__':
    redis_host = 'localhost'
    redis_port = 6379
    redis_client = redis.Redis(host=redis_host, port=redis_port, db=0)
    
    mysql_config = {
        'user': 'root',
        'password': '1234',
        'host': 'localhost',
        'database': 'ecommerce',
    }
    
    cnx = mysql.connector.connect(**mysql_config)
    cursor = cnx.cursor(dictionary=True)
    
    
    embedder = SentenceTransformer('keepitreal/vietnamese-sbert')
    
    query = (
            Query('(*)=>[KNN 20 @vector_name $query_vector AS vector_score]')
                .sort_by('vector_score')
                .return_fields('vector_score', 'id', 'name')
                .paging(0, 20)
                .dialect(2)
        )
    params = sys.argv[1]
    item_id = params
    query_get_name = f'''
        SELECT name
        FROM Product
        where id = {item_id}
    '''
    cursor.execute(query_get_name)
    item_name = cursor.fetchall()
    
    encoded_name_product = embedder.encode(item_name[0]['name'])
    while(True):
        itemSim = create_query_table(redis_client, query, encoded_name_product)
        if (len(itemSim)) > 0:
                break
    itemSim_1 = []
    for data in itemSim:
        itemSim_1.append({'product_id': data})
    json_result = json.dumps(itemSim_1, ensure_ascii=False, indent=4)
    res ={'item_id': item_id, 'list': json_result}
    res_json = json.dumps(res, ensure_ascii=False, indent=4)
    
    a = {"data": res_json}
    b = json.dumps(a, ensure_ascii=False)
    print(b)
