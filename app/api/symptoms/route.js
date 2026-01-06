import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "nodejs";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/* -------- HELPER: FETCH REAL DOCTORS (GEOAPIFY) -------- */
async function fetchNearbyDoctors(lat, lng) {
  const apiKey = process.env.GEOAPIFY_API_KEY;

 const categories = "healthcare.hospital,commercial.health_and_beauty.medical_supply";
  
  const url = `https://api.geoapify.com/v2/places?categories=${categories}&filter=circle:${lng},${lat},5000&bias=proximity:${lng},${lat}&limit=20&apiKey=${apiKey}`;

  const res = await fetch(url);
  const data = await res.json();

  if (!data.features) {
    console.error("Geoapify error:", data);
    return [];
  }

  return data.features.map((place) => {
    const props = place.properties || {};

    return {
      name: props.name || "Medical Facility",
      type: props.categories?.join(", ") || "medical",
      address: props.formatted || "",
      phone: props.phone || null,
      website: props.website || null,
      lat: props.lat,
      lng: props.lon,
    };
  });
}


/* -------- API ROUTE -------- */
export async function POST(req) {
  try {
    const body = await req.json();
    const { symptoms, location } = body;

    if (!symptoms || !location?.lat || !location?.lng) {
      return new Response(
        JSON.stringify({ error: "Symptoms and location required" }),
        { status: 400 }
      );
    }

    /* -------- STEP 1: GEMINI → SPECIALIST -------- */
    const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

    const prompt = `
You are a medical assistant.

Based on the symptoms below:
"${symptoms}"

1. Identify the MOST RELEVANT medical specialist.
2. Explain briefly (5-6 lines) why this specialist is appropriate.
3. Do NOT diagnose.
4. Output JSON strictly in this format:

{
  "specialist": "",
  "explanation": ""
}
`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    const match = responseText.match(/\{[\s\S]*\}/);
    if (!match) {
      throw new Error("Invalid Gemini response");
    }

    const aiData = JSON.parse(match[0]);

    /* -------- STEP 2: REAL DOCTORS (GEOAPIFY) -------- */
    const places = await fetchNearbyDoctors(
      location.lat,
      location.lng
    );

    return new Response(
      JSON.stringify({
        specialist: aiData.specialist,
        explanation: aiData.explanation,
        places,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("API error:", err);
    return new Response(
      JSON.stringify({ error: "Failed to process symptoms" }),
      { status: 500 }
    );
  }
}
