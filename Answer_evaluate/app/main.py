from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.answer_check import router as answer_router

app = FastAPI(title="Answer Evaluation AI Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(answer_router)

@app.get("/")
def root():
    return {"status": "Answer Evaluation Service Running 🚀"}
