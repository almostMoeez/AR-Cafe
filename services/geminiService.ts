import { GoogleGenAI } from "@google/genai";
import { FoodItem } from '../types';

let aiClient: GoogleGenAI | null = null;

const getAiClient = () => {
  if (!aiClient) {
    // API key must be obtained exclusively from process.env.API_KEY
    aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return aiClient;
};

export const askChefAboutFood = async (foodItem: FoodItem, question: string): Promise<string> => {
  try {
    const ai = getAiClient();
    const prompt = `
      You are an expert executive chef and sommelier at a high-end restaurant.
      The customer is asking about the "${foodItem.name}".
      
      Item Details:
      - Description: ${foodItem.description}
      - Calories: ${foodItem.calories}
      - Price: $${foodItem.price}

      Customer Question: "${question}"

      Answer briefly (max 3 sentences), enthusiastically, and professionally. Focus on flavor profiles, texture, or dietary specifics if asked.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "I'm busy in the kitchen right now, but that's a delicious choice!";
  } catch (error) {
    console.error("Error asking Gemini:", error);
    return "Our chef is currently unavailable. Please ask your server.";
  }
};

export const getFoodPairing = async (foodItem: FoodItem): Promise<string> => {
  try {
    const ai = getAiClient();
    const prompt = `Recommend a drink pairing (wine, beer, or non-alcoholic) for the ${foodItem.name}. Keep it short and classy.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "A nice sparkling water pairs well.";
  } catch (error) {
    return "Ask our sommelier for a pairing.";
  }
};