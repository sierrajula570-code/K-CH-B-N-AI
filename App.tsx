import React, { useState, useEffect } from 'react';
import { TEMPLATES, LANGUAGES, DURATIONS } from './constants';
import { ScriptTemplate, LanguageOption, DurationOption, InputMode, HistoryItem } from './types';
import Header from './components/Header';
import InputSection from './components/InputSection';
import TemplateSelector from './components/TemplateSelector';
import ConfigSection from './components/ConfigSection';
import ResultModal from './components/ResultModal';
import HistoryModal from './components/HistoryModal';
import { generateScript, calculateTargetLength } from './services/geminiService';
import { Zap, Loader2 } from 'lucide-react';

function App() {
  const [inputText, setInputText] = useState('');
  const [inputMode, setInputMode] = useState<InputMode>(InputMode.IDEA);
  
  const [selectedTemplate, setSelectedTemplate] = useState<ScriptTemplate>(TEMPLATES[0]);
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageOption>(LANGUAGES[0]);
  const [selectedDuration, setSelectedDuration] = useState<DurationOption>(DURATIONS[0]);
  const [customMinutes, setCustomMinutes] = useState<number>(5);

  const [isLoading, setIsLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [targetStats, setTargetStats] = useState<{ min: number; max: number; target: number } | undefined>(undefined);

  // Load history from local storage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('script_history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  const saveToHistory = (content: string) => {
    if (!content || content.startsWith('⚠️')) return; // Don't save errors

    const newItem: HistoryItem = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      templateTitle: selectedTemplate.title,
      inputPreview: inputText.substring(0, 50) + (inputText.length > 50 ? '...' : ''),
      content: content
    };

    const newHistory = [newItem, ...history];
    setHistory(newHistory);
    localStorage.setItem('script_history', JSON.stringify(newHistory));
  };

  const deleteHistoryItem = (id: string) => {
    const newHistory = history.filter(item => item.id !== id);
    setHistory(newHistory);
    localStorage.setItem('script_history', JSON.stringify(newHistory));
  };
  
  const clearAllHistory = () => {
    if(confirm("Bạn có chắc chắn muốn xóa toàn bộ lịch sử?")) {
        setHistory([]);
        localStorage.removeItem('script_history');
    }
  }

  const handleGenerate = async () => {
    if (!inputText.trim()) {
      alert("Vui lòng nhập ý tưởng hoặc nội dung.");
      return;
    }

    setIsLoading(true);
    setTargetStats(undefined); // Reset stats before new generation

    try {
      // Calculate strict targets to display in the modal later
      const stats = calculateTargetLength(selectedLanguage.id, selectedDuration.id, customMinutes);
      setTargetStats({
        min: stats.minChars,
        max: stats.maxChars,
        target: stats.targetChars
      });

      const result = await generateScript(
        inputText,
        selectedTemplate,
        selectedLanguage,
        selectedDuration,
        inputMode,
        customMinutes
      );
      setGeneratedContent(result);
      saveToHistory(result);
      setIsModalOpen(true);
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenHistoryItem = (content: string) => {
    setGeneratedContent(content);
    setTargetStats(undefined); // History items might not have saved targets, so hide validation for now
    setIsHistoryOpen(false);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header 
        onOpenHistory={() => setIsHistoryOpen(true)}
        activeTab="new"
      />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        
        <InputSection 
          value={inputText} 
          onChange={setInputText}
          mode={inputMode}
          setMode={setInputMode}
        />

        <TemplateSelector 
          selectedTemplateId={selectedTemplate.id}
          onSelect={setSelectedTemplate}
        />

        <ConfigSection 
          selectedLanguage={selectedLanguage.id}
          onSelectLanguage={setSelectedLanguage}
          selectedDuration={selectedDuration.id}
          onSelectDuration={setSelectedDuration}
          customMinutes={customMinutes}
          setCustomMinutes={setCustomMinutes}
        />

      </main>

      {/* Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 z-40 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
            <div className="hidden sm:block text-sm text-slate-500">
                <span className="font-medium text-slate-900">{inputText.length}</span> ký tự • Mẫu: <span className="font-medium text-slate-900">{selectedTemplate.title}</span> • {selectedDuration.id === 'custom' ? `${customMinutes} phút` : selectedDuration.label}
            </div>
            <button
                onClick={handleGenerate}
                disabled={isLoading || !inputText.trim()}
                className={`
                    flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-bold text-white text-lg w-full sm:w-auto transition-all shadow-lg hover:shadow-xl
                    ${isLoading || !inputText.trim() 
                        ? 'bg-primary-300 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 transform hover:-translate-y-0.5'
                    }
                `}
            >
                {isLoading ? (
                    <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        Đang viết...
                    </>
                ) : (
                    <>
                        <Zap className="w-5 h-5 fill-current" />
                        Tạo Kịch bản Ngay
                    </>
                )}
            </button>
        </div>
      </div>

      <ResultModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        content={generatedContent || ''}
        targetLength={targetStats}
      />

      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onDelete={deleteHistoryItem}
        onSelect={handleOpenHistoryItem}
        onClearAll={clearAllHistory}
      />
    </div>
  );
}

export default App;