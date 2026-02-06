"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { LudoLowBg } from "@/app/common";

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const linksRef = useRef([]);
  const tl = useRef(null);

  useEffect(() => {
    // Initialize GSAP timeline (paused)
    tl.current = gsap.timeline({ paused: true });

    tl.current
      .to(menuRef.current, {
        x: 0,
        duration: 0.5,
        ease: "power3.inOut",
      })
      .fromTo(
        linksRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.4, ease: "power2.out" },
        "-=0.2"
      );

    return () => {
      if (tl.current) tl.current.kill();
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      tl.current.play();
      document.body.style.overflow = 'hidden'; // Disable scroll
    } else {
      tl.current.reverse();
      document.body.style.overflow = ''; // Enable scroll
    }
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Terms & Condition", href: "/terms-and-condition" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Blogs", href: "/blogs" },
  ];

  return (
    <>
      {/* Top Right Hamburger */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={toggleMenu}
          className="bg-white/90 p-3 rounded-full shadow-lg hover:bg-white transition-colors cursor-pointer"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? (
            <X className="w-8 h-8 text-gray-800" />
          ) : (
            <Menu className="w-8 h-8 text-gray-800" />
          )}
        </button>
      </div>

      {/* Full Screen Menu Overlay */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-40 flex flex-col items-center justify-center translate-x-full"
      >
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          {/* White base if transparent image */}
          <div className="absolute inset-0 bg-white" />
          <Image
            src={LudoLowBg}
            alt="Background"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Menu Links */}
        <nav className="relative z-10 flex flex-col gap-6 text-center">
          {menuItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <div
                key={item.label}
                ref={el => linksRef.current[index] = el}
                className="overflow-hidden"
              >
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-3xl md:text-5xl font-black tracking-tight font_header transition-colors
                        ${isActive ? "text-transparent bg-clip-text" : "text-gray-800 hover:text-blue-600"}
                    `}
                  style={isActive ? {
                    backgroundImage: "linear-gradient(to right, #0B015D, #0647C2, #1161A5)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                  } : {}}
                >
                  {item.label}
                </Link>
              </div>
            );
          })}
        </nav>
      </div>
    </>
  );
}