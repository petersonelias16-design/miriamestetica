import React, { useState, useRef } from 'react';
import { Upload, Wand2, Image as ImageIcon, Download, RefreshCw } from 'lucide-react';
import { editImage, fileToGenerativePart } from '../services/geminiService';

export const ImageEditor: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const base64 = await fileToGenerativePart(e.target.files[0]);
        // The service returns raw base64, we need to add data uri for preview
        setOriginalImage(base64); 
        setResultImage(null);
      } catch (error) {
        console.error("Failed to process file", error);
      }
    }
  };

  const handleEdit = async () => {
    if (!originalImage || !prompt || loading) return;
    setLoading(true);
    try {
      const result = await editImage(originalImage, prompt);
      setResultImage(result);
    } catch (error) {
      alert("Não foi possível editar a imagem. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const triggerUpload = () => fileInputRef.current?.click();

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-rose-100 h-full flex flex-col">
       <div className="flex items-center gap-3 mb-6">
        <div className="bg-rose-100 p-2 rounded-full">
            <Wand2 className="w-5 h-5 text-rose-500" />
        </div>
        <h3 className="font-serif text-2xl text-gray-900">Simulador Estético AI</h3>
      </div>
      
      <p className="text-sm font-sans text-gray-500 mb-6 font-light">
        Carregue uma foto e peça para nossa IA simular mudanças sutis. Experimente "Remover manchas", "Iluminar a pele" ou "Adicionar filtro suave".
      </p>

      <div className="flex-1 flex flex-col gap-4">
        {/* Image Area */}
        <div className="relative flex-1 min-h-[250px] bg-rose-50 rounded-xl overflow-hidden border border-rose-100 flex items-center justify-center group">
          {!originalImage ? (
            <button onClick={triggerUpload} className="flex flex-col items-center gap-2 text-rose-300 hover:text-rose-400 transition-colors">
              <Upload className="w-8 h-8" />
              <span className="text-sm font-medium">Carregar Foto</span>
            </button>
          ) : (
            <div className="relative w-full h-full">
               <img 
                src={resultImage || `data:image/png;base64,${originalImage}`} 
                alt="Preview" 
                className="w-full h-full object-cover"
              />
              {loading && (
                <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center">
                  <div className="flex flex-col items-center gap-2">
                    <RefreshCw className="w-8 h-8 text-rose-400 animate-spin" />
                    <span className="text-xs font-medium text-rose-800 tracking-widest uppercase">Transformando...</span>
                  </div>
                </div>
              )}
               {/* Controls Overlay */}
               <div className="absolute top-2 right-2 flex gap-2">
                  <button onClick={() => { setOriginalImage(null); setResultImage(null); }} className="bg-white/80 p-2 rounded-full hover:bg-white text-gray-600 transition-all shadow-sm">
                      <RefreshCw className="w-4 h-4" />
                  </button>
               </div>
            </div>
          )}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="hidden" 
            accept="image/*"
          />
        </div>

        {/* Prompt Area */}
        <div className="space-y-3">
            <div className="relative">
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Ex: Suavizar olheiras..."
                    disabled={!originalImage || loading}
                    className="w-full pl-4 pr-12 py-3 rounded-xl border border-rose-200 focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-200 bg-white font-light text-sm shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button 
                    onClick={handleEdit}
                    disabled={!originalImage || !prompt || loading}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-rose-900 text-white rounded-lg hover:bg-rose-800 disabled:bg-gray-200 transition-colors"
                >
                    <Wand2 className="w-4 h-4" />
                </button>
            </div>
            {resultImage && (
                 <a 
                 href={resultImage} 
                 download="miriah-transformacao.png"
                 className="flex items-center justify-center gap-2 w-full py-2 bg-rose-100 text-rose-800 rounded-xl hover:bg-rose-200 transition-colors text-sm font-medium"
               >
                 <Download className="w-4 h-4" />
                 Baixar Resultado
               </a>
            )}
        </div>
      </div>
    </div>
  );
};