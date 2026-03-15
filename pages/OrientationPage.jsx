import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';

const OrientationPage = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') || 'interest';
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);

  const questions = {
    interest: [
      { id: 1, text: "Bạn cảm thấy hứng thú nhất khi làm việc với điều gì?", options: ["Máy móc & Công nghệ", "Con người & Xã hội", "Số liệu & Logic", "Nghệ thuật & Sáng tạo"] },
      { id: 2, text: "Bạn thường dành thời gian rảnh để làm gì?", options: ["Sửa chữa đồ đạc, lập trình", "Gặp gỡ, giúp đỡ mọi người", "Giải đố, đọc sách tri thức", "Vẽ vời, viết lách, chơi nhạc"] },
      { id: 3, text: "Môi trường làm việc lý tưởng của bạn là?", options: ["Văn phòng hiện đại, labs", "Cộng đồng, trường học, bệnh viện", "Phòng nghiên cứu, phân tích", "Studio, không gian mở sáng tạo"] },
    ],
    ability: [
      { id: 1, text: "Môn học nào bạn tự tin nhất ở trường?", options: ["Toán & Lý", "Ngữ văn & Ngoại ngữ", "Sinh & Hóa", "Lịch sử & Địa lý"] },
      { id: 2, text: "Kỹ năng nào bạn cảm thấy mình nổi trội nhất?", options: ["Tư vấn & Thuyết phục", "Phân tích & Tính toán", "Lắp ráp & Kỹ thuật", "Lập kế hoạch & Quản lý"] },
      { id: 3, text: "Bạn xử lý vấn đề khó khăn như thế nào?", options: ["Dùng logic và dữ liệu", "Lắng nghe ý kiến và thấu cảm", "Thực hành và thử sai", "Tìm cách tiếp cận mới lạ"] },
    ]
  };

  const currentQuestions = questions[type] || questions.interest;

  const handleSelect = (option) => {
    setAnswers({ ...answers, [step]: option });
    if (step < currentQuestions.length - 1) {
      setStep(step + 1);
    } else {
      setIsFinished(true);
    }
  };

  const resetSurvey = () => {
    setStep(0);
    setAnswers({});
    setIsFinished(false);
  };

  useEffect(() => {
    resetSurvey();
  }, [type]);

  const getResult = () => {
    // Basic logic for demonstration
    if (type === 'interest') {
      if (answers[0] === "Máy móc & Công nghệ") return "Kỹ thuật & Công nghệ";
      if (answers[0] === "Con người & Xã hội") return "Sư phạm & Xã hội";
      if (answers[0] === "Số liệu & Logic") return "Kinh tế & Quản lý";
      return "Nghệ thuật & Ngôn ngữ";
    } else {
      if (answers[0] === "Toán & Lý") return "Kỹ thuật & Công nghệ";
      if (answers[0] === "Ngữ văn & Ngoại ngữ") return "Sư phạm & Xã hội";
      return "Khoa học Tự nhiên";
    }
  };

  useEffect(() => {
    if (isFinished) {
      localStorage.setItem('orientation_result', getResult());
    }
  }, [isFinished, answers, type]);

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
      <Navbar />
      <main className="max-w-[800px] mx-auto w-full px-6 py-12 flex-1 flex flex-col items-center">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full mb-4">
            <span className="material-symbols-outlined text-primary text-sm">
              {type === 'interest' ? 'favorite' : 'task_alt'}
            </span>
            <span className="text-primary text-xs font-bold uppercase tracking-widest">
              Khảo sát {type === 'interest' ? 'Sở thích' : 'Năng lực'}
            </span>
          </div>
          <h1 className="text-4xl font-black tracking-tight mb-4">
            Định hướng Ngành học
          </h1>
          <p className="text-slate-500 max-w-md mx-auto">
            Dành 1 phút để nhận được gợi ý ngành học phù hợp nhất với bản thân bạn tại Đại học Vinh.
          </p>
        </div>

        <div className="w-full bg-white dark:bg-slate-900 rounded-3xl p-8 lg:p-12 shadow-xl border border-primary/5 min-h-[400px] flex flex-col justify-center relative overflow-hidden">
          <AnimatePresence mode="wait">
            {!isFinished ? (
              <motion.div 
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-8"
              >
                <div className="flex flex-col gap-2">
                  <span className="text-primary font-bold text-sm">Câu hỏi {step + 1}/{currentQuestions.length}</span>
                  <h3 className="text-2xl font-bold">{currentQuestions[step].text}</h3>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {currentQuestions[step].options.map((option, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelect(option)}
                      className="group flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-primary hover:bg-primary/5 transition-all text-left"
                    >
                      <span className="font-medium group-hover:text-primary">{option}</span>
                      <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-transform group-hover:translate-x-1">arrow_forward</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center gap-6"
              >
                <div className="size-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-2">
                  <span className="material-symbols-outlined text-5xl">celebration</span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-bold">Hoàn thành khảo sát!</h3>
                  <p className="text-slate-500">Dựa trên câu trả lời của bạn, Heulwen AI gợi ý bạn nên tìm hiểu:</p>
                </div>
                <div className="bg-primary/5 border border-primary/20 p-6 rounded-2xl w-full">
                  <span className="text-xl font-black text-primary uppercase tracking-tight">{getResult()}</span>
                </div>
                <div className="flex gap-4">
                  <button onClick={resetSurvey} className="px-6 py-3 rounded-xl border border-slate-200 font-bold hover:bg-slate-50 transition-all">Làm lại</button>
                  <Link to="/chat" className="px-6 py-3 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">Chat với AI tư vấn</Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progress bar */}
          {!isFinished && (
            <div className="absolute bottom-0 left-0 h-1.5 bg-slate-100 dark:bg-slate-800 w-full">
              <motion.div 
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${((step + 1) / currentQuestions.length) * 100}%` }}
              />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrientationPage;
