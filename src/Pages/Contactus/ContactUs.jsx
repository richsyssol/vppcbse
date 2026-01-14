import React from "react";
import { contactUsData } from "../../constant/Contactus/contactUsData";

const ContactUs = () => {
  return (
    <section className="bg-gray-100 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* TITLE */}
        <h2 className="text-center text-2xl text-[#800000] md:text-4xl font-serif font-semibold text-mb-4">
          {contactUsData.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-14">
          {/* CONTACT DETAILS */}
          <div className="space-y-6">
           {contactUsData.details.map((item) => (
  <div
    key={item.id}
    className="bg-white p-6 rounded-xl shadow-md flex items-start gap-4 hover:shadow-lg transition"
  >
    <div>
      <h3 className="text-lg font-semibold text-gray-700">
        {item.label}
      </h3>

      <a
        href={item.link}
        target={item.label === "Address" ? "_blank" : undefined}
        rel="noopener noreferrer"
        className="text-gray-600 text-sm md:text-base hover:text-[#800000] transition"
      >
        {item.value}
      </a>
    </div>
  </div>
))}

          </div>

          {/* GOOGLE MAP */}
          <div className="bg-white rounded-xl overflow-hidden shadow-md">
            <iframe
              src={contactUsData.mapEmbedUrl}
              className="w-full h-80 md:h-full border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
