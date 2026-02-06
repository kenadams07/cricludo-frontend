import Image from "next/image";
import { AuroraText } from "./aurora-text";
import GradientText from "../GradientText";

export default function FeatureCard({ title, description, img }) {
  return (
    <div className="bg-[#FFF9E6] rounded-2xl p-4 shadow-lg h-full border border-yellow-100 flex flex-col gap-4">
      <div className="relative mb-4 h-65 rounded-xl overflow-hidden">
        <Image
          src={img}
          fill
          className="object-cover"
          alt="Picture of the author"
        />
      </div>
      <GradientText text={title}/>
      <p className="leading-relaxed">
        {description}
      </p>
    </div>
  );
}
