"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ball } from "@/app/common/index";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Box({ ...item }) {
  const cardRef = useRef(null);
  const ballRef = useRef(null);
  const titleRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Card reveal
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 30, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Ball floating (subtle loop)
      gsap.to(ballRef.current, {
        y: -10,
        duration: 1.6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Title pop
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
          },
        },
      );

      // Bottom image slide up
      gsap.fromTo(
        imgRef.current,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
          },
        },
      );
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={cardRef}
      style={{ backgroundColor: item.bg }}
      className="p-5 text-[#353535] relative box_card overflow-hidden"
    >
      <div ref={ballRef} className="inline-block">
        <Image
          src={ball}
          width={100}
          height={100}
          className="rounded-full"
          alt="ball"
        />
      </div>

      <h4 className="font_three" ref={titleRef} style={{ color: item.color }}>
        {item.title}
      </h4>

      <p className="mt-3">{item.desc}</p>

      <div ref={imgRef} className="absolute bottom-0 flex justify-center w-full left-0">
        <Image
          src={item.image}
          width={350}
          height={300}
          alt={item.title}
          className="h-auto"
          priority={false}
        />
      </div>
    </section>
  );
}
