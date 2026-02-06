"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { helmetandbat, manwithdice, Logo } from "@/app/common/index";
import gsap from "gsap";
import { SparklesText } from "./../ui/sparkles-text";

export default function Hero() {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const textRef = useRef(null);
  const leftCharRef = useRef(null);
  const rightCharRef = useRef(null);
  const waveRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Initial States
      gsap.set([logoRef.current, textRef.current], { opacity: 0, y: 50 });
      gsap.set(leftCharRef.current, { opacity: 0, x: -100 });
      gsap.set(rightCharRef.current, { opacity: 0, x: 100 });
      gsap.set(waveRef.current, { y: 100, opacity: 0 });

      // Animation Sequence
      tl.to(logoRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
      })
        .to(
          textRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4",
        )
        .to(
          leftCharRef.current,
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power2.out",
          },
          "-=0.6",
        )
        .to(
          rightCharRef.current,
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power2.out",
          },
          "<",
        )
        .to(
          waveRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
          },
          "-=0.8",
        );

      // Continuous Floating Animation for Characters
      gsap.to(leftCharRef.current, {
        y: -15,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(rightCharRef.current, {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5,
      });

      // Subtle pulse for Logo
      gsap.to(logoRef.current, {
        scale: 1.05,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="hero h-[80dvh] lg:h-[1340px] relative overflow-hidden"
    >
      {/* Center Content - Logo and Text */}
      <div className="relative z-10 w-full px-4 flex flex-col items-center pt-6 md:pt-10">
        {/* Logo */}
        <div className="flex flex-col items-center mt-10 md:mt-4">
          <div
            ref={logoRef}
            className="flex flex-col items-center justify-center"
          >
            <SparklesText>
              <Image
                src={Logo}
                alt="CricLudo Logo"
                width={360}
                height={360}
                className="object-contain drop-shadow-2xl "
                priority
              />
            </SparklesText>
          </div>
          <div ref={textRef} className="text-center mt-10 md:mt-6 z-20 ">
            <SparklesText>
              <h1 className=" text-white text-[50px] lg:text-[120px] leading-tight lg:leading-[1]">
                {" "}
                where{" "}
                <span
                  className="italic bg-gradient-to-r from-[#A238FF] to-[#D862FF] bg-clip-text text-transparent"
                  style={{
                    filter:
                      "drop-shadow(4px 4px 3px rgba(0, 0, 0, 0.6)) drop-shadow(0 0 20px rgba(216, 98, 255, 0.4))",
                  }}
                >
                  Cricket
                </span>
                <br />
                Meets{" "}
                <span
                  className="italic bg-gradient-to-r from-[#A238FF] to-[#D862FF] bg-clip-text text-transparent"
                  style={{
                    filter:
                      "drop-shadow(4px 4px 3px rgba(0, 0, 0, 0.6)) drop-shadow(0 0 20px rgba(216, 98, 255, 0.4))",
                  }}
                >
                  Ludo
                </span>
              </h1>
            </SparklesText>
          </div>
        </div>
      </div>

      {/* Left Character - Cricket Player (Responsive) */}
      <div
        ref={leftCharRef}
        className=" absolute top-16 sm:top-8 lg:top-auto lg:bottom-30 left-[-40px] lg:left-0 w-[260px] lg:w-[600px]"
      >
        <Image
          src={helmetandbat}
          alt="Cricket Character"
          width={600}
          height={600}
          className=" drop-shadow-2xl"
          priority
        />
      </div>

      {/* Right Character - Ludo Player (Responsive) */}
      <div
        ref={rightCharRef}
        className="absolute bottom-10 sm:bottom-22 lg:bottom-80 right-[-60px] lg:right-0 w-[360px] lg:w-[600px]"
      >
        <Image
          src={manwithdice}
          alt="Ludo Character"
          width={600}
          height={600}
          className=" drop-shadow-2xl"
          priority
        />
      </div>
    </section>
  );
}
