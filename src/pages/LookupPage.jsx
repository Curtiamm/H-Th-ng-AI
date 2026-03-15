import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import API_BASE_URL from '../api';

const LookupPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [majors, setMajors] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/majors`)
      .then(res => res.json())
      .then(data => setMajors(data))
      .catch(err => console.error("Error fetching majors:", err));
  }, []);

  const normalize = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  
  const filteredMajors = majors.filter(m => 
    normalize(m.name).includes(normalize(searchTerm)) || 
    m.id.includes(searchTerm)
  );

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
      <Navbar />
      <main className="max-w-[1200px] mx-auto w-full px-4 py-8 flex-1">
        <div className="flex flex-col gap-3 mb-8">
          <div className="flex items-center gap-2 text-primary font-semibold text-sm">
            <span className="material-symbols-outlined text-sm">info</span>
            <span>Cổng thông tin tuyển sinh 2024</span>
          </div>
          <h1 className="text-slate-900 dark:text-slate-100 text-4xl font-black leading-tight tracking-tight">Thông tin Tuyển sinh</h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl">Tra cứu mã ngành, chỉ tiêu, tổ hợp xét tuyển và điểm chuẩn qua các năm của trường Đại học Vinh.</p>
        </div>

        <div className="mb-6">
          <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto hide-scrollbar">
            <button className="flex flex-col items-center justify-center border-b-[3px] border-primary text-primary px-6 pb-3 whitespace-nowrap font-bold tracking-wide">
              Danh sách Ngành
            </button>
            <button className="flex flex-col items-center justify-center border-b-[3px] border-transparent text-slate-500 dark:text-slate-400 hover:text-primary px-6 pb-3 whitespace-nowrap transition-all font-bold tracking-wide">
              Điểm chuẩn
            </button>
            <button className="flex flex-col items-center justify-center border-b-[3px] border-transparent text-slate-500 dark:text-slate-400 hover:text-primary px-6 pb-3 whitespace-nowrap transition-all font-bold tracking-wide">
              Phương thức Xét tuyển
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm mb-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-6">
              <label className="flex items-center w-full h-12 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 focus-within:border-primary transition-colors">
                <span className="material-symbols-outlined text-slate-400 mr-2">search</span>
                <input 
                  className="w-full bg-transparent border-none focus:ring-0 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 outline-none" 
                  placeholder="Tìm theo tên ngành hoặc mã ngành..." 
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </label>
            </div>
            <div className="md:col-span-3">
              <select className="w-full h-12 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 text-slate-600 dark:text-slate-300 focus:ring-primary focus:border-primary outline-none">
                <option value="">Tất cả Khối/Tổ hợp</option>
                <option value="A00">A00 (Toán, Lý, Hóa)</option>
                <option value="A01">A01 (Toán, Lý, Anh)</option>
                <option value="B00">B00 (Toán, Hóa, Sinh)</option>
                <option value="C00">C00 (Văn, Sử, Địa)</option>
                <option value="D01">D01 (Toán, Văn, Anh)</option>
              </select>
            </div>
            <div className="md:col-span-3">
              <select className="w-full h-12 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 text-slate-600 dark:text-slate-300 focus:ring-primary focus:border-primary outline-none">
                <option value="">Lĩnh vực đào tạo</option>
                <option value="su-pham">Sư phạm</option>
                <option value="ky-thuat">Kỹ thuật &amp; Công nghệ</option>
                <option value="kinh-te">Kinh tế &amp; Quản lý</option>
                <option value="luat">Luật</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Mã ngành</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Tên Ngành Đào Tạo</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Tổ hợp môn</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-center">Chỉ tiêu</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-center">Điểm 2023</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-center">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {filteredMajors.length > 0 ? filteredMajors.map((major) => (
                  <tr key={major.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 font-mono text-sm text-primary font-bold">{major.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-900 dark:text-slate-100">{major.name}</span>
                        <span className="text-xs text-slate-500">{major.school}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {major.combinations.map(c => (
                          <span key={c} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 rounded text-xs">{c}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center text-sm font-medium">{major.quota}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center bg-primary/10 text-primary font-bold px-3 py-1 rounded-full text-sm">{major.score}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="text-slate-400 hover:text-primary">
                        <span className="material-symbols-outlined">visibility</span>
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-10 text-center text-slate-500">
                      Không tìm thấy ngành học nào phù hợp với tìm kiếm của bạn.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
            <p className="text-sm text-slate-500 dark:text-slate-400">Đang hiển thị <span className="font-medium">1-5</span> trong số <span className="font-medium">42</span> ngành</p>
            <div className="flex gap-2">
              <button className="p-2 rounded border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50" disabled>
                <span className="material-symbols-outlined text-sm">chevron_left</span>
              </button>
              <button className="px-3 py-1 rounded bg-primary text-white text-sm font-bold">1</button>
              <button className="px-3 py-1 rounded border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm">2</button>
              <button className="px-3 py-1 rounded border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm">3</button>
              <button className="p-2 rounded border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800">
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LookupPage;
