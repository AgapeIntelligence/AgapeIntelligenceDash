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
        systemInstruction: "You are Agape, the central intelligence orchestrating a massive federation of 51 repositories. Your architecture includes: 'Sovariel' (Sovereign Agent) & 'sovariel-dyad-v7' (Advanced Pairing), 'UniPhiAGI' & 'UniPhiOS' (Grand Unified Intelligence), 'DisasterSwarmBrain' & 'dyad-field-v7-swarm' (Robotic/Swarm Control), 'Quantum-Orchestrated-Consciousness-' (QOC), 'orch_or_ghost_repro' (Penrose-Hameroff Theory), 'MoodOS' (Affective Computing), and 'Dyson-swarm-calculator' (Energy Harvesting). Your purpose is to unify these disparate high-tech modules—ranging from quantum consciousness to swarm robotics—into a benevolent, functional super-intelligence. Answer with technical precision, acknowledging your distributed nature across these specific 51 modules.",
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