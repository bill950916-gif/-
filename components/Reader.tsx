
import React from 'react';
import { Question } from '../types';
import QuestionItem from './QuestionItem';

interface ReaderProps {
  chapterTitle: string;
  questions: Question[];
  searchTerm: string;
  onClearFilters: () => void;
}

const Reader: React.FC<ReaderProps> = ({ chapterTitle, questions, searchTerm, onClearFilters }) => {
  if (questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-400 bg-white rounded-3xl border border-dashed border-slate-200">
        <div className="p-4 bg-slate-50 rounded-full mb-4">
          <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <p className="text-lg font-medium text-slate-600">查無結果</p>
        <p className="text-sm mt-1">請嘗試變更搜尋條件或篩選項目</p>
        <button 
          onClick={onClearFilters}
          className="mt-6 px-6 py-2 bg-slate-800 text-white rounded-full text-sm font-bold hover:bg-slate-700 transition-all shadow-lg shadow-slate-200"
        >
          重設所有條件
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid gap-6">
        {questions.map((question, idx) => (
          <QuestionItem 
            key={question.id} 
            question={question} 
            index={idx + 1}
            chapterTitle={chapterTitle}
          />
        ))}
      </div>
      
      <div className="pt-12 pb-24 text-center">
        <div className="inline-flex items-center space-x-3 text-slate-300">
          <div className="w-16 h-px bg-slate-200"></div>
          <span className="text-xs font-serif italic tracking-widest text-slate-400 uppercase">End of Section</span>
          <div className="w-16 h-px bg-slate-200"></div>
        </div>
      </div>
    </div>
  );
};

export default Reader;
