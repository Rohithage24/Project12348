# 🎯 Speech Confidence Prediction Model

This module contains the Machine Learning model used to calculate a speaker’s confidence score from speech data.

---

## 📁 Project Structure

speech-confidence-app/
├── backend/
│   ├── main.py
│   ├── models/
│   │   ├── confidence_model.pkl
│   │   └── README.md
│   ├── requirements.txt
├── frontend/

---

## 🧠 Model Details
- Model Type: Scikit-learn Regression
- Input: Speech feature vector (NumPy array)
- Output: Confidence score (0–100)

---

## 📥 Input Example

```python
import numpy as np
features = np.array([[0.6, 0.8, 0.7]])
```

---

## 📤 Output Example

```json
{
  "overall_score": 78.5,
  "pace_score": 73.5,
  "clarity_score": 75.5,
  "tone_score": 74.5
}
```

---

## 🚀 Run Backend

```bash
pip install -r requirements.txt
uvicorn main:app --reload
```

Server:
http://127.0.0.1:8000

---

## 🌐 Frontend API Call
POST http://127.0.0.1:8000/analyze-full-speech

---

## 🎓 Project
Final Year Project – Speech Confidence Analysis
