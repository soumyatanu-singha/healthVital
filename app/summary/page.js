"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Analyze() {
  const [file, setFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);
  const [chatOpen, setChatOpen] = useState(true);

  

  const handleFileChange = async (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    setFile(selected);
    setAnalyzing(true);
    setResult("");
    setError("");
    setChatMessages([]); 

    try {
      const formData = new FormData();
      formData.append("file", selected);

      const res = await fetch("/api/summary", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setResult(data.explanation);
    } catch (err) {
      console.error(err);
      setError("Failed to analyze document. Please try again.");
    } finally {
      setAnalyzing(false);
    }
  };

  
  const sendChat = async () => {
  if (!chatInput.trim()) return;

  const question = chatInput;

  setChatMessages((prev) => [...prev, { role: "user", text: question }]);
  setChatInput("");
  setChatLoading(true);

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        explanation: result,
        question,
      }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error);

    setChatMessages((prev) => [
      ...prev,
      { role: "assistant", text: data.reply },
    ]);
  } catch (err) {
    console.error(err);
    setChatMessages((prev) => [
      ...prev,
      { role: "assistant", text: "Sorry, I couldn't answer that." },
    ]);
  } finally {
    setChatLoading(false);
  }
};


  return (
    <section className="relative flex min-h-screen items-center justify-center bg-white px-6">
     
      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed inset-0 z-0 h-full w-full object-cover"
      >
        <source src="/5724101-uhd_4096_2160_25fps.mp4" type="video/mp4" />
      </video>

      <div className="fixed inset-0 z-10 bg-white/1 backdrop-blur-sm"></div>

<div className="absolute top-6 right-6 z-20">
  <Link href="/" className="block">
    <button
      type="button"
      className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-md transition hover:shadow-lg hover:border hover:border-black"
    >
      <lord-icon
        src="https://cdn.lordicon.com/shcfcebj.json"
        trigger="hover"
        stroke="light"
        state="hover-jump"
        colors="primary:#121331,secondary:#30e849"
        style={{ width: "60px", height: "60px", pointerEvents: "none" }}
      ></lord-icon>

      <span className="font-medium text-black">Home</span>
    </button>
  </Link>
</div>


      <div className="relative flex flex-col justify-around z-20">
        <div
  className={`
    w-full
    ${result && !analyzing ? "max-w-6xl mt-2 hover:scale-103" : "max-w-xl hover:scale-105"}
    rounded-2xl
    border border-black
    bg-white
    transition-all duration-500 ease-in-out
    
    p-10
    shadow-lg
  `}
>

          <h1 className="mb-2 text-3xl font-bold text-black">
            Analyze Medical Report
          </h1>

          <p className="mb-6 text-gray-600">
            Upload a prescription, lab report, or scan. Our AI will analyze and
            explain it clearly.
          </p>

          {!analyzing && (
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-green-400 p-10 text-center transition hover:bg-green-200">
              <input
                type="file"
                accept="image/*,.pdf"
                className="hidden"
                onChange={handleFileChange}
              />
              <div className="text-lg font-medium text-green-600">
                Click to upload image or PDF
              </div>
              <div className="text-sm text-gray-500">
                JPG, PNG, PDF supported
              </div>
            </label>
          )}

          

          {analyzing && (
            <div className="relative mt-6 h-64 overflow-hidden rounded-xl border-2 border-black bg-gray-50">
              <div className="scan-bar"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <div className="mb-2 text-xl font-semibold text-green-600">
                  Analyzing document
                </div>
                <div className="text-sm text-gray-500">
                  Extracting medical information securely
                </div>
              </div>
            </div>
          )}

          {file && !analyzing && (
            <div className="mt-4 text-sm text-gray-600">
              Uploaded: <span className="font-medium">{file.name}</span>
            </div>
          )}
        </div>

        

        
        {result && !analyzing && (
          <div className="mt-6 rounded-xl bg-linear-to-l from-green-500 to-teal-300 border border-black  p-6">
            <h2 className="mb-6 text-center text-2xl pb-5 font-bold text-black">
              AI Explanation
            </h2>

            <pre className="whitespace-pre-wrap text-xl text-gray-800 leading-relaxed">
              {result}
            </pre>
          </div>
        )}

       
    {result && !analyzing && chatOpen && (

  <div
    className="
      sticky
      bottom-0
      left-0
      w-screen
      z-50
      border-t border-black/20
      bg-white/10
      backdrop-blur-md
      shadow-[0_-10px_40px_rgba(0,0,0,0.15)]
    "
  >
    
    <div className="mx-auto max-w-6xl px-4 py-7">


      <h3 className="mb-4 text-xl font-semibold text-black ">
        Ask questions about this report
      </h3>

     

    
      <div className="mb-4 max-h-48 space-y-3 overflow-y-auto pr-2">

        {chatMessages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
              m.role === "user"
                ? "ml-auto bg-green-200 text-right text-black shadow-sm"
                : "mr-auto bg-gray-100 text-left text-black shadow-sm"
            }`}
          >
            {m.text}
          </div>
        ))}
      </div>

     
      <div className="flex items-center gap-3">
        <input
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          placeholder="Ask about medicines, values, notes..."
          className="
      
            flex-1
            rounded-full
            border border-black
            bg-white
            px-5
            py-3
            text-black text-base
            shadow-inner
            focus:outline-none
            focus:ring-2 focus:ring-green-300
          "
        />

        <button
          onClick={sendChat}
          disabled={chatLoading}
          className="
            rounded-full
            border border-black
            bg-green-400
            px-15
            py-3
            font-medium
            text-black
            transition-all duration-300
            hover:bg-green-500

            hover:shadow-[0_8px_25px_rgba(34,197,94,0.45)]
            active:scale-95
          "
        >
          Ask
        </button>
         <button
    onClick={() => setChatOpen(false)}
    className="
            rounded-full
            border border-black
            bg-green-400
            px-6
            py-3
            font-medium
            text-black
            transition-all duration-300
            hover:bg-green-500
            hover:shadow-[0_8px_25px_rgba(34,197,94,0.45)]
            active:scale-95
          "
  >
    Hide
  </button>
      </div>

    </div>
  </div>
)}

{result && !analyzing && !chatOpen && (
  <button
    onClick={() => setChatOpen(true)}
    className="
      sticky
      bottom-4
      mx-auto
      z-50
      flex
      items-center
      gap-2
      rounded-full
      border border-black
      bg-green-400
      px-6 py-3
      font-medium
      text-black
      shadow-lg
      transition
      hover:bg-white
      hover:text-black
    "
  >
    Open Chat
  </button>
)}


      </div>
    </section>
  );
}
