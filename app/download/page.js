"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { PlayStore, AppStore, AppInterface, Logo } from "@/app/common/index";
export default function Download() {
  useEffect(() => {
    // Device detection logic
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const mobileCheck =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent,
      );

    if (mobileCheck) {
      if (/android/i.test(userAgent)) {
        // Redirect to Google Play Store
        window.location.href =
          "https://play.google.com/store/apps/details?id=com.nineXTechnology.CricLudo&pli=1";
      } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        // Redirect to Apple App Store
        window.location.href =
          "https://apps.apple.com/in/app/cricludo/id6741326528";
      }
    } else {
      // Desktop handling
      console.log("Desktop user detected. Showing download landing page.");
    }
  }, []);

  return (
    <>
      <section className="DownloadNow">
        <div className="container mx-auto px-4 min-h-[100dvh] flex items-center">
          <div className="grid md:grid-cols-2 gap-6 items-center w-full">
            {/* Left image */}
            <div className="flex justify-center">
              <Image
                width={500}
                height={300}
                src={AppInterface}
                alt="App Interface"
                className="object-contain p-4"
                priority
              />
            </div>

            {/* Right content */}
            <div className="flex flex-col gap-3 text-[#353535] lg:w-[66%] mx-auto md:mx-0">
              <div className="flex flex-col gap-0 text-base/10">
                <small className="font-extrabold text-lg">About</small>
                <h2 className="font-extrabold font_one m-0">OUR APP</h2>
              </div>

              <span className=" text-2xl font-extrabold bg-gradient-to-r from-indigo-500 to-pink-600 bg-clip-text text-transparent">
                India’s No.1 Game!
              </span>

              <p>
                Cric Ludo, the popular Ludo game, is a digital adaptation of the
                classic Ludo board game available on mobile. It offers online
                and offline multiplayer modes with many features for nonstop
                entertainment. With its colorful design, engaging gameplay, and
                nostalgic appeal, Cric Ludo has become one of the top downloaded
                games worldwide.
              </p>

              <div className="flex gap-2 mt-4">
                <Link
                  href="https://play.google.com/store/apps/details?id=com.nineXTechnology.CricLudo&pli=1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    width={200}
                    height={140}
                    src={PlayStore}
                    alt="Google Play Store"
                    className="h-14 w-auto"
                  />
                </Link>

                <Link
                  href="https://apps.apple.com/in/app/cricludo/id6741326528"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    width={200}
                    height={140}
                    src={AppStore}
                    alt="Apple App Store"
                    className="h-14 w-auto"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
