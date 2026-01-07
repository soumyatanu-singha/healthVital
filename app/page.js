"use client"

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black">

      
      <nav className="absolute top-6 left-1/2 z-10 w-[90%] -translate-x-1/2 rounded-xl bg-white/10 backdrop-blur-sm border-2 border-black transition-all duration-300
  hover:shadow-[0_0_60px_rgba(255,255,255,0.70)]">


        <div className="mx-auto comfortaa-bold flex max-w-7xl items-center justify-between px-8 py-6">
          <h1 className="text-4xl   text-white ">Healthvital</h1>
          <ul className="flex gap-6 font-medium">
            <li className="cursor-pointer text-xl text-white hover:text-green-600">Home</li>
            <li className="cursor-pointer text-xl text-white hover:text-green-600">About</li>
            <li className="cursor-pointer text-xl text-white hover:text-green-600">How It Works</li>
            <li className="cursor-pointer text-xl text-white hover:text-green-600">Contact</li>
          </ul>
        </div>
      </nav>

      
      <section className="relative h-full w-full">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/14916449_1920_1080_30fps.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 comfortaa-bold flex items-center justify-center">
          <div className="rounded-lg px-10 py-10 text-center shadow-lg">
            <h2 className="mb-2 text-6xl font-bold text-white">
              Find the Right Specialist
            </h2>
            <p className="text-white">
              Describe your symptoms and get guided to the right care.
            </p>
          </div>
        </div>
      </section>

      
      <section className="flex h-[50vh] items-center  justify-center bg-white">
        <div className="grid w-4/5 grid-cols-1 gap-6 md:grid-cols-3">
          
         <div className="
  rounded-xl bg-white p-10 text-center
  transition-all duration-300 ease-out
  border border-transparent
  hover:border-green-500
  hover:shadow-[0_10px_40px_rgba(34,197,94,0.25)]
  hover:-translate-y-2
">

            <h3 className="mb-2 text-4xl sansita-extrabold font-semibold text-green-600">
              Symptom Based
            </h3>
            <p className="text-gray-700 comfortaa-bold">
              Enter symptoms in plain language. AI maps them to the right
              medical specialty.
            </p>
          </div>

         <div className="
  rounded-xl bg-white p-10 text-center
  transition-all duration-300 ease-out
  border border-transparent
  hover:border-green-500
  hover:shadow-[0_10px_40px_rgba(34,197,94,0.25)]
  hover:-translate-y-2
">

            <h3 className="mb-2 text-4xl font-semibold sansita-extrabold text-green-600">
              Location Aware
            </h3>
            <p className="text-gray-700 comfortaa-bold">
              Nearby doctors and clinics are shown on an interactive map.
            </p>
          </div>

         <div className="
  rounded-xl bg-white p-10 text-center
  transition-all duration-300 ease-out
  border border-transparent
  hover:border-green-500
  hover:shadow-[0_10px_40px_rgba(34,197,94,0.25)]
  hover:-translate-y-2
">

            <h3 className="mb-2 sansita-extrabold text-4xl font-semibold text-green-600">
              Safe & Ethical
            </h3>
            <p className="text-gray-700 comfortaa-bold">
              No diagnosis. Only guidance to licensed medical professionals.
            </p>
          </div>

        </div>
      </section>



    
<section className="relative flex items-center justify-center comfortaa-bold bg-white py-32">
  <div className="relative grid w-4/5 grid-cols-1 items-center gap-16 md:grid-cols-2">

   
    <div className="relative">
      
      <div className="h-150 w-120 rounded-3xl  bg-green-300"></div>

   
      <div className="absolute -top-12 -left-12 h-145 w-110 overflow-hidden rounded-3xl shadow-black shadow-2xl ">
        <video
          className="h-full  w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/7199220-uhd_2160_3840_25fps.mp4" type="video/mp4" />
        </video>
      </div>
    </div>

   
    <div className="space-y-6">
      <h2 className="text-5xl font-bold text-black">
        AI that cares for you 
      </h2>

      <p className="text-lg text-gray-700">
        Healthvital leverages AI to connect you with the right specialist based on
        your symptoms , locates nearby doctor specific to your need and explain your prescription within seconds. 
      </p>

      <p className="text-lg text-gray-700">
        We focus to bridge the gap between you and your trusted doctor. An AI to safely guide you through.
      </p>
<Link href="/symptoms">
      <button className="rounded-lg bg-green-400 px-6 py-3 font-semibold text-white transition hover:bg-green-200 hover:border hover:border-black hover:text-black">
        Write your symptoms
      </button>
      </Link>
    </div>

  </div>
</section>


<section className="relative comfortaa-bold bg-white py-32">
  <div className="mx-auto w-4/5 space-y-24">

   
    <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">
      
      
      <div className="relative">
        <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-green-300 to-green-500 blur-2xl opacity-40"></div>

        <div className="relative overflow-hidden rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
          <img
            src="/download (1).jfif"
            alt="Doctor consultation"
            className="h-[420px] w-full object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>
      </div>

      
      <div className="space-y-6">
        <h3 className="text-5xl font-bold text-black">
          Trusted medical guidance
        </h3>

        <p className="text-lg text-gray-700">
          Upload your prescription and let AI explain it clearly in seconds.
          Understand medicines, dosage, and intent — without confusion.
        </p>

        <Link href="/summary">
          <button className="
            rounded-full
              border-2 border-green-500
            px-8 py-3
            font-semibold
            text-black
            transition-all
           hover:bg-linear-to-l from-green-500 to-teal-300
            hover:text-black
            hover:shadow-[0_15px_40px_rgba(34,197,94,0.45)]
          ">
            Prescription Analyzer
          </button>
        </Link>
      </div>
    </div>

    
    <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">

      <div className="space-y-6 order-2 md:order-1">
        <h3 className="text-5xl font-bold text-black">
          Care near your location
        </h3>

        <p className="text-lg text-gray-700">
          Instantly discover nearby clinics and hospitals on an interactive map,
          tailored to your symptoms and location.
        </p>

        <Link href="/symptoms">
          <button className="
            rounded-full
            border-2 border-green-500
            px-8 py-3
             
            font-semibold
            text-black
            transition-all
           hover:bg-linear-to-l from-green-500 to-teal-300
            
            hover:shadow-[0_15px_40px_rgba(34,197,94,0.45)]
          ">
            View nearby care
          </button>
        </Link>
      </div>

      
      <div className="relative order-1 md:order-2">
        <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-green-300 to-green-500 blur-2xl opacity-40"></div>

        <div className="relative overflow-hidden rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
          <img
            src="/La Pharmacie De Santé Médicale Et Vecteur Modèle Logo Modèle de téléchargement gratuit sur Pngtree.jfif"
            alt="Healthcare map"
            className="h-[420px] w-full object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>
      </div>

    </div>

  </div>
</section>



      <footer className="bg-green-500 py-10 text-center text-white">
        <div className="mb-2 flex justify-center gap-12 font-medium">
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Terms</a>
          <a href="#" className="hover:underline">Contact</a>
        </div>
        <p className="text-sm mb-5">
          © 2025 healthVital. All rights reserved.
        </p>

        <lord-icon
    src="https://cdn.lordicon.com/bhsmoehw.json"
    trigger="hover"
    colors="primary:#121331,secondary:#0000"
    style={{ width: "90px", height: "90px" }}>
</lord-icon>
      </footer>

    </div>
  );
}
