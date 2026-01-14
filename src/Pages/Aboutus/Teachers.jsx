// components/Teachers/TeachersPage.jsx
import React from "react";
import { teachersData } from "../../constant/Aboutus/Teachers/teachersData";
import { Download, Mail, User, Book, GraduationCap, Award } from "lucide-react";

const Teachers = () => {
  const handleDownload = (filePath, fileName) => {
    const link = document.createElement("a");
    link.href = filePath;
    link.download = fileName || filePath.split("/").pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-center text-2xl text-[#800000] md:text-4xl font-serif font-semibold text- mb-4">
            {teachersData.hero.title}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#800000] to-[#800000] mx-auto mb-6 rounded-full"></div>
          {/* <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {teachersData.hero.description}
          </p> */}
        </div>

        {/* Stats Section */}
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {teachersData.stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-4 text-center shadow-sm border border-gray-100"
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-2xl md:text-3xl font-bold text-[#F07B3D]">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
            </div>
          ))}
        </div> */}

        {/* About Faculty Section */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8 mb-8 sm:mb-10">
  {/* Heading */}
  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
    {/* Optional Icon */}
    {/* <div className="p-2 bg-[#800000] rounded-lg">
      <Book className="h-6 w-6 text-white" />
    </div> */}
    
    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#800000]">
      {teachersData.about.title}
    </h2>
  </div>

  {/* Content */}
  <div className="rounded-lg p-4 sm:p-6">
    <p className="text-gray-700 leading-relaxed text-justify text-sm sm:text-base md:text-lg">
      {teachersData.about.content}
    </p>
  </div>
</div>


        {/* Departments Sections */}
        <div className="space-y-12">
          {teachersData.departments.map((department, sectionIndex) => (
            <div
              key={department.id}
              className="bg-white rounded-xl shadow-lg p-6 md:p-8"
            >
              {/* Department Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                <div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#800000]">
                    {department.title}
                  </h2>
                  <p className="text-gray-600">{department.description}</p>
                </div>
              </div>

              {/* Teachers List */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          Teacher
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <GraduationCap className="h-4 w-4" />
                          Designation
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Subject
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <Award className="h-4 w-4" />
                          Qualification & Experience
                        </div>
                      </th>
                      {/* <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          Email
                        </div>
                      </th> */}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {department.teachers.map((teacher, teacherIndex) => (
                      <tr
                        key={teacher.id}
                        className={`hover:bg-gray-50 transition-colors duration-150 ${
                          teacherIndex % 2 === 0 ? "bg-gray-50/50" : "bg-white"
                        }`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            
                            <div className="text-sm font-medium text-gray-900">
                              {teacher.name}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-700 font-medium">
                            {teacher.designation}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600 font-medium">
                            {teacher.subject}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600">
                            <div className="font-medium">
                              {teacher.qualification}
                            </div>
                            <div className="text-gray-500">
                              {teacher.experience}
                            </div>
                          </div>
                        </td>
                        {/* <td className="px-6 py-4 whitespace-nowrap">
                          <a
                            href={`mailto:${teacher.email}`}
                            className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                          >
                            {teacher.email}
                          </a>
                        </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile View - Cards */}
              {/* <div className="mt-8 md:hidden space-y-4">
                {department.teachers.map((teacher) => (
                  <div
                    key={teacher.id}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-12 w-12 rounded-full overflow-hidden flex-shrink-0">
                        <img
                          src={teacher.image}
                          alt={teacher.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {teacher.name}
                        </h4>
                        <p className="text-sm text-blue-600 font-medium">
                          {teacher.designation}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm font-medium text-gray-700">
                          Subject:
                        </span>
                        <span className="text-sm text-gray-600 ml-2">
                          {teacher.subject}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-700">
                          Qualification:
                        </span>
                        <span className="text-sm text-gray-600 ml-2">
                          {teacher.qualification}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-700">
                          Experience:
                        </span>
                        <span className="text-sm text-gray-600 ml-2">
                          {teacher.experience}
                        </span>
                      </div>
                      <a
                        href={`mailto:${teacher.email}`}
                        className="text-sm text-blue-600 hover:underline block mt-2"
                      >
                        {teacher.email}
                      </a>
                    </div>
                  </div>
                ))}
              </div> */}
            </div>
          ))}
        </div>

        {/* ================= NON-TEACHING STAFF ================= */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            {/* <div className="p-2 bg-[#800000] rounded-lg">
              <User className="h-6 w-6 text-white" />
            </div> */}
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#800000]">
              Non-Teaching Staff
            </h2>
          </div>

          {/* Desktop Table */}
          <div className="overflow-x-auto hidden md:block">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                    Designation
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                    Qualification
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {teachersData.nonTeachingStaff.map((staff, index) => (
                  <tr
                    key={staff.id}
                    className={index % 2 === 0 ? "bg-gray-50/50" : "bg-white"}
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {staff.name}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {staff.designation}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {staff.qualification}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {teachersData.nonTeachingStaff.map((staff) => (
              <div
                key={staff.id}
                className="bg-gray-50 rounded-lg p-4 border border-gray-200"
              >
                <h4 className="font-semibold text-gray-900">{staff.name}</h4>
                <p className="text-sm text-blue-600 font-medium">
                  {staff.designation}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {staff.qualification}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Download Section */}
        {/* <div className="mt-12">
          <div className="bg-gradient-to-r from-[#F07B3D] to-[#FF9933] rounded-xl p-8 text-center text-white mb-8">
            <h3 className="text-2xl font-bold mb-4">
              Download Faculty Information
            </h3>
            <p className="mb-6 opacity-90">
              Get detailed information about our faculty members including
              photographs, qualifications, and subjects
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {teachersData.downloads.map((download) => (
                <div
                  key={download.id}
                  className="bg-white/20 backdrop-blur-sm rounded-lg p-4"
                >
                  <h4 className="font-semibold mb-2">{download.title}</h4>
                  <p className="text-sm opacity-90 mb-3">
                    {download.description}
                  </p>
                  <button
                    onClick={() =>
                      handleDownload(download.file, `${download.title}.pdf`)
                    }
                    className="w-full bg-white text-[#F07B3D] px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    {download.buttonText}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Teachers;
