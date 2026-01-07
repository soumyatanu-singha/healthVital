import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "nodejs";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    
    const { explanation, question } = await req.json();

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
      You are a medical document assistant. 
      Based on this analysis: ${explanation}
      
      User Question: ${question}
      
      Answer clearly in simple language. Do not use asterisks. Do not give medical advice.
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    return new Response(
      JSON.stringify({ reply: responseText }), 
      { status: 200 }
    );
  } catch (err) {
    console.error("Chat Error:", err);
    return new Response(JSON.stringify({ error: "Chat failed" }), { status: 500 });
  }
}