import {
  ChevronLeft,
  ChevronRight,
  Newspaper,
  Clock,
  Calendar,
} from "lucide-react";
import { motion } from "framer-motion";
import { vppLatestNewsData } from "../../constant/Home/vppLatestNewsData";
import { useRef } from "react";

function VppLatestNews() {
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

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full -translate-x-48 -translate-y-48"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-pink-500/10 to-purple-500/10 rounded-full translate-x-48 translate-y-48"></div>

      {/* Newspaper icons */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <Newspaper
            key={i}
            className="absolute w-16 h-16 text-purple-400/10"
            style={{
              left: `${10 + i * 30}%`,
              top: `${20 + i * 15}%`,
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
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center">
              <Newspaper className="w-7 h-7 text-[#800000]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#800000] via-[#800000] to-[#800000] bg-clip-text text-transparent">
              {vppLatestNewsData.title}
            </h2>
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500/20 to-orange-500/20 rounded-2xl flex items-center justify-center">
              <Calendar className="w-7 h-7 text-[#800000]" />
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
            Stay updated with the latest news, events, and announcements from
            our school
          </p>
        </motion.div>

        {/* News Cards Container */}
        <div className="relative">
          {/* Desktop Left Arrow */}
          <motion.button
            onClick={scrollLeft}
            className="hidden lg:flex absolute -left-16 top-1/2 -translate-y-1/2 w-14 h-14 rounded-2xl bg-gradient-to-r from-[#0a2342] to-[#0a2342] text-white shadow-2xl items-center justify-center hover:from-[#0a2342] hover:to-[#0a2342] transition-all duration-300 hover:scale-110 z-20 backdrop-blur-sm border border-white/20"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-7 h-7" />
          </motion.button>

          {/* News Cards */}
          <div
            ref={cardsRef}
            className="
              flex lg:grid
              lg:grid-cols-3
              gap-8
              overflow-x-auto lg:overflow-visible
              snap-x snap-mandatory
              pb-8 lg:pb-0
              no-scrollbar
              px-2
            "
          >
            {vppLatestNewsData.items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="
                  flex-shrink-0 w-[85%] sm:w-[48%] lg:w-auto
                  bg-gradient-to-br from-white to-white/90 rounded-3xl overflow-hidden
                  shadow-2xl hover:shadow-3xl transition-all duration-500
                  snap-center
                  border border-white/50 backdrop-blur-sm
                  group
                "
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-purple-500/10 to-pink-500/10">
                  <img
                    src={item.image}
                    alt="Latest News"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                  {/* Date badge */}
                  {/* <div className="absolute top-4 left-4 flex items-center gap-2">
                    <div className="px-3 py-1.5 bg-gradient-to-r from-purple-600/90 to-pink-600/90 text-white text-sm font-semibold rounded-full backdrop-blur-sm flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      {item.date || "Recent"}
                    </div>
                  </div> */}
                </div>

                {/* Content */}
                <div className="p-8">
                  {/* Meta info */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{item.readTime || "3 min read"}</span>
                    </div>
                    <div className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-[#800000] text-xs font-semibold rounded-full">
                      {item.category || "Announcement"}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-[#800000] transition-colors duration-300">
                    {item.title || "Latest Update"}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-base leading-relaxed mb-6">
                    {item.description}
                  </p>

                  {/* Read more link */}
                  <a
                    href={item.link}
                    className="inline-flex items-center text-[#0a2342] hover:text-#0a2342 font-semibold text-sm group/link"
                  >
                    <span>Read Full Story</span>
                    <ChevronRight className="w-4 h-4 ml-2 group-hover/link:translate-x-2 transition-transform duration-300" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Desktop Right Arrow */}
          <motion.button
            onClick={scrollRight}
            className="hidden lg:flex absolute -right-16 top-1/2 -translate-y-1/2 w-14 h-14 rounded-2xl bg-gradient-to-r from-[#0a2342] to-[#0a2342] text-white shadow-2xl items-center justify-center hover:from-[#0a2342] hover:to-[#0a2342] transition-all duration-300 hover:scale-110 z-20 backdrop-blur-sm border border-white/20"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="w-7 h-7" />
          </motion.button>
        </div>

        {/* View All News Button */}
        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <a
            href="/"
            className="group px-10 py-4 bg-gradient-to-r from-[#0a2342] to-[#0a2342] text-white rounded-xl font-semibold hover:from-[#0a2342] hover:to-[#0a2342] transition-all duration-300 shadow-2xl hover:shadow-3xl hover:-translate-y-1 transform flex items-center gap-3"
          >
            <span>View All News & Updates</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default VppLatestNews;
