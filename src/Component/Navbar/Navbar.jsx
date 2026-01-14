import React, { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  Menu,
  X,
  Download,
  Search,
  User,
  Phone,
} from "lucide-react";
import { logo } from "../../assets";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const closeTimeout = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isMobileMenuOpen]);

  const navItems = [
    { label: "Home", path: "/" },
    {
      label: "About",
      dropdown: [
        { label: "About Us", path: "/about" },
        { label: "Infrastructure", path: "/about/infrastructure" },
        { label: "Faculty", path: "/about/faculty" },
        { label: "Management", path: "/about/management" },
        { label: "Why Choose Us", path: "/about/why-us" },
      ],
    },
    {
      label: "Academics",
      dropdown: [
        { label: "Curriculum", path: "/academics/curriculum" },
        { label: "Pre-Primary", path: "/academics/pre-primary" },
        { label: "Primary", path: "/academics/primary" },
        { label: "Secondary", path: "/academics/secondary" },
        { label: "Results", path: "/academics/results" },
        { label: "Co-Curricular", path: "/academics/co-curricular" },
      ],
    },
    {
      label: "Admissions",
      dropdown: [
        { label: "Admission Process", path: "/admissions/process" },
        { label: "Guidelines", path: "/admissions/guidelines" },
        { label: "Online Enquiry", path: "/admissions/enquiry" },
        { label: "Apply Now", path: "/admissions/apply" },
        { label: "Fee Structure", path: "/admissions/fees" },
      ],
    },
    {
      label: "Info Center",
      dropdown: [
        { label: "CBSE Affiliation", path: "/info/cbse" },
        { label: "Circulars", path: "/info/circulars" },
        { label: "Students Council", path: "/info/students-council" },
        { label: "Academic Calendar", path: "/info/calendar" },
        { label: "Disclosure", path: "/info/disclosure" },
      ],
    },
    {
      label: "Gallery",
      dropdown: [
        { label: "Photos", path: "/gallery/photos" },
        { label: "Videos", path: "/gallery/videos" },
        { label: "Sports & Events", path: "/gallery/sports" },
      ],
    },
    { label: "Contact", path: "/contact" },
  ];

  const quickLinks = [
    { label: "Careers", path: "/careers" },
    { label: "Blog", path: "/blog" },
    { label: "Alumni", path: "/alumni" },
  ];

  const handleMouseEnter = (index) => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setActiveDropdown(index);
  };

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  const handleMobileDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const handleDownloadBrochure = () => {
    console.log("Download brochure");
  };

  return (
    <>
      {/* ================= UTILITY BAR (Top) ================= */}
      <div
        className={`gradient-navy bg-navy-800 text-white transition-all duration-300 ${
          scrolled ? "py-1" : "py-2"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Left side - Contact info with Poppins */}
            <div className="hidden md:flex items-center gap-6 text-sm font-secondary">
              <a
                href="tel:+911234567890"
                className="flex items-center gap-2 hover:text-navy-200 transition-colors duration-200"
              >
                <Phone size={14} />
                <span>+91 1234567890</span>
              </a>
              <a
                href="mailto:info@vidyaprabodhini.edu"
                className="hover:text-navy-200 transition-colors duration-200"
              >
                info@vidyaprabodhini.edu
              </a>
            </div>

            {/* Right side - Quick links with Poppins */}
            <div className="flex items-center gap-4 font-secondary">
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className="text-sm hover:text-navy-200 transition-colors duration-200 hidden md:block"
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={handleDownloadBrochure}
                className="flex items-center gap-2 text-sm hover:text-navy-200 transition-colors duration-200"
              >
                <Download size={16} />
                <span className="hidden lg:inline">Brochure</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MAIN NAVBAR ================= */}
      <header
        className={`sticky top-0 z-50 bg-white shadow-lg transition-all rounded-b-4xl duration-300 ${
          scrolled ? "py-2" : "py-3"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-end gap-6 ">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img
                src={logo}
                alt="Vidya Prabodhini Prashala Logo"
                className="absolute top-4 left-4 h-16 bg-white rounded-2xl m-2 p-1 w-auto object-contain shadow-2xl"
              />
            </Link>

            {/* Desktop Navigation - Urbanist */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item, index) => (
                <div
                  key={index}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  {item.dropdown ? (
                    <>
                      <button className="font-primary flex items-center gap-1 text-navy-800 hover:text-navy-600 font-medium transition-colors duration-200">
                        {item.label}
                        <ChevronDown
                          size={16}
                          className={`transition-transform duration-200 ${
                            activeDropdown === index ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {activeDropdown === index && (
                        <div className="absolute top-full left-0 mt-2 w-56 bg-white shadow-xl rounded-lg border border-navy-100 py-2 animate-fadeIn z-50">
                          {item.dropdown.map((subItem, subIndex) => (
                            <Link
                              key={subIndex}
                              to={subItem.path}
                              className="font-primary block px-4 py-3 text-navy-700 hover:bg-navy-50 hover:text-navy-800 transition-colors duration-200"
                              onClick={() => setActiveDropdown(null)}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.path}
                      className="font-primary text-navy-800 hover:text-navy-600 font-medium transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Action Buttons with Poppins */}
            <div className="hidden lg:flex items-center gap-4 font-secondary">
              <button
                onClick={() => navigate("/admissions/enquiry")}
                className="flex items-center gap-2 px-5 py-2.5 gradient-navy text-white rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 font-medium"
              >
                <User size={18} />
                <span>Enquire Now</span>
              </button>
              <button
                onClick={() => navigate("/admissions/apply")}
                className="px-5 py-2.5 border-2 border-navy-600 text-navy-600 rounded-lg hover:bg-navy-50 transition-all duration-300 font-medium hover:-translate-y-0.5"
              >
                Apply Now
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-navy-800 hover:text-navy-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        {isMobileMenuOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        <div
          className={`lg:hidden fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <img src={logo} alt="Logo" className="h-12 w-auto" />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 hover:bg-navy-50 rounded-lg transition-colors"
              >
                <X size={24} className="text-navy-600" />
              </button>
            </div>

            {/* Navigation Items - Urbanist */}
            <div className="flex-1 overflow-y-auto">
              {navItems.map((item, index) => (
                <div key={index} className="mb-2">
                  {item.dropdown ? (
                    <>
                      <button
                        onClick={() => handleMobileDropdown(index)}
                        className="font-primary flex items-center justify-between w-full p-4 text-left text-navy-800 hover:bg-navy-50 rounded-lg transition-colors"
                      >
                        <span className="font-medium">{item.label}</span>
                        <ChevronDown
                          size={18}
                          className={`transition-transform duration-200 ${
                            activeDropdown === index ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {activeDropdown === index && (
                        <div className="ml-4 border-l border-navy-200 pl-2">
                          {item.dropdown.map((subItem, subIndex) => (
                            <Link
                              key={subIndex}
                              to={subItem.path}
                              className="font-primary block p-3 text-navy-600 hover:bg-navy-50 rounded-lg transition-colors"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.path}
                      className="font-primary block p-4 text-navy-800 hover:bg-navy-50 rounded-lg font-medium transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}

              <div className="mt-8 pt-6 border-t border-navy-200">
                <h3 className="font-secondary px-4 text-sm font-semibold text-navy-500 uppercase mb-3">
                  Quick Links
                </h3>
                {quickLinks.map((link, index) => (
                  <Link
                    key={index}
                    to={link.path}
                    className="font-secondary block p-4 text-navy-600 hover:bg-navy-50 rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile Action Buttons - Poppins */}
            <div className="pt-6 border-t border-navy-200">
              <button
                onClick={() => handleNavigation("/admissions/enquiry")}
                className="font-secondary w-full mb-3 p-4 gradient-navy text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
              >
                Enquire Now
              </button>
              <button
                onClick={() => handleNavigation("/admissions/apply")}
                className="font-secondary w-full p-4 border-2 border-navy-600 text-navy-600 rounded-lg font-medium hover:bg-navy-50 transition-all duration-300"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Bottom Mobile Utility Bar - Poppins */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-navy-200 z-40 shadow-lg">
        <div className="flex items-center justify-around p-2 font-secondary">
          <button
            onClick={() => navigate("/search")}
            className="flex flex-col items-center p-2 text-navy-600 hover:text-navy-800 transition-colors"
          >
            <Search size={20} />
            <span className="text-xs mt-1">Search</span>
          </button>
          <button
            onClick={() => navigate("/admissions/enquiry")}
            className="flex flex-col items-center p-2 text-navy-600 hover:text-navy-800 transition-colors"
          >
            <User size={20} />
            <span className="text-xs mt-1">Enquire</span>
          </button>
          <button
            onClick={handleDownloadBrochure}
            className="flex flex-col items-center p-2 text-navy-600 hover:text-navy-800 transition-colors"
          >
            <Download size={20} />
            <span className="text-xs mt-1">Brochure</span>
          </button>
          <button
            onClick={() => navigate("/contact")}
            className="flex flex-col items-center p-2 text-navy-600 hover:text-navy-800 transition-colors"
          >
            <Phone size={20} />
            <span className="text-xs mt-1">Contact</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
