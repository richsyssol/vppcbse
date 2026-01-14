import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  BookOpen,
  Target,
  Users,
  Award,
  Brain,
  BarChart3,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { curriculumData } from "../../../constant/Aboutus/Academics/curriculumData";

const CurriculumCard = ({ item, index }) => {
  const iconMap = {
    book: <BookOpen className="h-8 w-8" />,
    target: <Target className="h-8 w-8" />,
    users: <Users className="h-8 w-8" />,
    award: <Award className="h-8 w-8" />,
    brain: <Brain className="h-8 w-8" />,
    chart: <BarChart3 className="h-8 w-8" />,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 h-full"
    >
      <div className="flex items-start justify-between mb-6">
        <div
          className={`p-4 rounded-xl ${item.bgColor} text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}
        >
          {iconMap[item.icon] || <BookOpen className="h-8 w-8" />}
        </div>
        <div className="text-2xl text-gray-300">0{index + 1}</div>
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors duration-300">
        {item.title}
      </h3>

      <div className="flex items-center gap-1.5 mb-4">
        <div className="h-1 w-8 bg-purple-500 rounded-full"></div>
        <div className="h-1 w-4 bg-blue-500 rounded-full"></div>
        <div className="h-1 w-2 bg-pink-500 rounded-full"></div>
      </div>

      <p className="text-gray-700 mb-6 leading-relaxed">{item.description}</p>

      {item.features && (
        <div className="pt-6 border-t border-gray-100">
          <ul className="space-y-3">
            {item.features.slice(0, 3).map((feature, idx) => (
              <li key={idx} className="flex items-center gap-3 text-gray-700">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                <span className="text-sm font-medium">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="pt-6 mt-6 border-t border-gray-100">
        <button className="group w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#0A2342] to-[#0A2342] text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
          <span>Learn More</span>
          <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </div>
    </motion.div>
  );
};

const OurCurriculum = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % curriculumData.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + curriculumData.length) % curriculumData.length
    );
  };

  // Auto slide for mobile
  useEffect(() => {
    if (window.innerWidth < 768) {
      const interval = setInterval(() => {
        nextSlide();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [currentSlide]);

  return (
    <section className="py-20 relative overflow-hidden" id="curriculum">
      {/* Background decorative elements - Similar to Inquiry */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full -translate-x-48 -translate-y-48"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-500/10 to-purple-500/10 rounded-full translate-x-48 translate-y-48"></div>

      {/* Floating elements */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute w-32 h-32 bg-gradient-to-br from-purple-400/5 to-blue-400/5 rounded-full"
            style={{
              left: `${10 + i * 30}%`,
              top: `${20 + i * 20}%`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-2 h-2 rounded-full bg-purple-500"></div>
            <h2 className="text-center text-2xl text-[#800000] md:text-4xl font-serif font-semibold text- mb-4
">
              Our Comprehensive Curriculum
            </h2>
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          </div>

          <motion.div
            className="h-1.5 w-24 bg-gradient-to-r from-[#800000] via-[#800000] to-[#800000] mx-auto mb-8 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: "6rem" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          />
          
          <p className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed space-y-4 ">
            A balanced and innovative educational approach designed to nurture 
            every student's potential and prepare them for future challenges
          </p>
        </motion.div>

        {/* Curriculum Cards - Desktop Grid & Mobile Slider */}
        <div className="relative">
          {/* Desktop Grid View */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {curriculumData.map((item, index) => (
              <CurriculumCard key={item.id} item={item} index={index} />
            ))}
          </div>

          {/* Mobile Slider View */}
          <div className="md:hidden">
            <div className="relative overflow-hidden">
              {/* Slider Container */}
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {curriculumData.map((item, index) => (
                  <div key={item.id} className="w-full flex-shrink-0 px-4">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                      className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className={`p-3 rounded-lg ${item.bgColor} text-white shadow-md`}
                        >
                          {iconMap[item.icon] || <BookOpen className="h-6 w-6" />}
                        </div>
                        <div className="text-lg text-gray-300">0{index + 1}</div>
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 mb-3">
                        {item.title}
                      </h3>

                      <div className="flex items-center gap-1 mb-3">
                        <div className="h-1 w-6 bg-purple-500 rounded-full"></div>
                        <div className="h-1 w-3 bg-blue-500 rounded-full"></div>
                        <div className="h-1 w-2 bg-pink-500 rounded-full"></div>
                      </div>

                      <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                        {item.description}
                      </p>

                      <button className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#0A2342] to-[#0A2342] text-white font-semibold py-2 px-4 rounded-lg text-sm">
                        <span>Learn More</span>
                        <ChevronRight className="h-3 w-3" />
                      </button>
                    </motion.div>
                  </div>
                ))}
              </div>

              {/* Slider Navigation */}
              <div className="flex justify-between items-center mt-8">
                <button
                  onClick={prevSlide}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-[#0A2342] to-[#0A2342] text-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={currentSlide === 0}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                {/* Dots Indicator */}
                <div className="flex gap-2">
                  {curriculumData.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentSlide
                          ? "bg-gradient-to-r from-[#0A2342] to-[#0A2342] w-6"
                          : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextSlide}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-[#0A2342] to-[#0A2342] text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={currentSlide === curriculumData.length - 1}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Icon map for mobile view
const iconMap = {
  book: <BookOpen className="h-6 w-6" />,
  target: <Target className="h-6 w-6" />,
  users: <Users className="h-6 w-6" />,
  award: <Award className="h-6 w-6" />,
  brain: <Brain className="h-6 w-6" />,
  chart: <BarChart3 className="h-6 w-6" />,
};

export default OurCurriculum;