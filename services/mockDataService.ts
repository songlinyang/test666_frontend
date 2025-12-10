import { ArbitrageOpportunity, Exchange, Token, MarketDataPoint } from "../types";

const TOKENS: Token[] = [
  { symbol: 'ETH', name: 'Ethereum', logo: 'https://picsum.photos/id/1/24/24' },
  { symbol: 'SOL', name: 'Solana', logo: 'https://picsum.photos/id/2/24/24' },
  { symbol: 'WBTC', name: 'Wrapped BTC', logo: 'https://picsum.photos/id/3/24/24' },
  { symbol: 'LINK', name: 'Chainlink', logo: 'https://picsum.photos/id/4/24/24' },
  { symbol: 'UNI', name: 'Uniswap', logo: 'https://picsum.photos/id/5/24/24' },
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
  'UNI': 12.40
};

export const generateOpportunities = (): ArbitrageOpportunity[] => {
  const opportunities: ArbitrageOpportunity[] = [];

  // Generate 5-8 random opportunities
  const count = 5 + Math.floor(Math.random() * 4);

  for (let i = 0; i < count; i++) {
    const token = TOKENS[Math.floor(Math.random() * TOKENS.length)];
    const buyEx = EXCHANGES[Math.floor(Math.random() * EXCHANGES.length)];
    let sellEx = EXCHANGES[Math.floor(Math.random() * EXCHANGES.length)];
    
    while (sellEx.id === buyEx.id) {
      sellEx = EXCHANGES[Math.floor(Math.random() * EXCHANGES.length)];
    }

    const basePrice = BASE_PRICES[token.symbol];
    const variance = basePrice * 0.02; // 2% max variance
    
    // Ensure sell price is higher for the "opportunity"
    const price1 = basePrice + (Math.random() * variance - (variance/2));
    const price2 = basePrice + (Math.random() * variance - (variance/2));
    
    const buyPrice = Math.min(price1, price2);
    const sellPrice = Math.max(price1, price2);
    
    const spread = ((sellPrice - buyPrice) / buyPrice) * 100;
    const liquidity = 10000 + Math.random() * 500000;
    
    // Simple profit calc: (spread - fees) * rough trade size
    const tradeSize = 10000; // Assume $10k trade
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
  const basePrice = BASE_PRICES[tokenSymbol];
  let currentA = basePrice;
  let currentB = basePrice * 1.005;

  const now = new Date();
  
  for (let i = 20; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60000);
    
    // Random walk
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
