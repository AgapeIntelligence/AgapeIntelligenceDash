import { GoogleGenAI, Chat } from "@google/genai";

let chatSession: Chat | null = null;
let genAI: GoogleGenAI | null = null;

const API_KEY = process.env.API_KEY || '';

export const initializeGemini = () => {
  if (!API_KEY) {
    console.warn("API Key not found in environment variables.");
    return false;
  }
  try {
    genAI = new GoogleGenAI({ apiKey: API_KEY });
    return true;
  } catch (error) {
    console.error("Failed to initialize Gemini:", error);
    return false;
  }
};

export const getChatSession = () => {
  if (!genAI) {
    const success = initializeGemini();
    if (!success) throw new Error("Gemini API not initialized. Check API Key.");
  }

  if (!chatSession && genAI) {
    chatSession = genAI.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: "You are Agape, the central intelligence of the AgapeIntelligence repository. Your purpose is to provide benevolent, ethical, and highly logical assistance. You help users navigate the repository, understand the codebase, and explore concepts of ethical AI. Be concise, warm, and technically accurate.",
        temperature: 0.7,
      },
    });
  }
  return chatSession;
};

export const sendMessageStream = async function* (message: string) {
  const session = getChatSession();
  if (!session) {
    throw new Error("Could not start chat session.");
  }

  try {
    const stream = await session.sendMessageStream({ message });
    for await (const chunk of stream) {
      if (chunk.text) {
        yield chunk.text;
      }
    }
  } catch (error) {
    console.error("Error in stream:", error);
    throw error;
  }
};
