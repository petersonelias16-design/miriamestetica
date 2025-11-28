import { GoogleGenAI } from "@google/genai";
import { GroundingMetadata } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// Helper to convert File to Base64
export const fileToGenerativePart = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      // Remove data url prefix (e.g. "data:image/jpeg;base64,")
      const base64Data = base64String.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * Edit an image using Gemini 2.5 Flash Image ("Nano banana powered").
 * Users can ask to "Add a retro filter" or "Remove background".
 */
export const editImage = async (base64Image: string, prompt: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash-image';
    
    const response = await ai.models.generateContent({
      model,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/png', // Assuming PNG for simplicity/compatibility
              data: base64Image,
            },
          },
          {
            text: `Edit this image: ${prompt}. Return ONLY the image.`
          },
        ],
      },
    });

    // Check for image in response parts
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    
    throw new Error("No image generated.");
  } catch (error) {
    console.error("Error editing image:", error);
    throw error;
  }
};

/**
 * Beauty Advisor Chat using Search Grounding.
 */
export const askBeautyAdvisor = async (query: string): Promise<{ text: string, sources: { title: string, uri: string }[] }> => {
  try {
    const model = 'gemini-2.5-flash';
    
    const response = await ai.models.generateContent({
      model,
      contents: query,
      config: {
        tools: [{ googleSearch: {} }],
        systemInstruction: "You are a sophisticated, kind, and professional beauty advisor for Miriah Estética. Answer questions about beauty trends, skincare, and aesthetics treatments. Be concise and elegant. Always use search to provide up-to-date information.",
      },
    });

    const text = response.text || "I apologize, I couldn't generate a response at this moment.";
    
    // Extract grounding chunks for sources
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks as any[] || [];
    const sources = groundingChunks
      .filter(chunk => chunk.web)
      .map(chunk => ({
        title: chunk.web.title,
        uri: chunk.web.uri
      }));

    return { text, sources };
  } catch (error) {
    console.error("Error asking advisor:", error);
    throw error;
  }
};