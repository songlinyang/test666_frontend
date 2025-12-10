
import React, { useState, useEffect } from 'react';
import { Position } from '../types';
import { getActivePositions } from '../services/mockDataService';
import { TrendingUp, TrendingDown, AlertCircle, XOctagon } from 'lucide-react';

export const PositionsPage: React.FC = () => {
  const [positions, setPositions] = useState<Position[]>([]);

  useEffect(() => {
    setPositions(getActivePositions());
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Active Strategies</h2>
          <p className="text-gray-400">Manage your running arbitrage bots and flash loan positions.</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Total PnL</div>
          <div className="text-2xl font-bold text-emerald-500">+$1,260.50</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-900 border border-gray-800 p-5 rounded-xl">
            <div className="text-gray-500 text-sm">Capital Deployed</div>
            <div className="text-xl font-bold text-white mt-1">$70,000.00</div>
            <div className="text-brand-500 text-xs mt-2 font-medium">78% Utilization</div>
        </div>
        <div className="bg-gray-900 border border-gray-800 p-5 rounded-xl">
            <div className="text-gray-500 text-sm">Open Positions</div>
            <div className="text-xl font-bold text-white mt-1">3</div>
            <div className="text-orange-400 text-xs mt-2 font-medium">1 High Risk</div>
        </div>
        <div className="bg-gray-900 border border-gray-800 p-5 rounded-xl">
            <div className="text-gray-500 text-sm">Avg. ROI</div>
            <div className="text-xl font-bold text-white mt-1">1.85%</div>
            <div className="text-emerald-500 text-xs mt-2 font-medium">Per Trade</div>
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-lg">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-850 text-gray-400 text-xs uppercase tracking-wider border-b border-gray-800">
              <th className="py-4 pl-6 font-semibold">Asset / Strategy</th>
              <th className="py-4 font-semibold">Entry Price</th>
              <th className="py-4 font-semibold">Current Price</th>
              <th className="py-4 font-semibold">Size</th>
              <th className="py-4 font-semibold text-right">PnL</th>
              <th className="py-4 pr-6 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {positions.map((pos) => (
              <tr key={pos.id} className="hover:bg-gray-800/50 transition-colors">
                <td className="py-4 pl-6">
                  <div className="flex items-center gap-3">
                    <img src={pos.token.logo} alt={pos.token.symbol} className="w-8 h-8 rounded-full" />
                    <div>
                      <div className="font-bold text-white">{pos.token.symbol}</div>
                      <div className="text-xs text-brand-400 bg-brand-900/20 px-1.5 py-0.5 rounded inline-block mt-0.5">
                        {pos.strategy}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 text-gray-300 font-mono">${pos.entryPrice.toFixed(2)}</td>
                <td className="py-4 text-gray-300 font-mono">${pos.currentPrice.toFixed(2)}</td>
                <td className="py-4 text-white font-medium">${pos.amount.toLocaleString()}</td>
                <td className="py-4 text-right">
                  <div className={`font-mono font-medium ${pos.pnl >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                    {pos.pnl >= 0 ? '+' : ''}{pos.pnl.toFixed(2)}
                  </div>
                  <div className={`text-xs ${pos.pnlPercent >= 0 ? 'text-emerald-400/70' : 'text-red-400/70'}`}>
                    {pos.pnlPercent >= 0 ? '+' : ''}{pos.pnlPercent.toFixed(2)}%
                  </div>
                </td>
                <td className="py-4 pr-6 text-right">
                  <button className="text-red-400 hover:text-red-300 hover:bg-red-500/10 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border border-red-500/30">
                    Close Position
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {positions.length === 0 && (
            <div className="p-8 text-center text-gray-500">No active positions found. Start a new trade from the dashboard.</div>
        )}
      </div>
    </div>
  );
};
