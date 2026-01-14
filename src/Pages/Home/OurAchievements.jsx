import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Trophy, Star } from "lucide-react";
import { motion } from "framer-motion";
import { achievementsData } from "../../constant/Home/achievementsData";

function OurAchievements() {
  const cardsRef = useRef(null);
  const [showViewAll, setShowViewAll] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      const el = cardsRef.current;
      if (!el) return;
      setShowViewAll(el.scrollWidth > el.clientWidth);
    };
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [achievementsData.items.length]);

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

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full -translate-x-48 -translate-y-48"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-pink-500/10 to-purple-500/10 rounded-full translate-x-48 translate-y-48"></div>

      {/* Trophy icons floating */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <Trophy
            key={i}
            className="absolute w-12 h-12 text-purple-400/10"
            style={{
              left: `${20 + i * 25}%`,
              top: `${15 + i * 20}%`,
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
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl flex items-center justify-center">
              <Trophy className="w-7 h-7 text-[#800000]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#800000] via-[#800000] to-[#800000] bg-clip-text text-transparent">
              {achievementsData.title}
            </h2>
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-2xl flex items-center justify-center">
              <Star className="w-7 h-7 text-[#800000] fill-[#800000]" />
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
            {achievementsData.subtitle}
          </p>
        </motion.div>

        {/* Cards Container */}
        <div className="relative">
          {/* Desktop Left Arrow */}
          <motion.button
            onClick={scrollLeft}
            className="hidden lg:flex absolute -left-16 top-1/2 -translate-y-1/2 w-14 h-14 rounded-2xl bg-gradient-to-r from-[#0A2342] to-[#0A2342] text-white shadow-2xl items-center justify-center hover:from-[#0A2342] hover:to-[#0A2342] transition-all duration-300 hover:scale-80 z-20 backdrop-blur-sm border border-white/20"
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
              scroll-pl-4
              px-2
            "
          >
            {achievementsData.items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="
                  flex-shrink-0 w-[85%] sm:w-[45%] lg:w-auto
                  bg-gradient-to-br from-white to-white/90 rounded-3xl overflow-hidden
                  snap-center
                  transition-all duration-500 hover:shadow-3xl
                  border border-white/50 backdrop-blur-sm
                  group
                "
              >
                {/* Image with overlay */}
                <div className="relative w-full h-64 bg-gradient-to-br from-purple-500/20 to-pink-500/20 overflow-hidden">
                  <img
                    src={item.image}
                    alt="Achievement"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  {/* Achievement badge */}
                  {/* <div className="absolute top-4 left-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold rounded-full backdrop-blur-sm">
                    Achievement {index + 1}
                  </div> */}
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-xl flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-yellow-500" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-base leading-relaxed">
                    {item.description}
                  </p>

                  {/* Stats or details */}
                  {/* <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                          95%
                        </div>
                        <div className="text-xs text-gray-500">
                          Success Rate
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                          100+
                        </div>
                        <div className="text-xs text-gray-500">Awards</div>
                      </div>
                    </div>
                  </div> */}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Desktop Right Arrow */}
          <motion.button
            onClick={scrollRight}
            className="hidden lg:flex absolute -right-16 top-1/2 -translate-y-1/2 w-14 h-14 rounded-2xl bg-gradient-to-r from-[#0A2342] to-[#0A2342] text-white shadow-2xl items-center justify-center hover:from-[#0A2342] hover:to-[#0A2342] transition-all duration-300 hover:scale-80 z-20 backdrop-blur-sm border border-white/20"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="w-7 h-7" />
          </motion.button>
        </div>

        {/* CTA Button */}
        {showViewAll && (
          <motion.div
            className="flex justify-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <button className="group px-10 py-4 bg-gradient-to-r from-[#0A2343] to-[#0A2343] text-white rounded-xl font-semibold hover:from-[#0A2343] hover:to-#0A2343 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:-translate-y-1 transform flex items-center gap-3">
              <span>View All Achievements</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default OurAchievements;


