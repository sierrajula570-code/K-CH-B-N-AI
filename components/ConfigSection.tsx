import React from 'react';
import { LanguageOption, DurationOption } from '../types';
import { LANGUAGES, DURATIONS } from '../constants';
import { Languages, Clock } from 'lucide-react';

interface Props {
  selectedLanguage: string;
  onSelectLanguage: (lang: LanguageOption) => void;
  selectedDuration: string;
  onSelectDuration: (duration: DurationOption) => void;
  customMinutes: number;
  setCustomMinutes: (min: number) => void;
}

const ConfigSection: React.FC<Props> = ({
  selectedLanguage,
  onSelectLanguage,
  selectedDuration,
  onSelectDuration,
  customMinutes,
  setCustomMinutes
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-32">
      {/* Language Section */}
      <div className="bg-white p-6 rounded-2xl shadow-soft border border-slate-100">
        <h3 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
          <div className="p-1.5 bg-primary-100 rounded-lg text-primary-600">
             <Languages className="w-5 h-5" /> 
          </div>
          Ngôn ngữ đầu ra
        </h3>
        <div className="flex flex-wrap gap-3">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.id}
              onClick={() => onSelectLanguage(lang)}
              className={`
                px-4 py-2.5 text-sm font-medium rounded-xl border transition-all duration-200
                ${selectedLanguage === lang.id
                  ? 'border-primary-500 bg-primary-600 text-white shadow-lg shadow-primary-500/20'
                  : 'border-slate-200 text-slate-600 hover:border-primary-300 hover:bg-slate-50'
                }
              `}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>

      {/* Duration Section */}
      <div className="bg-white p-6 rounded-2xl shadow-soft border border-slate-100">
        <h3 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
           <div className="p-1.5 bg-primary-100 rounded-lg text-primary-600">
             <Clock className="w-5 h-5" /> 
          </div>
          Thời lượng mong muốn
        </h3>
        <div className="flex flex-wrap gap-3 mb-4">
          {DURATIONS.map((duration) => (
            <button
              key={duration.id}
              onClick={() => onSelectDuration(duration)}
              className={`
                px-4 py-2.5 text-sm font-medium rounded-xl border transition-all duration-200
                ${selectedDuration === duration.id
                  ? 'border-primary-500 bg-primary-600 text-white shadow-lg shadow-primary-500/20'
                  : 'border-slate-200 text-slate-600 hover:border-primary-300 hover:bg-slate-50'
                }
              `}
            >
              {duration.label}
            </button>
          ))}
        </div>
        
        {selectedDuration === 'custom' && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Nhập số phút cụ thể:
            </label>
            <div className="flex items-center gap-3">
              <input 
                type="number" 
                min="1" 
                max="120"
                value={customMinutes}
                onChange={(e) => setCustomMinutes(Number(e.target.value))}
                className="w-24 border border-slate-300 rounded-lg px-4 py-2 text-lg font-bold text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-center"
              />
              <span className="text-slate-600 font-medium">phút</span>
            </div>
            <p className="text-xs text-slate-500 mt-2 italic">
              *AI sẽ tối ưu kịch bản để đạt độ dài ~{customMinutes} phút khi đọc.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfigSection;