import React from "react";
import { VISION_MISSION_DATA } from "../../../constant/Aboutus/visionMissionData";

const VisionMission = () => {
  const { title, leftColumn, rightColumn } = VISION_MISSION_DATA;

  return (
    <section className="bg-gray-50 py-14">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-center text-2xl md:text-4xl font-serif font-semibold text-[#800000] mb-10">
          {title}
        </h2>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left Column – Vision & Mission */}
          <div className="space-y-8">
            {leftColumn.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold text-[#800000] mb-3">
                  {item.heading}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Right Column – Our Purpose */}
          <div className="bg-white p-8 rounded-xl shadow-sm flex flex-col justify-center">
            <h3 className="text-xl font-semibold text-[#800000] mb-3">
              {rightColumn.heading}
            </h3>
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed text-lg">
              {rightColumn.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
