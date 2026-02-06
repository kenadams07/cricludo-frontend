"use client";
import React, { memo } from "react"

export const AuroraText = memo(({
  children,
  className = "",
  colors = ["#FF257F", "#FD5700", "#FABE2F", "#fa6f2f"],
  speed = 1
}) => {
  const gradientStyle = {
    backgroundImage: `linear-gradient(135deg, ${colors.join(", ")}, ${
      colors[0]
    })`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    animationDuration: `${40 / speed}s`,
  }

  return (
    <span className={`relative inline-block ${className}`}>
      <span className="sr-only">{children}</span>
      <span
        className="animate-aurora relative bg-size-[200%_auto] bg-clip-text text-transparent"
        style={gradientStyle}
        aria-hidden="true">
        {children}
      </span>
    </span>
  );
})

AuroraText.displayName = "AuroraText"
