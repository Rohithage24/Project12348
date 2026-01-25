import requests
import base64

API_URL = "http://127.0.0.1:8000/predict-emotion"
REPORT_URL = "http://127.0.0.1:8000/emotion-report/1"

# convert image to base64
with open("lena.jpg", "rb") as f:
    b64 = base64.b64encode(f.read()).decode()

payload = {
    "image": b64,
    "user_id": "1"
}

# call emotion API multiple times to simulate interview
for i in range(5):
    res = requests.post(API_URL, json=payload)
    print("Emotion Response:", res.json())

# get final report
report = requests.get(REPORT_URL)
print("\nFinal Interview Report:")
print(report.json())
