import { motion } from "framer-motion";
import { useState } from "react";
import { Send, CheckCircle, School, Phone, Mail, User, MapPin, BookOpen } from "lucide-react";
import { elephantsticker } from "../../../assets";

const InquiryForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    state: "",
    city: "",
    schoolName: "",
    studentClass: "",
    email: "",
    phone: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        firstName: "",
        lastName: "",
        state: "",
        city: "",
        schoolName: "",
        studentClass: "",
        email: "",
        phone: "",
      });
    }, 3000);
  };

  return (
    <section className="py-20 relative overflow-hidden" id="inquiry">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full -translate-x-48 -translate-y-48"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-500/10 to-purple-500/10 rounded-full translate-x-48 translate-y-48"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-2 h-2 rounded-full bg-purple-500"></div>
            <h2 className="text-center text-2xl text-[#800000] md:text-4xl font-serif font-semibold text- mb-4
">
              Admission Enquiry Form
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
            Fill out the form below and our admission team will contact you within 24 hours
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Side - Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="bg-gradient-to-br from-white to-white/90 rounded-2xl shadow-xl p-8 h-full border border-white/50 backdrop-blur-sm">
              {/* Sticker Image */}
              <div className="mb-8 flex justify-center">
                <div className="relative w-48 h-48">
                  <img
                    src={elephantsticker}
                    alt="School Mascot"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-100">
                Why Choose VPP CBSE?
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <div className="text-purple-600">🏆</div>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 mb-1">Academic Excellence</p>
                    <p className="text-sm text-gray-600">Consistent 100% board results with comprehensive learning approach</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <div className="text-purple-600">🧠</div>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 mb-1">Holistic Development</p>
                    <p className="text-sm text-gray-600">Balanced focus on academics, sports, arts, and personality development</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <div className="text-purple-600">🏫</div>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 mb-1">Modern Infrastructure</p>
                    <p className="text-sm text-gray-600">State-of-the-art facilities including smart classrooms and laboratories</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <div className="text-purple-600">👨‍🏫</div>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 mb-1">Expert Faculty</p>
                    <p className="text-sm text-gray-600">Qualified and experienced teachers with student-centric teaching methods</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-800">Response Time:</span> Within 24 hours
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  <span className="font-semibold text-gray-800">Office Hours:</span> 8:30 AM - 4:00 PM (Mon-Sat)
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <div className="lg:col-span-1">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-br from-white to-white/90 rounded-2xl shadow-xl p-12 text-center border border-white/50 backdrop-blur-sm"
              >
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-green-500/10 to-emerald-500/10 mb-8">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Thank You for Your Enquiry!
                </h3>
                <p className="text-gray-600 mb-8 text-lg">
                  We have received your details. Our admission team will contact
                  you shortly at
                  <span className="font-semibold text-purple-600">
                    {" "}
                    {formData.email}
                  </span>
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="group px-10 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 transform flex items-center gap-3 mx-auto"
                >
                  <span>Submit Another Enquiry</span>
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ) : (
              <div className="bg-gradient-to-br from-white to-white/90 rounded-2xl shadow-xl overflow-hidden border border-white/50 backdrop-blur-sm">
                <div className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* First Name */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        viewport={{ once: true }}
                      >
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Student First Name *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-3 focus:ring-purple-500/20 outline-none transition-all duration-300 bg-white/50"
                            placeholder="Enter first name"
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <User className="w-5 h-5 text-gray-400" />
                          </div>
                        </div>
                      </motion.div>

                      {/* Last Name */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                      >
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Last Name *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-3 focus:ring-purple-500/20 outline-none transition-all duration-300 bg-white/50"
                            placeholder="Enter last name"
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <User className="w-5 h-5 text-gray-400" />
                          </div>
                        </div>
                      </motion.div>

                      {/* State */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        viewport={{ once: true }}
                      >
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          State *
                        </label>
                        <div className="relative">
                          <select
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-3 focus:ring-purple-500/20 outline-none appearance-none bg-white/50"
                          >
                            <option value="">Select State</option>
                            <option value="maharashtra">Maharashtra</option>
                            <option value="delhi">Delhi</option>
                            <option value="karnataka">Karnataka</option>
                            <option value="tamilnadu">Tamil Nadu</option>
                            <option value="gujarat">Gujarat</option>
                          </select>
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <MapPin className="w-5 h-5 text-gray-400" />
                          </div>
                        </div>
                      </motion.div>

                      {/* City */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        viewport={{ once: true }}
                      >
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          City *
                        </label>
                        <div className="relative">
                          <select
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-3 focus:ring-purple-500/20 outline-none appearance-none bg-white/50"
                          >
                            <option value="">Select City</option>
                            <option value="mumbai">Mumbai</option>
                            <option value="pune">Pune</option>
                            <option value="bangalore">Bangalore</option>
                            <option value="chennai">Chennai</option>
                            <option value="ahmedabad">Ahmedabad</option>
                          </select>
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <MapPin className="w-5 h-5 text-gray-400" />
                          </div>
                        </div>
                      </motion.div>

                      {/* School Name */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        viewport={{ once: true }}
                      >
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Current School *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="schoolName"
                            value={formData.schoolName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-3 focus:ring-purple-500/20 outline-none transition-all duration-300 bg-white/50"
                            placeholder="Enter school name"
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <School className="w-5 h-5 text-gray-400" />
                          </div>
                        </div>
                      </motion.div>

                      {/* Class */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        viewport={{ once: true }}
                      >
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Current Class *
                        </label>
                        <div className="relative">
                          <select
                            name="studentClass"
                            value={formData.studentClass}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-3 focus:ring-purple-500/20 outline-none appearance-none bg-white/50"
                          >
                            <option value="">Select Class</option>
                            <option value="playgroup">Playgroup</option>
                            <option value="nursery">Nursery</option>
                            <option value="jr_kg">Junior KG</option>
                            <option value="sr_kg">Senior KG</option>
                            <option value="grade1">Grade 1</option>
                            <option value="grade2">Grade 2</option>
                          </select>
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <BookOpen className="w-5 h-5 text-gray-400" />
                          </div>
                        </div>
                      </motion.div>

                      {/* Email */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        viewport={{ once: true }}
                      >
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-3 focus:ring-purple-500/20 outline-none transition-all duration-300 bg-white/50"
                            placeholder="Enter email address"
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <Mail className="w-5 h-5 text-gray-400" />
                          </div>
                        </div>
                      </motion.div>

                      {/* Phone */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        viewport={{ once: true }}
                      >
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <div className="flex rounded-xl shadow-sm">
                          <span className="inline-flex items-center rounded-l-xl border border-r-0 border-gray-300 bg-gray-50/50 px-4 text-gray-500">
                            +91
                          </span>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full rounded-r-xl border border-gray-300 focus:border-purple-500 focus:ring-3 focus:ring-purple-500/20 px-4 py-3 outline-none transition-all duration-300 bg-white/50"
                            placeholder="Enter phone number"
                          />
                        </div>
                      </motion.div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6">
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full group px-8 py-4 bg-gradient-to-r from-[#0A2342] to-[#0A2342] text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 shadow-lg hover:-translate-y-1 transform flex items-center justify-center gap-3"
                      >
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        <span>Submit Enquiry</span>
                      </motion.button>
                      <p className="text-center text-gray-600 text-sm mt-4">
                        Our team will contact you within 24 hours
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InquiryForm;