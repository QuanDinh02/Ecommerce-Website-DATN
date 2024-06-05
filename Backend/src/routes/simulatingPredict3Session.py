import requests
import json
from types import SimpleNamespace
from threading import Timer

def is_json(myjson):
  try:
    json.loads(myjson)
  except ValueError as e:
    return False
  return True

def handleSaveRecommendItem():

   data = {'data': '10'}
   res = requests.post('http://127.0.0.1:8080/api/simulating-recommend', json=data)
   res_data = res.text

   x = json.loads(res_data, object_hook=lambda d: SimpleNamespace(**d))
   errorCode = int(x.EC)
   print(errorCode)

if __name__ == '__main__':

    r = Timer(7.0, handleSaveRecommendItem);
    r.start()