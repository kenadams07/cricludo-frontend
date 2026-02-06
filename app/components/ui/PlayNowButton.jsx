import React from "react";
import Link from "next/link";
export default function PlayNowButton(props) {
  const { onClick, text } = props;
  return (
    <>
      <button className="playnow" onClick={onClick}>
        <span className="gradient-text">
          <Link href="/download">{text}</Link></span>
      </button>
    </>
  );
}
