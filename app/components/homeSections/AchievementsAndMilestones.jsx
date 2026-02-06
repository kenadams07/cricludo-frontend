"use client";
import React, { useRef, useEffect } from "react";
import Image from "next/image";
import {
  mobileWithGameOne,
  mobileWithGameTwo,
  mobileWithGameThree,
  cricludo,
  dice,
} from "@/app/common";
import { AuroraText } from "../ui/aurora-text";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GradientText from "../GradientText";

gsap.registerPlugin(ScrollTrigger);
const features = [
  {
    title: "Highly Rated Gameplay",
    description:
      "Players Appreciate Cricludo For Its Unique Concept, Smooth Gameplay, And Perfect Blend Of Cricket And Ludo.",
  },
  {
    title: "A Unique Gaming Concept",
    description:
      "Cricludo Stands Out As A One Of A Kind Game Where Cricket Strategy Meets Board Game Fun",
  },
  {
    title: "Continuous Improvements",
    description:
      "Regular Updates, New Features, And Performance Enhancements Keep The Game Fresh And Engaging.",
  },
  {
    title: "Thousands Of Matches Played",
    description:
      "From Quick Fun Games To Intense Strategic Battles, Cricludo Has Already Powered Thousands Of Exciting Matches.",
  },
  {
    title: "Growing Community",
    description:
      "Loved By Players Across All Age Groups, Cricludo Is Building A Strong And Passionate Gaming Community Every Day.",
  },
];

export default function AchievementsAndMilestones() {
  const leftImgRef = useRef(null);
  const centerImgRef = useRef(null);
  const rightImgRef = useRef(null);
  const imagesRowRef = useRef(null);
  const boardRef = useRef(null);
  const featuresGridRef = useRef(null);
  const featureItemsRef = useRef([]);
useEffect(() => {
  const leftEl = leftImgRef.current;
  const centerEl = centerImgRef.current;
  const rightEl = rightImgRef.current;
  const container = imagesRowRef.current;

  if (!leftEl || !centerEl || !rightEl || !container) return;
  
  gsap.set([leftEl, rightEl], { opacity: 0, x: (i) => (i === 0 ? -50 : 50) });
  gsap.set(centerEl, { opacity: 1, x: 0 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: "top center",
      end: "+=400",
      scrub: 2, // Changed from true to 3 for slower, smoother animation
    },
  });

  tl.to(leftEl, { opacity: 1, x: 0, duration: 2 }).to(
    rightEl,
    { opacity: 1, x: 0, duration: 1 },
    ">+=0",
  );

  return () => {
    tl && tl.kill();
    ScrollTrigger.getAll().forEach((st) => st.kill());
  };
}, []);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const items = featureItemsRef.current.filter(Boolean);
      const grid = featuresGridRef.current;

      if (items.length && grid) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 30 }, 
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: grid,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });

    return () => ctx.revert(); 
  }, []);

  const handleBoardPointer = (clientX, clientY) => {
    const el = boardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const px = (x / rect.width - 0.5) * 2; 
    const py = (y / rect.height - 0.5) * 2; 
    const rotationY = px * 12; 
    const rotationX = -py * 12; 
    gsap.to(el, {
      rotationX,
      rotationY,
      scale: 1.06,
      transformPerspective: 1000,
      transformOrigin: "center",
      duration: 0.35,
      ease: "power2.out",
    });
  };
  const handleMouseMove = (e) => {
    handleBoardPointer(e.clientX, e.clientY);
  };
  const handleTouchMove = (e) => {
    if (!e.touches || !e.touches[0]) return;
    handleBoardPointer(e.touches[0].clientX, e.touches[0].clientY);
  };

  const handlePointerLeave = () => {
    const el = boardRef.current;
    if (!el) return;
    gsap.to(el, {
      rotationX: 0,
      rotationY: 0,
      scale: 1,
      duration: 1,
      ease: "power2.out",
    });
  };
  return (
    <>
      <section className="w-full py-12 bg-white pt-20 md:pt-30">
        <div className=" w-full px-4">
          <div className="w-full flex items-center justify-center">
            {/* Three images in a single row, no gap, fixed height 220px */}
            <div
              ref={imagesRowRef}
              className="flex w-full justify-center gap-0"
            >
              <div ref={leftImgRef} className="overflow-hidden">
                <Image
                  src={mobileWithGameOne}
                  alt="screen one"
                  width={250}
                  height={250}
                />
              </div>
              <div ref={centerImgRef} className="overflow-hidden">
                <Image
                  src={mobileWithGameTwo}
                  alt="screen two"
                  width={250}
                  height={250}
                  className="lg:mt-40"
                />
              </div>
              <div ref={rightImgRef} className="overflow-hidden">
                <Image
                  src={mobileWithGameThree}
                  alt="screen three"
                  width={250}
                  className="lg:mt-20"
                  height={250}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container mx-auto lg:px-10 my-20">
        <h1 className="text-center font_subheader leading-tight my-8 lg:my-15">Achievements & Milestones</h1>
        <div ref={boardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handlePointerLeave}
          onTouchMove={handleTouchMove}
          onTouchEnd={handlePointerLeave}
          className="flex justify-center tranform-style-3d perspective-1000 cursor-move"
        >
          <Image
            src={cricludo}
            alt="Ludo Board"
            width={450}
            height={400}
            className="object-contain drop-shadow-xl will-change-transform mb-5"
          />
        </div>
        <div
          ref={featuresGridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-x-10 gap-y-12"
        >
          {features.map((item, index) => (
            <div
              ref={(el) => (featureItemsRef.current[index] = el)}
              key={index}
              className="flex gap-2 xl:gap-4 items-start"
            >
              {/* Icon */}
              <div className="flex-shrink-0 relative mt-1">
                <Image src={dice} alt="icon" width={60} height={60} />
              </div>
              {/* Text */}
              <div className="space-y-2">
                <GradientText text={item.title} />
                <p className="text-gray-600 text-sm leading-relaxed pe-5">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
