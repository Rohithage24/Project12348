from pydantic import BaseModel
from typing import List

class AnswerCheckRequest(BaseModel):
    user_id: str
    question: str
    key_concepts: List[str]
    keywords: List[str]
    user_answer: str
