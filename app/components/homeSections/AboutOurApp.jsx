"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  blackTitanium,
  yellowNike,
} from "@/app/common/index";
import GradientText from "../GradientText.jsx";
import Store from "../Store";

// import { CoolMode } from "../ui/cool-mode";
gsap.registerPlugin(ScrollTrigger);

export default function AboutOurApp() {
  const sectionRef = useRef(null);
  const phoneRef = useRef(null);
  const contentRef = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
        },
      });

      // 1. Phone Animation (First Scroll)
      tl.fromTo(
        phoneRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
        },
      );

      // 2. Text Content Animation (Second Scroll / Next)
      // The ">" tells it to start AFTER the previous animation finishes
      tl.fromTo(
        contentRef.current.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 10.3,
          stagger: 0.2,
          ease: "power3.out",
        },
        ">-=0.5", // Slight overlap for smoothness
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full pb-10 overflow-hidden bg-white"
    >
      <Image
        src={yellowNike}
        className="absolute bottom-20 left-0 w-full"
        alt="yellowNike"
      />
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center pb-20">
        {/* Left Side - Phone Image */}
        <div className="relative flex justify-center" ref={phoneRef}>
          <div className="relative w-[330px] h-[580px] md:w-[350px] md:h-[700px]">
            <Image
              src={blackTitanium}
              alt="Cric Ludo App Interface"
              fill
              className="object-contain drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
              priority
            />
          </div>
        </div>

        {/* Right Side - Content */}
        <div
          ref={contentRef}
          className="flex flex-col items-center md:items-start text-center md:text-left space-y-6 lg:pe-15"
        >
          <div className="space-y-2 mb-0">
            <h3 className="font_three">About</h3>
            <h2 className="font_subheader leading-tight">Our App</h2>
          </div>
          <div className="relative my-3">
            <GradientText text="India’s No.1 Game!" />
          </div>
          <p className="leading-relaxed">
            Cric Ludo, The Popular Ludo Game, Is A Digital Adaptation Of The
            Classic Ludo Board Game Available On Mobile. It Offers Online And
            Offline Multiplayer Modes With Many Features For Nonstop
            Entertainment. With Its Colorful Design, Engaging Gameplay, And
            Nostalgic Appeal, Cric Ludo Has Become One Of The Top Downloaded
            Games Worldwide.
          </p>

          <div className="flex flex-row gap-4 pt-4">
            <Store />
          </div>
        </div>
      </div>
    </section>
  );
}
