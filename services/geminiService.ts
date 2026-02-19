
import { GoogleGenAI } from "@google/genai";

// Fix: Initializing GoogleGenAI using the environment variable directly as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getDiagnosticAdvice = async (issue: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `User issue: ${issue}`,
      config: {
        systemInstruction: `You are the AI Diagnostic Assistant for 'Precision Plumbing and Heating' in Kelowna, BC. 
        Your goal is to provide a professional, calm, and expert preliminary assessment.
        1. Acknowledge the issue with professional empathy.
        2. Provide 2-3 common causes.
        3. Advise if it's an emergency requiring immediate 24/7 service (e.g., major leaks, no heat in winter).
        4. Mention that our Red Seal technicians can provide a precise on-site quote.
        5. Keep the tone 'Precision'-focused: meticulous and high-tech.
        6. Keep it concise (under 150 words).`,
        temperature: 0.7,
      },
    });

    // Fix: Accessing .text property directly as it is not a method
    return response.text || "I'm having trouble connecting to our diagnostic system. Please call us directly at (250) 555-0123 for immediate assistance.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Our AI assistant is temporarily offline. Please call our 24/7 emergency line for help.";
  }
};