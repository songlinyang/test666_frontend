import React from 'react';
import { Sparkles, X, AlertTriangle, CheckCircle } from 'lucide-react';

interface Props {
  isLoading: boolean;
  analysis: string | null;
  onClose: () => void;
  targetSymbol?: string;
}

export const GeminiPanel: React.FC<Props> = ({ isLoading, analysis, onClose, targetSymbol }) => {
  if (!analysis && !isLoading) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-lg shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center bg-gray-850">
          <div className="flex items-center gap-2 text-brand-400">
            <Sparkles size={18} />
            <h3 className="font-semibold text-white">Gemini Analysis: {targetSymbol}</h3>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <div className="relative w-12 h-12">
                <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-700 rounded-full"></div>
                <div className="absolute top-0 left-0 w-full h-full border-4 border-brand-500 rounded-full border-t-transparent animate-spin"></div>
              </div>
              <p className="text-gray-400 animate-pulse text-sm">Analyzing on-chain liquidity & spread...</p>
            </div>
          ) : (
            <div className="space-y-4">
               <div className="prose prose-invert prose-sm max-w-none text-gray-300">
                 {/* Simple formatting for the raw text response */}
                 {analysis?.split('\n').map((line, i) => (
                   <p key={i} className={`mb-2 ${line.includes('Risk') ? 'text-orange-300' : ''}`}>
                     {line}
                   </p>
                 ))}
               </div>
               
               <div className="mt-4 pt-4 border-t border-gray-800 flex items-center gap-3 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <CheckCircle size={12} className="text-green-500"/> Verified by Gemini 2.5 Flash
                  </div>
                  <div className="flex items-center gap-1">
                    <AlertTriangle size={12} className="text-yellow-500"/> DYOR Required
                  </div>
               </div>
            </div>
          )}
        </div>

        {/* Action Bar */}
        <div className="p-4 bg-gray-950 border-t border-gray-800 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded-lg text-sm text-gray-400 hover:text-white font-medium hover:bg-gray-800 transition-colors">
            Close
          </button>
          {!isLoading && (
            <button className="px-4 py-2 rounded-lg text-sm bg-brand-600 hover:bg-brand-500 text-white font-medium shadow-lg shadow-brand-600/20 transition-all">
              Proceed to Trade
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
