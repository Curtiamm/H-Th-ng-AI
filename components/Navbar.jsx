import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-primary/10 px-6 py-4 lg:px-20 bg-background-light/80 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-3 text-primary">
        <Link to="/" className="flex items-center gap-3">
          <div className="size-8 flex items-center justify-center bg-primary rounded-lg text-white">
            <span className="material-symbols-outlined">school</span>
          </div>
          <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-tight">Đại học Vinh</h2>
        </Link>
      </div>
      <div className="flex flex-1 justify-end gap-8 items-center">
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-slate-700 dark:text-slate-200 text-sm font-medium hover:text-primary transition-colors">Trang chủ</Link>
          <Link to="/lookup" className="text-slate-700 dark:text-slate-200 text-sm font-medium hover:text-primary transition-colors">Ngành đào tạo</Link>
          
          <div className="relative group">
            <button className="flex items-center gap-1 text-slate-700 dark:text-slate-200 text-sm font-medium group-hover:text-primary transition-colors py-2">
              Định Hướng Ngành Học
              <span className="material-symbols-outlined text-sm transition-transform group-hover:rotate-180">expand_more</span>
            </button>
            <div className="absolute top-full left-0 mt-0 w-56 rounded-xl bg-white dark:bg-slate-900 shadow-xl border border-primary/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 py-2">
              <Link to="/orientation?type=interest" className="flex items-center gap-3 px-4 py-3 hover:bg-primary/5 text-slate-700 dark:text-slate-300 transition-colors">
                <span className="material-symbols-outlined text-primary">favorite</span>
                <div className="flex flex-col">
                  <span className="text-sm font-bold">Theo sở thích</span>
                  <span className="text-[10px] text-slate-500">Khám phá đam mê của bạn</span>
                </div>
              </Link>
              <Link to="/orientation?type=ability" className="flex items-center gap-3 px-4 py-3 hover:bg-primary/5 text-slate-700 dark:text-slate-300 transition-colors">
                <span className="material-symbols-outlined text-primary">task_alt</span>
                <div className="flex flex-col">
                  <span className="text-sm font-bold">Theo năng lực</span>
                  <span className="text-[10px] text-slate-500">Đánh giá kỹ năng học thuật</span>
                </div>
              </Link>
            </div>
          </div>

          <a className="text-slate-700 dark:text-slate-200 text-sm font-medium hover:text-primary transition-colors" href="#">Liên hệ</a>
        </nav>
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="flex min-w-[100px] cursor-pointer items-center justify-center rounded-lg h-10 px-5 bg-primary text-white text-sm font-bold transition-transform hover:scale-105 active:scale-95">
            <span>Dashboard</span>
          </Link>
          <div className="hidden sm:block bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary/20" style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDpiE0CA7tuwOYit1tXCEft4i5TNLWLMLMmNQxmu8xbBvPcxzDCf7xpbHNxVxOQcXd3OHR9Ac0xRiA-v9oJzwoz58PmLHaoU0uHEd5l0ZjvxwOEXnhzM9hiSOIz3OPrezFxyRRNl9aRqvjuQ1y0Oeb4HM6XthDLs7NrMOeGfb71Yplg6c9-sWsqtA-hMRWiRCnJoohzcYsv1NctCgqvKJR97LELfKJq_G6eM98ueRZyDcAk0WgPZo5__U_XVzFEruA6wYg6Idt1a4hr")` }}></div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
