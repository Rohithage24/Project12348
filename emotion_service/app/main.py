from fastapi import FastAPI
from .api.predict import router as predict_router
from .api.report import router as report_router

app = FastAPI(title="Emotion Detection API")

app.include_router(predict_router)
app.include_router(report_router)

@app.get("/")
def root():
    return {"status": "Emotion API running"}
