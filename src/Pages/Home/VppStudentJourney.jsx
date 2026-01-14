import {
  ChevronLeft,
  ChevronRight,
  Users,
  Calendar,
  Award,
  BookOpen,
} from "lucide-react";
import { motion } from "framer-motion";
import { vppStudentJourneyData } from "../../constant/Home/vppStudentJourneyData";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

function VppStudentJourney() {
  const navigate = useNavigate();
  const cardsRef = useRef(null);

  const scrollLeft = () => {
    if (cardsRef.current) {
      cardsRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (cardsRef.current) {
      cardsRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  const icons = [Users, Calendar, Award, BookOpen];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#1e1b4b] to-[#312e81]"></div>

      {/* Floating stars */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: Math.random() * 0.5 + 0.3,
            }}
          />
        ))}
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
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center">
              <Users className="w-7 h-7 text-purple-300" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent">
              {vppStudentJourneyData.title}
            </h2>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center">
              <Award className="w-7 h-7 text-blue-300" />
            </div>
          </div>

          <motion.div
            className="h-1.5 w-24 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mx-auto mb-8 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: "6rem" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          />
          <p className="text-gray-300 max-w-2xl mx-auto text-lg md:text-xl">
            Explore the journey of our students through various activities and
            achievements.
          </p>
        </motion.div>

        {/* Cards Container */}
        <div className="relative">
          {/* Desktop Left Arrow */}
          <motion.button
            onClick={scrollLeft}
            className="hidden lg:flex absolute -left-16 top-1/2 -translate-y-1/2 w-14 h-14 rounded-2xl bg-gradient-to-r from-[#0A2343] to-[#0A2343] text-white shadow-2xl items-center justify-center hover:from-[#0A2343] hover:to-[#0A2343] transition-all duration-300 hover:scale-110 z-20 backdrop-blur-sm border border-white/20"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-7 h-7" />
          </motion.button>

          {/* Cards Wrapper */}
          <div
            ref={cardsRef}
            className="
              flex lg:grid
              lg:grid-cols-4
              gap-8
              overflow-x-auto lg:overflow-visible
              snap-x snap-mandatory
              pb-8 lg:pb-0
              no-scrollbar
              px-2
            "
          >
            {vppStudentJourneyData.items.map((item, index) => {
              const Icon = icons[index % icons.length];
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="
                    min-w-[85%] sm:min-w-[45%] lg:min-w-0
                    bg-gradient-to-br from-white/10 to-white/5 rounded-3xl overflow-hidden
                    snap-center
                    transition-all duration-500 hover:shadow-2xl
                    border border-white/10 backdrop-blur-lg
                    group
                  "
                >
                  {/* Image */}
                  <div className="relative w-full h-48 sm:h-52 lg:h-56 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20"></div>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                    {/* Icon overlay */}
                    <div className="absolute top-4 left-4 w-12 h-12 bg-gradient-to-br from-purple-600/80 to-blue-600/80 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 text-base leading-relaxed">
                      {item.description}
                    </p>

                    {/* View details */}
                    <div className="mt-6 pt-6 border-t border-white/10">
                      <button className="text-purple-300 hover:text-purple-200 font-semibold text-sm flex items-center gap-2 group/link">
                        <span>View Details</span>
                        <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Desktop Right Arrow */}
          <motion.button
            onClick={scrollRight}
            className="hidden lg:flex absolute -right-16 top-1/2 -translate-y-1/2 w-14 h-14 rounded-2xl bg-gradient-to-r from-[#0A2343] to-[#0A2343] text-white shadow-2xl items-center justify-center hover:from-[#0A2343] hover:to-[#0A2343] transition-all duration-300 hover:scale-110 z-20 backdrop-blur-sm border border-white/20"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="w-7 h-7" />
          </motion.button>
        </div>

        {/* CTA Button */}
        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <button
            className="group px-10 py-4 bg-gradient-to-r from-[#0A2343] to-[#0A2343] text-white rounded-xl font-semibold hover:from-[#0A2343] hover:to-[#0A2343] transition-all duration-300 shadow-2xl hover:shadow-3xl hover:-translate-y-1 transform flex items-center gap-3"
            onClick={() => navigate("/gallery/images")}
          >
            <span>{vppStudentJourneyData.buttonText}</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default VppStudentJourney;
