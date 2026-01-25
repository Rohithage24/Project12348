# 🎭 Face Emotion Detection – MERN Integration Guide

This project integrates an **AI-based Face Emotion Detection model (FastAPI + TensorFlow)** with a **MERN Stack application** for silent interview monitoring and final confidence reporting.

---

## 🧱 Tech Stack

- **Frontend**: React (custom webcam implementation)
- **Backend (Optional Proxy)**: Node.js / Express
- **AI Service**: FastAPI (Python)
- **ML Framework**: TensorFlow
- **Database**: MongoDB / In-Memory Store (Dev)
- **Communication**: REST API (JSON)

---

## 📐 System Architecture

React  
↓  
Node.js (Optional Proxy)  
↓  
FastAPI Emotion API  
↓  
MongoDB / In-Memory Store

---

## 🚀 STEP 1 — Clone & Setup Emotion API

```bash
cd emotion_service
```

---

## 🐍 STEP 2 — Create Virtual Environment

### Windows
```bash
python -m venv venv
venv\Scripts\activate
```

### macOS / Linux
```bash
python3 -m venv venv
source venv/bin/activate
```

---

## 📦 STEP 3 — Install Dependencies

```bash
pip install -r requirements.txt
pip install pymongo
```

If requirements.txt is missing:

```bash
pip install fastapi uvicorn tensorflow opencv-python numpy pillow pymongo
```

---

## ▶ STEP 4 — Start FastAPI Emotion Service

```bash
uvicorn app.main:app --reload
```

Swagger UI:
http://127.0.0.1:8000/docs

---

## ⏱ STEP 5 — Continuous Emotion Monitoring

Send a Base64 image every 3 seconds.

**POST**
```
http://127.0.0.1:8000/predict-emotion
```

```json
{
  "image": "<base64_image>",
  "user_id": "1"
}
```
Sample Response:
```json
{
  "total_samples": 94,
    "happy": 8.51,
    "sad": 27.66,
    "fear": 17.02,
    "neutral": 46.81
  },
 
}
---

## 📊 STEP 6 — Fetch Final Emotion Report

**GET**
```
http://127.0.0.1:8000/emotion-report/1
```

Sample Response:
```json
{
  "total_samples": 94,
  "emotion_percentage": {
    "happy": 8.51,
    "sad": 27.66,
    "fear": 17.02,
    "neutral": 46.81
  },
  "dominant_emotion": "neutral",
  "confidence_level": "Medium",
  "confidence_score": 38.3
}
```

---

## 🌐 Enable CORS (FastAPI)

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## 🧠 Confidence Level Logic (JS)

```js
const confidence_level =
  confidence_score >= 50 ? "High" :
  confidence_score >= 30 ? "Medium" : "Low";
```

---

## 🏆 Final Outcome

✔ Silent monitoring  
✔ Emotion analytics  
✔ Confidence scoring  
✔ MERN-ready AI service
