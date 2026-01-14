import React from "react";
import cbseAffiliationData from "../../constant/Infocorner/CbseAffiliationData";
import {
  FileText,
  Download,
  Calendar,
  Shield,
  Flame,
  School,
} from "lucide-react";

const Cbseaffiliation = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* ================= HEADING ================= */}
      <div className="text-center mb-10">
        <div className="flex justify-center items-center gap-2">
          {/* <School className="w-8 h-8 text-orange-500" /> */}
          <h1 className="text-center text-2xl text-[#800000] md:text-4xl font-serif font-semibold text- mb-4">
            CBSE Affiliation Certificates
          </h1>
        </div>
        <div className="w-24 h-1 bg-[#800000] mx-auto mt-4"></div>
        <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
          Official CBSE affiliation certificates and mandatory documents
          required for maintaining our affiliation with the Central Board of
          Secondary Education.
        </p>
      </div>

      {/* ================= CBSE AFFILIATION LIST ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cbseAffiliationData.map((certificate) => (
          <div
            key={certificate.id}
            className="flex flex-col p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-orange-200"
          >
            {/* Certificate Header with Icon */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-lg ${
                    certificate.id === 1
                      ? "bg-green-50"
                      : certificate.id === 2
                      ? "bg-red-50"
                      : "bg-blue-50"
                  }`}
                >
                  {certificate.id === 1 ? (
                    <FileText className="w-6 h-6 text-green-500" />
                  ) : certificate.id === 2 ? (
                    <Flame className="w-6 h-6 text-red-500" />
                  ) : (
                    <Shield className="w-6 h-6 text-blue-500" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {certificate.title}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
                    <Calendar className="w-4 h-4" />
                    <span>Valid: {certificate.validityPeriod}</span>
                  </div>
                </div>
              </div>
              {certificate.isMandatory && (
                <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full">
                  Mandatory
                </span>
              )}
            </div>

            {/* Certificate Details */}
            <div className="mb-4 flex-grow">
              {/* Type Badge */}
              <div className="mb-3">
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                    certificate.id === 1
                      ? "bg-green-100 text-green-800"
                      : certificate.id === 2
                      ? "bg-red-100 text-red-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {certificate.type}
                </span>
              </div>

              {/* Description */}
              {certificate.description && (
                <p className="text-gray-500 text-sm mt-3">
                  {certificate.description}
                </p>
              )}

              {/* Additional Details */}
              <div className="mt-4 space-y-2">
                {certificate.affiliationNumber && (
                  <p className="text-gray-600 text-sm">
                    <span className="font-medium">Affiliation No:</span>{" "}
                    {certificate.affiliationNumber}
                  </p>
                )}
                {certificate.issuedBy && (
                  <p className="text-gray-600 text-sm">
                    <span className="font-medium">Issued By:</span>{" "}
                    {certificate.issuedBy}
                  </p>
                )}
                {certificate.renewalDate && (
                  <p className="text-gray-600 text-sm">
                    <span className="font-medium">Next Renewal:</span>{" "}
                    {certificate.renewalDate}
                  </p>
                )}
                {certificate.fileSize && (
                  <p className="text-gray-600 text-sm">
                    <span className="font-medium">File Size:</span>{" "}
                    {certificate.fileSize}
                  </p>
                )}
              </div>

              {/* Status Indicator */}
              {certificate.status && (
                <div className="mt-4 flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      certificate.status === "Active"
                        ? "bg-green-500"
                        : certificate.status === "Expiring Soon"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  ></div>
                  <span
                    className={`text-sm font-medium ${
                      certificate.status === "Active"
                        ? "text-green-700"
                        : certificate.status === "Expiring Soon"
                        ? "text-yellow-700"
                        : "text-red-700"
                    }`}
                  >
                    {certificate.status}
                  </span>
                </div>
              )}
            </div>

            {/* Action Section */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-4">
                {certificate.pages && (
                  <span className="text-gray-400 text-sm">
                    {certificate.pages}
                  </span>
                )}
                {certificate.verificationLink && (
                  <a
                    href={certificate.verificationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-orange-500 flex items-center gap-1 text-sm font-medium"
                  >
                    <Shield className="w-4 h-4" />
                    Verify Online
                  </a>
                )}
              </div>
              <div className="flex gap-2">
                {certificate.viewLink && (
                  <a
                    href={certificate.viewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 border border-orange-500 text-orange-500 font-semibold rounded-lg hover:bg-orange-50 transition-colors duration-200 text-sm"
                  >
                    View
                  </a>
                )}
                <a
                  href={certificate.pdfFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#0A2343] text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors duration-200"
                >
                  <Download className="w-4 h-4" />
                  Download
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cbseaffiliation;
