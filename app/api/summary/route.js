import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "nodejs"; 

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return new Response(
        JSON.stringify({ error: "No file uploaded" }),
        { status: 400 }
      );
    }

    
    const buffer = Buffer.from(await file.arrayBuffer());
    const base64Data = buffer.toString("base64");

    
    const mimeType = file.type || "application/pdf";

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are a medical document assistant.

First generate a summary of the uploaded document and then in the next section :

Analyze the uploaded medical document (prescription, lab report, or scan).
Explain in details and simple language:
- What this document is about
- Key findings
- Medicines mentioned (if any) and their purpose
- Any important notes

Do NOT diagnose disease.
Do NOT give medical advice.
Use digit points.
Do Not use asterisk  .


`;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Data,
          mimeType,
        },
      },
    ]);

    const responseText = result.response.text();

    return new Response(
      JSON.stringify({ explanation: responseText }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Summary API Error:", err);

    return new Response(
      JSON.stringify({ error: "Failed to analyze document" }),
      { status: 500 }
    );
  }
}
