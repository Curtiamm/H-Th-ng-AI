import json
import os

class RecommendationService:
    def __init__(self, data_path: str):
        self.data_path = data_path
        self.majors = self._load_majors()

    def _load_majors(self):
        if os.path.exists(self.data_path):
            with open(self.data_path, 'r', encoding='utf-8') as f:
                return json.load(f)
        return []

    def get_recommendations(self, orientation_result: str):
        """Gợi ý ngành dựa trên kết quả khảo sát định hướng."""
        if not orientation_result:
            return []
            
        result_lower = orientation_result.lower()
        recommendations = []
        
        # Mapping đơn giản từ kết quả khảo sát sang danh sách ngành
        # Trong thực tế có thể dùng similarity score
        for major in self.majors:
            major_name = major['name'].lower()
            # Ví dụ: nếu kết quả chứa "Kỹ thuật", gợi ý các ngành kỹ thuật
            if "kỹ thuật" in result_lower or "công nghệ" in result_lower:
                if any(kw in major_name for kw in ["công nghệ", "kỹ thuật", "an toàn", "tin học"]):
                    recommendations.append(major)
            elif "sư phạm" in result_lower:
                if "sư phạm" in major_name:
                    recommendations.append(major)
            elif "kinh tế" in result_lower:
                if any(kw in major_name for kw in ["kinh tế", "kế toán", "quản trị"]):
                    recommendations.append(major)
                    
        return recommendations[:3] # Trả về top 3 gợi ý

    def predict_admission(self, major_code: str, user_score: float, group: str = ""):
        """Dự đoán khả năng trúng tuyển."""
        target_major = next((m for m in self.majors if m['code'] == major_code), None)
        
        if not target_major:
            return {"status": "unknown", "message": "Không tìm thấy mã ngành này."}
            
        cutoff = target_major.get('cutoff_2024', 0)
        diff = user_score - cutoff
        
        if diff >= 2.0:
            status = "high"
            message = f"Khả năng trúng tuyển RẤT CAO. Điểm của bạn ({user_score}) cao hơn điểm chuẩn năm ngoái ({cutoff}) tới {diff:.2f} điểm."
        elif diff >= 0:
            status = "medium"
            message = f"Khả năng trúng tuyển TƯƠNG ĐỐI CAO. Điểm của bạn ({user_score}) vừa đủ hoặc cao hơn một chút so với điểm chuẩn năm ngoái ({cutoff})."
        elif diff >= -1.0:
            status = "low"
            message = f"Cần cân nhắc thêm. Điểm của bạn ({user_score}) thấp hơn điểm năm ngoái ({cutoff}) khoảng {abs(diff):.2f} điểm. Bạn có thể hy vọng nếu điểm sàn năm nay giảm."
        else:
            status = "fail"
            message = f"Nguy cơ trượt cao. Điểm của bạn ({user_score}) đang thấp hơn khá nhiều so với điểm chuẩn năm ngoái ({cutoff})."
            
        return {
            "status": status,
            "message": message,
            "cutoff_last_year": cutoff,
            "user_score": user_score,
            "major_name": target_major['name']
        }
