import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { heroData } from "../../constant/Home/heroData";

function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = Object.values(heroData.images);
  const { welcomeText } = heroData;

  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [images.length]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section className="relative   min-h-[65vh] lg:h-[70vh] overflow-hidden bg-navy-800">
      {/* Background Image with Gradient Overlay */}
      {images.length > 0 && (
        <div className="absolute inset-0">
          <img
            src={images[currentImageIndex]}
            alt="School Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900/85 via-navy-800/40 to-navy-700/0 md:bg-gradient-to-r md:from-navy-900/80 md:via-navy-800/40 md:to-transparent"></div>
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 h-full flex items-center justify-center">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-12 items-center justify-center w-full py-8 lg:py-8">
          {/* Left Column - Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4 sm:space-y-6 text-center lg:text-left order-1 w-full"
          >
            {/* School name with DM Serif Text */}
            <div className="mb-8">
              <h1 className="font-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                Vidya Prabodhini Prashala - CBSE
              </h1>
            </div>

            {/* Welcome text with Urbanist */}
            <p className="text-white text-sm sm:text-base md:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {welcomeText}
            </p>

            {/* Quote with Poppins */}
            <div className="pt-5">
              <p className="font-secondary text-white/90 text-xs sm:text-sm md:text-base max-w-2xl mx-auto lg:mx-0 italic border-l-4 border-gold-400 pl-4">
                Established in 1937, shaping future leaders through disciplined
                education and holistic development.
              </p>
            </div>

            {/* CTA Buttons with Poppins */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <button
                onClick={() => (window.location.href = "/academics")}
                className="font-secondary px-8 py-3.5 gradient-navy text-white rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                Explore Academics
              </button>

              <button
                onClick={() => (window.location.href = "/virtual-tour")}
                className="font-secondary px-8 py-3.5 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold text-sm sm:text-base border-2 border-white/30 hover:bg-white/20 transition-all duration-300"
              >
                Virtual Tour
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="font-secondary absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full gradient-navy flex items-center justify-center text-white border border-white/20 hover:shadow-lg hover:scale-110 transition-all duration-300 cursor-pointer z-20 hidden lg:flex"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={nextImage}
            className="font-secondary absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full gradient-navy flex items-center justify-center text-white border border-white/20 hover:shadow-lg hover:scale-110 transition-all duration-300 cursor-pointer z-20 hidden lg:flex"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {images.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentImageIndex
                  ? "bg-white w-8"
                  : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default HeroSection;
