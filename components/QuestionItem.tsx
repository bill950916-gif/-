
import React, { useState } from 'react';
import { Question, Difficulty } from '../types';
import { getQuestionExplanation } from '../services/geminiService';

interface QuestionItemProps {
  question: Question;
  index: number;
  chapterTitle: string;
}

const DifficultyBadge: React.FC<{ level: Difficulty }> = ({ level }) => {
  const configs = {
    easy: { label: '簡單', class: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
    medium: { label: '中等', class: 'bg-amber-50 text-amber-700 border-amber-100' },
    hard: { label: '困難', class: 'bg-rose-50 text-rose-700 border-rose-100' },
  };
  const config = configs[level];
  return (
    <span className={`px-2 py-0.5 text-[10px] font-bold border rounded-md uppercase ${config.class}`}>
      {config.label}
    </span>
  );
};

const QuestionItem: React.FC<QuestionItemProps> = ({ question, index, chapterTitle }) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [explanation, setExplanation] = useState<{ text: string; loading: boolean; error?: string } | null>(null);

  const handleGetExplanation = async () => {
    if (explanation?.text) {
      setExplanation(null); // Simple toggle
      return;
    }

    setExplanation({ text: '', loading: true });
    try {
      const text = await getQuestionExplanation(question, chapterTitle);
      setExplanation({ text, loading: false });
      setShowAnswer(true);
    } catch (err: any) {
      setExplanation({ text: '', loading: false, error: err.message });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden transition-all hover:shadow-md hover:border-amber-200/50 group">
      <div className="p-6 sm:p-8">
        <div className="flex items-start space-x-4">
          <div className="flex flex-col items-center space-y-2">
            <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-slate-800 text-white text-sm font-bold shadow-md">
              {question.id}
            </span>
            <div className="w-px h-full bg-slate-100 min-h-[1.5rem]" />
          </div>
          
          <div className="flex-1 space-y-4">
            {/* Meta tags */}
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 text-[10px] font-bold bg-slate-100 text-slate-500 rounded-md border border-slate-200 uppercase tracking-tight">
                {question.category}
              </span>
              <DifficultyBadge level={question.difficulty} />
            </div>

            {/* Question Text */}
            <h3 className="text-lg sm:text-xl font-bold text-slate-800 leading-relaxed serif-font">
              {question.text}
            </h3>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {Object.entries(question.options).map(([key, value]) => (
                <div 
                  key={key}
                  className={`
                    flex items-center p-3.5 rounded-xl border text-sm transition-all cursor-pointer
                    ${showAnswer && key === question.answer 
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-900 ring-4 ring-emerald-500/5 shadow-sm' 
                      : 'bg-slate-50/50 border-slate-100 text-slate-700 hover:bg-slate-50'}
                  `}
                  onClick={() => !showAnswer && setShowAnswer(true)}
                >
                  <span className={`
                    w-7 h-7 flex items-center justify-center rounded-lg mr-3 text-xs font-black shrink-0 transition-colors
                    ${showAnswer && key === question.answer ? 'bg-emerald-500 text-white shadow-sm' : 'bg-white text-slate-400 border border-slate-200 group-hover:border-amber-300'}
                  `}>
                    {key}
                  </span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-slate-50">
              <button
                onClick={() => setShowAnswer(!showAnswer)}
                className={`
                  px-5 py-2 rounded-full text-xs font-bold transition-all
                  ${showAnswer 
                    ? 'bg-slate-800 text-white hover:bg-slate-700 shadow-md' 
                    : 'bg-white border border-slate-300 text-slate-600 hover:border-slate-800 hover:text-slate-800'}
                `}
              >
                {showAnswer ? '隱藏解答' : '顯示解答'}
              </button>
              
              <button
                onClick={handleGetExplanation}
                disabled={explanation?.loading}
                className={`
                  flex items-center px-5 py-2 rounded-full text-xs font-bold transition-all
                  ${explanation?.text 
                    ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' 
                    : 'bg-amber-600 text-white hover:bg-amber-700 shadow-lg shadow-amber-200'}
                  disabled:opacity-50
                `}
              >
                {explanation?.loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    思考中...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    {explanation?.text ? '隱藏 AI 詳解' : 'AI 深度詳解'}
                  </>
                )}
              </button>

              {showAnswer && (
                <div className="ml-auto flex items-center space-x-2 animate-in slide-in-from-right-2 duration-300">
                  <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">正確解答</span>
                  <span className="text-lg font-black bg-emerald-500 text-white w-9 h-9 flex items-center justify-center rounded-xl shadow-lg shadow-emerald-200">{question.answer}</span>
                </div>
              )}
            </div>

            {/* Explanation Area */}
            {explanation?.error && (
              <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 text-xs font-medium">
                <span className="font-bold">連線異常：</span> {explanation.error}
              </div>
            )}

            {explanation?.text && (
              <div className="relative p-6 bg-amber-50/50 rounded-2xl border border-amber-100 animate-in fade-in slide-in-from-top-2 duration-500 mt-4">
                <div className="absolute -top-3 left-6 px-3 py-1 bg-amber-600 text-white text-[10px] font-bold rounded-full uppercase tracking-widest shadow-sm">
                  Gemini AI Tutor
                </div>
                <div className="prose prose-slate prose-sm max-w-none text-slate-700 leading-relaxed whitespace-pre-wrap font-medium">
                  {explanation.text}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionItem;
