import React from 'react';
import { InputMode } from '../types';
import { Lightbulb, FileText, Link as LinkIcon } from 'lucide-react';

interface Props {
  value: string;
  onChange: (val: string) => void;
  mode: InputMode;
  setMode: (mode: InputMode) => void;
}

const InputSection: React.FC<Props> = ({ value, onChange, mode, setMode }) => {
  return (
    <div className="bg-white rounded-2xl shadow-soft border border-slate-200/60 mb-8 overflow-hidden">
      {/* Header / Tabs */}
      <div className="bg-slate-50/50 border-b border-slate-100 px-2 pt-2">
        <div className="flex space-x-1">
          <button
            onClick={() => setMode(InputMode.IDEA)}
            className={`
              flex items-center gap-2 px-6 py-3 text-sm font-bold rounded-t-xl transition-all duration-200
              ${mode === InputMode.IDEA
                ? 'bg-white text-primary-600 shadow-[0_-2px_10px_rgba(0,0,0,0.02)] border-t border-l border-r border-slate-100'
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100/50'
              }
            `}
          >
            <Lightbulb className={`w-4 h-4 ${mode === InputMode.IDEA ? 'fill-current' : ''}`} />
            Ý tưởng
          </button>
          
          <button
            onClick={() => setMode(InputMode.TEXT)}
            className={`
              flex items-center gap-2 px-6 py-3 text-sm font-bold rounded-t-xl transition-all duration-200
              ${mode === InputMode.TEXT
                ? 'bg-white text-primary-600 shadow-[0_-2px_10px_rgba(0,0,0,0.02)] border-t border-l border-r border-slate-100'
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100/50'
              }
            `}
          >
            <FileText className="w-4 h-4" />
            Văn bản
          </button>
          
          <button
            onClick={() => setMode(InputMode.LINK)}
            className={`
              flex items-center gap-2 px-6 py-3 text-sm font-bold rounded-t-xl transition-all duration-200
              ${mode === InputMode.LINK
                ? 'bg-white text-primary-600 shadow-[0_-2px_10px_rgba(0,0,0,0.02)] border-t border-l border-r border-slate-100'
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100/50'
              }
            `}
          >
            <LinkIcon className="w-4 h-4" />
            Link URL
          </button>
        </div>
      </div>

      {/* Input Area */}
      <div className="p-0 bg-white relative group">
        <div className="absolute top-0 left-0 w-1 h-full bg-primary-600 opacity-0 transition-opacity group-focus-within:opacity-100" />
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={
            mode === InputMode.IDEA 
              ? "Nhập ý tưởng, chủ đề hoặc nội dung thô của bạn tại đây...\nVí dụ: Viết kịch bản về tác hại của việc ngồi lâu đối với dân văn phòng trên 30 tuổi." 
              : mode === InputMode.TEXT 
              ? "Dán toàn bộ văn bản gốc cần viết lại tại đây..."
              : "Dán đường link bài viết hoặc video (YouTube, Blog) bạn muốn chuyển thành kịch bản..."
          }
          className="w-full min-h-[300px] p-6 text-base sm:text-lg leading-relaxed text-slate-800 placeholder-slate-400 bg-transparent border-none focus:outline-none focus:ring-0 resize-y"
        />
        
        {/* Character Count / Hints */}
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400">
           <span>{value.length} ký tự</span>
           <span>Nhấn Enter để xuống dòng</span>
        </div>
      </div>
    </div>
  );
};

export default InputSection;