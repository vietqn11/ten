
import { GoogleGenAI, Type } from "@google/genai";
import type { BusinessName } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      name: {
        type: Type.STRING,
        description: "A creative and catchy business name.",
      },
      slogan: {
        type: Type.STRING,
        description: "A short, memorable slogan for the business.",
      },
    },
    required: ["name", "slogan"],
  },
};

export const generateBusinessNames = async (description: string): Promise<BusinessName[]> => {
  try {
    const prompt = `
      You are a world-class branding expert. Based on the following business description, generate 10 creative, unique, and memorable business names.
      For each name, also provide a short, catchy slogan.

      Business Description: "${description}"

      Return the results in a clean JSON array format.
    `;
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.8,
        topP: 0.9,
      },
    });

    const text = response.text.trim();
    const parsedNames: BusinessName[] = JSON.parse(text);
    return parsedNames;

  } catch (error) {
    console.error("Error generating business names:", error);
    throw new Error("Failed to communicate with the Gemini API.");
  }
};
