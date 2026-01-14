import React from "react";
import { LEADERSHIP_MESSAGES } from "../../../constant/Aboutus/leadershipMessagesData";

const LeadershipMessages = () => {
  return (
    <section className="bg-gray-50 py-14">
      <div className="max-w-6xl mx-auto px-4 space-y-16">
        {LEADERSHIP_MESSAGES.map((item, index) => (
          <div
            key={item.id}
            className={`flex flex-col md:flex-row items-center gap-8 ${
              index % 2 !== 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Photo */}
            <div className="w-full  md:w-1/3 flex justify-center">
              <img
                src={item.photo}
                alt={item.title}
                className="w-[200px]
        sm:w-full
        h-auto
        rounded-xl
        object-contain
        shadow-md
        mx-auto"
              />
            </div>

            {/* Message Content */}
            <div className="w-full md:w-2/3 bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-2xl font-serif text-[#800000] mb-2">
                {item.title}
              </h2>
              <h4 className="text-gray-700 font-medium mb-4">{item.name}</h4>
              <p className="text-gray-700
      text-sm sm:text-base lg:text-lg
      leading-relaxed
      space-y-4
      text-justify">
                {item.message}    

                
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LeadershipMessages;
