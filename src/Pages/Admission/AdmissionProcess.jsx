// components/Admission/AdmissionProcess.jsx
import React, { useState } from "react";
import {
  FileText,
  Calendar,
  UserCheck,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  ChevronRight,
  Headphones,
  School,
  MessageCircleQuestion,
  X,
  AlertCircle,
  ExternalLink,
  Download,
  Clock,
} from "lucide-react";
import { admissionProcessData } from "../../constant/Admission/admissionProcessData";

const AdmissionProcess = () => {
  const [showNotification, setShowNotification] = useState(false);

  const iconMap = {
    phone: <Phone className="h-6 w-6" />,
    "user-check": <UserCheck className="h-6 w-6" />,
    "file-text": <FileText className="h-6 w-6" />,
    "check-circle": <CheckCircle className="h-6 w-6" />,
    calendar: <Calendar className="h-6 w-6" />,
    mail: <Mail className="h-6 w-6" />,
    "map-pin": <MapPin className="h-6 w-6" />,
    headphones: <Headphones className="h-6 w-6" />,
    school: <School className="h-6 w-6" />,
    "message-circle-question": <MessageCircleQuestion className="h-6 w-6" />,
  };

  // Notification Pop-up Component
  const NotificationPopup = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                Admissions Open
              </h3>
            </div>
            <button
              onClick={() => setShowNotification(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mb-6">
            <p className="text-gray-700 mb-4">
              {admissionProcessData.admissionOpen.notificationText}
            </p>
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-blue-800">
                  Academic Year:{" "}
                  {admissionProcessData.admissionOpen.academicYear}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="text-blue-700">
                  Limited seats available. Apply early to avoid disappointment.
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={admissionProcessData.admissionOpen.applyLink}
              className="flex-1 bg-gradient-to-r from-[#F07B3D] to-[#FF9933] text-white font-semibold py-3 px-4 rounded-lg hover:opacity-90 transition text-center flex items-center justify-center gap-2"
            >
              <FileText className="w-5 h-5" />
              Apply Now
            </a>
            <a
              href={admissionProcessData.admissionOpen.enquiryLink}
              className="flex-1 border-2 border-[#F07B3D] text-[#F07B3D] font-semibold py-3 px-4 rounded-lg hover:bg-orange-50 transition text-center flex items-center justify-center gap-2"
            >
              <MessageCircleQuestion className="w-5 h-5" />
              Enquire Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Notification Pop-up */}
      {showNotification && <NotificationPopup />}

      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* ================= HEADER ================= */}
          <div className="text-center mb-10">
            <h1 className="text-center text-2xl text-[#800000] md:text-4xl font-serif font-semibold text- mb-4">
              {admissionProcessData.title}
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-[#800000] to-[#800000] mx-auto rounded-full mb-4"></div>
            <p className="text-xl text-gray-600 mb-2">
              {admissionProcessData.subtitle}
            </p>
            <p className="text-gray-700 max-w-3xl mx-auto mt-6 mb-2">
              {admissionProcessData.description}
            </p>
            <p className="text-[#800000] font-semibold text-lg">
              {admissionProcessData.welcomeMessage}
            </p>
          </div>

          {/* ================= HORIZONTAL PROCEDURE ================= */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 py-8 px-4 mb-12">
            <h3 className="text-xl font-bold text-[#800000] text-center mb-8">
              Admission Procedure
            </h3>

            <div className="relative">
              {/* Desktop View */}
              <div className="hidden md:flex justify-between items-center">
                {admissionProcessData.horizontalSteps.map((step, index) => (
                  <React.Fragment key={step.id}>
                    <div className="flex flex-col items-center text-center w-32">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 flex items-center justify-center mb-3 group hover:from-blue-100 hover:to-blue-200 transition-all">
                        {iconMap[step.icon]}
                      </div>
                      <p className="text-sm font-semibold text-gray-700 whitespace-pre-line leading-tight">
                        {step.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-2 hidden lg:block">
                        {step.description}
                      </p>
                    </div>

                    {index !==
                      admissionProcessData.horizontalSteps.length - 1 && (
                      <div className="flex-1 h-0.5 bg-gradient-to-r from-blue-200 to-gray-200 mx-4"></div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Mobile View */}
              <div className="md:hidden grid grid-cols-2 gap-6">
                {admissionProcessData.horizontalSteps.map((step) => (
                  <div
                    key={step.id}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 flex items-center justify-center mb-2">
                      {iconMap[step.icon]}
                    </div>
                    <p className="text-xs font-semibold text-gray-700 whitespace-pre-line leading-tight">
                      {step.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ================= MINIMUM AGE CRITERIA ================= */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-12">
            <div className="text-center mb-8">
              <h3 className="text-xl font-bold text-[#800000] text-center mb-8">
                {admissionProcessData.ageCriteria.title}
              </h3>
              {/* <div className="flex items-center justify-center gap-4">
                <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-1 rounded-full">
                  <CheckCircle className="w-4 h-4" />
                  <span className="font-semibold">
                    Admission {admissionProcessData.ageCriteria.admissionStatus}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1 rounded-full">
                  <Calendar className="w-4 h-4" />
                  <span className="font-semibold">
                    Academic Year:{" "}
                    {admissionProcessData.ageCriteria.academicYear}
                  </span>
                </div>
              </div> */}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {admissionProcessData.ageCriteria.classes.map((item) => (
                <div
                  key={item.id}
                  className="border border-gray-200 rounded-xl p-4 text-center bg-gradient-to-b from-white to-gray-50 hover:from-orange-50 hover:to-orange-100 transition-all duration-300 hover:shadow-md group"
                >
                  <h4 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-[#800000]">
                    {item.className}
                  </h4>
                  <div className="md:text-3xl text-sm  font-bold text-[#800000] mb-2">
                    {item.age}
                  </div>
                  <p className="text-xs text-gray-500">{item.asOfDate}</p>
                </div>
              ))}
            </div>

            {/* <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 text-center">
                <strong>Note:</strong> Age criteria is calculated as of 31st
                March of the admission year. For classes beyond Grade 1, age
                requirement increases by 1 year per grade.
              </p>
            </div> */}
          </div>

          {/* ================= QUICK ACTIONS ================= */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <a
              href="/admissions/admission"
              className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition-shadow group"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-bold text-gray-800 mb-2">Apply Online</h4>
              <p className="text-sm text-gray-600">
                Start your admission application
              </p>
            </a>

            <a
              href="/admissions/admission"
              className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition-shadow group"
            >
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200">
                <Download className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-bold text-gray-800 mb-2">Download Forms</h4>
              <p className="text-sm text-gray-600">
                Prospectus & admission forms
              </p>
            </a>

            <a
              href="/contact-us"
              className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition-shadow group"
            >
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200">
                <Headphones className="w-6 h-6 text-orange-600" />
              </div>
              <h4 className="font-bold text-gray-800 mb-2">Contact Us</h4>
              <p className="text-sm text-gray-600">
                Talk to admission counselor
              </p>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdmissionProcess;
