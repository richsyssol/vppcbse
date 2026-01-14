import React from "react";
import { curriculumData } from "../../constant/Infocorner/curriculumData";

const CurriculumSection = () => {
  return (
    <section className="bg-gray-100 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* MAIN HEADING */}
        <h2 className="text-center text-2xl md:text-4xl font-bold text-gray-500 mb-14">
          Curriculum Overview
        </h2>

        {/* STAGES */}
        <div className="space-y-20">
          {curriculumData.map((stage) => (
            <div key={stage.id} className="text-center">
              {/* Title */}
              <h3 className="text-xl md:text-3xl font-semibold text-gray-700 mb-8">
                {stage.title}
              </h3>

              {/* Images */}
              <div className="flex flex-col md:flex-row justify-center gap-8 mb-10">
                <img
                  src={stage.images.student}
                  alt="Student"
                  className="w-full md:w-80 h-56 object-cover rounded-xl shadow-lg"
                />
                <img
                  src={stage.images.teacher}
                  alt="Teacher"
                  className="w-full md:w-80 h-56 object-cover rounded-xl shadow-lg"
                />
              </div>

              {/* Passage */}
              <div className="max-w-4xl mx-auto text-sm md:text-lg space-y-4 text-gray-700 text-justify">
                {stage.passage.map((text, index) => (
                  <p key={index}>{text}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CurriculumSection;
