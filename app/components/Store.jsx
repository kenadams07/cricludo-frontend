import Link from "next/link";
import Image from "next/image";
import { AppStore, PlayStore } from "../common";


export default function Store() {
  return (
    <>
      <div className="flex gap-4">
        <Link
          href="https://apps.apple.com/in/app/cricludo/id6741326528"
          target="_blank"
          className="transition-transform hover:scale-105"
        >
          <Image
            src={AppStore}
            width={200}
            height={140}
            alt="Available on the App Store"
            className=" rounded-lg"
          />
        </Link>
        <Link
          href="https://play.google.com/store/apps/details?id=com.nineXTechnology.CricLudo&pli=1"
          target="_blank"
        >
          <Image
            width={200}
            height={140}
            src={PlayStore}
            alt="Google Play Store"
            className=""
          />
        </Link>
      </div>
    </>
  )
}
