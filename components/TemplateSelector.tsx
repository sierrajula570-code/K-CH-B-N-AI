import React from 'react';
import { ScriptTemplate } from '../types';
import { TEMPLATES } from '../constants';
import { IconWrapper } from './IconWrapper';

interface Props {
  selectedTemplateId: string;
  onSelect: (template: ScriptTemplate) => void;
}

const TemplateSelector: React.FC<Props> = ({ selectedTemplateId, onSelect }) => {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
        <span className="text-primary-600 text-2xl">🎬</span> Chọn Mẫu Kịch bản
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {TEMPLATES.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelect(template)}
            className={`
              flex flex-col items-start p-5 rounded-2xl border text-left transition-all duration-300
              hover:shadow-md hover:-translate-y-1 relative group
              ${selectedTemplateId === template.id 
                ? 'border-primary-500 bg-white ring-2 ring-primary-500/20 shadow-lg shadow-primary-500/10' 
                : 'border-slate-200 bg-white hover:border-primary-300 hover:bg-slate-50'
              }
            `}
          >
            <div className="flex items-center mb-3 w-full">
              <div className={`
                p-2 rounded-lg mr-3 transition-colors
                ${selectedTemplateId === template.id ? 'bg-primary-100' : 'bg-slate-100 group-hover:bg-white'}
              `}>
                <IconWrapper icon={template.icon} />
              </div>
              <span className={`font-bold text-base truncate flex-1 ${selectedTemplateId === template.id ? 'text-primary-700' : 'text-slate-700'}`}>
                {template.title}
              </span>
            </div>
            <p className={`text-sm line-clamp-2 ${selectedTemplateId === template.id ? 'text-primary-600/80' : 'text-slate-500'}`}>
              {template.description}
            </p>
            
            {/* Checkmark for selected state */}
            {selectedTemplateId === template.id && (
              <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-primary-500"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;