from fastapi import APIRouter
from app.schemas.answer_schema import AnswerCheckRequest
from app.services.answer_evaluator import evaluate_answer

router = APIRouter()

@router.post("/evaluate-answer")
def evaluate_spoken_answer(data: AnswerCheckRequest):
    result = evaluate_answer(
        data.user_answer,
        data.key_concepts,
        data.keywords
    )

    return {
        "user_id": data.user_id,
        "question": data.question,
        **result
    }
