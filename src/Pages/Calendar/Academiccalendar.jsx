import React, { useState, useEffect } from "react";
import { Calendar, ExternalLink, Smartphone, Monitor, Tablet } from "lucide-react";
import Academiccalendar from "../../constant/Calendar/AcademicCalendarData";
import {motion} from "framer-motion"

const AcademicCalendar = () => {
  const [selectedYear, setSelectedYear] = useState("2025-26");
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const selectedCalendar = Academiccalendar.find(
    (item) => item.year === selectedYear
  );

  // Generate PDF URL with different parameters for mobile vs desktop
  const getPdfUrl = () => {
    if (!selectedCalendar?.pdf) return '';
    
    // For mobile: simpler view, fit to width
    if (isMobile) {
      return `${selectedCalendar.pdf}#view=FitW&toolbar=0&navpanes=0&scrollbar=0`;
    }
    
    // For desktop/tablet: fit to height, with some features
    return `${selectedCalendar.pdf}#view=FitH&toolbar=0&navpanes=0`;
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-2 h-2 rounded-full bg-purple-500"></div>
            <h2 className="text-center text-2xl text-[#800000] md:text-4xl font-serif font-semibold mb-4">
              Academic Calendar
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
          <p className="text-gray-700 max-w-2xl mx-auto text-lg md:text-xl">
            View and explore the academic calendar by year
          </p>
        </motion.div>

        {/* Year Selection */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          {/* <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Select Academic Year
          </h2> */}
          <div className="flex flex-wrap gap-3 justify-center">
            {Academiccalendar.map((item) => (
              <button
                key={item.year}
                onClick={() => {
                  setSelectedYear(item.year);
                  setIsLoading(true);
                }}
                className={`px-4 py-3 md:px-6 md:py-3 rounded-lg font-medium transition-all ${
                  selectedYear === item.year
                    ? "bg-[#0A2342] text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {item.year}
              </button>
            ))}
          </div>
        </div>

        {/* Current Selection Display */}
        <div className="bg-white rounded-xl shadow-md p-4 md:p-8 mb-8">
          <div className="text-center mb-6">
            <h3 className="text-xl md:text-2xl font-bold text-[#800000] mb-2">
              {selectedCalendar?.title}
            </h3>
            <p className="text-gray-600 text-sm md:text-base mb-4">{selectedCalendar?.description}</p>
            <p className="text-gray-500 text-xs md:text-sm">
              Vidya Prabodhini Prashala CBSE
            </p>
            
            {/* Device indicator (optional) */}
            <div className="flex items-center justify-center gap-4 mt-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                {isMobile ? <Smartphone className="w-4 h-4" /> : 
                 window.innerWidth < 1024 ? <Tablet className="w-4 h-4" /> : 
                 <Monitor className="w-4 h-4" />}
                <span>{isMobile ? 'Mobile View' : window.innerWidth < 1024 ? 'Tablet View' : 'Desktop View'}</span>
              </div>
            </div>
            
            {/* Alternative viewing options */}
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <a
                href={selectedCalendar?.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#800000] text-white text-sm font-medium rounded-lg hover:bg-orange-700 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Open Full PDF
              </a>
              {isMobile && (
                <a
                  href={`https://docs.google.com/viewer?url=${encodeURIComponent(selectedCalendar?.pdf || '')}&embedded=true`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Google PDF Viewer
                </a>
              )}
            </div>
          </div>

          {/* PDF Viewer Section */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="font-medium text-gray-700 mb-4 text-center">
              Academic Calendar Viewer
            </h4>
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-center mb-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
              </div>
            )}
            
            {/* PDF Container */}
            <div className="w-full h-[70vh] rounded-lg overflow-hidden shadow-lg border border-gray-200 bg-gray-100">
              {selectedCalendar?.pdf ? (
                <>
                  {/* Mobile fallback warning */}
                  {isMobile && (
                    <div className="p-3 bg-yellow-50 border-b border-yellow-200 text-sm text-yellow-800">
                      <p className="text-center">
                        Some mobile browsers may have limited PDF support. Use "Open Full PDF" for best experience.
                      </p>
                    </div>
                  )}
                  
                  <iframe
                    src={getPdfUrl()}
                    title={`Academic Calendar ${selectedYear}`}
                    className="w-full h-full"
                    style={{ border: 'none' }}
                    onLoad={handleIframeLoad}
                    allowFullScreen
                    loading="lazy"
                  />
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <p className="text-gray-500">No calendar available for this year</p>
                </div>
              )}
            </div>
            
            {/* PDF controls for mobile */}
            {isMobile && selectedCalendar?.pdf && (
              <div className="mt-4 flex justify-center gap-3">
                {/* <button
                  onClick={() => window.open(selectedCalendar.pdf, '_blank')}
                  className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                >
                  Open in PDF App
                </button> */}
                {/* <button
                  onClick={() => window.location.href = selectedCalendar.pdf}
                  className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Download PDF
                </button> */}
              </div>
            )}
            
            {/* <p className="text-sm text-gray-500 mt-4 text-center">
              Contains monthly calendar, events, holidays, and important dates
            </p> */}
          </div>
        </div>

      

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm">
          <p>© Vidya Prabodhini Prashala CBSE. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default AcademicCalendar;