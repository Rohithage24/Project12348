import cv2
import base64
import requests
import time

API_URL = "http://127.0.0.1:8000/predict-emotion"
USER_ID = "1"

cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()

    if not ret:
        break

    # convert frame to jpg
    _, buffer = cv2.imencode(".jpg", frame)

    # convert to base64
    b64 = base64.b64encode(buffer).decode()

    payload = {
        "image": b64,
        "user_id": USER_ID
    }

    res = requests.post(API_URL, json=payload)

    print("Emotion:", res.json())

    # capture every 3 seconds
    time.sleep(3)

cap.release()
cv2.destroyAllWindows()
