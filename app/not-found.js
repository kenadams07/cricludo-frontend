"use client"; // Error components must be Client Components

import Link from "next/link";
import { useEffect } from "react";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-[#1a103c]">
            <h1 className="text-6xl md:text-9xl font-black font-header text-[#D9381E] mb-4">
                404
            </h1>
            <h2 className="text-2xl md:text-4xl font-bold font-subheader mb-8 uppercase tracking-wide">
                Page Not Found
            </h2>
            <p className="text-gray-600 mb-8 font-medium text-center max-w-md px-4">
                Oops! The page you are looking for does not exist or has been moved.
            </p>

            <Link
                href="/"
                className="px-8 py-3 bg-[#D9381E] text-white font-bold rounded-full hover:bg-[#b02d18] transition-colors shadow-lg font-subheader tracking-wider"
            >
                Go Back Home
            </Link>
        </div>
    );
}
