
import React from 'react';
import { Difficulty } from '../types';

interface FilterBarProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedDifficulty: Difficulty | 'all';
  onDifficultyChange: (difficulty: Difficulty | 'all') => void;
  onOpenGuide: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  selectedDifficulty,
  onDifficultyChange,
  onOpenGuide
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 py-4 px-4 sm:px-0 border-b border-slate-100 mb-6 overflow-x-auto no-scrollbar">
      {/* Category Filter */}
      <div className="flex items-center space-x-2 shrink-0">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">類型：</span>
        <div className="flex gap-1">
          <button
            onClick={() => onCategoryChange('all')}
            className={`px-3 py-1 text-xs rounded-full transition-all ${
              selectedCategory === 'all'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-amber-200'
            }`}
          >
            全部
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`px-3 py-1 text-xs rounded-full transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-amber-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Vertical Divider for Desktop */}
      <div className="hidden sm:block w-px h-4 bg-slate-200" />

      {/* Difficulty Filter */}
      <div className="flex items-center space-x-2 shrink-0">
        <div className="flex items-center space-x-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">難度：</span>
          <button 
            onClick={onOpenGuide}
            className="p-1 text-slate-400 hover:text-amber-600 transition-colors group relative"
            title="查看分級說明"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.443 1.103m-2.454 2.133h.01L12 21" />
            </svg>
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">分級說明</span>
          </button>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => onDifficultyChange('all')}
            className={`px-3 py-1 text-xs rounded-full transition-all ${
              selectedDifficulty === 'all'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
            }`}
          >
            全部
          </button>
          <button
            onClick={() => onDifficultyChange('easy')}
            className={`px-3 py-1 text-xs rounded-full transition-all ${
              selectedDifficulty === 'easy'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-emerald-200'
            }`}
          >
            簡單
          </button>
          <button
            onClick={() => onDifficultyChange('medium')}
            className={`px-3 py-1 text-xs rounded-full transition-all ${
              selectedDifficulty === 'medium'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-amber-200'
            }`}
          >
            中等
          </button>
          <button
            onClick={() => onDifficultyChange('hard')}
            className={`px-3 py-1 text-xs rounded-full transition-all ${
              selectedDifficulty === 'hard'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-rose-200'
            }`}
          >
            困難
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
