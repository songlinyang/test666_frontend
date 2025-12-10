
import { ArbitrageOpportunity, Exchange, Token, MarketDataPoint, Position, TradeHistory, PerformanceData } from "../types";

const TOKENS: Token[] = [
  { symbol: 'ETH', name: 'Ethereum', logo: 'https://picsum.photos/id/1/24/24' },
  { symbol: 'SOL', name: 'Solana', logo: 'https://picsum.photos/id/2/24/24' },
  { symbol: 'WBTC', name: 'Wrapped BTC', logo: 'https://picsum.photos/id/3/24/24' },
  { symbol: 'LINK', name: 'Chainlink', logo: 'https://picsum.photos/id/4/24/24' },
  { symbol: 'UNI', name: 'Uniswap', logo: 'https://picsum.photos/id/5/24/24' },
  { symbol: 'AAVE', name: 'Aave', logo: 'https://picsum.photos/id/6/24/24' },
];

const EXCHANGES: Exchange[] = [
  { id: 'uni', name: 'Uniswap V3', type: 'DEX', fee: 0.3 },
  { id: 'sushi', name: 'SushiSwap', type: 'DEX', fee: 0.3 },
  { id: 'binance', name: 'Binance', type: 'CEX', fee: 0.1 },
  { id: 'coinbase', name: 'Coinbase', type: 'CEX', fee: 0.5 },
  { id: 'curve', name: 'Curve', type: 'DEX', fee: 0.04 },
];

const BASE_PRICES: Record<string, number> = {
  'ETH': 3250.00,
  'SOL': 145.50,
  'WBTC': 64000.00,
  'LINK': 18.20,
  'UNI': 12.40,
  'AAVE': 95.00
};

export const generateOpportunities = (): ArbitrageOpportunity[] => {
  const opportunities: ArbitrageOpportunity[] = [];
  const count = 5 + Math.floor(Math.random() * 4);

  for (let i = 0; i < count; i++) {
    const token = TOKENS[Math.floor(Math.random() * TOKENS.length)];
    const buyEx = EXCHANGES[Math.floor(Math.random() * EXCHANGES.length)];
    let sellEx = EXCHANGES[Math.floor(Math.random() * EXCHANGES.length)];
    
    while (sellEx.id === buyEx.id) {
      sellEx = EXCHANGES[Math.floor(Math.random() * EXCHANGES.length)];
    }

    const basePrice = BASE_PRICES[token.symbol];
    const variance = basePrice * 0.02; 
    
    const price1 = basePrice + (Math.random() * variance - (variance/2));
    const price2 = basePrice + (Math.random() * variance - (variance/2));
    
    const buyPrice = Math.min(price1, price2);
    const sellPrice = Math.max(price1, price2);
    
    const spread = ((sellPrice - buyPrice) / buyPrice) * 100;
    const liquidity = 10000 + Math.random() * 500000;
    
    const tradeSize = 10000; 
    const fees = (buyEx.fee + sellEx.fee);
    const netSpread = spread - fees;
    
    if (netSpread > 0) {
      opportunities.push({
        id: `arb-${Date.now()}-${i}`,
        token,
        buyExchange: buyEx,
        sellExchange: sellEx,
        buyPrice,
        sellPrice,
        spread,
        profitPotential: (netSpread / 100) * tradeSize,
        liquidity,
        timestamp: Date.now()
      });
    }
  }

  return opportunities.sort((a, b) => b.spread - a.spread);
};

export const generateChartData = (tokenSymbol: string): MarketDataPoint[] => {
  const data: MarketDataPoint[] = [];
  const basePrice = BASE_PRICES[tokenSymbol] || 100;
  let currentA = basePrice;
  let currentB = basePrice * 1.005;

  const now = new Date();
  
  for (let i = 20; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60000);
    
    currentA += (Math.random() - 0.5) * (basePrice * 0.002);
    currentB += (Math.random() - 0.5) * (basePrice * 0.002);

    data.push({
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      exchangeA: currentA,
      exchangeB: currentB
    });
  }
  return data;
};

export const getActivePositions = (): Position[] => {
  return [
    {
      id: 'pos-1',
      token: TOKENS[0], // ETH
      strategy: 'Spatial Arbitrage',
      entryPrice: 3210.50,
      currentPrice: 3250.00,
      amount: 15000,
      pnl: 184.50,
      pnlPercent: 1.23,
      timestamp: Date.now() - 3600000,
      leverage: 1
    },
    {
      id: 'pos-2',
      token: TOKENS[1], // SOL
      strategy: 'Flash Loan Long',
      entryPrice: 142.00,
      currentPrice: 145.50,
      amount: 50000,
      pnl: 1232.00,
      pnlPercent: 2.46,
      timestamp: Date.now() - 7200000,
      leverage: 3
    },
    {
      id: 'pos-3',
      token: TOKENS[4], // UNI
      strategy: 'DEX Triangulation',
      entryPrice: 12.80,
      currentPrice: 12.40,
      amount: 5000,
      pnl: -156.00,
      pnlPercent: -3.12,
      timestamp: Date.now() - 1800000,
      leverage: 1
    }
  ];
};

export const getTradeHistory = (): TradeHistory[] => {
  const history: TradeHistory[] = [];
  for(let i=0; i<8; i++) {
    const isWin = Math.random() > 0.3;
    history.push({
      id: `hist-${i}`,
      token: TOKENS[i % TOKENS.length],
      type: i % 2 === 0 ? 'Arbitrage' : 'Flash Loan',
      profit: isWin ? (Math.random() * 500) : -(Math.random() * 100),
      gasFee: 0.005 + Math.random() * 0.01,
      timestamp: Date.now() - (i * 86400000),
      status: isWin ? 'Success' : 'Reverted',
      hash: '0x' + Math.random().toString(16).substr(2, 40)
    });
  }
  return history;
};

export const getPerformanceData = (): PerformanceData[] => {
  const data: PerformanceData[] = [];
  let cumulative = 1000;
  const now = new Date();
  for(let i=30; i>=0; i--) {
    const dailyProfit = (Math.random() - 0.4) * 200; // slightly biased towards profit
    cumulative += dailyProfit;
    const date = new Date(now.getTime() - i * 86400000);
    data.push({
      date: date.toLocaleDateString([], { month: 'short', day: 'numeric' }),
      profit: dailyProfit,
      cumulative: Math.max(0, cumulative)
    });
  }
  return data;
};
