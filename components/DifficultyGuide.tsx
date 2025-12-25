
import React from 'react';

interface DifficultyGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

const DifficultyGuide: React.FC<DifficultyGuideProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const guides = [
    {
      level: '簡單',
      color: 'bg-emerald-500',
      textColor: 'text-emerald-700',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-100',
      title: '基礎認知與記憶',
      desc: '讀者只要讀過課文，就能直接從原文中找到答案。涉及文學常識（如作者、出處）、直觀情節敘事等基礎資訊。'
    },
    {
      level: '中等',
      color: 'bg-amber-500',
      textColor: 'text-amber-700',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-100',
      title: '理解、分析與應用',
      desc: '需要理解文章脈絡與文言轉譯。涉及分析角色動機（為何這麼做）、辨識寫作特色或敘事邏輯。'
    },
    {
      level: '困難',
      color: 'bg-rose-500',
      textColor: 'text-rose-700',
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-100',
      title: '評價、思辨與歸納',
      desc: '涉及高階思維與鑑別。要求結合歷史背景、儒道思想，對微言大義進行深層結構分析或批判性思考。'
    }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div 
        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center shadow-lg shadow-amber-200">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.443 1.103m-2.454 2.133h.01L12 21" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-slate-800 serif-font">題目難度分級定義</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-200 rounded-full transition-colors"
          >
            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-4">
          {guides.map((g) => (
            <div key={g.level} className={`p-4 rounded-2xl border ${g.bgColor} ${g.borderColor} flex space-x-4`}>
              <div className="flex flex-col items-center shrink-0">
                <span className={`${g.color} text-white text-[10px] font-black px-2 py-0.5 rounded-md mb-1 shadow-sm`}>
                  {g.level}
                </span>
              </div>
              <div>
                <h3 className={`text-sm font-bold ${g.textColor} mb-1`}>{g.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {g.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-slate-800 text-white text-sm font-bold rounded-full hover:bg-slate-700 transition-all shadow-lg shadow-slate-200"
          >
            瞭解了
          </button>
        </div>
      </div>
    </div>
  );
};

export default DifficultyGuide;
