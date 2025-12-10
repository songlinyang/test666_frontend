export interface Token {
  symbol: string;
  name: string;
  logo: string;
}

export interface Exchange {
  id: string;
  name: string;
  type: 'DEX' | 'CEX';
  fee: number; // percentage, e.g., 0.3
}

export interface ArbitrageOpportunity {
  id: string;
  token: Token;
  buyExchange: Exchange;
  sellExchange: Exchange;
  buyPrice: number;
  sellPrice: number;
  spread: number; // percentage
  profitPotential: number; // in USD
  liquidity: number; // in USD
  timestamp: number;
}

export interface MarketDataPoint {
  time: string;
  exchangeA: number;
  exchangeB: number;
}

export interface AIAnalysisResult {
  sentiment: 'Bullish' | 'Bearish' | 'Neutral';
  riskLevel: 'Low' | 'Medium' | 'High';
  summary: string;
  strategy: string;
}
