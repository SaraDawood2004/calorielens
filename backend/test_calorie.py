import requests

url = "http://127.0.0.1:5000/calculate"

data = {
    "food": "pizza",
    "quantity": 2
}

response = requests.post(url, json=data)

print(response.json())