import React from 'react';
import { ArbitrageOpportunity } from '../types';
import { ArrowRight, Bot, ExternalLink } from 'lucide-react';

interface Props {
  opp: ArbitrageOpportunity;
  onAnalyze: (opp: ArbitrageOpportunity) => void;
  onSelect: (opp: ArbitrageOpportunity) => void;
  isSelected: boolean;
}

export const OpportunityRow: React.FC<Props> = ({ opp, onAnalyze, onSelect, isSelected }) => {
  return (
    <tr 
        onClick={() => onSelect(opp)}
        className={`border-b border-gray-800 transition-colors cursor-pointer ${isSelected ? 'bg-brand-900/20' : 'hover:bg-gray-800/50'}`}
    >
      <td className="py-4 pl-4">
        <div className="flex items-center gap-3">
            <span className="font-bold text-white">{opp.token.symbol}</span>
            <span className="text-xs px-2 py-0.5 rounded bg-gray-800 text-gray-400">{opp.token.name}</span>
        </div>
      </td>
      <td className="py-4">
        <div className="flex items-center gap-2 text-sm">
            <span className="text-red-400">{opp.buyExchange.name}</span>
            <ArrowRight size={14} className="text-gray-600" />
            <span className="text-emerald-400">{opp.sellExchange.name}</span>
        </div>
      </td>
      <td className="py-4 text-right">
        <div className="text-emerald-400 font-mono font-medium">+{opp.spread.toFixed(2)}%</div>
      </td>
      <td className="py-4 text-right pr-6">
        <div className="text-white font-mono">${opp.profitPotential.toFixed(2)}</div>
        <div className="text-xs text-gray-500">Est. Profit</div>
      </td>
      <td className="py-4 pr-4 text-right">
        <div className="flex items-center justify-end gap-2">
            <button 
                onClick={(e) => { e.stopPropagation(); onAnalyze(opp); }}
                className="p-2 hover:bg-brand-500/20 text-brand-400 rounded-lg transition-colors group"
                title="AI Analysis"
            >
                <Bot size={16} className="group-hover:scale-110 transition-transform" />
            </button>
            <button 
                className="p-2 hover:bg-gray-700 text-gray-400 hover:text-white rounded-lg transition-colors"
                title="Execute Trade"
            >
                <ExternalLink size={16} />
            </button>
        </div>
      </td>
    </tr>
  );
};
