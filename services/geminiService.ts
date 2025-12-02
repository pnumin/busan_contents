import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey });

export const generateProposalImage = async (proposalTitle: string, visualDescription: string): Promise<string | null> => {
  if (!apiKey) {
    console.error("API Key is missing");
    return null;
  }

  try {
    const prompt = `Create a modern, clean, flat-design infographic style illustration for a tourism proposal titled "${proposalTitle}". 
    Visual context: ${visualDescription}. 
    Style: Minimalist, vibrant colors (ocean blues, sunset oranges), infographic vector art style. No text in the image.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image', // Nano Banana
      contents: {
        parts: [
          { text: prompt }
        ]
      },
      config: {
        imageConfig: {
            aspectRatio: "16:9",
        }
      }
    });

    // Iterate to find image part
    // Fix: Explicitly check for candidates and parts to avoid TS2532 error
    if (response.candidates && response.candidates.length > 0) {
      const candidate = response.candidates[0];
      if (candidate.content && candidate.content.parts) {
        for (const part of candidate.content.parts) {
          if (part.inlineData && part.inlineData.data) {
            return `data:image/png;base64,${part.inlineData.data}`;
          }
        }
      }
    }
    return null;
  } catch (error) {
    console.error("Error generating image:", error);
    return null;
  }
};

export const generateAiAdvice = async (query: string): Promise<string> => {
  if (!apiKey) return "API Key not configured.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are an expert Busan Tourism Consultant. Based on the "Busan New Tourism Content Development Strategy Ver 2.0", answer the following user query briefly and helpfully in Korean. 
      
      User Query: ${query}`,
    });
    return response.text || "죄송합니다. 답변을 생성할 수 없습니다.";
  } catch (error) {
    console.error("Error generating text:", error);
    return "오류가 발생했습니다. 다시 시도해주세요.";
  }
};