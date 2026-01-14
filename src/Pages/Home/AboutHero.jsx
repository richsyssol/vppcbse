import React from "react";
import { motion } from "framer-motion";
import { Award, Users, Calendar, MapPin, BookOpen } from "lucide-react";

const AboutHero = () => {
  const stats = [
    { icon: <Calendar />, value: "1937", label: "Established", suffix: "" },
    { icon: <Users />, value: "2000+", label: "Students", suffix: "" },
    { icon: <Award />, value: "150+", label: "Faculty", suffix: "" },
    {
      icon: <BookOpen />,
      value: "85+",
      label: "Years of Excellence",
      suffix: "",
    },
    { icon: <MapPin />, value: "15", label: "Acres Campus", suffix: "" },
  ];

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-navy-800 to-navy-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-navy-300 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm mb-6">
              <span className="w-2 h-2 bg-gold-400 rounded-full"></span>
              <span className="text-sm font-secondary font-medium">
                About Our Institution
              </span>
            </div>

            <h1 className="font-title text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Shaping Futures Since <span className="text-gold-400">1937</span>
            </h1>

            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              Vidya Prabodhini Prashala has been a beacon of academic
              excellence, nurturing young minds with values-based education and
              holistic development for over eight decades.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-3.5 gradient-navy text-white rounded-lg font-secondary font-semibold hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                Discover Our Legacy
              </button>
              <button className="px-8 py-3.5 bg-white/10 backdrop-blur-sm text-white rounded-lg font-secondary font-semibold border-2 border-white/30 hover:bg-white/20 transition-all duration-300">
                Virtual Campus Tour
              </button>
            </div>
          </motion.div>

          {/* Right Column - Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gradient-to-br from-gold-400 to-gold-600 rounded-lg">
                    <div className="text-white">{stat.icon}</div>
                  </div>
                </div>
                <div className="font-title text-3xl font-bold text-white mb-1">
                  {stat.value}
                  <span className="text-gold-400">{stat.suffix}</span>
                </div>
                <div className="text-white/80 text-sm font-secondary">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutHero;
