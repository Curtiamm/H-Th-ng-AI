from typing import List, Dict
import os
import google.generativeai as genai
from utils.nlp_utils import normalize_text, tokenize
from dotenv import load_dotenv

load_dotenv()

# Cấu hình Gemini
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
model = None

if GEMINI_API_KEY and GEMINI_API_KEY != "your_gemini_api_key_here":
    try:
        genai.configure(api_key=GEMINI_API_KEY)
        # Thử các model THỰC TẾ và ĐANG HOẠT ĐỘNG
        # Thêm model theo yêu cầu của người dùng
        available_models = [
            'gemini-2.0-flash',
            'gemini-1.5-flash',
            'gemini-1.5-pro',
            'gemini- flash-latest',
            'gemini-2.5-flash',
            'gemini-2.5-pro',
            'gemini-2.0-flash-001',
            'gemini-pro-latest'
        ]
        for m_name in available_models:
            try:
                # Kiểm tra xác thực model bằng cách tạo instance
                test_model = genai.GenerativeModel(m_name)
                # Gán model mặc định
                model = test_model
                print(f"✅ Gemini Model '{m_name}' selected as primary")
                break
            except Exception as test_err:
                print(f"⚠️ Model '{m_name}' could not be initialized, trying next...")
                continue
    except Exception as e:
        print(f"❌ Error during Gemini setup: {str(e)}")
        model = None
else:
    print("⚠️ Gemini API Key is missing or invalid in .env")


class RAGService:
    def __init__(self, doc_path: str):
        self.doc_path = doc_path
        self.knowledge_base = self._load_docs()

    def _load_docs(self) -> str:
        if os.path.exists(self.doc_path):
            with open(self.doc_path, 'r', encoding='utf-8') as f:
                return f.read()
        return "Dữ liệu tuyển sinh đang được cập nhật."

    def retrieve_info(self, query: str) -> Dict:
        """
        Tìm kiếm ngữ nghĩa cải tiến với chấm điểm tin cậy (Confidence Scoring).
        """
        normalized_query = normalize_text(query)
        keywords = tokenize(normalized_query)
        keywords = [kw.lower() for kw in keywords if isinstance(kw, str) and len(kw) > 1]
        
        chunks = self.knowledge_base.split('##')
        scored_chunks = []
        
        for chunk in chunks:
            score: float = 0.0
            chunk_lower = chunk.lower()
            
            for kw in keywords:
                if kw in chunk_lower:
                    # Điểm cơ bản
                    score += 1.0
                    # Thêm điểm cho tiêu đề
                    first_line = chunk_lower.split('\n')[0]
                    if kw in first_line:
                        score += 5.0
                    # Điểm cộng cho sự xuất hiện chính xác (không bị dính từ khác)
                    if f" {kw} " in f" {chunk_lower} ":
                        score += 2.0
            
            if score > 0:
                scored_chunks.append((score, chunk))
        
        scored_chunks.sort(key=lambda x: x[0], reverse=True)
        
        # Tính toán mức độ tự tin (0.0 - 1.0)
        confidence = 0.0
        if scored_chunks:
            # Normalize score (giả định max score lý tưởng là 15 cho 1 query 3 keyword)
            max_possible = len(keywords) * 8 
            confidence = min(scored_chunks[0][0] / max_possible if max_possible > 0 else 0, 1.0)

        top_chunks = [c[1] for c in scored_chunks[:3]]
        context = "\n##".join(top_chunks) if top_chunks else self.knowledge_base[:1000]
        
        return {
            "context": context,
            "confidence": confidence,
            "has_relevant_info": len(scored_chunks) > 0
        }
    async def generate_answer(self, query: str, context: str) -> str:
        if not model:
            return "Lỗi: Chưa cấu hình Gemini API Key. Vui lòng kiểm tra file .env."
        
        prompt = f"""
        Bạn là Heulwen - Chuyên gia tư vấn tuyển sinh đại học thông minh.
        Sử dụng thông tin dưới đây để trả lời câu hỏi của thí sinh một cách chính xác, thân thiện và chuyên nghiệp.
        Nếu thông tin không có trong tài liệu, hãy trả lời là bạn chưa có thông tin chính xác về vấn đề này.

        Tài liệu:
        {context}

        Câu hỏi của thí sinh: {query}
        Trả lời bằng tiếng Việt, định dạng Markdown đẹp mắt.
        """
        
        runtime_models = [
            'gemini-2.0-flash',
            'gemini-1.5-flash',
            'gemini-1.5-pro',
            'gemini-2.5-flash',
            'gemini-2.5-pro',
            'gemini-2.0-flash-001',
            'gemini-flash-latest',
            'gemini-pro-latest',
            'gemini-flash-lite-latest',
            'gemini-2.0-flash-lite',
            'gemini-3.1-pro-preview',
            'gemini-3.1-flash-lite-preview'
        ]
        last_error = ""

        for m_name in runtime_models:
            try:
                print(f"DEBUG: Attempting AI call with model: {m_name}")
                current_model = genai.GenerativeModel(m_name)
                response = await current_model.generate_content_async(prompt)
                
                if response and response.text:
                    return response.text
                else:
                    continue
            except Exception as e:
                error_str = str(e)
                last_error = error_str
                # Thử model tiếp theo nếu gặp lỗi Quota (429), Không tìm thấy (404) hoặc Bad Request (400)
                if any(err in error_str for err in ["429", "quota", "404", "400", "503", "500"]):
                    print(f"⚠️ Model {m_name} failed ({error_str[:60]}...). Trying fallback...")
                    continue
                else:
                    print(f"GEMINI ERROR with {m_name}: {error_str}")
                    break
        
        return f"Rất tiếc, các phiên bản AI hiện tại đều đang bận hoặc gặp lỗi kỹ thuật. (Lỗi cuối: {last_error})"
