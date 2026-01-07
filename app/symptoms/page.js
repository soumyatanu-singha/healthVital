"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";

import "leaflet/dist/leaflet.css";


export default function Symptoms() {
  const [symptomText, setSymptomText] = useState("");
  const [listening, setListening] = useState(false);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [specialist, setSpecialist] = useState("");
  const [explanation, setExplanation] = useState("");
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState("");
  const mapRef = useRef(null);
const leafletMapRef = useRef(null);
const markersRef = useRef([]);
const routeMapRef = useRef(null);
const routeLeafletMapRef = useRef(null);
const routeLineRef = useRef(null);
const [selectedDoctor, setSelectedDoctor] = useState(null);



  const recognitionRef = useRef(null);

  


  /* Speech recognition */
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSymptomText((prev) =>
        prev ? prev + " " + transcript : transcript
      );
    };

    recognitionRef.current = recognition;
  }, []);

  const startListening = () => {
    if (!recognitionRef.current) return;
    listening
      ? recognitionRef.current.stop()
      : recognitionRef.current.start();
  };

  /* Get user location */
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }),
      () =>
        setError(
          "Location access is required to find nearby doctors."
        )
    );
  }, []);

  /* Submit symptoms */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!symptomText || !location) return;

    setLoading(true);
    setError("");
    setSpecialist("");
    setExplanation("");
    setPlaces([]);

    try {
      const res = await fetch("/api/symptoms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          symptoms: symptomText,
          location,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setSpecialist(data.specialist);
      setExplanation(data.explanation);
      setPlaces(data.places);
    } catch {
      setError("Failed to fetch specialist information.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  if (!mapRef.current || leafletMapRef.current ) return;

  
    const map = L.map(mapRef.current).setView(
      [location.lat, location.lng],
      13
    );

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    setTimeout(() => map.invalidateSize(), 200);

    leafletMapRef.current = map;
  });

 // Add places here so it re-checks when data arrives

useEffect(() => {
  const map = leafletMapRef.current;
  if (!map) return;

  import("leaflet").then((L) => {
    // Remove old markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    // User marker
    if (location) {
      const userMarker = L.marker([location.lat, location.lng])
        .addTo(map)
        .bindPopup("You are here");
      markersRef.current.push(userMarker);
    }

    // Doctor markers
    // Doctor markers
    places.forEach((p) => {
        if (p.lat && p.lng) {
          const popupContent = `
            <div style=" min-width:200px" >
              <h4 style="font-weight:bold">${p.name}</h4>
              ${p.address ? `<p>${p.address}</p>` : ""}
              ${p.phone ? `<p>${p.phone}</p>` : ""}
              ${p.website ? `<a href="${p.website}" target="_blank">Visit website</a>` : ""}
            </div>
          `;
          markersRef.current.push(
            L.marker([p.lat, p.lng]).addTo(map).bindPopup(popupContent)
          );
        }
      });
    });
  }, [places, location]);

useEffect(() => {
  if (!routeMapRef.current) return;
  if (routeLeafletMapRef.current) return;
  if (!location) return;

  const map = L.map(routeMapRef.current).setView(
    [location.lat, location.lng],
    13
  );

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  setTimeout(() => map.invalidateSize(), 200);

  routeLeafletMapRef.current = map;
}, [location, selectedDoctor]); // 👈 THIS IS CRITICAL



useEffect(() => {
  if (!selectedDoctor || !location || !routeLeafletMapRef.current) return;

  const map = routeLeafletMapRef.current;

  const drawRoute = async () => {
    const url = `https://router.project-osrm.org/route/v1/driving/${location.lng},${location.lat};${selectedDoctor.lng},${selectedDoctor.lat}?overview=full&geometries=geojson`;

    const res = await fetch(url);
    const data = await res.json();

    if (!data.routes?.length) return;

    if (routeLineRef.current) {
      map.removeLayer(routeLineRef.current);
    }

    routeLineRef.current = L.geoJSON(data.routes[0].geometry, {
      style: { color: "#3b82f6", weight: 6 },
    }).addTo(map);

    map.fitBounds(routeLineRef.current.getBounds());
  };

  drawRoute();
}, [selectedDoctor, location]);




  return (
    <>
      {/* ================= HERO SECTION (UNCHANGED UI) ================= */}
      <section className="relative comfortaa-bold flex items-center justify-center bg-green-300 py-32">
        {/* HOME BUTTON */}
        <div className="absolute top-6 right-6 z-20">
          <Link href="/">
            <button className="flex items-center gap-2 rounded-full hover:border-black hover:border bg-white px-4 py-2 shadow-md transition hover:shadow-lg">
              <lord-icon
                src="https://cdn.lordicon.com/shcfcebj.json"
                trigger="hover"
                stroke="light"
                state="hover-jump"
                colors="primary:#121331,secondary:#0000"
                style={{width: "60px", height: "60px" }}
              ></lord-icon>
              <span className="font-medium text-black">Home</span>
            </button>
          </Link>
        </div>

        <div className="relative grid w-4/5 grid-cols-1 items-center gap-16 md:grid-cols-2">
          {/* LEFT SIDE */}
          <div className="relative">
            <div className="h-145 w-115 rounded-3xl bg-green-500"></div>

            <div className="absolute -top-12 -left-12 h-140 w-110 overflow-hidden rounded-3xl shadow-2xl shadow-black/40 transition-all duration-500 ease-out hover:-translate-y-3 hover:-translate-x-3 hover:scale-[1.03] hover:shadow-[0_20px_60px_rgba(34,197,94,0.35)]">
              <video
                className="h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              >
                <source
                  src="/6801289-uhd_2160_3840_25fps.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6">
            <h2 className="text-5xl font-bold text-black">
              AI that cares for you
            </h2>

            <p className="text-lg text-gray-700">
              Tell us how you’re feeling. Our AI will guide you to the right
              specialist based on your symptoms and location.
            </p>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="flex flex-col">
                <label className="mb-2 text-lg font-medium text-black">
                  Describe what you are feeling now
                </label>

                <textarea
                  rows={4}
                  value={symptomText}
                  onChange={(e) => setSymptomText(e.target.value)}
                  placeholder="For example: I have chest pain and shortness of breath..."
                  className="rounded-lg border border-black p-4 text-gray-800 focus:border-black focus:outline-none focus:ring-2 focus:ring-green-200"
                />
              </div>

             
              <div className="flex justify-around">
                 {/* VOICE */}
              <button
  type="button"
  onClick={startListening}
  className={`flex items-center gap-3 rounded-full border px-5 py-3 font-medium transition ${
    listening
      ? "bg-green-500 border-black text-black shadow-md"
      : "bg-white border-green-500 text-black hover:bg-linear-to-l from-green-500 to-teal-300 hover:border hover:border-black hover:text-black"
  }`}
>
  <img
    src="/mic.svg"
    alt="Mic"
    className={`h-5 w-5 ${listening ? "invert" : ""}`}
  />
  {listening ? "Stop listening" : "Speak symptoms"}
</button>


              {/* SUBMIT */}
              <button
                type="submit"
                className="block w-fit rounded-lg hover:border hover:bg-linear-to-l from-green-500 to-teal-300 hover:border-black bg-green-500 px-6 py-3 font-semibold text-black transition-all border-black hover:bg-green-300 hover:text-black hover:shadow-md"
                disabled={!symptomText.trim()}
              >
                Find the right specialist
              </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ================= RESULTS ================= */}
      {(loading || specialist || error) && (
        <section className="bg-green-300 px-10 comfortaa-bold pb-32">
          <div className="mx-auto max-w-4xl space-y-6">
            {loading && (

               <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin">
              <p className="text-green-600 font-medium">
                Finding the right specialist near you…
              </p>
              </span>
            )}

            {error && (
              <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-red-700">
                {error}
              </div>
            )}

           {specialist && (

           
  <div className="relative overflow-hidden rounded-2xl bg-white border-black p-1">
    <div className="absolute  inset-0 bg-black"></div>
    
   

    {/* main card */}
    <div className="
      relative
      rounded-xl
      border border-black/20
    bg-linear-to-b from-green-500 to-teal-300
      backdrop-blur-md
      pl-15 
      pr-15
      pt-15
      pb-70
      shadow-[0_20px_45px_rgba(34,197,94,0.35)]
    ">
      <h3 className="text-4xl pb-10 text-center font-bold text-black">
        Recommended Specialist: {specialist}
      </h3>

      <p className="mt-3 whitespace-pre-wrap text-center text-black leading-relaxed">
        {explanation}
      </p>
    </div>
  </div>
 
)}

          </div>
        </section>
      )}

      {/* ================= MAP ================= */}
   {places.length > 0 && location && (
  <section className="bg-white flex  px-10 pb-32">
    <div className="mx-auto  max-w-6xl">
   <h2
  className="
    mb-6

    text-center

    text-black
    text-5xl
    tracking-wide
    comfortaa-bold
    
  "
>
  <span className="inline-block pb-5 bg-white   pt-3  animate-reveal">
    Nearby Doctors and Clinics
  </span>
</h2>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* LEFT COLUMN — DOCTOR LIST */}
        <div className="space-y-6 bg-linear-to-b from-green-500 to-teal-300 max-h-150 overflow-y-auto p-3 rounded-2xl shadow-inner">
  {places.map((p, i) => (
    <div
      key={i}
      onClick={() => setSelectedDoctor(p)}
      className="
        group
        relative
        rounded-2xl
        border border-black/10
        bg-white/80
        backdrop-blur-md
        p-5
        transition-all duration-300 ease-out
        hover:-translate-y-1
        hover:shadow-[0_18px_45px_rgba(34,197,104,0.95)]
      "
    >
      {/* Accent strip */}
      <div className="absolute left-0 top-0 h-full w-1 rounded-l-2xl bg-black"></div>

      <h3 className="text-lg font-semibold text-black tracking-tight">
        {p.name}
      </h3>

      {p.address && (
        <p className="mt-1 text-sm text-gray-700 leading-relaxed">
          {p.address}
        </p>
      )}

      {p.phone && (
        <p className="mt-1 text-sm text-gray-700">
          {p.phone}
        </p>
      )}

      {p.website && (
        <a
          href={p.website}
          target="_blank"
          rel="noopener noreferrer"
          className="
            mt-2
            inline-flex
            items-center
            gap-1
            text-sm
            font-medium
            text-green-700
            hover:text-green-900
            transition
          "
        >
          Visit website
          <span className="transition group-hover:translate-x-1">→</span>
        </a>
      )}
    </div>
  ))}
</div>

        {/* RIGHT COLUMN — MAP */}
        <div
          ref={mapRef}
          className="rounded-2xl  shadow-xl"
          style={{ height: "100%", width: "100%" }}
        />
      </div>
    </div>
  </section>
)}





{/* ================= VOICE LISTENING MODAL ================= */}
{listening && (
  <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/10 backdrop-blur-md">
    <div className="relative flex h-48 w-48 items-center justify-center">
      
      {/* Outer pulse */}
      <div className="absolute h-full w-full animate-ping rounded-full bg-green-300"></div>

      {/* Middle glow */}
      <div className="absolute h-36  w-36 animate-pulse rounded-full bg-green-600 blur-xl"></div>

      {/* Center mic */}
      <div className="relative flex border border-black h-24 w-24 items-center justify-center rounded-full bg-green-400 shadow-[0_0_40px_rgba(34,197,94,2.0)]">
        <img
          src="/mic.svg"
          alt="Listening"
          className="h-10 w-10 "
        />
      </div>

    </div>
  </div>
)}


{selectedDoctor && location && (
  <section className="bg-white px-10 pb-32">
    <h2 className="mb-6 text-center text-4xl comfortaa-bold text-black">
      Route to {selectedDoctor.name}
    </h2>

    <div
      ref={routeMapRef}
      className="w-full rounded-3xl shadow-2xl"
      style={{ height: "500px" }}
    />
  </section>
)}


    </>
  );
}
