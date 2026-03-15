from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict
from utils.nlp_utils import normalize_text, extract_entities
from services.rag_service import RAGService
import json
import os

from services.rec_service import RecommendationService
import json
import os

app = FastAPI(title="Admission Chatbot API")

# Cấu hình CORS cho React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Khởi tạo Services
rag = RAGService(os.path.join(os.path.dirname(__file__), "data", "admission_docs.md"))
rec = RecommendationService(os.path.join(os.path.dirname(__file__), "data", "majors_data.json"))

class ChatRequest(BaseModel):
    message: str
    history: List[Dict[str, str]] = []

class PredictRequest(BaseModel):
    major_code: str
    score: float
    group: Optional[str] = None

class RecommendRequest(BaseModel):
    orientation_result: str

@app.get("/")
def read_root():
    return {"status": "online", "message": "Admission Chatbot API is running"}

@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    try:
        print(f"DEBUG: Processing message: {request.message}")
        query = normalize_text(request.message)
        entities = extract_entities(query)
        print(f"DEBUG: Entities & Intent: {entities}")
        
        # Tìm kiếm thông tin từ RAG (Trả về Dict)
        rag_result = rag.retrieve_info(query)
        context = rag_result["context"]
        
        # Gọi Gemini để sinh câu trả lời
        answer = await rag.generate_answer(request.message, context)
        
        return {
            "answer": answer,
            "entities": entities,
            "intent": entities["intent"],
            "confidence": rag_result["confidence"]
        }
    except Exception as e:
        print(f"ERROR in /chat: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict")
def predict_endpoint(request: PredictRequest):
    return rec.predict_admission(request.major_code, request.score, request.group)

@app.post("/recommend")
def recommend_endpoint(request: RecommendRequest):
    return rec.get_recommendations(request.orientation_result)

@app.get("/majors")
def get_majors():
    with open(os.path.join(os.path.dirname(__file__), "data", "majors_data.json"), 'r', encoding='utf-8') as f:
        return json.load(f)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
