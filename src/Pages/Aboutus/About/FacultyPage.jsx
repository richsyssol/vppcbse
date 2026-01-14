// components/Faculty/FacultyPage.jsx
import React from "react";
import { facultyData } from "../../../constant/Aboutus/FacultyData/facultyData";

const FacultyPage = () => {
  const { content, topImage } = facultyData;

  return (
    <section className="bg-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Heading */}
        <h2 className="text-center text-2xl md:text-4xl font-serif font-semibold text-[#800000] mb-4">
          {content.title}
        </h2>

        {/* Divider */}
        <div className="flex justify-center mb-10">
          <span className="w-24 h-[2px] bg-[#800000]" />
        </div>

        {/* Image + Content */}
        <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center">

          {/* Image */}
          <div className="w-full lg:w-[45%]">
            <img
              src={topImage.src}
              alt={topImage.alt}
              className="
                w-full
                max-h-[420px] md:max-h-[520px]
                rounded-lg
                object-contain
              "
            />
          </div>

          {/* Content */}
          <div className="w-full lg:w-[55%] text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed space-y-4 text-justify">
            {content.paragraphs.map((text, index) => (
              <p key={index}>{text}</p>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default FacultyPage;



// // components/Faculty/FacultyPage.jsx
// import React from "react";
// import { facultyData } from "../../../constant/Aboutus/FacultyData/facultyData";

// const FacultyPage = () => {
//   const { title, content, topImage, bottomImage } = facultyData;

//   return (
//     <section className="bg-white py-12">
//       <div className="max-w-6xl mx-auto px-4">
//         {/* Heading */}
//         <h2 className="text-center text-2xl text-[#800000] md:text-4xl font-serif font-semibold text- mb-4">
//           {content.title}
//         </h2>

//         {/* Divider */}
//         <div className="flex justify-center mb-8">
//           <span className="w-24 h-[2px] bg-[#800000]"></span>
//         </div>

//         {/* Top Image - Full Width */}
//         <div className="mb-8">
//           <img
//             src={topImage.src}
//             alt={topImage.alt}
//             className="w-full
//       max-h-[420px] md:max-h-[520px]
//       rounded-lg
//       object-contain
//       "
//           />
//         </div>

//         {/* Content - Paragraphs */}
//         <div className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed space-y-4 text-justify">
//           {content.paragraphs.map((text, index) => (
//             <p key={index} className="text-gray-700">
//               {text}
//             </p>
//           ))}
//         </div>

//         {/* Bottom Image - Full Width */}
//         {/* <div className="mt-10">
//           <img
//             src={bottomImage.src}
//             alt={bottomImage.alt}
//             className="w-full h-64 md:h-80 lg:h-96 rounded-lg object-cover shadow-lg"
//           />
//         </div> */}
//       </div>
//     </section>
//   );
// };

// export default FacultyPage;
