import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import API_BASE_URL from '../api';

const DashboardPage = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [userScore, setUserScore] = useState('');
  const [selectedMajor, setSelectedMajor] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [allMajors, setAllMajors] = useState([]);

  useEffect(() => {
    // 1. Lấy kết quả khảo sát từ LocalStorage
    const surveyResult = localStorage.getItem('orientation_result') || "Kỹ thuật & Công nghệ";
    
    // 2. Gọi API lấy gợi ý ngành
    fetch(`${API_BASE_URL}/recommend`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orientation_result: surveyResult })
    })
    .then(res => res.json())
    .then(data => setRecommendations(data));

    // 3. Lấy danh sách ngành để dự đoán
    fetch(`${API_BASE_URL}/majors`)
    .then(res => res.json())
    .then(data => setAllMajors(data));
  }, []);

  const handlePredict = () => {
    if (!selectedMajor || !userScore) return;
    
    fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        major_code: selectedMajor,
        score: parseFloat(userScore)
      })
    })
    .then(res => res.json())
    .then(data => setPrediction(data));
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
      <Navbar />
      <main className="flex-1 px-6 lg:px-40 py-8">
        <div className="max-w-[1200px] mx-auto space-y-8">
          {/* Profile Summary */}
          <section className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div 
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-24 md:size-32 border-4 border-white dark:border-slate-800 shadow-lg" 
                    style={{ backgroundImage: `url("https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop")` }}
                  ></div>
                  <div className="absolute bottom-1 right-1 bg-green-500 size-5 rounded-full border-2 border-white dark:border-slate-900"></div>
                </div>
                <div className="flex flex-col">
                  <h1 className="text-slate-900 dark:text-slate-100 text-2xl md:text-3xl font-bold">Nguyễn Văn A</h1>
                  <div className="flex flex-wrap items-center gap-3 mt-1">
                    <span className="text-primary font-medium">Mã thí sinh: VUX-2024-001</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-600 dark:text-slate-400">TP. Vinh, Nghệ An</span>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full uppercase tracking-wider">Học sinh lớp 12</span>
                    <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-semibold rounded-full uppercase tracking-wider">Đang xét tuyển</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="flex-1 md:flex-none px-6 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold rounded-lg hover:bg-slate-200 transition-colors">
                  Sửa hồ sơ
                </button>
                <button className="flex-1 md:flex-none px-6 py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 shadow-md shadow-primary/20 transition-colors">
                  Xem trạng thái
                </button>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Prediction Section */}
              <section className="bg-gradient-to-br from-primary/5 to-primary/10 p-6 rounded-2xl border border-primary/20 shadow-xl shadow-primary/5">
                <div className="flex items-center gap-3 mb-6">
                  <div className="size-10 rounded-lg bg-primary text-white flex items-center justify-center">
                    <span className="material-symbols-outlined">analytics</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Dự báo khả năng trúng tuyển</h2>
                    <p className="text-xs text-slate-500">Dựa trên dữ liệu điểm chuẩn 3 năm gần nhất</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-600 dark:text-slate-400 ml-1">Chọn ngành muốn xét tuyển</label>
                    <select 
                      value={selectedMajor}
                      onChange={(e) => setSelectedMajor(e.target.value)}
                      className="w-full h-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    >
                      <option value="">-- Chọn ngành học --</option>
                      {allMajors.map(m => (
                        <option key={m.code} value={m.code}>{m.name} ({m.code})</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1 space-y-2">
                      <label className="text-sm font-bold text-slate-600 dark:text-slate-400 ml-1">Nhập điểm của bạn</label>
                      <input 
                        type="number"
                        step="0.1"
                        value={userScore}
                        onChange={(e) => setUserScore(e.target.value)}
                        placeholder="VD: 26.5"
                        className="w-full h-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-bold"
                      />
                    </div>
                    <button 
                      onClick={handlePredict}
                      className="h-12 px-6 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/20"
                    >
                      Phân tích
                    </button>
                  </div>
                </div>

                {prediction && (
                  <div className={`mt-6 p-4 rounded-xl border flex items-start gap-4 animate-in fade-in slide-in-from-top-4 duration-500 ${
                    prediction.status === 'high' ? 'bg-green-50 border-green-200 text-green-800' :
                    prediction.status === 'medium' ? 'bg-blue-50 border-blue-200 text-blue-800' :
                    prediction.status === 'low' ? 'bg-yellow-50 border-yellow-200 text-yellow-800' : 'bg-red-50 border-red-200 text-red-800'
                  }`}>
                    <span className="material-symbols-outlined size-8 flex items-center justify-center bg-white rounded-full">
                      {prediction.status === 'high' ? 'verified' : prediction.status === 'medium' ? 'moving' : 'warning'}
                    </span>
                    <div>
                      <p className="font-bold">Kết quả phân tích cho ngành {prediction.major_name}:</p>
                      <p className="text-sm mt-1">{prediction.message}</p>
                    </div>
                  </div>
                )}
              </section>

              {/* Recommended Majors */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">auto_awesome</span>
                    Ngành học gợi ý từ AI
                  </h2>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded font-bold uppercase tracking-wider">Cá nhân hóa</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {recommendations.length > 0 ? recommendations.map((major, i) => (
                    <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/5 group">
                      <div className="h-40 bg-slate-100 dark:bg-slate-800 flex items-center justify-center relative">
                        <span className="material-symbols-outlined text-6xl text-slate-300 group-hover:text-primary/20 transition-all">school</span>
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-primary text-[10px] font-bold border border-primary/10">MATCHING</div>
                      </div>
                      <div className="p-6">
                        <h3 className="font-bold text-lg leading-tight mb-2">{major.name}</h3>
                        <p className="text-xs text-slate-500 line-clamp-2 mb-4">{major.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {major.groups.map(g => (
                            <span key={g} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[10px] font-bold">{g}</span>
                          ))}
                        </div>
                        <button className="w-full py-2 bg-slate-50 dark:bg-slate-800/50 text-primary text-sm font-bold rounded-lg border border-slate-100 dark:border-slate-800 hover:bg-primary hover:text-white hover:border-primary transition-all">
                          Xem chương trình đào tạo
                        </button>
                      </div>
                    </div>
                  )) : (
                    <div className="col-span-2 py-12 flex flex-col items-center justify-center text-slate-400 bg-white dark:bg-slate-900 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                      <span className="material-symbols-outlined text-5xl mb-4">psychology_alt</span>
                      <p className="text-sm font-medium">Hãy làm khảo sát định hướng để nhận gợi ý!</p>
                      <button className="mt-4 text-primary font-bold hover:underline">Làm khảo sát ngay</button>
                    </div>
                  )}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">task_alt</span>
                  Lộ trình của bạn
                </h2>
                <div className="space-y-8 relative before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-px before:bg-slate-100 dark:before:bg-slate-800">
                  <div className="relative flex gap-4">
                    <div className="size-8 rounded-full bg-green-500 text-white flex items-center justify-center z-10">
                      <span className="material-symbols-outlined text-sm">check</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-sm">Làm khảo sát định hướng</h3>
                      <p className="text-xs text-slate-500 mt-0.5">Đã hoàn thành lúc 10:45</p>
                    </div>
                  </div>
                  <div className="relative flex gap-4">
                    <div className="size-8 rounded-full bg-primary text-white flex items-center justify-center z-10 animate-pulse">
                      <span className="material-symbols-outlined text-sm">schedule</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-sm">Tra cứu & Phân tích điểm</h3>
                      <p className="text-xs text-slate-500 mt-0.5">Sử dụng công cụ dự báo AI</p>
                      <button className="mt-2 text-primary text-xs font-bold hover:underline">Chi tiết</button>
                    </div>
                  </div>
                  <div className="relative flex gap-4">
                    <div className="size-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center z-10">
                      <span className="material-symbols-outlined text-sm">edit_document</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-400">Đăng ký xét tuyển trực tuyến</h3>
                      <p className="text-xs text-slate-400 mt-0.5">Mở vào 15/04/2025</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-slate-900 text-white rounded-2xl p-6 overflow-hidden relative group">
                <div className="absolute -right-4 -bottom-4 size-32 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/40 transition-all"></div>
                <div className="relative z-10">
                  <h3 className="font-bold text-lg mb-2">Trợ giúp trực tuyến 24/7</h3>
                  <p className="text-xs text-slate-400 mb-4">Bạn có thắc mắc về hồ sơ hay ngành học? Heulwen luôn sẵn sàng giải đáp.</p>
                  <button className="w-full py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-sm">chat</span>
                    Chat với AI ngay
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;
