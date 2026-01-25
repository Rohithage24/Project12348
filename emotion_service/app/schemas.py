from pydantic import BaseModel

class EmotionRequest(BaseModel):
    image: str
    user_id: str
