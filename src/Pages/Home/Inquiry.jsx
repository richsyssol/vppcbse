import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Send, MapPin, Phone, Mail } from "lucide-react";

const Inquiry = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    grade: "",
    email: "",
    mobileNumber: "",
    location: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.grade) newErrors.grade = "Please select a grade";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.mobileNumber.trim())
      newErrors.mobileNumber = "Mobile number is required";
    else if (!/^\d{10}$/.test(formData.mobileNumber))
      newErrors.mobileNumber = "Mobile number must be 10 digits";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Form submitted:", formData);
      setIsSubmitted(true);
      setTimeout(() => {
        resetForm();
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      grade: "",
      email: "",
      mobileNumber: "",
      location: "",
    });
    setErrors({});
    setIsSubmitted(false);
  };

  const popularLocations = [
    // Metro Cities
    "Delhi",
    "Mumbai",
    "Bangalore",
    "Hyderabad",
    "Chennai",
    "Kolkata",
    "Pune",
    "Ahmedabad",
    // Maharashtra
    "Nagpur",
    "Nashik",
    "Aurangabad",
    "Solapur",
    "Kolhapur",
    "Amravati",
    // Gujarat
    "Surat",
    "Vadodara",
    "Rajkot",
    "Bhavnagar",
    "Jamnagar",
    // Karnataka
    "Mysore",
    "Mangalore",
    "Hubli",
    "Belgaum",
    "Davangere",
    // Telangana
    "Warangal",
    "Karimnagar",
    "Nizamabad",
    // Tamil Nadu
    "Coimbatore",
    "Madurai",
    "Trichy",
    "Salem",
    "Erode",
    "Tirunelveli",
    // West Bengal
    "Howrah",
    "Durgapur",
    "Siliguri",
    "Asansol",
    // Rajasthan
    "Jaipur",
    "Jodhpur",
    "Udaipur",
    "Kota",
    "Ajmer",
    "Bikaner",
    // Uttar Pradesh
    "Lucknow",
    "Kanpur",
    "Agra",
    "Varanasi",
    "Prayagraj",
    "Meerut",
    "Noida",
    "Greater Noida",
    "Ghaziabad",
    // Haryana
    "Gurgaon",
    "Faridabad",
    "Panipat",
    "Sonipat",
    "Karnal",
    // Punjab
    "Chandigarh",
    "Ludhiana",
    "Amritsar",
    "Jalandhar",
    "Patiala",
    // Uttarakhand
    "Dehradun",
    "Haridwar",
    "Roorkee",
    "Haldwani",
    // Madhya Pradesh
    "Bhopal",
    "Indore",
    "Gwalior",
    "Jabalpur",
    "Ujjain",
    // Bihar
    "Patna",
    "Gaya",
    "Bhagalpur",
    "Muzaffarpur",
    // Jharkhand
    "Ranchi",
    "Jamshedpur",
    "Dhanbad",
    // Odisha
    "Bhubaneswar",
    "Cuttack",
    "Rourkela",
    "Sambalpur",
    // Chhattisgarh
    "Raipur",
    "Bilaspur",
    "Durg",
    "Bhilai",
    // Assam
    "Guwahati",
    "Dibrugarh",
    "Silchar",
    // Kerala
    "Kochi",
    "Trivandrum",
    "Kozhikode",
    "Thrissur",
    // Andhra Pradesh
    "Visakhapatnam",
    "Vijayawada",
    "Guntur",
    "Nellore",
    "Tirupati",
    // Goa
    "Panaji",
    "Margao",
    // Himachal Pradesh
    "Shimla",
    "Solan",
    "Dharamshala",
    // Jammu & Kashmir
    "Srinagar",
    "Jammu",
    // North East
    "Imphal",
    "Shillong",
    "Aizawl",
    "Agartala",
    "Kohima",
    "Itanagar",
    // UTs
    "Puducherry",
    "Port Blair",
    "Daman",
    "Diu",
    "Silvassa",
  ];

  return (
    <section
      className="py-24 relative overflow-hidden gradient-light"
      id="inquiry-form"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-navy-100/30 to-blue-100/20 rounded-full -translate-x-48 -translate-y-48"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-100/20 to-navy-100/30 rounded-full translate-x-48 translate-y-48"></div>

      {/* Floating elements */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute w-32 h-32 bg-gradient-to-br from-navy-400/5 to-blue-400/5 rounded-full"
            style={{
              left: `${10 + i * 30}%`,
              top: `${20 + i * 20}%`,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-2 h-2 rounded-full bg-navy-500"></div>
            <h2 className="font-title text-3xl md:text-4xl font-bold text-gradient-navy">
              Enquiry Form
            </h2>
            <div className="w-2 h-2 rounded-full bg-navy-500"></div>
          </div>

          <motion.div
            className="h-1.5 w-24 gradient-navy mx-auto mb-8 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: "6rem" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          />
          <p className="text-navy-700 max-w-2xl mx-auto text-lg md:text-xl">
            Fill out the form below and our admission team will contact you
            within 24 hours
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-lg p-8 h-full border border-navy-100">
              <h3 className="text-xl font-bold text-navy-800 mb-6 pb-4 border-b border-navy-100">
                Quick Contact
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-navy-50 to-blue-50 rounded-xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-navy-600" />
                  </div>
                  <div>
                    <p className="text-sm text-navy-600 mb-1">Call Us</p>
                    <p className="text-lg font-semibold text-navy-800">
                      7507546666
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-navy-50 to-blue-50 rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-navy-600" />
                  </div>
                  <div>
                    <p className="text-sm text-navy-600 mb-1">Email Us</p>
                    <p className="text-lg font-semibold text-navy-800">
                      info@vppcbse.bhonsala.in
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-navy-50 to-blue-50 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-navy-600" />
                  </div>
                  <div>
                    <p className="text-sm text-navy-600 mb-1">Visit Us</p>
                    <p className="text-base font-semibold text-navy-800">
                      Dr. B.S. Moonje Marg, Rambhoomi
                      <br />
                      Nashik, Maharashtra 422005
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-navy-100">
                <p className="text-sm text-navy-600">
                  <span className="font-semibold">Response Time:</span> Within
                  24 hours
                </p>
                <p className="text-sm text-navy-600 mt-2">
                  <span className="font-semibold">Office Hours:</span> 8:30 AM -
                  12:00 PM
                </p>
              </div>
            </div>
          </motion.div>

          {/* Form Section */}
          <div className="lg:col-span-2">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl shadow-lg p-12 text-center border border-navy-100"
              >
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-navy-50 to-blue-50 mb-8">
                  <CheckCircle className="h-12 w-12 text-navy-600" />
                </div>
                <h3 className="text-2xl font-bold text-navy-900 mb-4">
                  Thank You for Your Enquiry!
                </h3>
                <p className="text-navy-600 mb-8 text-lg">
                  We have received your details. Our admission team will contact
                  you shortly at
                  <span className="font-semibold text-navy-600">
                    {" "}
                    {formData.email}
                  </span>{" "}
                  or
                  <span className="font-semibold text-navy-600">
                    {" "}
                    +91 {formData.mobileNumber}
                  </span>
                  .
                </p>
                <button
                  onClick={resetForm}
                  className="group px-10 py-4 gradient-navy text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 shadow-md hover:-translate-y-1 transform flex items-center gap-3 mx-auto"
                >
                  <span>Submit Another Enquiry</span>
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-navy-100">
                <div className="px-8 py-12 sm:p-12">
                  <form onSubmit={handleSubmit} className="space-y-10">
                    {/* Row 1: Name Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {["firstName", "lastName"].map((field) => (
                        <motion.div
                          key={field}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: field === "firstName" ? 0.1 : 0.2,
                          }}
                          viewport={{ once: true }}
                        >
                          <label className="block text-sm font-semibold text-navy-700 mb-3">
                            {field === "firstName"
                              ? "Student First Name *"
                              : "Last Name *"}
                          </label>
                          <input
                            type="text"
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            className={`block w-full rounded-xl border ${
                              errors[field]
                                ? "border-red-500"
                                : "border-navy-200"
                            } px-6 py-4 text-base placeholder-navy-400 focus:border-navy-500 focus:outline-none focus:ring-3 focus:ring-navy-500/20 transition-all duration-300 bg-white`}
                            placeholder={`Enter student's ${
                              field === "firstName" ? "first" : "last"
                            } name`}
                          />
                          {errors[field] && (
                            <p className="mt-2 text-sm text-red-600">
                              {errors[field]}
                            </p>
                          )}
                        </motion.div>
                      ))}
                    </div>

                    {/* Row 2: Grade & Location */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {["grade", "location"].map((field) => (
                        <motion.div
                          key={field}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: field === "grade" ? 0.3 : 0.4 }}
                          viewport={{ once: true }}
                        >
                          <label className="block text-sm font-semibold text-navy-700 mb-3">
                            {field === "grade"
                              ? "Grade Seeking Admission For *"
                              : "Your Location/City *"}
                          </label>
                          {field === "grade" ? (
                            <select
                              name="grade"
                              value={formData.grade}
                              onChange={handleChange}
                              className={`block w-full rounded-xl border ${
                                errors.grade
                                  ? "border-red-500"
                                  : "border-navy-200"
                              } px-6 py-4 text-base focus:border-navy-500 focus:outline-none focus:ring-3 focus:ring-navy-500/20 transition-all duration-300 bg-white`}
                            >
                              <option value="">Select Grade</option>
                              {[
                                "nursery",
                                "lkg",
                                "ukg",
                                ...Array.from({ length: 10 }, (_, i) => i + 1),
                              ].map((grade) => (
                                <option key={grade} value={grade}>
                                  {typeof grade === "number"
                                    ? `Grade ${grade}`
                                    : grade.charAt(0).toUpperCase() +
                                      grade.slice(1)}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <div className="relative">
                              <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                list="location-suggestions"
                                className={`block w-full rounded-xl border ${
                                  errors.location
                                    ? "border-red-500"
                                    : "border-navy-200"
                                } px-6 py-4 text-base placeholder-navy-400 focus:border-navy-500 focus:outline-none focus:ring-3 focus:ring-navy-500/20 transition-all duration-300 bg-white`}
                                placeholder="Enter your city"
                              />
                              <datalist id="location-suggestions">
                                {popularLocations.map((city) => (
                                  <option key={city} value={city} />
                                ))}
                              </datalist>
                            </div>
                          )}
                          {errors[field] && (
                            <p className="mt-2 text-sm text-red-600">
                              {errors[field]}
                            </p>
                          )}
                        </motion.div>
                      ))}
                    </div>

                    {/* Row 3: Contact Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {["email", "mobileNumber"].map((field) => (
                        <motion.div
                          key={field}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: field === "email" ? 0.5 : 0.6 }}
                          viewport={{ once: true }}
                        >
                          <label className="block text-sm font-semibold text-navy-700 mb-3">
                            {field === "email"
                              ? "Email Address *"
                              : "Mobile Number *"}
                          </label>
                          {field === "mobileNumber" ? (
                            <div className="flex rounded-xl shadow-sm bg-white">
                              <span className="inline-flex items-center rounded-l-xl border border-r-0 border-navy-200 bg-navy-50 px-6 text-base text-navy-500">
                                +91
                              </span>
                              <input
                                type="tel"
                                name="mobileNumber"
                                value={formData.mobileNumber}
                                onChange={handleChange}
                                maxLength="10"
                                className={`block w-full rounded-none rounded-r-xl border ${
                                  errors.mobileNumber
                                    ? "border-red-500"
                                    : "border-navy-200"
                                } px-6 py-4 text-base placeholder-navy-400 focus:border-navy-500 focus:outline-none focus:ring-3 focus:ring-navy-500/20 transition-all duration-300`}
                                placeholder="Enter parent's mobile number"
                              />
                            </div>
                          ) : (
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              className={`block w-full rounded-xl border ${
                                errors.email
                                  ? "border-red-500"
                                  : "border-navy-200"
                              } px-6 py-4 text-base placeholder-navy-400 focus:border-navy-500 focus:outline-none focus:ring-3 focus:ring-navy-500/20 transition-all duration-300 bg-white`}
                              placeholder="Enter parent's email address"
                            />
                          )}
                          {errors[field] && (
                            <p className="mt-2 text-sm text-red-600">
                              {errors[field]}
                            </p>
                          )}
                        </motion.div>
                      ))}
                    </div>

                    {/* Terms & Submit */}
                    <div className="pt-10 border-t border-navy-200">
                      <div className="flex items-start mb-8">
                        <input
                          id="terms"
                          name="terms"
                          type="checkbox"
                          required
                          className="h-5 w-5 text-navy-600 focus:ring-navy-500 border-navy-300 rounded mt-1"
                        />
                        <label
                          htmlFor="terms"
                          className="ml-3 block text-sm text-navy-700"
                        >
                          I agree to receive communication from the school
                          regarding admission procedures, events, and updates. I
                          confirm that all information provided is accurate to
                          the best of my knowledge.
                        </label>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-6">
                        <motion.button
                          type="submit"
                          disabled={isSubmitting}
                          className="flex-1 group px-10 py-5 gradient-navy text-white rounded-xl font-semibold focus:outline-none focus:ring-3 focus:ring-navy-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1 transform flex items-center justify-center gap-3"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {isSubmitting ? (
                            <>
                              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                              Submitting...
                            </>
                          ) : (
                            <>
                              <span>Submit Enquiry</span>
                              <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </>
                          )}
                        </motion.button>

                        <button
                          type="button"
                          onClick={resetForm}
                          className="px-10 py-5 border-2 border-navy-300 rounded-xl text-base font-semibold text-navy-700 bg-white hover:bg-navy-50 focus:outline-none focus:ring-3 focus:ring-navy-200 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1 transform"
                        >
                          Reset Form
                        </button>
                      </div>
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

export default Inquiry;
