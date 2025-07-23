
import { GoogleGenAI } from "@google/genai";

// Ensure the API key is available in the environment variables
if (!process.env.API_KEY) {
  // In a real app, you might want to handle this more gracefully.
  // For this example, we'll log an error.
  console.error("API_KEY environment variable not set. Gemini features will be disabled.");
}

// Initialize the GoogleGenAI client if the API key exists
const ai = process.env.API_KEY ? new GoogleGenAI({ apiKey: process.env.API_KEY }) : null;

export const generateDescription = async (itemName: string, category: string): Promise<string> => {
  if (!ai) {
    return "AI service is unavailable. Please write a description manually.";
  }

  const prompt = `Create a short, appealing menu description for an item named "${itemName}" in the "${category}" category for a pub menu. The description should be one sentence and make it sound delicious. Do not use asterisks or markdown.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.8,
        maxOutputTokens: 50,
        thinkingConfig: { thinkingBudget: 0 } // faster response for UI
      }
    });
    
    // Using the direct .text accessor
    const text = response.text;
    
    // Clean up the response, removing potential quotes
    return text.trim().replace(/^"|"$/g, '');
  } catch (error) {
    console.error("Error generating description with Gemini:", error);
    return "Failed to generate AI description. Please try again or write one manually.";
  }
};
