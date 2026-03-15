import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <div className="px-6 lg:px-20 py-8 lg:py-12">
          <div className="relative overflow-hidden rounded-xl bg-slate-900 min-h-[520px] flex items-center">
            <div 
              className="absolute inset-0 opacity-50 bg-cover bg-center" 
              style={{ backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8) 30%, transparent 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDMRJi41Mz6TDbbRkCer3GrITNWnbDgVYeLzXG2ddouvbmYpTtCMm7nyxOwuAl-ltRp_4rgIAWxIc6_bfA95sOzykr5ZeZX_Ftq5MvFDd8PRhZq69-PstiN1RgLWQ56WrMKQDL_312jz2cZI4Kq03rpJ6tekIkzWAcaJQn7Ldk-j0mRYPgCpEIJYT3TXIW02tW8457lkqIikRDOMjnS84lfD2pdIPM9g5PToYW4dcHjncrc5cqi-A85OUnIQ0hft0TjLAjejL49nKsy")` }}
            ></div>
            <div className="relative z-10 px-8 lg:px-16 max-w-3xl flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm border border-primary/30 px-3 py-1 rounded-full w-fit">
                <span className="material-symbols-outlined text-primary text-sm">smart_toy</span>
                <span className="text-primary text-xs font-bold uppercase tracking-wider">AI Assistant Integration</span>
              </div>
              <h1 className="text-white text-4xl lg:text-6xl font-black leading-tight tracking-tight">
                Hệ thống Tư vấn Tuyển sinh Thông minh
              </h1>
              <p className="text-slate-200 text-lg lg:text-xl font-normal max-w-2xl">
                Khám phá hành trình tri thức tại Đại học Vinh với sự hỗ trợ từ AI Heulwen thông minh. Giải đáp mọi thắc mắc về tuyển sinh, ngành học và học bổng ngay lập tức.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/chat" className="flex min-w-[180px] cursor-pointer items-center justify-center gap-2 rounded-lg h-14 px-8 bg-primary text-white text-lg font-bold shadow-lg shadow-primary/30 transition-all hover:bg-primary/90 hover:-translate-y-1">
                  <span className="material-symbols-outlined">chat</span>
                  <span>Bắt đầu chat ngay</span>
                </Link>
                <button className="flex min-w-[180px] cursor-pointer items-center justify-center gap-2 rounded-lg h-14 px-8 bg-white/10 backdrop-blur-md border border-white/20 text-white text-lg font-bold transition-all hover:bg-white/20">
                  <span>Tìm hiểu thêm</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="px-6 lg:px-20 py-16 bg-white dark:bg-background-dark/50">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex flex-col gap-4 mb-12 text-center items-center">
              <h2 className="text-slate-900 dark:text-white text-3xl lg:text-4xl font-black tracking-tight max-w-[800px]">
                Công nghệ AI dẫn đầu cho thế hệ sinh viên mới
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg max-w-[720px]">
                Hệ thống tư vấn trực tuyến tích hợp trí tuệ nhân tạo, giúp thí sinh tiếp cận thông tin chính xác, nhanh chóng và cá nhân hóa.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: 'schedule', title: 'Hỗ trợ 24/7', desc: 'Luôn sẵn sàng giải đáp mọi thắc mắc của thí sinh vào bất kỳ thời điểm nào, kể cả ngày lễ và cuối tuần.' },
                { icon: 'verified', title: 'Thông tin chính xác', desc: 'Dữ liệu được cập nhật trực tiếp từ phòng đào tạo về mã ngành, chỉ tiêu và các phương thức xét tuyển mới nhất.' },
                { icon: 'psychology', title: 'Tư vấn cá nhân hóa', desc: 'Phân tích năng lực và sở thích để gợi ý ngành học phù hợp nhất với tiềm năng phát triển của từng bạn.' }
              ].map((feature, i) => (
                <div key={i} className="flex flex-col gap-4 rounded-xl border border-primary/10 bg-background-light dark:bg-background-dark p-8 shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-primary/10 text-primary w-12 h-12 rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-3xl">{feature.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-slate-900 dark:text-white text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mascot Section */}
        <div className="px-6 lg:px-20 py-16">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all"></div>
              <img 
                alt="VinhUni Heulwen - Friendly AI Assistant" 
                className="relative rounded-2xl shadow-2xl w-full object-cover aspect-[4/3]" 
                src="/vinhuni_heulwen.png" 
              />
            </div>
            <div className="flex flex-col gap-6">
              <h2 className="text-slate-900 dark:text-white text-3xl lg:text-4xl font-bold leading-tight">Gặp gỡ VinhUni Heulwen - Người bạn đồng hành thông minh</h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                Không chỉ là một chatbot thông thường, VinhUni Heulwen được huấn luyện với hàng triệu dữ liệu về giáo dục đại học, tâm lý hướng nghiệp và quy chế tuyển sinh. 
              </p>
              <ul className="flex flex-col gap-3">
                {['Giao diện thân thiện, dễ sử dụng', 'Tích hợp đa nền tảng (Web, Facebook, Zalo)', 'Xử lý ngôn ngữ tự nhiên tiếng Việt mượt mà'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                    <span className="material-symbols-outlined text-primary">check_circle</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-4">
                <Link to="/chat" className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-lg transition-all shadow-lg shadow-primary/20">
                  Trò chuyện ngay bây giờ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
