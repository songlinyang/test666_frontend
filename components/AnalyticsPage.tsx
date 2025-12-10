
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getPerformanceData } from '../services/mockDataService';
import { getMarketSentiment } from '../services/geminiService';
import { PerformanceData } from '../types';
import { Bot, TrendingUp, BarChart, PieChart } from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  const [data, setData] = useState<PerformanceData[]>([]);
  const [sentiment, setSentiment] = useState<any>(null);
  const [loadingSentiment, setLoadingSentiment] = useState(false);

  useEffect(() => {
    setData(getPerformanceData());
    
    // Load sentiment
    const loadSentiment = async () => {
        setLoadingSentiment(true);
        const result = await getMarketSentiment();
        setSentiment(result);
        setLoadingSentiment(false);
    };
    loadSentiment();
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* AI Sentiment Card */}
      <div className="bg-gradient-to-br from-indigo-900/40 to-gray-900 border border-brand-500/20 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-3 opacity-10">
            <Bot size={120} className="text-brand-500" />
        </div>
        <div className="relative z-10">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
                <Bot className="text-brand-400" />
                AI Market Sentiment Analysis
            </h2>
            
            {loadingSentiment ? (
                <div className="space-y-3 animate-pulse">
                    <div className="h-4 bg-gray-700/50 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-700/50 rounded w-1/2"></div>
                </div>
            ) : sentiment ? (
                <div>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="bg-gray-800/60 rounded-lg px-4 py-2 border border-gray-700">
                            <span className="text-gray-400 text-xs uppercase tracking-wide">Overall Mood</span>
                            <div className="text-lg font-bold text-emerald-400">{sentiment.overall_sentiment || 'Neutral'}</div>
                        </div>
                        <div className="bg-gray-800/60 rounded-lg px-4 py-2 border border-gray-700">
                            <span className="text-gray-400 text-xs uppercase tracking-wide">Volatility Index</span>
                            <div className="text-lg font-bold text-white">{sentiment.volatility_index || '0.0'}</div>
                        </div>
                    </div>
                    <div className="text-gray-300 text-sm leading-relaxed max-w-2xl">
                        <p className="mb-2">Key Narratives:</p>
                        <ul className="list-disc list-inside space-y-1 text-gray-400">
                            {sentiment.trending_narratives?.map((n: string, i: number) => (
                                <li key={i}>{n}</li>
                            )) || <li>Loading market data...</li>}
                        </ul>
                    </div>
                </div>
            ) : (
                <p className="text-gray-400">Unable to load AI analysis.</p>
            )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Chart */}
        <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-xl">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="font-bold text-white text-lg">Portfolio Performance</h3>
                    <p className="text-gray-500 text-sm">Cumulative Profit (30 Days)</p>
                </div>
                <div className="flex items-center gap-2 text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full text-sm font-medium border border-emerald-500/20">
                    <TrendingUp size={16} /> +24.5%
                </div>
            </div>
            
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                        <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}`} />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f3f4f6' }}
                            itemStyle={{ color: '#818cf8' }}
                            formatter={(value: number) => [`$${value.toFixed(2)}`, 'Cumulative Profit']}
                        />
                        <Area type="monotone" dataKey="cumulative" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorProfit)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Small Stats Grid */}
        <div className="space-y-6">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-white">Asset Allocation</h3>
                    <PieChart size={18} className="text-gray-500" />
                </div>
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm flex items-center gap-2"><div className="w-3 h-3 bg-blue-500 rounded-full"></div> ETH</span>
                        <span className="text-white font-medium">45%</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm flex items-center gap-2"><div className="w-3 h-3 bg-purple-500 rounded-full"></div> SOL</span>
                        <span className="text-white font-medium">30%</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm flex items-center gap-2"><div className="w-3 h-3 bg-gray-500 rounded-full"></div> Stablecoins</span>
                        <span className="text-white font-medium">25%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2 mt-2 flex overflow-hidden">
                        <div className="bg-blue-500 h-2" style={{width: '45%'}}></div>
                        <div className="bg-purple-500 h-2" style={{width: '30%'}}></div>
                        <div className="bg-gray-500 h-2" style={{width: '25%'}}></div>
                    </div>
                </div>
            </div>

             <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-white">Monthly Volume</h3>
                    <BarChart size={18} className="text-gray-500" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">$4.2M</div>
                <div className="text-gray-500 text-sm mb-4">Total arbitrage volume processed</div>
                <button className="w-full py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm transition-colors">
                    Download Report
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};
