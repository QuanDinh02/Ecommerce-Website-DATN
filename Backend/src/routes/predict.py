import mysql.connector
import json
import requests
import sys

def get_unrated_products_and_predict(user_id, mysql_config={}):
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
        
        # Get products rated by similar users but not rated by the current user
        query_unrated_products = f"""
            SELECT DISTINCT p.id as product_id
            FROM Product p
            WHERE p.id NOT IN (
                SELECT productID
                FROM ProductReview
                WHERE customerID = {user_id});
        """
        cursor.execute(query_unrated_products)
        unrated_products = cursor.fetchall()

        cursor.close()
        cnx.close()
        
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

        for product in unrated_products:
            product_id = product['product_id']
            product['product_id'] = str(product_id)
            product['predict_rating'] = str(calculate_predict_rating(product_id))

            # Sort the list in descending order by 'predict_rating'
        sorted_result = sorted(unrated_products, key=lambda x: float(x['predict_rating']), reverse=True)

        # Convert the sorted list to a JSON string
        json_result = json.dumps(sorted_result[:25], ensure_ascii=False, indent=4)
        res ={'customer_id': user_id, 'list': json_result}
        res_json = json.dumps(res, ensure_ascii=False, indent=4)
        return res_json
    else:
        json_result = json.dumps([], ensure_ascii=False, indent=4)
        res ={'customer_id': user_id, 'list': json_result}
        res_json = json.dumps(res, ensure_ascii=False, indent=4)
        return res_json

if __name__ == '__main__':
    mysql_config = {
        'user': 'avnadmin',
        'password': 'AVNS_SQHY8Ivz7J5kp9ElUF2',
        'host': 'mysql-ecommerce-nhut0789541410-f8ba.e.aivencloud.com',
        'database': 'ecommerce',
        "port": '27163'
    }
    
    params = sys.argv[1]
    user_id = params
    # user_id = '10577013'
    
    result = get_unrated_products_and_predict(user_id, mysql_config=mysql_config)
    a = {'data': result}
    res = requests.post('http://127.0.0.1:8080/api/simulating-recommend', json=a)