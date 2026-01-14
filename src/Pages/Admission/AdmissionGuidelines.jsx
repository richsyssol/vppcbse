// components/Admission/AdmissionGuidelines.jsx
import React from "react";
import { admissionGuidelinesData } from "../../constant/Admission/admissionGuidelinesData";
import { ExternalLink, FileText, Calendar, UserCheck } from "lucide-react";

const AdmissionGuidelines = () => {
  const iconMap = {
    process: <FileText className="h-6 w-6" />,
    "age-criteria": <Calendar className="h-6 w-6" />,
    registration: <UserCheck className="h-6 w-6" />,
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-center text-2xl text-[#800000] md:text-4xl font-serif font-semibold text- mb-4">
            {admissionGuidelinesData.title}
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-[#800000] to-[#800000] mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-6">Admission Guidelines & Process</p>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {admissionGuidelinesData.sections.map((section) => (
            <div
              key={section.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                {/* <div className="p-2 bg-[#F07B3D] rounded-lg text-white">
                  {iconMap[section.id]}
                </div> */}
                <h2 className="text-xl font-bold text-[#800000]">
                  {section.title}
                </h2>
              </div>

              {/* Content */}
              {section.content && (
                <p className="text-gray-700 leading-relaxed mb-6">
                  {section.content}
                </p>
              )}

              {/* Items List */}
              {section.items && (
                <div className="space-y-3">
                  {section.items.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-[#F07B3D]"></div>
                      <p className="text-gray-700 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* External Link Section */}

        {/* Contact Information */}
        {/* <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            For More Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="p-2 bg-gray-200 rounded-lg">
                <FileText className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Admission Office Hours</p>
                <p className="text-gray-800 font-medium">
                  8:30 AM - 12:00 PM (Mon-Fri)
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="p-2 bg-gray-200 rounded-lg">
                <Calendar className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Academic Year</p>
                <p className="text-gray-800 font-medium">2026-2027</p>
              </div>
            </div>
          </div>
        </div> */}

        {/* Important Note */}
        {/* <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <div className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center">
                <span className="text-yellow-600 text-sm font-bold">!</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-yellow-800">
                <span className="font-semibold">Note:</span> All admissions are
                subject to seat availability and compliance with CBSE
                guidelines. Parents are advised to verify all information with
                the school admission office.
              </p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default AdmissionGuidelines;
