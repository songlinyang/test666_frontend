import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { MarketDataPoint } from '../types';

interface MarketChartProps {
  data: MarketDataPoint[];
  tokenSymbol: string;
  exchangeA: string;
  exchangeB: string;
}

export const MarketChart: React.FC<MarketChartProps> = ({ data, tokenSymbol, exchangeA, exchangeB }) => {
  return (
    <div className="h-[300px] w-full">
      <div className="flex justify-between items-center mb-4 px-2">
        <h3 className="text-sm font-semibold text-gray-300">Live Spread: {tokenSymbol} ({exchangeA} vs {exchangeB})</h3>
        <div className="flex items-center gap-2 text-xs">
            <span className="w-3 h-3 rounded-full bg-brand-500"></span>
            <span className="text-gray-400">{exchangeA}</span>
            <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
            <span className="text-gray-400">{exchangeB}</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorExA" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorExB" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
          <XAxis 
            dataKey="time" 
            stroke="#9ca3af" 
            fontSize={12} 
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            domain={['auto', 'auto']} 
            stroke="#9ca3af" 
            fontSize={12} 
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value.toFixed(2)}`}
            width={60}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f3f4f6' }}
            itemStyle={{ color: '#e5e7eb' }}
            formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
          />
          <Area 
            type="monotone" 
            dataKey="exchangeA" 
            stroke="#6366f1" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorExA)" 
            name={exchangeA}
            animationDuration={500}
          />
          <Area 
            type="monotone" 
            dataKey="exchangeB" 
            stroke="#10b981" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorExB)" 
            name={exchangeB}
            animationDuration={500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
