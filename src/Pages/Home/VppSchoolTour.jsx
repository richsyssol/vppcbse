import React, { useState, useRef } from "react";
import { vppSchoolTourData } from "../../constant/Home/vppSchoolTourData";
import { ChevronLeft, ChevronRight, Maximize2, MapPin } from "lucide-react";
import { motion } from "framer-motion";

function VppSchoolTour() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const images = vppSchoolTourData.images;

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const visibleImages = showAll ? images : images.slice(0, 4);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full -translate-x-48 -translate-y-48"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-purple-500/5 to-blue-500/5 rounded-full translate-x-48 translate-y-48"></div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #7c3aed 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Enhanced Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center">
              <MapPin className="w-7 h-7 text-[#800000]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#800000] via-[#800000] to-[#800000] bg-clip-text text-transparent">
              {vppSchoolTourData.title}
            </h2>
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center">
              <Maximize2 className="w-7 h-7 text-[#800000]" />
            </div>
          </div>

          <motion.div
            className="h-1.5 w-24 bg-gradient-to-r from-[#800000] via-[#800000] to-[#800000] mx-auto mb-8 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: "6rem" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          />
          <p className="text-gray-700 max-w-2xl mx-auto text-lg md:text-xl">
            Take a virtual tour of our state-of-the-art campus facilities and
            infrastructure
          </p>
        </motion.div>

        {/* Mobile Image Gallery */}
        <div className="md:hidden space-y-6">
          {/* Main Image */}
          <motion.div
            className="relative rounded-3xl overflow-hidden shadow-2xl"
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={images[activeIndex].src}
              alt={images[activeIndex].alt}
              className="w-full h-80 object-cover"
            />

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600/90 to-purple-600/90 text-white shadow-xl flex items-center justify-center hover:from-blue-700 hover:to-purple-700 transition-all duration-300 backdrop-blur-sm"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600/90 to-purple-600/90 text-white shadow-xl flex items-center justify-center hover:from-blue-700 hover:to-purple-700 transition-all duration-300 backdrop-blur-sm"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
              <h3 className="text-xl font-bold text-white mb-2">
                {images[activeIndex].alt}
              </h3>
              <div className="flex items-center gap-4">
                <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
                  {activeIndex + 1} / {images.length}
                </div>
                <button className="ml-auto px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg text-sm font-semibold">
                  View Full Screen
                </button>
              </div>
            </div>
          </motion.div>

          {/* Thumbnails */}
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar px-2">
            {images.map((img, index) => (
              <motion.button
                key={img.id}
                onClick={() => setActiveIndex(index)}
                className={`relative min-w-[120px] h-28 rounded-2xl overflow-hidden transition-all duration-300 border-2 ${
                  activeIndex === index
                    ? "border-blue-500 scale-105 shadow-lg"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:block">
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {visibleImages.map((img, index) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 group cursor-pointer relative"
                whileHover={{ y: -8 }}
              >
                {/* Image */}
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Overlay content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <div className="bg-gradient-to-t from-black/80 to-transparent p-4 rounded-xl backdrop-blur-sm">
                      <h3 className="text-lg font-bold text-white mb-2">
                        {img.alt}
                      </h3>
                      {/* <button className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg text-sm font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300">
                        Explore Facility
                      </button> */}
                    </div>
                  </div>

                  {/* Badge */}
                  {/* <div className="absolute top-4 left-4 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
                    Facility {index + 1}
                  </div> */}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* View All Button */}
          {images.length > 4 && (
            <motion.div
              className="text-center mt-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <button
                onClick={() => setShowAll(!showAll)}
                className="group px-10 py-4 bg-gradient-to-r from-[#0a2343] to-[#0a2343] text-white rounded-xl font-semibold hover:from-[#0a2343] hover:to-[#0a2343] transition-all duration-300 shadow-2xl hover:shadow-3xl hover:-translate-y-1 transform flex items-center gap-3 mx-auto"
              >
                <span>{showAll ? "Show Less" : "View All Images"}</span>
                <ChevronRight
                  className={`w-5 h-5 transition-transform ${
                    showAll ? "rotate-90" : "group-hover:translate-x-2"
                  }`}
                />
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

export default VppSchoolTour;
