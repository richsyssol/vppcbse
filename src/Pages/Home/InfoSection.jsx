import { motion } from "framer-motion";
import { infoSectionData } from "../../constant/Home/infoSectionData";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

function InfoSection() {
  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-white to-navy-50">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-navy-100/20 to-blue-100/10 rounded-full -translate-x-48 -translate-y-48"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-100/10 to-navy-100/20 rounded-full translate-x-48 translate-y-48"></div>

      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #0075c4 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
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
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-2 h-2 rounded-full bg-navy-400"></div>
            <h2 className="font-title text-3xl md:text-4xl font-bold text-gradient-navy">
              {infoSectionData.title}
            </h2>
            <div className="w-2 h-2 rounded-full bg-navy-400"></div>
          </div>

          <motion.div
            className="h-1.5 w-24 gradient-navy mx-auto mb-8 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: "6rem" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          />
          <p className="text-navy-700 max-w-2xl mx-auto text-lg md:text-xl">
            Quick access to important information and resources for students,
            parents, and staff.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {infoSectionData.items.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Link
                  to={item.link}
                  className="group relative bg-white rounded-2xl p-8 flex flex-col items-center text-center shadow-lg hover:shadow-xl transition-all duration-500 h-full border border-navy-100 hover:border-navy-200"
                >
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-navy-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Icon container */}
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-navy-400/20 to-blue-400/20 blur-xl group-hover:blur-2xl transition-all duration-500 rounded-2xl"></div>
                    <div className="relative w-20 h-20 flex items-center justify-center rounded-2xl bg-gradient-to-br from-navy-50 to-blue-50 text-navy-600 group-hover:from-navy-100 group-hover:to-blue-100 transition-all duration-500">
                      <Icon className="w-10 h-10" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 gradient-navy rounded-full flex items-center justify-center">
                      <Sparkles className="w-3 h-3 text-white" />
                    </div>
                  </div>

                  {/* Title */}
                  <p className="relative text-lg font-semibold text-navy-800 group-hover:text-gradient-navy transition-all duration-500">
                    {item.title}
                  </p>

                  {/* Hover indicator */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-navy-400 to-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Decorative bottom element */}
        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-4 text-navy-600">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-navy-400 to-transparent"></div>
            <span className="text-sm font-medium">Essential Resources</span>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-navy-400 to-transparent"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default InfoSection;
