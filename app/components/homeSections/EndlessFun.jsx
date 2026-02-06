"use client";
import { BrownArrow, family } from "@/app/common";
import PlayNowButton from "../ui/PlayNowButton";
import Image from "next/image";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function EndlessFun() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const buttonRef = useRef(null);
  const familyImageRef = useRef(null);

  useEffect(() => {
    // Reset elements to initial state
    gsap.set([titleRef.current, buttonRef.current, familyImageRef.current], {
      clearProps: "all"
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 60%",
        toggleActions: "play none none reverse",
      },
    });

    tl.from(titleRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    })
      .from(
        buttonRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.5",
      )
      .from(
        familyImageRef.current,
        {
          x: 100,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
        },
        "-=1",
      );

    // Optional floating animation for the family image after it enters
    const floatAnimation = gsap.to(familyImageRef.current, {
      y: -15,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 1.2,
    });

    // Refresh ScrollTrigger after a short delay to ensure proper positioning
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    // Cleanup function to kill animations on unmount
    return () => {
      clearTimeout(refreshTimeout);
      tl.kill();
      floatAnimation.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <section
        ref={containerRef}
        className="endlessFun relative overflow-hidden lg:min-h-[700px]"
      >
        <div className="container mx-auto h-full">
          <div className="flex flex-col pt-20 h-full ps-10 lg:ps-20 gap-10 relative z-10">
            <h2
              ref={titleRef}
              className="tracking-wider title font-subheader text-white text-5xl lg:text-7xl font-bold leading-tight"
            >
              ONE GAME. <br />
              ENDLESS FUN.
            </h2>
            <div ref={buttonRef}>
              <PlayNowButton text="Play Now" />
            </div>
          </div>
        </div>

        {/* Family Image */}
        <div className="absolute bottom-0 lg:bottom-[30px] xl:top-[70px] left-0 right-0 w-full z-20 pointer-events-none">
          <div ref={familyImageRef} className="ml-auto mr-10 lg:mr-20 w-fit">
            <Image
              className="object-contain w-full h-auto max-w-[200px] lg:max-w-[400px]"
              alt="Happy family playing Ludo"
              src={family}
              width={600}
              height={400}
              priority
            />
          </div>
        </div>

        {/* Brown Arrow Wave */}
        <div className="absolute bottom-[-20px] left-0 right-0 w-full z-30">
          <Image
            className="object-cover w-full h-auto"
            alt="Decorative wave"
            src={BrownArrow}
            width={1920}
            height={200}
            priority
          />
        </div>

        {/* Optional: Decorative Elements */}
        <div className="absolute top-10 right-10 opacity-20">
          <div className="w-20 h-20 bg-yellow-400 rounded-full blur-xl animate-pulse"></div>
        </div>
        <div className="absolute top-40 left-20 opacity-20">
          <div className="w-32 h-32 bg-red-400 rounded-full blur-2xl animate-pulse delay-700"></div>
        </div>
      </section>
    </>
  );
}