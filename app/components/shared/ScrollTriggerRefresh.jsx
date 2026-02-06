'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ScrollTriggerRefresh() {
    const pathname = usePathname();

    useEffect(() => {
        // Small delay to ensure DOM is ready
        const timeout = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 100);

        return () => clearTimeout(timeout);
    }, [pathname]);

    return null;
}
