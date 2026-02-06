"use client";
import Box from "../ui/Box";
import Image from "next/image";
import {
  PlayerOne,
  PlayerTwo,
  PlayerThree,
  manwithbats,
  mancatchingball,
} from "../../common";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
export default function PlayRules() {
  const sectionRef = useRef(null);
  const leftWrapRef = useRef(null);
  const rightWrapRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
          end: "+=200",
           scrub: 2,
        },
      });

      // 1) Image 1 moves first
      tl.fromTo(
        leftWrapRef.current,
        { x: -120, opacity: 0 },
        { x: 0, opacity: 1, ease: "power3.out", duration: 3 },
      );

      // 2) Then Image 2 moves
      tl.fromTo(
        rightWrapRef.current,
        { x: 120, opacity: 0 },
        { x: 0, opacity: 1, ease: "power3.out", duration: 3 },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);
  const items = [
    {
      id: 2,
      bg: "#B0A799",
      title: "Will You Be Next?",
      image: PlayerOne,
      color: "#FFFFFF",
      desc: "Join thousands of players in our weekly Battlepass Showdown. Win matches to unlock legendary gear like the Royal Crown or Outlaw Hat and see your name on the Global Leaderboard.",
    },
    {
      id: 2,
      bg: "#D0DEFF",
      title: "Every Roll is a Game-Changer",
      image: PlayerTwo,
      color: "#353535",
      desc: "the dice carry the force of a championship strike. Don't just move your pieces—shatter the board and dominate your rivals with high-impact rolls.",
    },
    {
      id: 3,
      bg: "#FFDC9A",
      title: "The Action",
      image: PlayerThree,
      color: "#353535",
      desc: `When you roll a 6, it’s not just an extra turn; it’s a "Stadium Blast."`,
    },
  ];

  return (
    <section className="bg-white py-20">
      <div ref={sectionRef} className="rules_play relative mb-20 min-h-[400px]">
        <div
          ref={leftWrapRef}
          className="absolute left-0 bottom-0 hidden lg:block"
        >
          <Image src={manwithbats} alt="manwithbats" width={350} height={350} />
        </div>
        <div
          ref={rightWrapRef}
          className="absolute right-10"
          style={{ bottom: "-90px" }}
        >
          <Image
            src={mancatchingball}
            alt="mancatchingball"
            width={350}
            height={350}
          />
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-50 pt-10 pb-20">
          <div className="text-start">
            <h3 className="font_two ">Play Smart. Play Cricket. <br />Play Cricludo.</h3>
            <p className="lg:pe-20 pt-5">
              Every move in Cricludo feels like a real cricket moment. Roll the
              dice, score runs, defend your players, and plan your strategy to
              outplay your opponents. Just like cricket, timing and
              decision-making are the keys to victory. Perfect for family game
              nights, friendly challenges, or quick fun breaks.
            </p>
          </div>
          <div className="text-end ">
            <h3 className="font_two  ">Play Smart. Play Cricket. <br />Play Cricludo.</h3>
            <p className="lg:pl-20 pt-5">
              Every move in Cricludo feels like a real cricket moment. Roll the
              dice, score runs, defend your players, and plan your strategy to
              outplay your opponents. Just like cricket, timing and
              decision-making are the keys to victory. Perfect for family game
              nights, friendly challenges, or quick fun breaks.
            </p>
          </div>
        </div>
        <div className="hidden sm:grid sm:grid-cols-3 gap-10">
          {items &&
            items.map((item, idx) => (
              <div key={idx} className="h-full">
                <Box {...item} />
              </div>
            ))}
        </div>

        {/* Mobile: Horizontal scroll */}
        <div className="sm:hidden overflow-x-auto px-4 -mx-4">
          <div className="flex gap-5 pb-4">
            {items &&
              items.map((item, idx) => (
                <div key={idx} className="flex-shrink-0 w-[85vw]">
                  <Box {...item} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
