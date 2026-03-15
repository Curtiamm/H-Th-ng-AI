import re
import spacy

# Tải model tiếng Việt (giả lập hoặc dùng thư viện cơ bản nếu chưa cài model full)
# Trong thực tế: python -m spacy download vi_core_news_lg
try:
    nlp = spacy.load("vi_core_news_lg")
except:
    nlp = None

def normalize_text(text: str) -> str:
    """Chuẩn hóa văn bản: viết thường, xóa khoảng trắng thừa, xử lý viết tắt."""
    text = text.lower().strip()
    text = re.sub(r'\s+', ' ', text)
    # Xử lý viết tắt cơ bản
    replacements = {
        "cntt": "công nghệ thông tin",
        "it": "công nghệ thông tin",
        "attt": "an toàn thông tin",
        "khmt": "khoa học máy tính",
        "đtvt": "điện tử viễn thông",
        "kỹ thuật": "kt",
    }
    for word, replacement in replacements.items():
        text = text.replace(word, replacement)
    return text

def tokenize(text: str):
    """Tách từ cơ bản."""
    if nlp:
        doc = nlp(text)
        return [token.text for token in doc if not token.is_punct and not token.is_stop]
    return text.split()

def classify_intent(text: str) -> str:
    """Phân loại ý định người dùng."""
    text = text.lower()
    
    # Từ khóa cho các ý định phổ biến
    intents = {
        "prediction": ["đỗ không", "đậu không", "khả năng", "tỉ lệ", "có được không", "nguyện vọng"],
        "major_info": ["ngành", "học gì", "đào tạo", "mã ngành", "tổ hợp"],
        "admission_policy": ["quy chế", "phương thức", "xét tuyển", "hồ sơ", "thời gian", "học phí", "học bổng"]
    }
    
    for intent, keywords in intents.items():
        if any(kw in text for kw in keywords):
            return intent
            
    return "general_chat"

def extract_entities(text: str) -> dict:
    """Trích xuất thực thể (Ngành, Điểm, Khối, Ý định)."""
    text = text.lower()
    entities: dict = {
        "major": None,
        "score": None,
        "group": None,
        "intent": classify_intent(text),
        "major_code": None
    }
    
    # Regex tìm điểm (ví dụ: 25.5, 24, 26,0)
    score_match = re.search(r'(\d{1,2}[\.,]\d{1,2}|\d{1,2})', text)
    if score_match:
        try:
            entities["score"] = float(score_match.group(1).replace(',', '.'))
        except:
            pass
            
    # Tìm mã ngành (7 chữ số)
    major_code_match = re.search(r'\d{7}', text)
    if major_code_match:
        entities["major_code"] = major_code_match.group(0)
        
    # Xử lý tổ hợp môn
    groups = ["a00", "a01", "b00", "c00", "d01", "d07", "a02"]
    for g in groups:
        if g in text:
            entities["group"] = g.upper()
            
    # Danh sách các ngành phổ biến để trích xuất nhanh (Fuzzy fallback)
    majors = ["công nghệ thông tin", "khoa học máy tính", "an toàn thông tin", "kế toán", "luật", "sư phạm", "marketing"]
    for m in majors:
        if m in text:
            entities["major"] = m
            
    return entities
