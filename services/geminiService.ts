
import { GoogleGenAI, Type } from "@google/genai";
import type { BusinessName } from '../types.ts';

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

export const generateBusinessNames = async (description: string, apiKey: string): Promise<BusinessName[]> => {
  if (!apiKey) {
    throw new Error("API key is missing.");
  }

  try {
    const ai = new GoogleGenAI({ apiKey: apiKey });

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
    if (!text.startsWith('[') || !text.endsWith(']')) {
      throw new Error("Received an invalid response format from the API.");
    }
    const parsedNames: BusinessName[] = JSON.parse(text);
    return parsedNames;

  } catch (error) {
    console.error("Error generating business names:", error);
    if (error instanceof Error && error.message.includes('API key not valid')) {
        throw new Error("The provided API key is not valid. Please check your key and try again.");
    }
    throw new Error("Failed to communicate with the Gemini API. Check your network or API key.");
  }
};
