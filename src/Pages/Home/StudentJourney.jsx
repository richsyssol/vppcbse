import React, { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { motion } from "framer-motion";
import { studentJourney } from "../../constant/Home/studentJourney";

const StudentJourney = () => {
  const sliderRef = useRef(null);
  const [showButtons, setShowButtons] = useState(true);
  const [isScrollable, setIsScrollable] = useState(false);

  // Check if content overflows and update button visibility
  useEffect(() => {
    const checkOverflow = () => {
      if (sliderRef.current) {
        const container = sliderRef.current;
        const canScroll = container.scrollWidth > container.clientWidth;
        setIsScrollable(canScroll);

        // Show buttons on md and larger screens when scrollable
        if (window.innerWidth >= 768) {
          setShowButtons(canScroll);
        } else {
          setShowButtons(false);
        }
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, []);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const container = sliderRef.current;
      let scrollAmount;

      // Adjust scroll amount based on screen size
      if (window.innerWidth >= 1024) {
        scrollAmount = 416; // 384px (w-96) + 32px gap
      } else if (window.innerWidth >= 768) {
        scrollAmount = 382; // 350px + 32px gap
      } else if (window.innerWidth >= 640) {
        scrollAmount = 352; // 320px + 32px gap
      } else {
        scrollAmount = 312; // 280px + 32px gap
      }

      if (direction === "left") {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <section className="py-20 md:py-8 relative overflow-hidden gradient-light">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-navy-100/30 via-blue-100/20 to-transparent rounded-full -translate-x-48 -translate-y-48"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-100/20 via-navy-100/30 to-transparent rounded-full translate-x-48 translate-y-48"></div>

      <div className="max-w-[1440px] mx-auto gradient-light px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <Star className="w-6 h-6 text-navy-600 fill-navy-600" />
            <h2 className="font-title text-3xl md:text-4xl font-bold text-gradient-navy">
              Key Highlights of Our School
            </h2>
            <Star className="w-6 h-6 text-navy-600 fill-navy-600" />
          </div>
          <motion.div
            className="h-1.5 w-24 gradient-navy mx-auto mb-6 md:mb-8 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <p className="text-navy-700 max-w-2xl mx-auto text-base md:text-lg lg:text-xl px-4">
            Discover the exceptional features and facilities that make Vidya
            Prabodhini Prashala a premier educational institution.
          </p>
        </motion.div>

        {/* Single Responsive Carousel Container */}
        <div className="relative flex items-center">
          {/* Left Navigation Button - Show on md and larger */}
          {showButtons && isScrollable && (
            <motion.button
              onClick={() => scroll("left")}
              className="absolute md:relative md:flex md:mr-4 xl:mr-6 z-10 p-3 gradient-navy text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/20 flex-shrink-0"
              aria-label="Previous highlights"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
            </motion.button>
          )}

          {/* Carousel Container with centered content */}
          <div className="flex-1 overflow-hidden">
            <div
              ref={sliderRef}
              className="flex py-10 gap-4 md:gap-6 lg:gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scrollbar px-2 md:px-0"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {studentJourney.items.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="flex-none w-[280px] sm:w-[320px] md:w-[320px] lg:w-96 bg-white rounded-2xl lg:rounded-3xl shadow-md lg:shadow-lg overflow-hidden hover:shadow-lg lg:hover:shadow-xl transition-all duration-500 snap-start group hover:-translate-y-1 lg:hover:-translate-y-2 backdrop-blur-sm border border-navy-100"
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{
                    scale: window.innerWidth >= 1024 ? 1.02 : 1.01,
                  }}
                >
                  <div className="relative h-48 sm:h-56 md:h-60 lg:h-64 bg-gradient-to-br from-navy-50 to-blue-50 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/20 to-transparent"></div>
                  </div>
                  <div className="p-5 sm:p-6 md:p-7 lg:p-8">
                    <div className="flex items-center gap-3 mb-3 md:mb-4">
                      <h3 className="font-title text-lg sm:text-xl md:text-xl font-bold text-navy-800 group-hover:text-navy-700 transition-colors duration-300">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-navy-600 text-sm sm:text-base leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Navigation Button - Show on md and larger */}
          {showButtons && isScrollable && (
            <motion.button
              onClick={() => scroll("right")}
              className="absolute md:relative md:flex md:ml-4 xl:ml-6 z-10 p-3 gradient-navy text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/20 flex-shrink-0"
              aria-label="Next highlights"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
            </motion.button>
          )}
        </div>

        {/* Mobile Navigation Dots - Only show on small screens */}
        {!showButtons && (
          <div className="flex justify-center gap-2 mt-6 md:hidden">
            {studentJourney.items.map((_, index) => (
              <button
                key={index}
                className="w-2 h-2 rounded-full bg-navy-300 hover:bg-navy-500 transition-colors"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => {
                  if (sliderRef.current) {
                    let cardWidth;
                    if (window.innerWidth >= 640) {
                      cardWidth = 320;
                    } else {
                      cardWidth = 280;
                    }
                    sliderRef.current.scrollTo({
                      left: index * (cardWidth + 16),
                      behavior: "smooth",
                    });
                  }
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default StudentJourney;
