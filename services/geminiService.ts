import { GoogleGenAI, Type } from "@google/genai";
import { ArbitrageOpportunity } from "../types";

const apiKey = process.env.API_KEY || '';

// Initialize only if key exists (handled gracefully in UI if not)
const ai = new GoogleGenAI({ apiKey });

export const analyzeArbitrageOpportunity = async (opportunity: ArbitrageOpportunity): Promise<string> => {
  if (!apiKey) {
    return "API Key is missing. Please configure your environment to use AI analysis.";
  }

  const prompt = `
    You are a senior DeFi Quant Analyst. Analyze the following arbitrage opportunity:
    
    Asset: ${opportunity.token.symbol}
    Buy at: ${opportunity.buyExchange.name} ($${opportunity.buyPrice.toFixed(4)})
    Sell at: ${opportunity.sellExchange.name} ($${opportunity.sellPrice.toFixed(4)})
    Spread: ${opportunity.spread.toFixed(2)}%
    Liquidity: $${opportunity.liquidity.toLocaleString()}
    
    Provide a concise risk assessment (under 50 words) considering liquidity, exchange volatility, and potential gas fees.
    Do not use markdown formatting like bolding, just plain text.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 } // Disable thinking for faster, simpler response
      }
    });
    return response.text || "Analysis unavailable.";
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return "Could not generate analysis at this time.";
  }
};

export const getMarketSentiment = async (): Promise<any> => {
  if (!apiKey) return null;

  const prompt = "Generate a fictional but realistic current crypto market sentiment analysis for ETH, BTC, and SOL. Return JSON.";
  
  try {
     const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overall_sentiment: { type: Type.STRING },
            trending_narratives: { type: Type.ARRAY, items: { type: Type.STRING } },
            volatility_index: { type: Type.NUMBER }
          }
        }
      }
    });
    
    return JSON.parse(response.text || "{}");
  } catch (e) {
    console.error(e);
    return null;
  }
}
