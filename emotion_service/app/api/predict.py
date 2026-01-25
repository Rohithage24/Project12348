from fastapi import APIRouter
from ..schemas import EmotionRequest
from ..utils.image_utils import base64_to_image
from ..services.face_detector import detect_face
from ..services.emotion_predictor import predict_emotion
from ..services.emotion_mapper import map_emotion
from ..utils.emotion_store import emotion_store

router = APIRouter()

@router.post("/predict-emotion")
def predict_emotion_api(data: EmotionRequest):

    image = base64_to_image(data.image)
    if image is None:
        return {"error": "Invalid image"}

    face = detect_face(image)
    if face is None:
        return {"error": "No face detected"}

    raw = predict_emotion(face)
    final = map_emotion(raw)

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




# from fastapi import APIRouter
# from ..schemas import EmotionRequest
# from ..utils.image_utils import base64_to_image
# from ..services.face_detector import detect_face
# from ..services.emotion_predictor import predict_emotion
# from ..services.emotion_mapper import map_emotion
# from ..database.emotion_crud import insert_emotion, get_user_emotions

# router = APIRouter()

# @router.post("/predict-emotion")
# def predict_emotion_api(data: EmotionRequest):

#     # Convert Base64 → Image
#     image = base64_to_image(data.image)
#     if image is None:
#         return {"error": "Invalid image"}

#     # Detect face
#     face = detect_face(image)
#     if face is None:
#         return {"error": "No face detected"}

#     # Predict emotion
#     raw = predict_emotion(face)
#     final = map_emotion(raw)

#     # Store emotion
#     insert_emotion(data.user_id, final)

#     # 🔥 Generate REPORT after storing
#     data_list = get_user_emotions(data.user_id)
#     total = len(data_list)

#     counts = {"happy":0, "sad":0, "fear":0, "neutral":0}

#     for d in data_list:
#         if d["emotion"] in counts:
#             counts[d["emotion"]] += 1

#     percent = {}
#     for k,v in counts.items():
#         percent[k] = round((v/total)*100, 2)

#     dominant = max(percent, key=percent.get)

#     confidence_score = percent["happy"] + percent["neutral"] - percent["fear"]

#     if confidence_score >= 50:
#         confidence_level = "High"
#     elif confidence_score >= 30:
#         confidence_level = "Medium"
#     else:
#         confidence_level = "Low"

#     # ✅ FINAL RESPONSE FORMAT (WHAT YOU WANT)
#     return {
#         "total_samples": total,
#         "emotion_percentage": percent,
#         "dominant_emotion": dominant,
#         "confidence_level": confidence_level,
#         "confidence_score": round(confidence_score, 2)
#     }



# from fastapi import APIRouter
# from ..schemas import EmotionRequest
# from ..utils.image_utils import base64_to_image
# from ..services.face_detector import detect_face
# from ..services.emotion_predictor import predict_emotion
# from ..services.emotion_mapper import map_emotion
# from ..database.emotion_crud import insert_emotion

# router = APIRouter()

# @router.post("/predict-emotion")
# def predict_emotion_api(data: EmotionRequest):

#     image = base64_to_image(data.image)
#     if image is None:
#         return {"error": "Invalid image"}

#     face = detect_face(image)
#     if face is None:
#         return {"error": "No face detected"}

#     raw = predict_emotion(face)
#     final = map_emotion(raw)

#     insert_emotion(data.user_id, final)

#     return {"emotion": final, "status": "stored"}
