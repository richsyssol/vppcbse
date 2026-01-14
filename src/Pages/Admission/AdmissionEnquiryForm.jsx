// components/Admission/AdmissionEnquiryForm.jsx
import React, { useState, useEffect } from "react";
import {
  User,
  Calendar,
  School,
  BookOpen,
  Mail,
  Phone,
  Send,
  UserCircle,
  AlertCircle,
  FileText,
  Eye,
  Download,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
  X,
} from "lucide-react";

// API base URL - update this to match your Laravel server
const API_BASE_URL = "https://vppcms.demovoting.com/api";

const AdmissionEnquiryForm = () => {
  // Form state
  const [formData, setFormData] = useState({
    full_name: "",
    date_of_birth: "",
    admission_class: "",
    last_exam: "",
    father_name: "",
    email: "",
    mobile_no: "",
    additional_info: "",
  });

  // Enquiries list state
  const [enquiries, setEnquiries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [perPage, setPerPage] = useState(15);
  const [loading, setLoading] = useState(false);
  const [showEnquiries, setShowEnquiries] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [classFilter, setClassFilter] = useState("");

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [mobileValidation, setMobileValidation] = useState({
    isValid: false,
    message: "",
    prefix: "",
    operator: "",
  });

  const classOptions = [
    "SELECT CLASS",
    "Nursery",
    "Junior KG",
    "Senior KG",
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
    "VIII",
    "IX",
    "X",
  ];

  // Last Examination passed/appeared options
  const lastExamOptions = [
    "SELECT LAST EXAM",
    "Nursery",
    "Junior KG",
    "Senior KG",
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
    "VIII",
    "IX",
    "X",
    "XI",
    "XII",
    "Other",
  ];

  // Enhanced TRAI-approved Indian mobile number prefixes with operator info
  const mobileOperators = {
    // Jio
    70: "Jio",
    72: "Jio",
    73: "Jio",
    74: "Jio",
    75: "Jio",
    76: "Jio",
    77: "Jio",
    78: "Jio",
    79: "Jio",

    // Airtel
    98: "Airtel",
    99: "Airtel",
    96: "Airtel",
    97: "Airtel",
    81: "Airtel",
    84: "Airtel",
    85: "Airtel",
    86: "Airtel",
    88: "Airtel",
    89: "Airtel",
    82: "Airtel",
    83: "Airtel",

    // Vodafone Idea
    90: "Vodafone Idea",
    91: "Vodafone Idea",
    92: "Vodafone Idea",
    93: "Vodafone Idea",
    94: "Vodafone Idea",
    95: "Vodafone Idea",

    // BSNL
    80: "BSNL",
    // 81: "BSNL",
    // 82: "BSNL",
    // 83: "BSNL",
    // 84: "BSNL",
    // 85: "BSNL",
    // 86: "BSNL",

    // MTNL
    87: "MTNL",
    // 88: "MTNL",
    // 89: "MTNL",

    // Reliance Communications
    60: "Reliance",
    61: "Reliance",
    62: "Reliance",
    63: "Reliance",
    64: "Reliance",
    65: "Reliance",
    66: "Reliance",
    67: "Reliance",
    68: "Reliance",
    69: "Reliance",

    // Tata Docomo
    50: "Tata Docomo",
    51: "Tata Docomo",
    52: "Tata Docomo",
    53: "Tata Docomo",
    54: "Tata Docomo",
    55: "Tata Docomo",
    56: "Tata Docomo",
    57: "Tata Docomo",
    58: "Tata Docomo",
    59: "Tata Docomo",
  };

  // Valid prefixes (all keys from mobileOperators)
  const validPrefixes = Object.keys(mobileOperators);

  // Fetch enquiries from API
  const fetchEnquiries = async (page = 1) => {
    setLoading(true);
    try {
      let url = `${API_BASE_URL}/admission-enquiries?page=${page}&per_page=${perPage}`;

      if (searchTerm) {
        url += `&search=${encodeURIComponent(searchTerm)}`;
      }
      if (statusFilter) {
        url += `&status=${encodeURIComponent(statusFilter)}`;
      }
      if (classFilter) {
        url += `&class=${encodeURIComponent(classFilter)}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();

      if (result.success) {
        setEnquiries(result.data.data || []);
        setCurrentPage(result.data.current_page);
        setTotalPages(result.data.last_page);
        setTotalItems(result.data.total);
      }
    } catch (error) {
      console.error("Error fetching enquiries:", error);
      setSubmitError("Failed to load enquiries. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch enquiries on component mount and when filters change
  useEffect(() => {
    if (showEnquiries) {
      fetchEnquiries(currentPage);
    }
  }, [
    showEnquiries,
    currentPage,
    perPage,
    searchTerm,
    statusFilter,
    classFilter,
  ]);

  // Enhanced mobile validation function
  const validateMobileNumber = (mobileNo) => {
    // Reset validation state
    setMobileValidation({
      isValid: false,
      message: "",
      prefix: "",
      operator: "",
    });

    // Check if empty
    if (!mobileNo) {
      return "Mobile number is required";
    }

    // Check if it's exactly 10 digits
    if (!/^\d{10}$/.test(mobileNo)) {
      return "Mobile number must be exactly 10 digits";
    }

    // Check if it starts with a valid TRAI prefix
    const prefix = mobileNo.substring(0, 2);
    const operator = mobileOperators[prefix];

    if (!validPrefixes.includes(prefix)) {
      return "Please enter a valid Indian mobile number";
    }

    // Comprehensive fake number detection
    const invalidPatterns = [
      // All same digits
      /^(\d)\1{9}$/,

      // Sequential ascending
      /^1234567890$/,
      /^0123456789$/,
      /^2345678901$/,

      // Sequential descending
      /^0987654321$/,
      /^9876543210$/,
      /^8765432109$/,

      // Repeated patterns
      /^(\d{2})\1{4}$/, // 1212121212
      /^(\d{3})\1{3}$/, // 1231231231
      /^(\d{4})\1{2}$/, // 1234123412
      /^(\d{5})\1$/, // 1234512345

      // Common fake patterns
      /^1111111111$/,
      /^2222222222$/,
      /^3333333333$/,
      /^4444444444$/,
      /^5555555555$/,
      /^6666666666$/,
      /^7777777777$/,
      /^8888888888$/,
      /^9999999999$/,
      /^0000000000$/,

      // Palindrome numbers
      /^(\d)(\d)(\d)(\d)(\d)(\d)\6\5\4\3\2\1$/,

      // Mirror numbers
      /^(\d)(\d)(\d)(\d)(\d)\5\4\3\2\1$/,

      // Test numbers commonly used
      /^9998887776$/,
      /^8887776665$/,
      /^7776665554$/,
      /^6665554443$/,
      /^5554443332$/,

      // Common placeholder numbers
      /^1231231234$/,
      /^9879879876$/,
      /^4564564567$/,
    ];

    for (const pattern of invalidPatterns) {
      if (pattern.test(mobileNo)) {
        return "Please enter a valid mobile number (test/fake numbers not allowed)";
      }
    }

    // Check for invalid operator-specific patterns
    // Some operators have specific number ranges that are often fake
    const jioFakePatterns = [
      /^70[0-4]\d{7}$/, // Jio test numbers often start with 700-704
    ];

    const airtelFakePatterns = [
      /^98[0-2]\d{7}$/, // Airtel test ranges
    ];

    if (operator === "Jio") {
      for (const pattern of jioFakePatterns) {
        if (pattern.test(mobileNo)) {
          return "Please enter a valid Jio mobile number";
        }
      }
    }

    if (operator === "Airtel") {
      for (const pattern of airtelFakePatterns) {
        if (pattern.test(mobileNo)) {
          return "Please enter a valid Airtel mobile number";
        }
      }
    }

    // Update validation state for valid numbers
    setMobileValidation({
      isValid: true,
      message: `Valid ${operator || "Indian"} number`,
      prefix: prefix,
      operator: operator || "Unknown",
    });

    return null; // No error
  };

  // Validate mobile number in real-time
  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);

    setFormData((prev) => ({
      ...prev,
      mobile_no: value,
    }));

    // Clear previous errors
    if (errors.mobile_no) {
      setErrors((prev) => ({
        ...prev,
        mobile_no: "",
      }));
    }

    setSubmitError("");

    // Validate only if we have 10 digits
    if (value.length === 10) {
      const error = validateMobileNumber(value);
      if (error) {
        setErrors((prev) => ({
          ...prev,
          mobile_no: error,
        }));
      }
    } else if (value.length > 0) {
      // Partial validation for less than 10 digits
      setMobileValidation({
        isValid: false,
        message: "Enter 10-digit mobile number",
        prefix: "",
        operator: "",
      });
    } else {
      // Clear validation state
      setMobileValidation({
        isValid: false,
        message: "",
        prefix: "",
        operator: "",
      });
    }
  };

  // Handle other form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobile_no") {
      handleMobileChange(e);
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
    setSubmitError("");
  };

  // Form validation function
  const validateForm = () => {
    const newErrors = {};

    // Full Name validation
    if (!formData.full_name.trim()) {
      newErrors.full_name = "Full Name is required";
    } else if (formData.full_name.trim().length < 2) {
      newErrors.full_name = "Full Name must be at least 2 characters";
    }

    // Date of Birth validation
    if (!formData.date_of_birth) {
      newErrors.date_of_birth = "Date of Birth is required";
    } else {
      const dob = new Date(formData.date_of_birth);
      const today = new Date();
      if (dob >= today) {
        newErrors.date_of_birth = "Date of Birth must be in the past";
      }

      // Additional check for very young or old ages
      const age = today.getFullYear() - dob.getFullYear();
      if (age < 2) {
        newErrors.date_of_birth = "Student must be at least 2 years old";
      }
      if (age > 18) {
        newErrors.date_of_birth = "Student age seems incorrect";
      }
    }

    // Admission Class validation
    if (
      !formData.admission_class ||
      formData.admission_class === "SELECT CLASS"
    ) {
      newErrors.admission_class = "Please select a class";
    }

    // Last Exam validation
    if (!formData.last_exam || formData.last_exam === "SELECT LAST EXAM") {
      newErrors.last_exam = "Please select last examination passed/appeared";
    }

    // Father's Name validation
    if (!formData.father_name.trim()) {
      newErrors.father_name = "Father's Name is required";
    } else if (formData.father_name.trim().length < 2) {
      newErrors.father_name = "Father's Name must be at least 2 characters";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    } else {
      // Basic email pattern check
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    // Mobile number validation
    if (!formData.mobile_no.trim()) {
      newErrors.mobile_no = "Mobile No. is required";
    } else {
      const mobileError = validateMobileNumber(formData.mobile_no);
      if (mobileError) {
        newErrors.mobile_no = mobileError;
      }
    }

    return newErrors;
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Format date-time for display
  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "new":
        return "bg-yellow-100 text-yellow-800";
      case "contacted":
        return "bg-blue-100 text-blue-800";
      case "follow_up":
        return "bg-purple-100 text-purple-800";
      case "admitted":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get status display text
  const getStatusText = (status) => {
    switch (status) {
      case "new":
        return "New";
      case "contacted":
        return "Contacted";
      case "follow_up":
        return "Follow Up";
      case "admitted":
        return "Admitted";
      case "rejected":
        return "Rejected";
      default:
        return status;
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Scroll to first error
      const firstError = Object.keys(validationErrors)[0];
      const element = document.getElementsByName(firstError)[0];
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        element.focus();
      }
      return;
    }

    // Double-check mobile validation before submission
    const mobileError = validateMobileNumber(formData.mobile_no);
    if (mobileError) {
      setErrors((prev) => ({
        ...prev,
        mobile_no: mobileError,
      }));

      const element = document.getElementsByName("mobile_no")[0];
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        element.focus();
      }
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Prepare data for API (match field names exactly)
      const apiData = {
        full_name: formData.full_name,
        date_of_birth: formData.date_of_birth,
        admission_class: formData.admission_class,
        last_exam: formData.last_exam,
        father_name: formData.father_name,
        email: formData.email,
        mobile_no: formData.mobile_no,
        additional_info: formData.additional_info || "",
      };

      const response = await fetch(`${API_BASE_URL}/admission-enquiry`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(apiData),
      });

      const result = await response.json();

      if (!response.ok) {
        // Handle validation errors from backend
        if (response.status === 422 && result.errors) {
          const apiErrors = {};
          Object.keys(result.errors).forEach((key) => {
            // Map API field names to form field names
            const formFieldName = key;
            apiErrors[formFieldName] = result.errors[key][0];
          });
          setErrors(apiErrors);

          // Focus on first error field
          const firstError = Object.keys(apiErrors)[0];
          const element = document.getElementsByName(firstError)[0];
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
            element.focus();
          }

          throw new Error("Validation failed");
        }
        throw new Error(
          result.message || `Submission failed with status ${response.status}`
        );
      }

      setIsSubmitting(false);
      setIsSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          full_name: "",
          date_of_birth: "",
          admission_class: "",
          last_exam: "",
          father_name: "",
          email: "",
          mobile_no: "",
          additional_info: "",
        });
        setErrors({});
        setMobileValidation({
          isValid: false,
          message: "",
          prefix: "",
          operator: "",
        });

        // Refresh enquiries list if it's visible
        if (showEnquiries) {
          fetchEnquiries(1);
        }
      }, 3000);
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitError(
        error.message || "Failed to submit form. Please try again."
      );
      setIsSubmitting(false);
    }
  };

  // Individual form fields for better state management
  const renderFormField = (fieldConfig) => {
    const {
      label,
      name,
      type = "text",
      placeholder,
      icon: Icon,
      required = true,
      rows,
      options,
    } = fieldConfig;

    const error = errors[name];
    const value = formData[name];

    return (
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-semibold mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="relative">
          {Icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Icon className="h-5 w-5" />
            </div>
          )}
          {type === "select" ? (
            <select
              name={name}
              value={value}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F07B3D] focus:border-transparent transition-all ${
                Icon ? "pl-12" : "pl-4"
              } ${error ? "border-red-500" : "border-gray-300"}`}
            >
              {options.map((option, index) => (
                <option key={index} value={option} disabled={index === 0}>
                  {option}
                </option>
              ))}
            </select>
          ) : type === "textarea" ? (
            <textarea
              name={name}
              value={value}
              onChange={handleChange}
              placeholder={placeholder}
              rows={rows}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F07B3D] focus:border-transparent transition-all ${
                Icon ? "pl-12" : "pl-4"
              } ${error ? "border-red-500" : "border-gray-300"}`}
            />
          ) : name === "mobile_no" ? (
            // Special input for mobile number
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                <span className="text-gray-500 text-sm">+91</span>
                <div className="w-px h-4 bg-gray-300 mx-1"></div>
              </div>
              <input
                type="tel"
                name={name}
                value={value}
                onChange={handleChange}
                placeholder="98765 43210"
                maxLength="10"
                pattern="[0-9]*"
                inputMode="numeric"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F07B3D] focus:border-transparent transition-all pl-20 ${
                  error ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>
          ) : (
            <input
              type={type}
              name={name}
              value={value}
              onChange={handleChange}
              placeholder={placeholder}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F07B3D] focus:border-transparent transition-all ${
                Icon ? "pl-12" : "pl-4"
              } ${error ? "border-red-500" : "border-gray-300"}`}
            />
          )}
        </div>

        {/* Mobile number validation feedback */}
        {name === "mobile_no" &&
          !error &&
          value.length === 10 &&
          mobileValidation.isValid && (
            <div className="mt-1">
              <p className="text-green-600 text-xs flex items-center gap-1">
                <svg
                  className="h-3 w-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Valid {mobileValidation.operator} number (
                {mobileValidation.prefix} series)
              </p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 h-1 bg-green-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: "100%" }}
                  ></div>
                </div>
                <span className="text-xs text-green-600">✓ Real number</span>
              </div>
            </div>
          )}

        {name === "mobile_no" &&
          !error &&
          value.length === 10 &&
          !mobileValidation.isValid && (
            <div className="mt-1">
              <p className="text-yellow-600 text-xs flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                Checking number validity...
              </p>
            </div>
          )}

        {name === "mobile_no" && value.length > 0 && value.length < 10 && (
          <div className="mt-1">
            <p className="text-blue-600 text-xs flex items-center gap-1">
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
              Enter {10 - value.length} more digit(s)
            </p>
          </div>
        )}

        {error && (
          <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            {error}
          </p>
        )}
      </div>
    );
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter("");
    setClassFilter("");
    setCurrentPage(1);
  };

  // Test function to check fake numbers (for development)
  const testFakeNumbers = () => {
    const testNumbers = [
      "1111111111", // All same digits
      "1234567890", // Sequential ascending
      "0987654321", // Sequential descending
      "9999999999", // All 9s
      "1231231234", // Repeated pattern
      "9876543210", // Another sequential
      "7001234567", // Jio test range
      "9812345678", // Airtel test range
    ];

    console.log("Testing fake number detection:");
    testNumbers.forEach((number) => {
      const error = validateMobileNumber(number);
      console.log(`${number}: ${error || "VALID"}`);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-center text-2xl text-[#800000] md:text-4xl font-serif font-semibold text- mb-4">
            Admission Enquiry Form
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-[#800000] to-[#800000] mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Begin your child's educational journey with us. Fill out the form
            below and our admission team will get in touch with you shortly.
          </p>
        </div>

        {/* Success Message */}
        {isSubmitted && (
          <div className="mb-8 bg-green-50 border border-green-200 rounded-lg p-6 animate-fadeIn">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Send className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-800 mb-1">
                  Enquiry Submitted Successfully!
                </h3>
                <p className="text-green-700">
                  Thank you for your interest. Our admission team will contact
                  you within 24 hours on {formData.mobile_no}.
                </p>
                <p className="text-green-600 text-sm mt-2">
                  Your enquiry has been saved to our database.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Submit Error Message */}
        {submitError && (
          <div className="mb-8 bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <X className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-red-800 mb-1">
                  Submission Failed
                </h3>
                <p className="text-red-700">{submitError}</p>
              </div>
            </div>
          </div>
        )}

        {/* Enquiries List Section */}
        {showEnquiries && (
          <div className="mb-12 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                <h2 className="text-2xl font-bold text-[#800000]">
                  Submitted Enquiries ({totalItems})
                </h2>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Search by name, email, or mobile..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F07B3D] focus:border-transparent"
                    />
                  </div>

                  {/* Status Filter */}
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F07B3D] focus:border-transparent"
                  >
                    <option value="">All Status</option>
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="follow_up">Follow Up</option>
                    <option value="admitted">Admitted</option>
                    <option value="rejected">Rejected</option>
                  </select>

                  {/* Class Filter */}
                  <select
                    value={classFilter}
                    onChange={(e) => setClassFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F07B3D] focus:border-transparent"
                  >
                    <option value="">All Classes</option>
                    {classOptions.slice(1).map((cls) => (
                      <option key={cls} value={cls}>
                        {cls}
                      </option>
                    ))}
                  </select>

                  {/* Reset Filters */}
                  <button
                    onClick={resetFilters}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                  >
                    <X className="h-4 w-4" />
                    Reset
                  </button>
                </div>
              </div>

              {/* Loading State */}
              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block w-12 h-12 border-4 border-[#800000] border-t-transparent rounded-full animate-spin"></div>
                  <p className="mt-4 text-gray-600">Loading enquiries...</p>
                </div>
              ) : enquiries.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <FileText className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    No Enquiries Found
                  </h3>
                  <p className="text-gray-500">
                    {searchTerm || statusFilter || classFilter
                      ? "Try changing your search filters"
                      : "No enquiries have been submitted yet"}
                  </p>
                </div>
              ) : (
                <>
                  {/* Enquiries Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                            ID
                          </th>
                          <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                            Student
                          </th>
                          <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                            Father
                          </th>
                          <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                            Class
                          </th>
                          <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                            Mobile
                          </th>
                          <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                            Status
                          </th>
                          <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                            Submitted
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {enquiries.map((enquiry) => (
                          <tr key={enquiry.id} className="hover:bg-gray-50">
                            <td className="py-3 px-4 text-sm text-gray-600">
                              #{enquiry.id}
                            </td>
                            <td className="py-3 px-4">
                              <div>
                                <div className="font-medium text-gray-900">
                                  {enquiry.full_name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {enquiry.email}
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-600">
                              {enquiry.father_name}
                            </td>
                            <td className="py-3 px-4">
                              <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                {enquiry.admission_class}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-600">
                              +91 {enquiry.mobile_no}
                            </td>
                            <td className="py-3 px-4">
                              <span
                                className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(
                                  enquiry.status
                                )}`}
                              >
                                {getStatusText(enquiry.status)}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-600">
                              {formatDateTime(enquiry.submitted_at)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  <div className="flex flex-col md:flex-row items-center justify-between mt-6 pt-6 border-t border-gray-200">
                    <div className="text-sm text-gray-600 mb-4 md:mb-0">
                      Showing {(currentPage - 1) * perPage + 1} to{" "}
                      {Math.min(currentPage * perPage, totalItems)} of{" "}
                      {totalItems} entries
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>

                      <div className="flex items-center gap-1">
                        {Array.from(
                          { length: Math.min(5, totalPages) },
                          (_, i) => {
                            let pageNum;
                            if (totalPages <= 5) {
                              pageNum = i + 1;
                            } else if (currentPage <= 3) {
                              pageNum = i + 1;
                            } else if (currentPage >= totalPages - 2) {
                              pageNum = totalPages - 4 + i;
                            } else {
                              pageNum = currentPage - 2 + i;
                            }

                            return (
                              <button
                                key={pageNum}
                                onClick={() => setCurrentPage(pageNum)}
                                className={`w-10 h-10 rounded-lg ${
                                  currentPage === pageNum
                                    ? "bg-[#800000] text-white"
                                    : "border border-gray-300 hover:bg-gray-50"
                                }`}
                              >
                                {pageNum}
                              </button>
                            );
                          }
                        )}
                      </div>

                      <button
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(prev + 1, totalPages)
                          )
                        }
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>

                      {/* Per Page Selector */}
                      <select
                        value={perPage}
                        onChange={(e) => setPerPage(Number(e.target.value))}
                        className="ml-4 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F07B3D] focus:border-transparent"
                      >
                        <option value="10">10 per page</option>
                        <option value="15">15 per page</option>
                        <option value="25">25 per page</option>
                        <option value="50">50 per page</option>
                      </select>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Form Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          {/* Form Content */}
          <div className="p-6 md:p-8">
            <form onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div>
                  {renderFormField({
                    label: "Full Name",
                    name: "full_name",
                    placeholder: "Enter Full name",
                    icon: User,
                  })}

                  {renderFormField({
                    label: "Date of Birth",
                    name: "date_of_birth",
                    type: "date",
                    icon: Calendar,
                  })}

                  {renderFormField({
                    label: "Admission in Class",
                    name: "admission_class",
                    type: "select",
                    options: classOptions,
                    icon: School,
                  })}

                  {renderFormField({
                    label: "Last Examination passed/appeared",
                    name: "last_exam",
                    type: "select",
                    options: lastExamOptions,
                    icon: BookOpen,
                  })}
                </div>

                {/* Right Column */}
                <div>
                  {renderFormField({
                    label: "Father's Name",
                    name: "father_name",
                    placeholder: "Full Name of father",
                    icon: UserCircle,
                  })}

                  {renderFormField({
                    label: "Your Email",
                    name: "email",
                    type: "email",
                    placeholder: "Email address",
                    icon: Mail,
                  })}

                  {renderFormField({
                    label: "Your Mobile No.",
                    name: "mobile_no",
                    type: "tel",
                    placeholder: "Enter 10-digit Mobile No.",
                    icon: Phone,
                  })}

                  {renderFormField({
                    label: "Additional Information (Optional)",
                    name: "additional_info",
                    type: "textarea",
                    placeholder:
                      "Any specific queries or information you'd like to share...",
                    icon: FileText,
                    required: false,
                    rows: 3,
                  })}
                </div>
              </div>

              {/* Form validation summary */}
              {(Object.keys(errors).length > 0 || submitError) && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    Please fix the following errors:
                  </h4>
                  <ul className="list-disc list-inside text-red-700 text-sm space-y-1">
                    {errors.full_name && <li>Full Name: {errors.full_name}</li>}
                    {errors.date_of_birth && (
                      <li>Date of Birth: {errors.date_of_birth}</li>
                    )}
                    {errors.admission_class && (
                      <li>Admission Class: {errors.admission_class}</li>
                    )}
                    {errors.last_exam && <li>Last Exam: {errors.last_exam}</li>}
                    {errors.father_name && (
                      <li>Father's Name: {errors.father_name}</li>
                    )}
                    {errors.email && <li>Email: {errors.email}</li>}
                    {errors.mobile_no && (
                      <li>Mobile Number: {errors.mobile_no}</li>
                    )}
                    {submitError && <li>Submission Error: {submitError}</li>}
                  </ul>
                </div>
              )}

              {/* Submit Button */}
              <div className="mt-10">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-300 flex items-center justify-center gap-3 ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-[#0A2342] to-[#0A2342] hover:from-[#0A2342] hover:to-[#0A2342] hover:shadow-lg transform hover:-translate-y-0.5"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Submit Enquiry
                    </>
                  )}
                </button>

                <p className="text-center text-gray-500 text-sm mt-4">
                  By submitting this form, you agree to our{" "}
                  <a
                    href="/privacy-policy"
                    className="text-[#800000] hover:underline"
                  >
                    Privacy Policy
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Add CSS for animation */}
        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.5s ease-out;
          }

          select option:disabled {
            color: #9ca3af;
          }

          select option:not(:disabled) {
            color: #1f2937;
          }

          /* Hide number input arrows */
          input[type="number"]::-webkit-inner-spin-button,
          input[type="number"]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }

          input[type="number"] {
            -moz-appearance: textfield;
          }
        `}</style>
      </div>
    </div>
  );
};

export default AdmissionEnquiryForm;

// // components/Admission/AdmissionEnquiryForm.jsx
// import React, { useState } from "react";
// import {
//   User,
//   Calendar,
//   School,
//   BookOpen,
//   Mail,
//   Phone,
//   Send,
//   UserCircle,
//   AlertCircle,
//   FileText,
// } from "lucide-react";

// const AdmissionEnquiryForm = () => {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     dateOfBirth: "",
//     admissionClass: "",
//     lastExam: "",
//     fatherName: "",
//     email: "",
//     mobileNo: "",
//     additionalInfo: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const classOptions = [
//     "SELECT CLASS",
//     "Nursery",
//     "Junior KG",
//     "Senior KG",
//     "I",
//     "II",
//     "III",
//     "IV",
//     "V",
//     "VI",
//     "VII",
//     "VIII",
//     "IX",
//     "X",
//   ];

//   // TRAI-approved Indian mobile number prefixes
//   const traiValidPrefixes = [
//     "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", // New numbering series
//     "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", // Existing series
//     "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", // Existing series
//     "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", // Existing series
//     "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", // M2M/IoT (but can be used)
//   ];

//   // Last Examination passed/appeared options
//   const lastExamOptions = [
//     "SELECT LAST EXAM",
//     "Nursery",
//     "Junior KG",
//     "Senior KG",
//     "I",
//     "II",
//     "III",
//     "IV",
//     "V",
//     "VI",
//     "VII",
//     "VIII",
//     "IX",
//     "X",
//     "XI",
//     "XII",
//     "Other",
//   ];

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     // Special handling for mobile number
//     if (name === "mobileNo") {
//       // Only allow numbers
//       const numericValue = value.replace(/\D/g, "");
//       // Limit to 10 digits
//       const limitedValue = numericValue.slice(0, 10);

//       setFormData((prev) => ({
//         ...prev,
//         [name]: limitedValue,
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }

//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors((prev) => ({
//         ...prev,
//         [name]: "",
//       }));
//     }
//   };

//   const validateMobileNumber = (mobileNo) => {
//     // Check if it's exactly 10 digits
//     if (!/^\d{10}$/.test(mobileNo)) {
//       return "Mobile number must be 10 digits";
//     }

//     // Check if it starts with a valid TRAI prefix
//     const prefix = mobileNo.substring(0, 2);
//     if (!traiValidPrefixes.includes(prefix)) {
//       return "Please enter a valid Indian mobile number";
//     }

//     // Additional checks for invalid number patterns
//     const invalidPatterns = [
//       /^(\d)\1{9}$/, // All same digits (e.g., 0000000000)
//       /^1234567890$/, // Sequential ascending
//       /^0987654321$/, // Sequential descending
//       /^(\d{5})\1$/, // Repeated pattern
//     ];

//     for (const pattern of invalidPatterns) {
//       if (pattern.test(mobileNo)) {
//         return "Please enter a valid mobile number";
//       }
//     }

//     return null;
//   };

//   // Updated validation function to allow digits in names
//   const validateForm = () => {
//     const newErrors = {};

//     // Full Name validation - now allows digits
//     if (!formData.fullName.trim()) {
//       newErrors.fullName = "Full Name is required";
//     } else if (formData.fullName.trim().length < 2) {
//       newErrors.fullName = "Full Name must be at least 2 characters";
//     }

//     // Date of Birth validation
//     if (!formData.dateOfBirth) {
//       newErrors.dateOfBirth = "Date of Birth is required";
//     } else {
//       const dob = new Date(formData.dateOfBirth);
//       const today = new Date();
//       if (dob >= today) {
//         newErrors.dateOfBirth = "Date of Birth must be in the past";
//       }
//     }

//     // Admission Class validation
//     if (!formData.admissionClass || formData.admissionClass === "SELECT CLASS") {
//       newErrors.admissionClass = "Please select a class";
//     }

//     // Last Exam validation - now a dropdown
//     if (!formData.lastExam || formData.lastExam === "SELECT LAST EXAM") {
//       newErrors.lastExam = "Please select last examination passed/appeared";
//     }

//     // Father's Name validation - now allows digits
//     if (!formData.fatherName.trim()) {
//       newErrors.fatherName = "Father's Name is required";
//     } else if (formData.fatherName.trim().length < 2) {
//       newErrors.fatherName = "Father's Name must be at least 2 characters";
//     }

//     // Email validation
//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = "Email is invalid";
//     }

//     // Mobile number validation
//     if (!formData.mobileNo.trim()) {
//       newErrors.mobileNo = "Mobile No. is required";
//     } else {
//       const mobileError = validateMobileNumber(formData.mobileNo);
//       if (mobileError) {
//         newErrors.mobileNo = mobileError;
//       }
//     }

//     return newErrors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validateForm();

//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       // Scroll to first error
//       const firstError = Object.keys(validationErrors)[0];
//       const element = document.getElementsByName(firstError)[0];
//       if (element) {
//         element.scrollIntoView({ behavior: "smooth", block: "center" });
//         element.focus();
//       }
//       return;
//     }

//     setIsSubmitting(true);

//     // Simulate API call
//     try {
//       console.log("Form Data:", formData);
//       // Here you would typically make an API call
//       await new Promise((resolve) => setTimeout(resolve, 1500));

//       setIsSubmitting(false);
//       setIsSubmitted(true);

//       // Reset form after 3 seconds
//       setTimeout(() => {
//         setIsSubmitted(false);
//         setFormData({
//           fullName: "",
//           dateOfBirth: "",
//           admissionClass: "",
//           lastExam: "",
//           fatherName: "",
//           email: "",
//           mobileNo: "",
//           additionalInfo: "",
//         });
//         setErrors({});
//       }, 3000);
//     } catch (error) {
//       console.error("Form submission error:", error);
//       setIsSubmitting(false);
//     }
//   };

//   // Individual form fields for better state management
//   const renderFormField = (fieldConfig) => {
//     const {
//       label,
//       name,
//       type = "text",
//       placeholder,
//       icon: Icon,
//       required = true,
//       rows,
//       options,
//     } = fieldConfig;

//     const error = errors[name];
//     const value = formData[name];

//     return (
//       <div className="mb-6">
//         <label className="block text-gray-700 text-sm font-semibold mb-2">
//           {label} {required && <span className="text-red-500">*</span>}
//         </label>
//         <div className="relative">
//           {Icon && (
//             <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//               <Icon className="h-5 w-5" />
//             </div>
//           )}
//           {type === "select" ? (
//             <select
//               name={name}
//               value={value}
//               onChange={handleChange}
//               className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F07B3D] focus:border-transparent transition-all ${
//                 Icon ? "pl-12" : "pl-4"
//               } ${error ? "border-red-500" : "border-gray-300"}`}
//             >
//               {options.map((option, index) => (
//                 <option key={index} value={option} disabled={index === 0}>
//                   {option}
//                 </option>
//               ))}
//             </select>
//           ) : type === "textarea" ? (
//             <textarea
//               name={name}
//               value={value}
//               onChange={handleChange}
//               placeholder={placeholder}
//               rows={rows}
//               className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F07B3D] focus:border-transparent transition-all ${
//                 Icon ? "pl-12" : "pl-4"
//               } ${error ? "border-red-500" : "border-gray-300"}`}
//             />
//           ) : name === "mobileNo" ? (
//             // Special input for mobile number
//             <div className="relative">
//               <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
//                 <span className="text-gray-500 text-sm">+91</span>
//                 <div className="w-px h-4 bg-gray-300 mx-1"></div>
//               </div>
//               <input
//                 type="tel"
//                 name={name}
//                 value={value}
//                 onChange={handleChange}
//                 placeholder="98765 43210"
//                 maxLength="10"
//                 pattern="[0-9]*"
//                 inputMode="numeric"
//                 className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F07B3D] focus:border-transparent transition-all pl-20 ${
//                   error ? "border-red-500" : "border-gray-300"
//                 }`}
//               />
//             </div>
//           ) : (
//             <input
//               type={type}
//               name={name}
//               value={value}
//               onChange={handleChange}
//               placeholder={placeholder}
//               className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F07B3D] focus:border-transparent transition-all ${
//                 Icon ? "pl-12" : "pl-4"
//               } ${error ? "border-red-500" : "border-gray-300"}`}
//             />
//           )}
//         </div>
//         {name === "mobileNo" && !error && value.length === 10 && (
//           <p className="text-green-600 text-xs mt-1 flex items-center gap-1">
//             <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
//               <path
//                 fillRule="evenodd"
//                 d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                 clipRule="evenodd"
//               />
//             </svg>
//             Valid Indian mobile number
//           </p>
//         )}
//         {error && (
//           <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
//             <AlertCircle className="h-3 w-3" />
//             {error}
//           </p>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 py-12 px-4">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-center text-2xl text-[#800000] md:text-4xl font-serif font-semibold text- mb-4">
//             Enquiry Form
//           </h1>
//           <div className="w-20 h-1 bg-gradient-to-r from-[#800000] to-[#800000] mx-auto rounded-full mb-6"></div>
//           <p className="text-gray-600 max-w-2xl mx-auto">
//             Begin your child's educational journey with us. Fill out the form
//             below and our admission team will get in touch with you shortly.
//           </p>
//           <div className="mt-4 text-sm text-gray-500">
//             <p>✓ Only Indian mobile numbers allowed</p>
//             <p>✓ All fields are mandatory</p>
//           </div>
//         </div>

//         {/* Success Message */}
//         {isSubmitted && (
//           <div className="mb-8 bg-green-50 border border-green-200 rounded-lg p-6 animate-fadeIn">
//             <div className="flex items-center gap-4">
//               <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
//                 <Send className="w-6 h-6 text-green-600" />
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold text-green-800 mb-1">
//                   Enquiry Submitted Successfully!
//                 </h3>
//                 <p className="text-green-700">
//                   Thank you for your interest. Our admission team will contact
//                   you within 24 hours on {formData.mobileNo}.
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}

//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
//           {/* Form Content */}
//           <div className="p-6 md:p-8">
//             <form onSubmit={handleSubmit} noValidate>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Left Column */}
//                 <div>
//                   {renderFormField({
//                     label: "Full Name",
//                     name: "fullName",
//                     placeholder: "Enter Full name (digits allowed)",
//                     icon: User,
//                   })}

//                   {renderFormField({
//                     label: "Date of Birth",
//                     name: "dateOfBirth",
//                     type: "date",
//                     icon: Calendar,
//                   })}

//                   {renderFormField({
//                     label: "Admission in Class",
//                     name: "admissionClass",
//                     type: "select",
//                     options: classOptions,
//                     icon: School,
//                   })}

//                   {renderFormField({
//                     label: "Last Examination passed/appeared",
//                     name: "lastExam",
//                     type: "select",
//                     options: lastExamOptions,
//                     icon: BookOpen,
//                   })}
//                 </div>

//                 {/* Right Column */}
//                 <div>
//                   {renderFormField({
//                     label: "Full Name of father ",
//                     name: "fatherName",
//                     placeholder: "Full Name of father",
//                     icon: UserCircle,
//                   })}

//                   {renderFormField({
//                     label: "Your Email",
//                     name: "email",
//                     type: "email",
//                     placeholder: "Email",
//                     icon: Mail,
//                   })}

//                   {renderFormField({
//                     label: "Your Mobile No.",
//                     name: "mobileNo",
//                     type: "tel",
//                     placeholder: "Enter Mobile No.",
//                     icon: Phone,
//                   })}

//                   {renderFormField({
//                     label: "Additional Information (Optional)",
//                     name: "additionalInfo",
//                     type: "textarea",
//                     placeholder:
//                       "Any specific queries or information you'd like to share...",
//                     icon: FileText,
//                     required: false,
//                     rows: 3,
//                   })}
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <div className="mt-10">
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-300 flex items-center justify-center gap-3 ${
//                     isSubmitting
//                       ? "bg-gray-400 cursor-not-allowed"
//                       : "bg-gradient-to-r from-[#0A2342] to-[#0A2342] hover:from-[#0A2342] hover:to-[#0A2342] hover:shadow-lg transform hover:-translate-y-0.5"
//                   }`}
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                       Processing...
//                     </>
//                   ) : (
//                     <>
//                       <Send className="h-5 w-5" />
//                       Submit Enquiry
//                     </>
//                   )}
//                 </button>

//                 <p className="text-center text-gray-500 text-sm mt-4">
//                   By submitting this form, you agree to our{" "}
//                   <a
//                     href="/"
//                     className="text-[#800000] hover:underline"
//                   >
//                     Privacy Policy
//                   </a>
//                 </p>
//               </div>
//             </form>
//           </div>
//         </div>

//         {/* Add CSS for animation */}
//         <style jsx>{`
//           @keyframes fadeIn {
//             from {
//               opacity: 0;
//               transform: translateY(-10px);
//             }
//             to {
//               opacity: 1;
//               transform: translateY(0);
//             }
//           }
//           .animate-fadeIn {
//             animation: fadeIn 0.5s ease-out;
//           }

//           select option:disabled {
//             color: #9ca3af;
//           }

//           select option:not(:disabled) {
//             color: #1f2937;
//           }

//           /* Hide number input arrows */
//           input[type="number"]::-webkit-inner-spin-button,
//           input[type="number"]::-webkit-outer-spin-button {
//             -webkit-appearance: none;
//             margin: 0;
//           }

//           input[type="number"] {
//             -moz-appearance: textfield;
//           }
//         `}</style>
//       </div>
//     </div>
//   );
// };

// export default AdmissionEnquiryForm;
