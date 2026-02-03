from fastapi import APIRouter
from ..schemas import EmotionRequest
from ..utils.image_utils import base64_to_image
from ..services.face_detector import detect_faces   # 🔥 now detects multiple
from ..services.emotion_predictor import predict_emotion
from ..services.emotion_mapper import map_emotion
from ..utils.emotion_store import emotion_store

router = APIRouter()

# 🔥 Track warnings per user (in memory)
warning_counter = {}

@router.post("/predict-emotion")
def predict_emotion_api(data: EmotionRequest):

    image = base64_to_image(data.image)
    if image is None:
        return {"error": "Invalid image"}

    faces = detect_faces(image)  # returns list of faces

    # ❌ No face
    if len(faces) == 0:
        return {"error": "No face detected"}

    # ⚠️ Multiple faces detected
    if len(faces) > 1:
        user_id = data.user_id
        warning_counter[user_id] = warning_counter.get(user_id, 0) + 1

        if warning_counter[user_id] >= 3:
            return {
                "error": "Multiple faces detected 3 times. Interview stopped.",
                "stop_interview": True
            }

        return {
            "warning": "Multiple faces detected. Only one person should be in frame.",
            "warning_count": warning_counter[user_id]
        }

    # ✅ Single face → continue emotion detection
    face = faces[0]

    raw = predict_emotion(face)
    final = map_emotion(raw)

    # 🔄 Reset warnings if face is valid
    warning_counter[data.user_id] = 0

    # ✅ STORE IN MEMORY
    emotion_store.append({
        "user_id": data.user_id,
        "emotion": final
    })

    # ✅ GENERATE REPORT
    user_data = [d for d in emotion_store if d["user_id"] == data.user_id]
    total = len(user_data)

    counts = {"happy":0, "sad":0, "fear":0, "neutral":0}
    for d in user_data:
        if d["emotion"] in counts:
            counts[d["emotion"]] += 1

    percent = {k: round((v/total)*100, 2) for k,v in counts.items()}
    dominant = max(percent, key=percent.get)

    confidence_score = percent["happy"] + percent["neutral"] - percent["fear"]
    confidence_level = (
        "High" if confidence_score >= 50 else
        "Medium" if confidence_score >= 30 else
        "Low"
    )

    return {
        "total_samples": total,
        "emotion_percentage": percent,
        "dominant_emotion": dominant,
        "confidence_level": confidence_level,
        "confidence_score": round(confidence_score, 2)
    }
