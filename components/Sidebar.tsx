
import React from 'react';
import { Chapter } from '../types';

interface SidebarProps {
  chapters: Chapter[];
  activeChapterIndex: number | 'all';
  onChapterSelect: (index: number | 'all') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ chapters, activeChapterIndex, onChapterSelect }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="px-6 py-8 border-b border-slate-100">
        <div className="flex items-center space-x-2 text-amber-700">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 4.804A7.994 7.994 0 0111 4c1.104 0 2.12.224 3.036.626C14.057 4.637 14 4.654 14 4.673V13.8a7.994 7.994 0 00-2-1.2c-.93-.418-1.947-.6-3-.6V4.804zM2 4.673C2 4.654 1.943 4.637 1.964 4.626A7.994 7.994 0 015 4c1.104 0 2.12.224 3.036.626V12c-1.053 0-2.07.182-3 .6A7.994 7.994 0 002 13.8V4.673zM18 4.673c0-.019.057-.036.036-.047A7.994 7.994 0 0015 4c-1.104 0-2.12.224-3.036.626V12c1.053 0 2.07.182 3 .6A7.994 7.994 0 0118 13.8V4.673z" />
          </svg>
          <span className="text-xl font-bold serif-font tracking-tight">古文電子課本</span>
        </div>
        <p className="mt-1 text-[10px] text-slate-400 uppercase tracking-[0.2em] font-bold">Smart Textbook</p>
      </div>

      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <div className="space-y-1">
          {/* All Chapters Link */}
          <button
            onClick={() => onChapterSelect('all')}
            className={`
              w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all duration-200 flex items-center space-x-3
              ${activeChapterIndex === 'all' 
                ? 'bg-slate-800 text-white shadow-lg shadow-slate-200' 
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
            `}
          >
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span className="font-bold">顯示全部篇章</span>
          </button>

          <div className="py-2">
            <div className="h-px bg-slate-100 mx-2 mb-2" />
            <p className="px-3 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">章節選單</p>
          </div>

          {chapters.map((chapter, index) => (
            <button
              key={index}
              onClick={() => onChapterSelect(index)}
              className={`
                w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all duration-200 flex items-start space-x-3
                ${activeChapterIndex === index 
                  ? 'bg-amber-50 text-amber-900 font-medium border-l-4 border-amber-500 pl-2' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
              `}
            >
              <span className={`shrink-0 mt-0.5 w-5 h-5 flex items-center justify-center rounded text-[10px] font-bold transition-colors ${
                activeChapterIndex === index ? 'bg-amber-200 text-amber-900' : 'bg-slate-100 text-slate-500'
              }`}>
                {index + 1}
              </span>
              <div className="flex flex-col">
                <span className="serif-font leading-tight">{chapter.title}</span>
                <span className="text-[10px] opacity-60 mt-0.5 font-medium">範圍：{chapter.range}</span>
              </div>
            </button>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center space-x-2 mb-1.5">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">AI 輔助模式已啟動</p>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            系統會自動為您分析錯題並生成深度詳解。
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
