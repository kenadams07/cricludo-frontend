import Link from "next/link";
import Image from "next/image";
import styles from "./Footer.module.css";
import { Logo } from "../common/index";
import { Facebook, Youtube, Instagram, Twitter } from "lucide-react";
import Store from "./Store";

const Footer = () => {
  const socials = [
    { id: 1, icon: Facebook, name: "facebook" },
    { id: 2, icon: Youtube, name: "youtube" },
    { id: 3, icon: Instagram, name: "instagram" },
    { id: 4, icon: Twitter, name: "twitter" },
  ];
  return (
    <footer
      className={`${styles.footerBg} relative w-full pt-16 overflow-hidden`}
    >
      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
        {/* Left: Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src={Logo}
            alt="Cric Ludo Logo"
            width={180}
            height={180}
            className="object-contain"
          />
        </Link>

        <div className="flex flex-col items-center text-center">
          <h3
            className="text-3xl md:text-4xl font-black text-[#D9381E] drop-shadow-sm mb-6 uppercase tracking-wide"
            style={{ textShadow: "2px 2px 0px #F9B626, -1px -1px 0 #fff" }}
          >
            Download Now!
          </h3>
          <Store />

          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm md:text-base font-medium text-gray-100">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/about" className="hover:text-white transition-colors">
              About us
            </Link>
            <Link
              href="/features"
              className="hover:text-white transition-colors"
            >
              App features
            </Link>
            <Link
              href="#"
              className="hover:text-white transition-colors"
            >
              Achievements & Milestones
            </Link>
          </div>
          <div className="mt-2 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-gray-100">
            <Link href="/terms-and-condition" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link
              href="/privacy-policy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>

        <div className="flex gap-4">
          {socials.map((social) => {
            const Icon = social.icon;
            return (
              <Link
                key={social.id}
                href={`#${social.name}`}
                className={`${styles.socialIcon} bg-[#1a103c] p-3 rounded-full flex items-center justify-center text-white hover:bg-opacity-90`}
                aria-label={social.name}
              >
                <Icon />
              </Link>
            );
          })}
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="w-full bg-[#1a103c] text-white py-4 mt-12 text-center text-xs md:text-sm px-1">
        <p>© 2026 Cric Ludo Studios. All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
