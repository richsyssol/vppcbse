import React from "react";
import { ABOUT_VPP_DATA } from "../../../constant/Aboutus/aboutVppData";

const AboutHero = () => {
  const { title, dividerColor, topImage, paragraphs, bottomImage } =
    ABOUT_VPP_DATA;

  return (
    <section className="bg-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <h2 className="text-center text-2xl text-[#800000] md:text-4xl font-serif font-semibold text- mb-4">
          {title}
        </h2>

        {/* Divider */}
        <div className="flex justify-center mb-8">
          <span className={`w-24 h-[2px] ${dividerColor}`}></span>
        </div>

        {/* Image + Content Section */}
<div className="mb-10 flex flex-col sm:flex-row gap-6 lg:gap-8 items-start lg:items-center">

  {/* Image */}
  <div
    className="
      flex justify-center
      w-full
      sm:w-[240px]
      lg:w-[300px]
      flex-shrink-0
    "
  >
    <img
      src={topImage.src}
      alt={topImage.alt}
      className="
        w-[200px]
        sm:w-full
        h-auto
        rounded-xl
        object-contain
        shadow-md
        mx-auto
      "
    />
  </div>

  {/* Content */}
  <div
    className="
      text-gray-700
      text-sm sm:text-base lg:text-lg
      leading-relaxed
      space-y-4
      text-justify
    "
  >
    {paragraphs.map((text, index) => (
      <p key={index}>{text}</p>
    ))}
  </div>

</div>




        {/* Bottom Image */}
        {/* <div className="mt-10">
          <img
            src={bottomImage.src}
            alt={bottomImage.alt}
            className="w-full h-100 rounded-lg object-cover"
          />
        </div> */}
      </div>
    </section>
  );
};

export default AboutHero;
