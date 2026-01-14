import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { quicklinksData } from "../../constant/Home/quicklinksData";
import { ArrowUpRight, Sparkles } from "lucide-react";

function QuickLinks() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full -translate-x-48 -translate-y-48"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-purple-500/5 to-blue-500/5 rounded-full translate-x-48 translate-y-48"></div>

      {/* Floating icons */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-8 h-8 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-lg"
            style={{
              left: `${15 + i * 15}%`,
              top: `${30 + i * 10}%`,
              transform: `rotate(${i * 15}deg)`,
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
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <Sparkles className="w-6 h-6 text-[#800000] fill-[#800000]" />
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#800000] via-[#800000] to-[#800000] bg-clip-text text-transparent">
              {quicklinksData.title}
            </h2>
            <Sparkles className="w-6 h-6 text-[#800000] fill-[#800000]" />
          </div>

          <motion.div
            className="h-1.5 w-24 bg-gradient-to-r from-[#800000] via-[#800000] to-[#800000] mx-auto mb-8 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: "6rem" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          />
          <p className="text-gray-700 max-w-2xl mx-auto text-lg md:text-xl">
            Quick access to essential resources and information for students and
            parents.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {quicklinksData.items.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40, rotateX: 90 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Link
                  to={item.link}
                  className="group relative bg-gradient-to-br from-white to-white/90 rounded-2xl p-8 flex flex-col items-center text-center shadow-xl hover:shadow-3xl transition-all duration-500 h-full backdrop-blur-sm border border-white/50"
                >
                  {/* Corner accent */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <ArrowUpRight className="w-5 h-5 text-purple-500" />
                  </div>

                  {/* Icon container with glow */}
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-xl group-hover:blur-2xl transition-all duration-500 rounded-2xl"></div>
                    <div className="relative w-20 h-20 flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 text-blue-600 group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all duration-500 group-hover:scale-110">
                      <Icon className="w-10 h-10" />
                    </div>
                    {/* Pulse animation */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-blue-400/0 group-hover:border-blue-400/30 transition-all duration-500 group-hover:animate-pulse"></div>
                  </div>

                  {/* Title with gradient effect */}
                  <p className="relative text-lg font-semibold text-gray-800 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
                    {item.title}
                  </p>

                  {/* Hover underline */}
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* View All Button */}
        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Link
            to="/resources"
            className="group px-10 py-4 bg-gradient-to-r from-[#0A2343] to-[#0A2342] text-white rounded-xl font-semibold  transition-all duration-300 shadow-2xl hover:shadow-3xl hover:-translate-y-1 transform flex items-center gap-3"
          >
            <span>Browse All Resources</span>
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default QuickLinks;
