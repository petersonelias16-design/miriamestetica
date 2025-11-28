import React, { useState } from 'react';
import { Sparkles, Send, Search, BookOpen } from 'lucide-react';
import { askBeautyAdvisor } from '../services/geminiService';
import { ChatMessage } from '../types';

export const BeautyAdvisor: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Olá, querida. Sou sua consultora de beleza virtual da Miriah. Gostaria de saber sobre as últimas tendências ou dicas de cuidados?' }
  ]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || loading) return;

    const userMsg = query;
    setQuery('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const { text, sources } = await askBeautyAdvisor(userMsg);
      // Remove citation markers like [1], [2] from the text for cleaner UI
      const cleanText = text.replace(/\[\d+\]/g, '');
      
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: cleanText,
        sources: sources.map(s => s.uri) // Just storing URIs for simplicity in this demo view
      }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', text: 'Desculpe, tive um pequeno problema técnico. Poderia tentar novamente?' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-rose-50/50 rounded-2xl p-6 md:p-8 shadow-sm border border-rose-100 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-rose-100 p-2 rounded-full">
            <Sparkles className="w-5 h-5 text-rose-500" />
        </div>
        <h3 className="font-serif text-2xl text-gray-900">Miriah AI Advisor</h3>
      </div>

      <div className="flex-1 overflow-y-auto max-h-[400px] mb-4 space-y-4 pr-2 custom-scrollbar">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`p-4 rounded-2xl max-w-[90%] text-sm font-sans leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-rose-200 text-rose-900 rounded-br-none' 
                : 'bg-white text-gray-600 shadow-sm border border-gray-100 rounded-bl-none'
            }`}>
              {msg.text}
            </div>
            {msg.sources && msg.sources.length > 0 && (
                <div className="mt-2 ml-1 flex flex-wrap gap-2">
                    {msg.sources.slice(0, 2).map((source, i) => (
                        <a key={i} href={source} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-rose-500 transition-colors bg-white px-2 py-1 rounded-full border border-gray-100">
                            <BookOpen className="w-3 h-3" />
                            Fonte {i + 1}
                        </a>
                    ))}
                </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex items-start">
            <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm border border-gray-100">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-rose-300 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-rose-300 rounded-full animate-bounce delay-100"></span>
                <span className="w-2 h-2 bg-rose-300 rounded-full animate-bounce delay-200"></span>
              </div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Pergunte sobre tratamentos..."
          className="w-full pl-4 pr-12 py-3 rounded-full border border-rose-200 focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-200 bg-white font-light text-sm shadow-sm transition-all"
        />
        <button 
          type="submit" 
          disabled={loading || !query.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-rose-400 text-white rounded-full hover:bg-rose-500 disabled:bg-rose-200 transition-colors"
        >
          {loading ? <Search className="w-4 h-4 animate-pulse" /> : <Send className="w-4 h-4" />}
        </button>
      </form>
    </div>
  );
};