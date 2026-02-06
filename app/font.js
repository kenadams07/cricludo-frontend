// app/fonts.ts
import { Lalezar, DM_Sans } from "next/font/google";
 
export const lalezar = Lalezar({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-lalezar",
});

export const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});
 
 