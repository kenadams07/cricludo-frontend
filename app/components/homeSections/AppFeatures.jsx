"use client";
import { slider_img, manTargeting } from "@/app/common";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FeatureCard from "../ui/FeatureCard";

// Register plugins once (can move to a custom hook or layout if preferred)
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AppFeatures() {
  const slides = [
    {
      id: 1,
      title: "Strategy + Sports",
      description: "Combines Board Game Logic With The Thrill Of Sports Competition. Perfect For Strategy Lovers!",
      img: slider_img
    },
    {
      id: 2,
      title: "Fast & Smooth",
      description: "Optimized For All Android Devices. Enjoy Seamless Gameplay With Lightning-Fast Performance!",
      img: slider_img
    },
    {
      id: 3,
      title: "Real Players",
      description: "Compete against real players from around the world in real-time matches.",
      img: slider_img
    },
    {
      id: 4,
      title: "Fair Play",
      description: "Our certified RNG ensures every dice roll is truly random and fair for everyone.",
      img: slider_img
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(1);

  // Ref for the left image container
  const imageContainerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setVisibleCards(window.innerWidth >= 768 ? 2 : 1);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // GSAP animation for the character image
  useEffect(() => {
    if (!imageContainerRef.current) return;

    // Reset element to initial state
    gsap.set(imageContainerRef.current, {
      clearProps: "all"
    });

    gsap.from(imageContainerRef.current, {
      x: -120,               // start from left (adjust -80 to -200 based on desired distance)
      opacity: 0,
      duration: 1.2,         // smooth but not too slow
      ease: "power3.out",    // nice deceleration – feels natural
      // ease: "back.out(1.4)",  // optional: slight overshoot for playful feel
      scrollTrigger: {
        trigger: imageContainerRef.current.parentElement || ".lg\\:flex-row", // whole features row or section
        start: "top 80%",      // start when top of section is 80% down viewport (early reveal)
        toggleActions: "play none none reverse", // play on enter, reverse on scroll up
        // markers: true,      // uncomment to debug trigger lines
      },
    });

    // Refresh ScrollTrigger after a short delay
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(refreshTimeout);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const totalDots = Math.ceil(slides.length / visibleCards);

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex * visibleCards);
  };

  return (
    <div className="py-10 text-center md:text-left">
      <h2 className="text-center font_subheader leading-tight my-8 lg:my-15">App Features</h2>
      <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-0">
        {/* Left Side - Boy Image – now with ref & will-change for smoothness */}
        <div
          ref={imageContainerRef}
          className="basis-full md:basis-1/3 hidden lg:flex items-center justify-center w-full will-change-transform"
        >
          <Image
            src={manTargeting}
            alt="App Feature Character"
            width={300}
            height={500}
            className="object-contain max-h-[400px]"
            priority // optional: faster LCP if above fold
          />
        </div>

        {/* Right Side - Carousel (unchanged) */}
        <div className="basis-full md:basis-2/3 w-full overflow-hidden px-4 md:px-0 md:pr-10">
          <div className="relative">
            <div
              className="flex transition-transform duration-500 ease-in-out gap-6"
              style={{ transform: `translateX(-${(currentIndex * (100 / visibleCards))}%)` }}
            >
              {slides.map((s) => (
                <div
                  key={s.id}
                  className={`shrink-0 transition-all duration-300 w-full md:w-[calc(50%-12px)]`}
                >
                  <FeatureCard title={s.title} description={s.description} img={s.img} />
                </div>
              ))}
            </div>

            {/* Pagination Controls (unchanged) */}
            <div className="flex items-center justify-center gap-6 mt-8">
              <button
                onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentIndex === 0}
                className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                aria-label="Previous slide"
              >
                <ArrowLeft className="w-10 h-10 text-gray-600" />
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: totalDots }).map((_, idx) => {
                  const isActive = Math.floor(currentIndex / visibleCards) === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => goToSlide(idx)}
                      className={`transition-all duration-300 rounded-full ${isActive ? "w-8 h-2 bg-gray-900" : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                        }`}
                      aria-label={`Go to slide group ${idx + 1}`}
                    />
                  );
                })}
              </div>

              <button
                onClick={() => setCurrentIndex((prev) => Math.min(slides.length - visibleCards, prev + 1))}
                disabled={currentIndex >= slides.length - visibleCards}
                className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                aria-label="Next slide"
              >
                <ArrowRight className="w-10 h-10 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}