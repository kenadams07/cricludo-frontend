"use client";
import React from "react";
import PlayNowButton from "../ui/PlayNowButton";
import { cCrush } from "@/app/common";
import Image from "next/image";
export default function DownloadBanner() {

  return (
    <div className="w-full md:px-0 candySection ">
      <div
        className="One game.
Endless funcontainer relative w-full mx-auto rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-12 gap-8"
        style={{
          background:
            "linear-gradient(90deg, #020024 0%, #090979 35%, #00d4ff 100%)", // Deep blue to bright blue gradient
        }}
      >
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600 rounded-full blur-[100px] opacity-30 pointer-events-none"></div>

        {/* Text Content */}
        <div className="relative z-10 text-center md:text-left max-w-3xl">
          <h2
            className={`text-3xl md:text-5xl lg:text-5xl text-white leading-tight drop-shadow-lg `}
          >
            Your Phone, Your Stadium. <br className="hidden md:block" />
            Download Cric Ludo Today.
          </h2>
        </div>

        {/* CTA Button */}
        <div className="relative z-10 flex-shrink-0">
          <PlayNowButton text="Download Now" />
        </div>
      </div>
      <Image src={cCrush} alt="cCrush" height={400} className=" pt-20 candySection" />
    </div>
  );
}
