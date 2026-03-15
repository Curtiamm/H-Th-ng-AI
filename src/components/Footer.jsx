import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-background-dark text-slate-300 px-6 lg:px-20 py-12">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-3 text-white mb-6">
            <div className="size-8 flex items-center justify-center bg-primary rounded-lg">
              <span className="material-symbols-outlined text-white">school</span>
            </div>
            <h2 className="text-xl font-bold">Trường Đại học Vinh</h2>
          </div>
          <p className="mb-4 text-slate-400 max-w-md">Cơ sở đào tạo đa ngành, trung tâm nghiên cứu khoa học và chuyển giao công nghệ hàng đầu tại khu vực Bắc Trung Bộ.</p>
          <div className="flex gap-4">
            <a className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors" href="#"><span className="material-symbols-outlined">public</span></a>
            <a className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors" href="#"><span className="material-symbols-outlined">share</span></a>
            <a className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors" href="#"><span className="material-symbols-outlined">mail</span></a>
          </div>
        </div>
        <div>
          <h3 className="text-white font-bold mb-6">Liên hệ Tuyển sinh</h3>
          <ul className="flex flex-col gap-3 text-sm">
            <li className="flex items-start gap-2"><span className="material-symbols-outlined text-primary text-sm">location_on</span><span>182 Lê Duẩn, TP. Vinh, tỉnh Nghệ An</span></li>
            <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-sm">call</span><span>(0238) 3855 452</span></li>
            <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-sm">alternate_email</span><span>vinhuni@vinhuni.edu.vn</span></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-bold mb-6">Liên kết nhanh</h3>
          <ul className="flex flex-col gap-3 text-sm">
            <li><a className="hover:text-primary transition-colors" href="#">Cổng thông tin sinh viên</a></li>
            <li><a className="hover:text-primary transition-colors" href="#">Lịch công tác tuần</a></li>
            <li><a className="hover:text-primary transition-colors" href="#">Thư viện số</a></li>
            <li><a className="hover:text-primary transition-colors" href="#">Hệ thống LMS</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 mt-12 pt-8 text-center text-xs text-slate-500">
        <p>© 2024 Trường Đại học Vinh. All rights reserved. Phát triển bởi Trung tâm CNTT.</p>
      </div>
    </footer>
  );
};

export default Footer;
