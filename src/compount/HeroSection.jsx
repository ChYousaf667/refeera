import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";
import logo from "../assets/logo.png";

export default function HeroSection() {
  const navigate = useNavigate();
  const { business } = useSelector((state) => state.business || {});
  const { user } = useSelector((state) => state.auth || {});

  return (
    <div className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-6 py-12 lg:py-20 relative overflow-hidden rounded-bl-[2rem]">
      {/* Background circles */}
      <div className="absolute top-10 left-[55%] w-20 h-20 bg-white/10 rounded-full"></div>
      <div className="absolute bottom-[10%] right-[50%] w-32 h-32 bg-white/10 rounded-full"></div>
      <div className="absolute bottom-20 left-40 w-24 h-24 bg-white/10 rounded-full"></div>

      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between relative z-10">
        {/* Left Content */}
        <div className="text-left lg:w-1/2 mt-10 lg:mt-0">
          <h1 className="text-3xl lg:text-5xl font-bold leading-tight mb-4">
            Get Paid To Share <br />
            Programs <br />
            <span className="text-white">That Help People</span>
          </h1>
          <p className="text-white/90 mb-6 max-w-md text-sm">
            Referra rewards you for connecting others to opportunities — like
            helpful services, exclusive offers, or programs they may not know
            about.
          </p>

          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => navigate("/partner")}
              className="border border-white px-4 md:px-6 py-2 rounded-full hover:bg-white hover:text-blue-600 transition z-10 text-sm"
            >
              Become a Partner
            </button>
            {user && !business && (
              <button
                onClick={() => navigate("/all-offers")}
                className="border border-white px-5 py-2 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition"
              >
                Explore Offers
              </button>
            )}
          </div>

          {/* Avatars + Rating */}
          <div className="space-x-3 mt-6">
            <div className="flex -space-x-2">
              {["A", "B", "C", "D"].map((initial, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-white text-blue-600 border-2 border-white flex items-center justify-center text-sm font-bold"
                >
                  {initial}
                </div>
              ))}
              <div className="w-8 h-8 bg-white text-black rounded-full border-2 border-white flex items-center justify-center text-xs font-bold">
                +
              </div>
            </div>
            <div className="text-white text-sm flex mt-3 items-center">
              <FaStar className="text-yellow-300 mr-1" />
              4.5 Rating
            </div>
          </div>
        </div>

        {/* Right Image Mockup */}
        <div className="lg:w-1/2 relative h-[420px] flex items-center justify-center mt-12 lg:mt-0">
          {/* Back Card */}
          <div className="absolute top-12 left-6 w-32 h-60 bg-white rounded-2xl shadow-md overflow-hidden z-10 rotate-[-6deg] opacity-80">
            <img
              src={img3}
              alt="Mobile Dashboard"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Middle Card */}
          <div className="absolute top-6 right-6 w-36 h-64 bg-white rounded-2xl shadow-lg overflow-hidden z-20 rotate-[6deg]">
            <img
              src={img1}
              alt="QR Code"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Front Card */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-44 h-72 bg-white rounded-2xl shadow-xl overflow-hidden z-30">
            <img
              src={img2}
              alt="Phone"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
