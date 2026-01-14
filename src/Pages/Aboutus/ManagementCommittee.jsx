// components/Committee/CommitteePage.jsx
import React from "react";
import { committeeData } from "../../constant/Aboutus/CommitteeData/committeeData";
import { Download, Mail, User, Briefcase } from "lucide-react";

const ManagementCommittee = () => {
  const handleDownload = (filePath, fileName) => {
    // Create a link element
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
            {committeeData.hero.title}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#800000] to-[#800000] mx-auto mb-6 rounded-full"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {committeeData.hero.description}
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-12">
          {committeeData.sections.map((section, sectionIndex) => (
            <div
              key={section.id}
              className="bg-white rounded-xl shadow-lg p-6 md:p-8"
            >
              {/* Section Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                <div>
                  <h2 className="md:text-2xl  font-bold text-[#800000] mb-2">
                    {section.title}
                  </h2>
                  {/* <p className="text-gray-600">{section.description}</p> */}
                </div>
              </div>

              {/* Members List */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          Member
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4" />
                          Designation
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          Contact
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {section.members.map((member, memberIndex) => (
                      <tr
                        key={member.id}
                        className={`hover:bg-gray-50 transition-colors duration-150 ${
                          memberIndex % 2 === 0 ? "bg-gray-50/50" : "bg-white"
                        }`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {member.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-700 font-medium">
                            {member.designation}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600">
                            {member.role}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <a
                            href={`mailto:${member.contact}`}
                            className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                          >
                            {member.contact}
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile View - Cards */}
              <div className="mt-8 md:hidden space-y-4">
                {section.members.map((member) => (
                  <div
                    key={member.id}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {member.name}
                        </h4>
                        <p className="text-sm text-blue-600 font-medium">
                          {member.designation}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{member.role}</p>
                    <a
                      href={`mailto:${member.contact}`}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {member.contact}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManagementCommittee;
