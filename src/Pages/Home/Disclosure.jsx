import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import certificatesData from "../../constant/Disclosure/CertificatesData";
import { 
  FileText, 
  Eye, 
  X, 
  ChevronLeft, 
  ChevronRight
} from "lucide-react";

const Disclosure = () => {
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [currentDocIndex, setCurrentDocIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleDocumentClick = (item, index) => {
    setSelectedDocument(item);
    setCurrentDocIndex(index);
    setZoomLevel(1);
  };

  const closeDocumentViewer = () => {
    setSelectedDocument(null);
    setZoomLevel(1);
  };

  const nextDocument = () => {
    if (currentDocIndex < certificatesData.length - 1) {
      const newIndex = currentDocIndex + 1;
      setCurrentDocIndex(newIndex);
      setSelectedDocument(certificatesData[newIndex]);
      setZoomLevel(1);
    }
  };

  const prevDocument = () => {
    if (currentDocIndex > 0) {
      const newIndex = currentDocIndex - 1;
      setCurrentDocIndex(newIndex);
      setSelectedDocument(certificatesData[newIndex]);
      setZoomLevel(1);
    }
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(3, prev + 0.25));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(0.5, prev - 0.25));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
  };

  // Generate iframe URL with appropriate parameters
  const getIframeUrl = (fileUrl) => {
    let url = `${fileUrl}#toolbar=0&navpanes=0`;
    
    if (isMobile) {
      // Add parameters to minimize download options on mobile
      url += '&scrollbar=0&view=FitH';
    }
    
    return url;
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full -translate-x-48 -translate-y-48"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-500/10 to-purple-500/10 rounded-full translate-x-48 translate-y-48"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-2 h-2 rounded-full bg-purple-500"></div>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#800000] via-[#800000] to-[#800000] bg-clip-text text-transparent">
              Certificates & Documents
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
        </motion.div>

        {/* Certificates List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {certificatesData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group bg-gradient-to-br from-white to-white/90 rounded-xl shadow-lg hover:shadow-2xl border border-white/50 backdrop-blur-sm overflow-hidden cursor-pointer transition-all duration-300"
              onClick={() => handleDocumentClick(item, index)}
            >
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                        {item.name}
                      </h3>
                      <p className="text-gray-500 text-xs mt-1">
                        Click to view document
                      </p>
                    </div>
                  </div>
                  <div className="bg-[#800000]/10 p-2 rounded-lg group-hover:bg-[#800000]/20 transition-colors">
                    <Eye className="w-4 h-4 text-[#800000]" />
                  </div>
                </div>
              </div>
              
              <div className="px-4 sm:px-6 py-3 bg-gradient-to-r from-gray-50 to-white border-t border-gray-100">
                <div className="text-center">
                  <p className="text-xs text-gray-600">
                    Document ID: <span className="font-medium">{item.id}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* PDF Viewer Modal */}
        <AnimatePresence>
          {selectedDocument && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm pt-70"
              onClick={closeDocumentViewer}
            >
              {/* Close Button */}
              <button
                onClick={closeDocumentViewer}
                className="absolute top-4 right-4 z-50 p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors active:scale-95"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* Document Navigation */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-4 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full">
                <button
                  onClick={prevDocument}
                  disabled={currentDocIndex === 0}
                  className={`p-2 transition-colors ${
                    currentDocIndex === 0 
                      ? 'opacity-40 cursor-not-allowed' 
                      : 'hover:bg-white/20 active:scale-95'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                
                <div className="text-white text-sm font-medium min-w-[200px] text-center">
                  <p className="truncate">{selectedDocument.name}</p>
                  <p className="text-xs text-white/70">
                    Document {currentDocIndex + 1} of {certificatesData.length}
                  </p>
                </div>
                
                <button
                  onClick={nextDocument}
                  disabled={currentDocIndex === certificatesData.length - 1}
                  className={`p-2 transition-colors ${
                    currentDocIndex === certificatesData.length - 1
                      ? 'opacity-40 cursor-not-allowed' 
                      : 'hover:bg-white/20 active:scale-95'
                  }`}
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Zoom Controls */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-2 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full">
                <button
                  onClick={handleZoomOut}
                  disabled={zoomLevel <= 0.5}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors active:scale-95 disabled:opacity-40"
                >
                  <span className="text-white font-bold text-xl">−</span>
                </button>
                
                <button
                  onClick={handleResetZoom}
                  className="px-4 py-2 hover:bg-white/20 transition-colors active:scale-95"
                >
                  <span className="text-white font-medium text-sm">
                    {Math.round(zoomLevel * 100)}%
                  </span>
                </button>
                
                <button
                  onClick={handleZoomIn}
                  disabled={zoomLevel >= 3}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors active:scale-95 disabled:opacity-40"
                >
                  <span className="text-white font-bold text-xl">+</span>
                </button>
              </div>

              {/* PDF Viewer Container */}
              <div className="w-full h-full  flex items-center justify-center p-4">
                <div className="relative w-full max-w-5xl h-[85vh] bg-white rounded-xl overflow-hidden">
                  {/* PDF Embed */}
                  <div 
                    className="w-full h-full overflow-auto"
                    style={{ 
                      transform: `scale(${zoomLevel})`,
                      transformOrigin: 'center center'
                    }}
                  >
                    <iframe
                      src={getIframeUrl(selectedDocument.file)}
                      title={selectedDocument.name}
                      className="w-full h-full border-0"
                      style={{ 
                        pointerEvents: zoomLevel === 1 ? 'auto' : 'none',
                        // Prevent text selection on mobile
                        ...(isMobile && {
                          WebkitTouchCallout: 'none',
                          WebkitUserSelect: 'none',
                          userSelect: 'none'
                        })
                      }}
                      // Prevent context menu on mobile
                      onContextMenu={(e) => isMobile && e.preventDefault()}
                      allow="fullscreen"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Mobile Info Message */}
                  {isMobile && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white text-center text-sm">
                      <p>View-only mode on mobile</p>
                      <p className="text-xs opacity-80">Download disabled for security</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Disclosure;