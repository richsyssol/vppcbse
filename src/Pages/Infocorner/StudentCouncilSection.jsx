import React from "react";
import { studentCouncilData } from "../../constant/Infocorner/studentCouncilData";

const StudentCouncilSection = () => {
  return (
    <section className="bg-gray-100 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* TITLE */}
        <h2 className="text-center text-2xl md:text-4xl font-bold text-gray-500 mb-10">
          {studentCouncilData.title}
        </h2>

        {/* FULL WIDTH IMAGES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {studentCouncilData.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="Student Council"
              className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg"
            />
          ))}
        </div>

        {/* PASSAGE */}
        <div className="max-w-4xl mx-auto text-sm md:text-xl space-y-4 text-gray-700 text-justify">
          {studentCouncilData.passage.map((text, index) => (
            <p key={index}>{text}</p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudentCouncilSection;
