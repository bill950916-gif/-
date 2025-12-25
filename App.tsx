
import React, { useState, useMemo } from 'react';
import { QUESTION_BANK } from './data/questions';
import Sidebar from './components/Sidebar';
import Reader from './components/Reader';
import FilterBar from './components/FilterBar';
import DifficultyGuide from './components/DifficultyGuide';
import { Chapter, Difficulty } from './types';

const App: React.FC = () => {
  const [activeChapterIndex, setActiveChapterIndex] = useState<number | 'all'>(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  // Extract all unique categories across all chapters
  const allCategories = useMemo(() => {
    const categories = new Set<string>();
    QUESTION_BANK.forEach(chapter => {
      chapter.questions.forEach(q => categories.add(q.category));
    });
    return Array.from(categories);
  }, []);

  // Compute final filtered list
  const filteredQuestions = useMemo(() => {
    let questions = activeChapterIndex === 'all' 
      ? QUESTION_BANK.flatMap(c => c.questions)
      : QUESTION_BANK[activeChapterIndex].questions;

    // Filter by Search Term
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      questions = questions.filter(q => 
        q.text.toLowerCase().includes(lowerSearch) || 
        Object.values(q.options).some(opt => opt.toLowerCase().includes(lowerSearch))
      );
    }

    // Filter by Difficulty
    if (selectedDifficulty !== 'all') {
      questions = questions.filter(q => q.difficulty === selectedDifficulty);
    }

    // Filter by Category
    if (selectedCategory !== 'all') {
      questions = questions.filter(q => q.category === selectedCategory);
    }

    return questions;
  }, [activeChapterIndex, searchTerm, selectedDifficulty, selectedCategory]);

  const activeChapterTitle = activeChapterIndex === 'all' 
    ? '全部題庫' 
    : QUESTION_BANK[activeChapterIndex].title;

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Difficulty Guide Modal */}
      <DifficultyGuide isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />

      {/* Sidebar Navigation */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out bg-white border-r border-slate-200
        md:relative md:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <Sidebar 
          chapters={QUESTION_BANK} 
          activeChapterIndex={activeChapterIndex}
          onChapterSelect={(idx) => {
            setActiveChapterIndex(idx);
            setIsSidebarOpen(false);
          }}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200 shrink-0">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 -ml-2 text-slate-500 md:hidden hover:bg-slate-100 rounded-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
            <h1 className="text-xl font-bold text-slate-800 serif-font md:text-2xl truncate max-w-[12rem] sm:max-w-none">
              {activeChapterTitle}
            </h1>
          </div>
          
          <div className="relative w-40 sm:w-72">
            <input
              type="text"
              placeholder="搜尋題目或關鍵字..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2 pl-9 pr-4 text-sm bg-slate-100 border border-transparent rounded-full focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all"
            />
            <svg className="absolute w-4 h-4 text-slate-400 left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </header>

        {/* Filters and Reader */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="max-w-5xl mx-auto">
            <FilterBar 
              categories={allCategories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedDifficulty={selectedDifficulty}
              onDifficultyChange={setSelectedDifficulty}
              onOpenGuide={() => setIsGuideOpen(true)}
            />
            
            <Reader 
              chapterTitle={activeChapterTitle}
              questions={filteredQuestions} 
              searchTerm={searchTerm}
              onClearFilters={() => {
                setSearchTerm('');
                setSelectedDifficulty('all');
                setSelectedCategory('all');
              }}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
