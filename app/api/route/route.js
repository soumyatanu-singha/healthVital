export const runtime = "nodejs";

export async function POST(req) {
  try {
    const { start, end } = await req.json();

    if (!start || !end) {
      return new Response(
        JSON.stringify({ error: "Start and end required" }),
        { status: 400 }
      );
    }

    const orsKey = process.env.OPENROUTESERVICE_API_KEY;

    const res = await fetch(
      "https://api.openrouteservice.org/v2/directions/driving-car/geojson",
      {
        method: "POST",
        headers: {
          Authorization: orsKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          coordinates: [
            [start.lng, start.lat],
            [end.lng, end.lat],
          ],
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.error("ORS error:", data);
      throw new Error("Routing failed");
    }

    const route = data.features[0];

    return new Response(
      JSON.stringify({
        geometry: route.geometry,
        distance: route.properties.summary.distance,
        duration: route.properties.summary.duration,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Route API error:", err);
    return new Response(
      JSON.stringify({ error: "Failed to fetch route" }),
      { status: 500 }
    );
  }
}
