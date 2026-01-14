import { motion } from "framer-motion";
import { useState } from "react";
import { Brain, ChevronRight, BookOpen, Palette, Star, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OurPrograms = () => {
  const navigate = useNavigate();
  const [activeProgram, setActiveProgram] = useState(0);

  const programs = [
    {
      id: 1,
      title: "Playgroup",
      age: "Age 2 - 3 years",
      color: "from-pink-500 to-purple-600",
      icon: <Sparkles className="h-8 w-8" />,
      description: "First steps into the world of learning with sensory play and basic social interaction",
      activities: ["Sensory Play", "Basic Shapes", "Music Time", "Story Circle"],
    },
    {
      id: 2,
      title: "Nursery",
      age: "Age 3 - 4 years",
      color: "from-blue-500 to-teal-600",
      icon: <BookOpen className="h-8 w-8" />,
      description: "Building foundational skills through play-based learning and creative activities",
      activities: ["Alphabet Fun", "Number Games", "Creative Art", "Rhyme Time"],
    },
    {
      id: 3,
      title: "Junior Kindergarten",
      age: "Age 4 - 5 years",
      color: "from-green-500 to-emerald-600",
      icon: <Palette className="h-8 w-8" />,
      description: "Developing cognitive abilities and social skills through structured learning",
      activities: ["Reading Basics", "Math Concepts", "Science Fun", "Team Projects"],
    },
    {
      id: 4,
      title: "Senior Kindergarten",
      age: "Age 5 - 6 years",
      color: "from-orange-500 to-red-600",
      icon: <Star className="h-8 w-8" />,
      description: "Preparing for formal schooling with advanced concepts and independent learning",
      activities: ["Reading Fluency", "Basic Math Operations", "Science Experiments", "Problem Solving"],
    },
  ];

  const tourImages = [
    { id: 1, src: "/images/classroom.jpg", title: "Smart Classrooms" },
    { id: 2, src: "/images/playground.jpg", title: "Play Area" },
    { id: 3, src: "/images/library.jpg", title: "Digital Library" },
    { id: 4, src: "/images/lab.jpg", title: "Science Lab" },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    
    <section className="py-20 relative overflow-hidden" id="programs">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-full -translate-x-48 -translate-y-48"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-500/5 to-purple-500/5 rounded-full translate-x-48 translate-y-48"></div>

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
        {/* Header Section */}
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
              Our Early Learning Programs
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
          
          <p className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed space-y-4">
            Nurturing young minds through age-appropriate curriculum designed for optimal development
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left Column - Introduction */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Brain Development Card */}
            <div className="bg-gradient-to-br from-white to-white/90 rounded-2xl shadow-xl p-8 border border-white/50 backdrop-blur-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white">
                  <Brain className="md:h-10 md:w-10" />
                </div>
                <div>
                  <h3 className="text-[#800000] font-extrabold text-sm sm:text-base lg:text-lg ">Critical Brain Development Phase</h3>
                  <p className="text-gray-600">Age 2-6 Years</p>
                </div>
              </div>

              <div className="space-y-4 text-gray-700 text-sm md:text-xl text-justify">
                <p className="leading-relaxed">
                  At <span className="font-bold text-[#800000]">VPP CBSE School</span>, we provide optimal stimulation for energizing brain cells during the most critical developmental phase.
                </p>
                
                <p className="leading-relaxed">
                  Over <span className="font-bold text-purple-600">58%</span> of a child's cumulative brain development occurs before age 6, highlighting the importance of appropriate care and stimulation in early years.
                </p>
              </div>

              {/* Development Stats */}
              <div className="mt-8 pt-8 border-t border-gray-100">
                <div className="grid grid-cols-3 gap-4 text-center">
                  {[
                    { value: "85%", label: "Brain Growth", icon: "🧠" },
                    { value: "90%", label: "Personality", icon: "😊" },
                    { value: "75%", label: "Learning", icon: "🎯" },
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="space-y-2"
                    >
                      <div className="text-3xl">{stat.icon}</div>
                      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "🎨", title: "Creative Expression", color: "bg-pink-50" },
                { icon: "🎵", title: "Music & Rhythm", color: "bg-blue-50" },
                { icon: "🧩", title: "Problem Solving", color: "bg-green-50" },
                { icon: "🤝", title: "Social Skills", color: "bg-yellow-50" },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className={`${feature.color} rounded-xl p-4 text-center border border-white/50`}
                >
                  <div className="text-2xl mb-2">{feature.icon}</div>
                  <div className="font-semibold text-gray-800 text-sm">{feature.title}</div>
                </motion.div>
              ))}
            </div>

            {/* Virtual Tour Section - Added Here */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              {/* Info Card */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">
                  Experience Our Campus Virtually 🎉
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Take a guided tour through our facilities, classrooms, and play areas. 
                  See where your child will learn, play, and grow!
                </p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {[
                    { icon: "📚", label: "Classrooms", count: "25+" },
                    { icon: "🎨", label: "Activity Areas", count: "15+" },
                    { icon: "⚽", label: "Play Zones", count: "10+" },
                    { icon: "🌳", label: "Green Space", count: "5 Acres" },
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="text-xl">{feature.icon}</div>
                      <div>
                        <div className="font-semibold text-gray-900 text-sm">
                          {feature.label}
                        </div>
                        <div className="text-xs text-gray-500">
                          {feature.count}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Thumbnails Grid */}
              {/*  */}
            </motion.div>
          </motion.div>

          {/* Right Column - Programs */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {programs.map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                onClick={() => setActiveProgram(index)}
                className={`group bg-gradient-to-br from-white to-white/90 rounded-2xl shadow-lg p-6 cursor-pointer transition-all duration-300 border-2 ${
                  activeProgram === index
                    ? `border-purple-500`
                    : "border-transparent hover:border-purple-200"
                } backdrop-blur-sm`}
              >
                {/* Program Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${program.color} text-white`}>
                      {program.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                        {program.title}
                      </h3>
                      <p className="text-sm text-gray-600 font-medium">{program.age}</p>
                    </div>
                  </div>
                  <ChevronRight
                    className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${
                      activeProgram === index
                        ? "rotate-90 text-purple-600"
                        : "group-hover:translate-x-2"
                    }`}
                  />
                </div>

                {/* Program Description */}
                <p className="text-gray-700 mb-4">{program.description}</p>

                {/* Activities */}
                <div className="flex flex-wrap gap-2">
                  {program.activities.map((activity, idx) => (
                    <span
                      key={idx}
                      className="inline-block px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium border border-gray-200"
                    >
                      {activity}
                    </span>
                  ))}
                </div>

                {/* Active Indicator */}
                {activeProgram === index && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center"
                  >
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16 pt-8 border-t border-gray-100"
        >
          <p className="text-gray-600 mb-6">
            Ready to start your child's educational journey with us?
          </p>
          <button 
          onClick={() => navigate("/contact-us")}
          className="group px-8 py-3 bg-gradient-to-r from-[#0A2342] to-[#0A2342] text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2">
            <span>Schedule a Campus Visit</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default OurPrograms;