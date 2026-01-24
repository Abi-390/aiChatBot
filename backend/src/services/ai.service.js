const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateResponse(prompt) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini error:", error);

   
    if (error.status === 503) {
      return "🤖 AI is busy right now. Please try again.";
    }

    if (error.status === 404) {
      return "⚠️ AI model configuration error.";
    }

    return "❌ AI failed to respond.";
  }
}

module.exports = generateResponse;
