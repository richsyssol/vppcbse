import React from "react";
import {
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { IoLocationOutline, IoCallOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { footerlogo, logo } from "../../assets";

const Footer = () => {
  const socialIcons = [
    {
      icon: FaFacebookF,
      label: "Facebook",
      url: "https://www.facebook.com/share/1Exn77sKxB/",
    },
    {
      icon: FaLinkedin,
      label: "LinkedIn",
      url: "#",
    },
    {
      icon: FaYoutube,
      label: "YouTube",
      url: "https://youtube.com/@vppcbse1331?si=4L6Zl_o-O27F7vRz",
    },
    {
      icon: FaInstagram,
      label: "Instagram",
      url: "https://www.instagram.com/vppcbse?igsh=YTlwZnVxaGpidjcx",
    },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-r from-[#865bc2] via-[#7a4dbe] to-[#4502a3] text-white pt-16 pb-8 px-6 md:px-16 rounded-t-3xl shadow-inner"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {/* Left Section - School Information */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <img
            src={footerlogo}
            alt="Vidya Prabodhini Prashala Logo"
            className="mb-6 w-40"
          />
          <h3 className="text-xl font-semibold mb-3 text-[#c4b5fd] flex items-center gap-2">
            <IoCallOutline size={20} className="text-[#c4b5fd]" />
            Contact Us
          </h3>
          <p className="text-sm text-white/90 mb-4">
            Got something to say? Please drop us a line.
          </p>
          <ul className="text-sm text-white/90 space-y-3">
            <li className="flex items-start gap-2">
              <IoLocationOutline
                size={20}
                className="text-[#a78bfa] mt-1 flex-shrink-0"
              />
              <span>
                <strong className="text-white">
                  Vidya Prabodhini Prashala CBSE
                </strong>
                <br />
                Dr. B.S. Moonje Marg, Rambhoomi
                <br />
                Nashik, Maharashtra 422005
              </span>
            </li>
            <li className="flex items-center gap-2">
              <MdOutlineEmail size={20} className="text-[#a78bfa]" />
              <a
                href="mailto:info@vppcbse.bhonsala.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/90 hover:text-white transition-colors duration-300"
              >
                info@vppcbse.bhonsala.in
              </a>
            </li>

            <li className="flex items-center gap-2">
              <IoCallOutline size={20} className="text-[#a78bfa]" />
              <a
                href="tel:7507546666"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/90 hover:text-white transition-colors duration-300"
              >
                7507546666
              </a>
            </li>
          </ul>

          {/* School Timings */}
          <div className="mt-6 pt-4 border-t border-white/20">
            <h4 className="text-sm font-semibold text-white mb-2">
              SCHOOL TIMINGS:
            </h4>
            <p className="text-sm text-white/90">
              Monday to Friday: 8:00 AM - 2:00 PM
            </p>
            <p className="text-sm text-white/90">
              Saturday: 8:00 AM - 11:00 AM
            </p>
            <p className="text-sm text-white/90 mt-2">
              Office: 8:30 AM - 12:00 PM
            </p>
          </div>
        </motion.div>

        {/* Middle Section - Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-xl font-semibold mb-4 text-[#c4b5fd]">
            Quick Links
          </h3>
          <ul className="text-sm text-white/90 space-y-2">
            <li className="hover:text-white transition-colors duration-300 cursor-pointer">
              About us
            </li>
            <li className="hover:text-white transition-colors duration-300 cursor-pointer">
              Admission
            </li>
            <li className="hover:text-white transition-colors duration-300 cursor-pointer">
              Academics
            </li>
            <li className="hover:text-white transition-colors duration-300 cursor-pointer">
              Gallery
            </li>
            <li className="hover:text-white transition-colors duration-300 cursor-pointer">
              Contact us
            </li>
            <li className="hover:text-white transition-colors duration-300 cursor-pointer">
              Mandatory Public Disclosure
            </li>
          </ul>

          {/* Social Media Links */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4 text-[#c4b5fd]">
              Stay Connected
            </h3>
            <ul className="text-sm text-white/90 space-y-2 mb-6">
              <li className="flex items-center gap-2">
                <FaFacebookF className="text-[#a78bfa]" />
                <span>Facebook: See our latest portfolio & gallery</span>
              </li>
              <li className="flex items-center gap-2">
                <FaLinkedin className="text-[#a78bfa]" />
                <span>LinkedIn: Connect with us for professional insights</span>
              </li>
              <li className="flex items-center gap-2">
                <FaYoutube className="text-[#a78bfa]" />
                <span>YouTube: Watch our videos & success stories</span>
              </li>
              <li className="flex items-center gap-2">
                <FaInstagram className="text-[#a78bfa]" />
                <span>Instagram: Follow our daily updates & events</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Right Section - Map & Social Icons */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-1 md:col-span-2"
        >
          <div className="space-y-6">
            {/* Map */}
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <iframe
                title="Vidya Prabodhini Map"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d432.0137821062885!2d73.75400732954571!3d20.008474559323567!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddeb85fab84bf9%3A0x5f2e809d4e352b3b!2sVidya%20Prabodhini%20Prashala%20(%20C.B.S.E%20)!5e1!3m2!1sen!2sin!4v1768134378635!5m2!1sen!2sin"
                className="w-full h-56"
                loading="lazy"
                style={{ border: 0 }}
                allowFullScreen
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
            </div>

            {/* Social Icons */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-[#c4b5fd]">
                Follow Us
              </h3>
              <div className="flex gap-6">
                {socialIcons.map(({ icon: Icon, label, url }, index) => (
                  <motion.a
                    key={index}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    title={label}
                    className="bg-white/10 backdrop-blur-sm p-3 rounded-full shadow-sm hover:bg-white/20 text-[#c4b5fd] hover:text-white transition-all duration-300"
                  >
                    <Icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Accreditation */}
            <div className="pt-4 border-t border-white/20">
              <p className="text-sm text-white/90">
                <strong className="text-white">Affiliated with:</strong> C.B.S.E
                (New Delhi)
              </p>
              <p className="text-sm text-white/90">
                <strong className="text-white">Affiliation No.:</strong> 1130258
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-12 text-center text-sm text-white/80 border-t border-white/20 pt-6">
        <p className="mb-2">
          © 2025{" "}
          <span className="font-semibold text-white">
            Vidya Prabodhini Prashala CBSE
          </span>
          . All Rights Reserved.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-2">
          <a
            href="#"
            className="text-white/90 hover:text-white hover:underline transition-colors duration-300"
          >
            Terms & Conditions
          </a>
          <span className="text-white/50">|</span>
          <a
            href="#"
            className="text-white/90 hover:text-white hover:underline transition-colors duration-300"
          >
            Privacy Policy
          </a>
          <span className="text-white/50">|</span>
          <a
            href="/disclosure"
            className="text-white/90 hover:text-white hover:underline transition-colors duration-300"
          >
            Mandatory Public Disclosure
          </a>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
