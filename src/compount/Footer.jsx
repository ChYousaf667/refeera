// components/Footer.js
import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import logo from "../assets/logo.png";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white relative pt-16 pb-10 px-4 sm:px-8">
      {/* Decorative Wave Top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
        <svg
          viewBox="0 0 1440 64"
          className="w-full h-16 fill-current text-white"
          preserveAspectRatio="none"
        >
          <path d="M0,64 C360,0 1080,0 1440,64 L1440,64 L0,64 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-center md:text-left">
          {/* Logo + Tagline */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <img src={logo} alt="Logo" className="w-24" />
            <p className="text-sm text-white/90 max-w-xs">
              Turn Conversations Into Income — Share And Earn With Referra.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                title: "Company",
                links: ["About Us", "Blog", "Partners"],
              },
              {
                title: "Support",
                links: ["Help Center", "FAQ", "Contact Us"],
              },
              {
                title: "Legal",
                links: ["Privacy Policy", "Terms of Service", "Cookies Policy"],
              },
            ].map((section, idx) => (
              <div key={idx}>
                <h4 className="text-lg font-semibold mb-3">{section.title}</h4>
                <ul className="space-y-2 text-sm">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <a
                        href="#"
                        className="hover:text-yellow-300 transition-colors duration-200"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Social + Contact */}
          <div className="flex flex-col items-center md:items-end space-y-4">
            <div className="flex space-x-4">
              {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map(
                (Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="hover:text-yellow-300 transition-colors text-white"
                  >
                    <Icon className="text-xl" />
                  </a>
                )
              )}
            </div>
            <button className="mt-4 bg-white text-blue-600 font-medium px-6 py-2 rounded-full text-sm hover:bg-gray-100 transition">
              Contact Us
            </button>
          </div>
        </div>

        {/* Bottom note */}
        <div className="mt-10 border-t border-white/30 pt-6 text-sm text-white/70 text-center">
          © {new Date().getFullYear()} Referra. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
