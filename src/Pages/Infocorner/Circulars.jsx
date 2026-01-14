import React from "react";
import circularsData from "../../constant/Infocorner/CircularsData";
import {
  FileText,
  Download,
  ExternalLink,
  Bell,
  AlertCircle,
  Calendar,
} from "lucide-react";

const Circulars = () => {
  // Function to handle CBSE Portal click
  const handleCbsePortalClick = () => {
    // Open CBSE official circulars page in new tab
    window.open(
      "https://cbse.gov.in/cbsenew/circulars.html",
      "_blank",
      "noopener,noreferrer"
    );
  };

  // Function to handle circular download
  const handleCircularDownload = (pdfFile, title) => {
    // You can add analytics or tracking here
    console.log(`Downloading circular: ${title}`);
    // The actual download will happen via the anchor tag
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* ================= HEADING ================= */}
      <div className="text-center mb-10">
        <div className="flex justify-center items-center gap-2">
          {/* <Bell className="w-8 h-8 text-orange-500" /> */}
          <h1 className="text-center text-2xl text-[#800000] md:text-4xl font-serif font-semibold text- mb-4">
            Circulars & Notices
          </h1>
        </div>
        <div className="w-24 h-1 bg-[#0A2343] mx-auto mt-4"></div>
        <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
          Official circulars, notices, and announcements from CBSE and our
          institution. Stay updated with the latest information.
        </p>
      </div>

      {/* ================= CBSE PORTAL SECTION ================= */}
      <div
        className="mb-12 p-6 bg-gradient-to-r from-[#0A2343] to-[#0A2343] rounded-xl shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
        onClick={handleCbsePortalClick}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-lg">
              <ExternalLink className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                CBSE Official Circulars Portal
              </h3>
              <p className="text-white/90">
                Click to access all official circulars directly from CBSE
                website
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-white font-semibold">
            <span>Visit Portal</span>
            <ExternalLink className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* ================= CIRCULARS LIST ================= */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-700 flex items-center gap-2">
            <FileText className="w-6 h-6 text-orange-500" />
            Latest Circulars
          </h2>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>Updated: {new Date().toLocaleDateString("en-IN")}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {circularsData.map((circular) => (
            <div
              key={circular.id}
              className="flex flex-col p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-orange-200"
            >
              {/* Circular Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      circular.priority === "High"
                        ? "bg-red-50"
                        : circular.priority === "Medium"
                        ? "bg-yellow-50"
                        : "bg-blue-50"
                    }`}
                  >
                    {circular.priority === "High" ? (
                      <AlertCircle className="w-6 h-6 text-red-500" />
                    ) : (
                      <FileText className="w-6 h-6 text-blue-500" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {circular.title}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
                      <Calendar className="w-4 h-4" />
                      <span>{circular.date}</span>
                    </div>
                  </div>
                </div>
                {circular.isNew && (
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                    New
                  </span>
                )}
              </div>

              {/* Circular Details */}
              <div className="mb-4 flex-grow">
                {/* Priority Badge */}
                {circular.priority && (
                  <div className="mb-3">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        circular.priority === "High"
                          ? "bg-red-100 text-red-800"
                          : circular.priority === "Medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {circular.priority} Priority
                    </span>
                  </div>
                )}

                {/* Description */}
                {circular.description && (
                  <p className="text-gray-500 text-sm mt-3 line-clamp-3">
                    {circular.description}
                  </p>
                )}

                {/* Source */}
                {circular.source && (
                  <p className="text-gray-600 text-sm mt-4">
                    <span className="font-medium">Source:</span>{" "}
                    {circular.source}
                  </p>
                )}

                {/* Applicable To */}
                {circular.applicableTo && (
                  <p className="text-gray-600 text-sm mt-2">
                    <span className="font-medium">Applicable:</span>{" "}
                    {circular.applicableTo}
                  </p>
                )}
              </div>

              {/* Action Section */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-4">
                  {circular.fileSize && (
                    <span className="text-gray-400 text-sm">
                      {circular.fileSize}
                    </span>
                  )}
                  {circular.externalLink && (
                    <a
                      href={circular.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-orange-500 flex items-center gap-1 text-sm font-medium"
                      onClick={() =>
                        console.log(`Opening external link: ${circular.title}`)
                      }
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Online
                    </a>
                  )}
                </div>
                <div className="flex gap-2">
                  {circular.pdfFile && (
                    <a
                      href={circular.pdfFile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#0A2343] text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors duration-200"
                      onClick={() =>
                        handleCircularDownload(circular.pdfFile, circular.title)
                      }
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Circulars;
