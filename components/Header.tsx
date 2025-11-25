import React from 'react';

interface Props {
  onOpenHistory: () => void;
  activeTab: 'new' | 'history';
}

const Header: React.FC<Props> = ({ onOpenHistory, activeTab }) => {
  return (
    <div className="bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div>
            <h1 className="text-2xl font-bold text-primary-600">Kichban AI</h1>
            <p className="text-xs text-slate-500">Trợ lý sáng tạo kịch bản đa năng</p>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex gap-6 mt-2">
          <button 
            className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
                activeTab === 'new' 
                ? 'text-primary-600 border-primary-600' 
                : 'text-slate-500 hover:text-slate-700 border-transparent hover:border-slate-300'
            }`}
          >
            Viết Kịch bản Mới
          </button>
          <button 
            onClick={onOpenHistory}
            className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
                activeTab === 'history' 
                ? 'text-primary-600 border-primary-600' 
                : 'text-slate-500 hover:text-slate-700 border-transparent hover:border-slate-300'
            }`}
          >
            Lịch sử
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;