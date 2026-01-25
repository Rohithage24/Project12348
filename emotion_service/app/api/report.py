from fastapi import APIRouter
from ..utils.emotion_store import emotion_store

router = APIRouter()

@router.get("/emotion-report/{user_id}")
def emotion_report(user_id: str):

    data = [d for d in emotion_store if d["user_id"] == user_id]

    if not data:
        return {"error": "No data found"}

    total = len(data)

    counts = {"happy":0, "sad":0, "fear":0, "neutral":0}
    for d in data:
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
# from ..database.emotion_crud import get_user_emotions

# router = APIRouter()

# @router.get("/emotion-report/{user_id}")
# def emotion_report(user_id: str):

#     data = get_user_emotions(user_id)

#     if not data:
#         return {"error": "No data found"}

#     total = len(data)

#     counts = {"happy":0, "sad":0, "fear":0, "neutral":0}

#     for d in data:
#         if d["emotion"] in counts:
#             counts[d["emotion"]] += 1

#     percent = {}
#     for k,v in counts.items():
#         percent[k] = round((v/total)*100,2)

#     dominant = max(percent, key=percent.get)

#     # Confidence Logic
#     confidence_score = percent["happy"] + percent["neutral"] - percent["fear"]

#     if confidence_score >= 50:
#         confidence_level = "High"
#     elif confidence_score >= 30:
#         confidence_level = "Medium"
#     else:
#         confidence_level = "Low"

#     return {
#         "total_samples": total,
#         "emotion_percentage": percent,
#         "dominant_emotion": dominant,
#         "confidence_level": confidence_level,
#         "confidence_score": round(confidence_score,2)
#     }
