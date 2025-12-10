
import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { StatsGrid } from './components/StatsCards';
import { MarketChart } from './components/MarketChart';
import { OpportunityRow } from './components/OpportunityRow';
import { GeminiPanel } from './components/GeminiPanel';
import { PositionsPage } from './components/PositionsPage';
import { HistoryPage } from './components/HistoryPage';
import { AnalyticsPage } from './components/AnalyticsPage';
import { generateOpportunities, generateChartData } from './services/mockDataService';
import { analyzeArbitrageOpportunity } from './services/geminiService';
import { ArbitrageOpportunity, MarketDataPoint } from './types';
import { RefreshCw, Filter, Download } from 'lucide-react';

type ViewState = 'dashboard' | 'positions' | 'history' | 'analytics';

const App: React.FC = () => {
  // Navigation State
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');

  // Dashboard Data State
  const [isConnected, setIsConnected] = useState(false);
  const [opportunities, setOpportunities] = useState<ArbitrageOpportunity[]>([]);
  const [selectedOpp, setSelectedOpp] = useState<ArbitrageOpportunity | null>(null);
  const [chartData, setChartData] = useState<MarketDataPoint[]>([]);
  
  // AI State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [analyzingSymbol, setAnalyzingSymbol] = useState<string>('');

  // Initial Load & Refresh Logic
  const refreshData = useCallback(() => {
    const newOpps = generateOpportunities();
    setOpportunities(newOpps);
    
    // Default selection logic
    if (!selectedOpp && newOpps.length > 0) {
      handleSelectOpp(newOpps[0]);
    } else if (selectedOpp) {
        // Keep data fresh for the selected one if it still exists, else pick new
        const exists = newOpps.find(o => o.id === selectedOpp.id);
        if(!exists) handleSelectOpp(newOpps[0]);
    }
  }, [selectedOpp]);

  useEffect(() => {
    refreshData();
    const interval = setInterval(refreshData, 5000); // Live update effect
    return () => clearInterval(interval);
  }, []); // Remove selectedOpp from dependency array to avoid reseting selection on every tick unless necessary

  // Update chart when selection changes
  const handleSelectOpp = (opp: ArbitrageOpportunity) => {
    setSelectedOpp(opp);
    setChartData(generateChartData(opp.token.symbol));
  };

  // Connect Wallet Handler
  const handleConnect = () => {
    setIsConnected(!isConnected);
  };

  // AI Analysis Handler
  const handleAnalyze = async (opp: ArbitrageOpportunity) => {
    setAnalyzingSymbol(opp.token.symbol);
    setAiAnalysis(null);
    setIsAnalyzing(true);
    
    // API Call
    const result = await analyzeArbitrageOpportunity(opp);
    
    setAiAnalysis(result);
    setIsAnalyzing(false);
  };

  // Render Dashboard Content
  const renderDashboard = () => (
    <div className="animate-in fade-in duration-500">
        <StatsGrid />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content: Opportunity Table */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="w-2 h-6 bg-brand-500 rounded-sm"></span>
                Live Opportunities
              </h2>
              <div className="flex gap-2">
                <button 
                  onClick={refreshData} 
                  className="p-2 bg-gray-800 text-gray-400 rounded-lg hover:text-white transition-colors border border-gray-700 hover:border-gray-600"
                  title="Refresh Data"
                >
                  <RefreshCw size={18} />
                </button>
                <button className="p-2 bg-gray-800 text-gray-400 rounded-lg hover:text-white transition-colors border border-gray-700 hover:border-gray-600">
                  <Filter size={18} />
                </button>
                <button className="p-2 bg-gray-800 text-gray-400 rounded-lg hover:text-white transition-colors border border-gray-700 hover:border-gray-600">
                  <Download size={18} />
                </button>
              </div>
            </div>

            {/* Table Card */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-850 text-gray-400 text-xs uppercase tracking-wider border-b border-gray-800">
                      <th className="py-4 pl-4 font-semibold">Asset</th>
                      <th className="py-4 font-semibold">Route</th>
                      <th className="py-4 text-right font-semibold">Spread</th>
                      <th className="py-4 text-right pr-6 font-semibold">Net Profit (est.)</th>
                      <th className="py-4 pr-4 text-right font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {opportunities.map((opp) => (
                      <OpportunityRow 
                        key={opp.id} 
                        opp={opp} 
                        onAnalyze={handleAnalyze} 
                        onSelect={handleSelectOpp}
                        isSelected={selectedOpp?.id === opp.id}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Sidebar: Chart & Details */}
          <div className="lg:col-span-1 space-y-6">
            {selectedOpp ? (
              <>
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-xl">
                    <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">Price Action</h3>
                    <MarketChart 
                        data={chartData} 
                        tokenSymbol={selectedOpp.token.symbol} 
                        exchangeA={selectedOpp.buyExchange.name}
                        exchangeB={selectedOpp.sellExchange.name}
                    />
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-xl">
                  <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">Route Details</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg border border-gray-700/50">
                        <span className="text-sm text-gray-400">Buy Exchange</span>
                        <div className="text-right">
                            <div className="text-white font-medium">{selectedOpp.buyExchange.name}</div>
                            <div className="text-xs text-gray-500">Fee: {selectedOpp.buyExchange.fee}%</div>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="h-8 w-0.5 bg-gray-700"></div>
                    </div>
                     <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg border border-gray-700/50">
                        <span className="text-sm text-gray-400">Sell Exchange</span>
                        <div className="text-right">
                            <div className="text-white font-medium">{selectedOpp.sellExchange.name}</div>
                            <div className="text-xs text-gray-500">Fee: {selectedOpp.sellExchange.fee}%</div>
                        </div>
                    </div>
                  </div>
                  <button className="w-full mt-6 bg-brand-600 hover:bg-brand-500 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg shadow-brand-600/20 active:scale-95">
                    Execute Flash Loan
                  </button>
                </div>
              </>
            ) : (
                <div className="h-full flex items-center justify-center text-gray-500">Select an opportunity</div>
            )}
          </div>
        </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans selection:bg-brand-500/30">
      <Header 
        onConnect={handleConnect} 
        isConnected={isConnected} 
        walletAddress="0x71C...9A23"
        currentView={currentView}
        onNavigate={setCurrentView}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'dashboard' && renderDashboard()}
        {currentView === 'positions' && <PositionsPage />}
        {currentView === 'history' && <HistoryPage />}
        {currentView === 'analytics' && <AnalyticsPage />}
      </main>

      {/* AI Modal */}
      <GeminiPanel 
        isLoading={isAnalyzing} 
        analysis={aiAnalysis} 
        onClose={() => setAiAnalysis(null)} 
        targetSymbol={analyzingSymbol}
      />
    </div>
  );
};

export default App;
