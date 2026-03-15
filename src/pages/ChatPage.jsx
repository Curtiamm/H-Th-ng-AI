import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';

import API_BASE_URL from '../api';

const API_URL = API_BASE_URL;

const ChatPage = () => {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('heulwen_chat_history');
    return saved ? JSON.parse(saved) : [
      { role: 'assistant', content: 'Xin chào! Mình là trợ lý ảo của Đại học Vinh. Rất vui được hỗ trợ bạn trong kỳ tuyển sinh năm nay. Bạn cần tìm hiểu về ngành học, học phí hay thông tin xét tuyển nào không?' }
    ];
  });
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    localStorage.setItem('heulwen_chat_history', JSON.stringify(messages));
  }, [messages]);

  const handleSend = async (customMessage = null) => {
    const messageContent = customMessage || input;
    if (!messageContent.trim() || isLoading) return;

    const userMessage = { role: 'user', content: messageContent };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/chat`, {
        message: messageContent,
        history: messages.slice(-5)
      });
      setMessages(prev => [...prev, { role: 'assistant', content: response.data.answer }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Có lỗi kết nối hệ thống. Bạn hãy thử lại sau giây lát nhé!' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearHistory = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa lịch sử trò chuyện?')) {
      localStorage.removeItem('heulwen_chat_history');
      setMessages([{ 
        role: 'assistant', 
        content: 'Xin chào! Mình là trợ lý ảo của Đại học Vinh. Rất vui được hỗ trợ bạn trong kỳ tuyển sinh năm nay. Bạn cần tìm hiểu về ngành học, học phí hay thông tin xét tuyển nào không?' 
      }]);
    }
  };

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-primary/10 bg-white dark:bg-background-dark/50 px-6 py-3 shrink-0">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <span className="material-symbols-outlined text-white">school</span>
          </Link>
          <div>
            <h2 className="text-lg font-bold leading-tight tracking-tight">Vinh University</h2>
            <p className="text-xs font-medium text-primary uppercase tracking-wider">Admissions Portal</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center justify-center rounded-full p-2 hover:bg-primary/10 transition-colors text-slate-600 dark:text-slate-300">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="flex items-center justify-center rounded-full p-2 hover:bg-primary/10 transition-colors text-slate-600 dark:text-slate-300">
            <span className="material-symbols-outlined">settings</span>
          </button>
          <div className="h-10 w-10 rounded-full border-2 border-primary/20 bg-slate-200 overflow-hidden shadow-sm">
            <img alt="User" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCh2L8ntajAGZWLbsNnbNkg15pzuHOGqtE7eBagJ0UuBhudFqma2KZqiBFUKJXJGxdKtk8r2qLy-szYNdLAahQnOhniEy1FqtBjBq-PmLByA_ptyleOwGU0LXBsUTAbv4q71WUlxtl6HVvj2jV8YvxbnaDfffJV-aRk_5oocvk5TFw5FNRdDlJlL0ahKO-7UsfTydYc7lAlpFZIzdeESIe7U421iDZP4Xps-THLgJLUwmAI2O1x70kPOwkevTVoV2VwpV76FxIUUI6I"/>
          </div>
        </div>
      </header>

      <main className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden md:flex w-72 flex-col border-r border-primary/10 bg-white dark:bg-background-dark/30 p-4">
          <div className="mb-8 flex flex-col gap-2">
            <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 px-2">VinhUni AI</h1>
            <p className="text-sm font-normal text-slate-500 dark:text-slate-400 px-2 leading-tight">Trợ lý Tuyển sinh 24/7</p>
          </div>
          <div className="flex flex-col gap-1 grow">
            <p className="px-2 pb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Navigation</p>
            <Link to="/lookup" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-primary/5 transition-all">
              <span className="material-symbols-outlined text-xl">school</span>
              <span className="text-sm">Ngành đào tạo</span>
            </Link>
            <a className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-primary/5 transition-all" href="#">
              <span className="material-symbols-outlined text-xl">payments</span>
              <span className="text-sm">Học phí</span>
            </a>
            <a className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-primary/5 transition-all" href="#">
              <span className="material-symbols-outlined text-xl">verified</span>
              <span className="text-sm">Cách thức đăng ký</span>
            </a>
            <div className="mt-8">
              <p className="px-2 pb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Hoạt động</p>
              <div className="flex flex-col gap-1">
                <button onClick={clearHistory} className="text-left text-xs text-red-500 hover:bg-red-50 px-3 py-2 rounded-lg truncate flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">delete</span>
                  Xóa lịch sử
                </button>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setMessages([{ role: 'assistant', content: 'Xin chào! Mình có thể giúp gì cho bạn?' }])}
            className="mt-auto flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-lg font-bold">add</span>
            <span>Hội thoại mới</span>
          </button>
        </aside>

        {/* Chat Window */}
        <section className="flex flex-1 flex-col bg-background-light dark:bg-background-dark relative">
          {/* Message Area */}
          <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 hide-scrollbar">
            {messages.map((msg, i) => (
              <div key={i} className={`flex items-start gap-4 max-w-3xl ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${msg.role === 'assistant' ? 'bg-primary/10 text-primary' : 'bg-slate-200 border-2 border-white overflow-hidden'}`}>
                  {msg.role === 'assistant' ? (
                    <span className="material-symbols-outlined">smart_toy</span>
                  ) : (
                    <img alt="User" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMqnO1lBEWuljByYIxH_guo2zw9weVksCPJ01ggsc7svZCqGf8u08XTygHZknQx9sLcRPMxclMCyDYn4JffYwyefFpqtpupGn3MXn4cJwEGiruYe0EBIBIaWMacqoqS5dj0iGGFQk7hdBXi4i55g01VC9bfgyYrNeacQstJPyYnt-ktglj6pUfSTWw64gYU6LmDZV5YKQEa0yc1LdU5TgQ_q9QdhslI7YyI4B89etjkP9Dul9q4FX8591U8puEpxDC80WRZnphjYBg"/>
                  )}
                </div>
                <div className={`flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : ''}`}>
                  <span className="text-[11px] font-bold text-slate-400 uppercase px-1">
                    {msg.role === 'assistant' ? 'AI VinhUni' : 'Thí sinh'}
                  </span>
                  <div className={`rounded-2xl p-4 shadow-sm border border-primary/5 leading-relaxed ${
                    msg.role === 'assistant' 
                    ? 'rounded-tl-none bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200' 
                    : 'rounded-tr-none bg-primary text-white shadow-md'
                  }`}>
                    <ReactMarkdown className="markdown-content">{msg.content}</ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-4 max-w-3xl">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary animate-pulse">
                  <span className="material-symbols-outlined">smart_toy</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">AI VinhUni</span>
                  <div className="rounded-2xl rounded-tl-none bg-white dark:bg-slate-800 p-4 shadow-sm border border-primary/5 flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 md:p-8 bg-gradient-to-t from-background-light dark:from-background-dark via-background-light/95 dark:via-background-dark/95 to-transparent">
            {/* Quick Reply Chips */}
            <div className="mb-4 flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
              {[
                { icon: 'redeem', text: 'Học bổng' },
                { icon: 'event', text: 'Kỳ thi xét tuyển' },
                { icon: 'bed', text: 'Ký túc xá' },
                { icon: 'support_agent', text: 'Liên hệ phòng đào tạo' }
              ].map((chip, i) => (
                <button 
                  key={i} 
                  onClick={() => handleSend(chip.text)}
                  className="flex shrink-0 items-center justify-center gap-2 rounded-full border border-primary/20 bg-white dark:bg-slate-800 px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-primary/5 hover:border-primary/40 transition-all shadow-sm"
                >
                  <span className="material-symbols-outlined text-sm text-primary">{chip.icon}</span>
                  {chip.text}
                </button>
              ))}
            </div>
            {/* Input Box */}
            <div className="relative flex items-center max-w-4xl mx-auto shadow-xl rounded-2xl overflow-hidden ring-1 ring-primary/10 bg-white dark:bg-slate-800">
              <input 
                className="w-full border-none bg-transparent py-5 pl-6 pr-24 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:ring-0 outline-none" 
                placeholder="Nhập câu hỏi của bạn tại đây..." 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <div className="absolute right-3 flex items-center gap-2">
                <button className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all active:scale-95" onClick={() => handleSend()}>
                  <span className="material-symbols-outlined">send</span>
                </button>
              </div>
            </div>
            <p className="text-center text-[10px] text-slate-400 mt-4 uppercase tracking-widest font-bold">Trợ lý Tuyển sinh Chính thức • ĐẠI HỌC VINH</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ChatPage;
