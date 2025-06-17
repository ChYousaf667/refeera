import React from "react";
import {
  FaQrcode,
  FaCheckCircle,
  FaMoneyBillWave,
  FaUsers,
} from "react-icons/fa";

export default function HowReferraWorks() {
  const steps = [
    {
      icon: <FaQrcode className="text-5xl sm:text-6xl text-white" />,
      title: "Share Your Custom Link / QR Code",
      description:
        "We give you a trackable link and flyer to share on social media, in person, or via text.",
    },
    {
      icon: <FaUsers className="text-5xl sm:text-6xl text-white" />,
      title: "They Sign Up or Take Action",
      description:
        "We partner with trusted programs that people want — they just need to sign up.",
    },
    {
      icon: <FaCheckCircle className="text-5xl sm:text-6xl text-white" />,
      title: "They Complete the Steps",
      description:
        "Our team or partners follow up to verify interest and eligibility.",
    },
    {
      icon: <FaMoneyBillWave className="text-5xl sm:text-6xl text-white" />,
      title: "You Get Paid",
      description:
        "Earn every time someone completes the process using your link — tracked in real time.",
    },
  ];

  const features = [
    "Free To Join — No Experience Needed",
    "Weekly Payouts via Cash App, Venmo, or Bank",
    "Flexible Campaigns Across Industries",
    "Real-Time Dashboard & QR Tools",
  ];

  return (
    <>
      <section className="bg-white py-16 px-6 sm:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center sm:text-left">
              How Referra Works
            </h2>
            <button className="mt-6 sm:mt-0 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-[#1ea1ad] hover:to-[#00666e] transition text-white px-6 py-3 rounded-full text-sm sm:text-base font-medium shadow-md hover:shadow-xl">
              Start Earning Now
            </button>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex items-start gap-6 bg-gradient-to-r from-blue-600 to-cyan-500 border border-white/20 rounded-2xl p-6 text-white shadow-xl hover:scale-[1.02] hover:shadow-2xl transition duration-300"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-white/20 rounded-full shadow-inner">
                  {step.icon}
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-white/90 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="my-6 border-t border-gray-200"></div>
        </div>
      </section>
      {/* Why Join Section */}
      <div className="max-w-7xl mx-auto mb-3 flex flex-col md:flex-row items-center gap-8 rounded-2xl shadow-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white overflow-hidden">
        {/* Left Block */}
        <div className="md:w-1/2  p-8 md:p-10">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">
            Why Join <span className="text-yellow-300">Referra</span>?
          </h3>
          <p className="text-sm sm:text-base text-white/90 leading-relaxed">
            Whether you're a creator, gig worker, student, or business owner —
            Referra helps you turn conversations and clicks into real income.
          </p>
        </div>

        {/* Right List */}
        <div className="md:w-1/2 bg-white p-8 md:p-10">
          <ul className="space-y-4 text-gray-800 text-sm sm:text-base">
            {features.map((item, i) => (
              <li key={i} className="flex items-start">
                <span className="text-green-500 text-lg mr-3 mt-1">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
