import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "./components/shared/Lenis";
import Footer from "./components/Footer";
import { lalezar, dmSans } from "./font";
import Header from "./components/Header";
import ScrollTriggerRefresh from "./components/shared/ScrollTriggerRefresh";

export const metadata = {
  title: "Cric Ludo - Where Cricket Meets Ludo",
  description: "Experience the perfect blend of classic board games and modern cricket excitement. Play with friends via video call!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${lalezar.variable} ${dmSans.variable} font-sans wrap-anywhere`}>
        <LenisProvider />
        <ScrollTriggerRefresh />

        <Header />
        {children}
        <Footer className="mt-20" />

      </body>
    </html>
  );
}
