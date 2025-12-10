
import React, { useState, useEffect } from 'react';
import { TradeHistory } from '../types';
import { getTradeHistory } from '../services/mockDataService';
import { Check, X, ExternalLink } from 'lucide-react';

export const HistoryPage: React.FC = () => {
  const [history, setHistory] = useState<TradeHistory[]>([]);

  useEffect(() => {
    setHistory(getTradeHistory());
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Execution History</h2>
            <div className="flex gap-2">
                <select className="bg-gray-900 border border-gray-800 text-gray-300 text-sm rounded-lg px-3 py-2 outline-none focus:border-brand-500">
                    <option>All Strategies</option>
                    <option>Arbitrage</option>
                    <option>Flash Loans</option>
                </select>
                <select className="bg-gray-900 border border-gray-800 text-gray-300 text-sm rounded-lg px-3 py-2 outline-none focus:border-brand-500">
                    <option>Last 30 Days</option>
                    <option>Last 7 Days</option>
                    <option>Last 24 Hours</option>
                </select>
            </div>
        </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-lg">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-850 text-gray-400 text-xs uppercase tracking-wider border-b border-gray-800">
              <th className="py-4 pl-6 font-semibold">Status</th>
              <th className="py-4 font-semibold">Time</th>
              <th className="py-4 font-semibold">Pair / Type</th>
              <th className="py-4 font-semibold text-right">Gas Fee</th>
              <th className="py-4 font-semibold text-right">Realized PnL</th>
              <th className="py-4 pr-6 text-right font-semibold">TX Hash</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {history.map((item) => (
              <tr key={item.id} className="hover:bg-gray-800/50 transition-colors">
                <td className="py-4 pl-6">
                  {item.status === 'Success' ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/20">
                      <Check size={12} /> Success
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-500 border border-red-500/20">
                      <X size={12} /> Reverted
                    </span>
                  )}
                </td>
                <td className="py-4 text-gray-400 text-sm">
                  {new Date(item.timestamp).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit' })}
                </td>
                <td className="py-4">
                  <div className="flex items-center gap-2">
                     <span className="font-bold text-white">{item.token.symbol}</span>
                     <span className="text-gray-500 text-xs">•</span>
                     <span className="text-gray-400 text-sm">{item.type}</span>
                  </div>
                </td>
                <td className="py-4 text-right text-gray-400 text-sm font-mono">
                  {item.gasFee.toFixed(4)} ETH
                </td>
                <td className="py-4 text-right">
                  <span className={`font-mono font-medium ${item.profit >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                    {item.profit >= 0 ? '+' : ''}{item.profit.toFixed(2)} USD
                  </span>
                </td>
                <td className="py-4 pr-6 text-right">
                  <a href="#" className="text-brand-400 hover:text-brand-300 inline-flex items-center gap-1 text-xs hover:underline">
                    {item.hash.substring(0, 6)}...{item.hash.substring(36)}
                    <ExternalLink size={10} />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
