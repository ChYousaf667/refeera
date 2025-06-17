import React from "react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800 font-sans">
      {/* Header */}
      <header className="bg-white shadow-md p-4 sm:p-6 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
            R
          </div>
          <nav className="ml-6 space-x-4 sm:space-x-6">
            <a
              href="#"
              className="text-sm sm:text-base text-gray-600 hover:text-blue-500"
            >
              Home
            </a>
            <a
              href="#"
              className="text-sm sm:text-base text-gray-600 hover:text-blue-500"
            >
              About Us
            </a>
            <a
              href="#"
              className="text-sm sm:text-base text-gray-600 hover:text-blue-500"
            >
              FAQ's
            </a>
          </nav>
        </div>
        <button className="bg-teal-500 text-white px-4 py-2 rounded-full text-sm sm:text-base hover:bg-teal-600 transition">
          LOGIN
        </button>
      </header>

      {/* Main Section - Get Paid To Share */}
      <main className="bg-gradient-to-b from-cyan-500 to-blue-600 text-white py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Get Paid To Share
            <br />
            Programs That Help People
          </h1>
          <p className="text-sm sm:text-base md:text-lg mb-6 max-w-2xl mx-auto">
            Referra Rewards You For Connecting Others To Opportunities — Like
            Helpful Services, Exclusive Offers, Or Programs They May Not Know
            About.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
            <button className="bg-white text-blue-600 px-6 py-2 rounded-full text-sm sm:text-base hover:bg-gray-100 transition">
              Become Partner
            </button>
            <button className="bg-transparent border border-white px-6 py-2 rounded-full text-sm sm:text-base hover:bg-white hover:text-blue-600 transition">
              Explore Offers
            </button>
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-y-0 sm:space-x-8">
            <div className="relative">
              <img
                src="https://via.placeholder.com/150" // Replace with actual phone image
                alt="Phone with QR"
                className="w-40 sm:w-48 md:w-56"
              />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <img
                  src="https://via.placeholder.com/100" // Replace with actual QR code
                  alt="QR Code"
                  className="w-24 sm:w-28 md:w-32"
                />
              </div>
            </div>
            <div className="text-left">
              <button className="bg-yellow-300 text-blue-800 px-4 py-2 rounded-full text-sm sm:text-base mb-2 hover:bg-yellow-400 transition">
                Share And Earn
              </button>
              <button className="bg-yellow-300 text-blue-800 px-4 py-2 rounded-full text-sm sm:text-base hover:bg-yellow-400 transition">
                SCAN ME
              </button>
            </div>
          </div>
          <div className="mt-6 flex justify-center items-center space-x-2">
            <span className="text-sm sm:text-base">★ 4.5 Rating</span>
            <div className="flex">
              <span className="text-sm sm:text-base">👍</span>
              <span className="text-sm sm:text-base">👎</span>
            </div>
          </div>
        </div>
      </main>

      {/* How Referra Works Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4 sm:mb-0">
              How Referra Works
            </h2>
            <button className="bg-teal-500 text-white px-6 py-2 rounded-full text-sm sm:text-base hover:bg-teal-600 transition">
              Start Earning Now
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-teal-500 text-white p-6 rounded-lg text-center">
              <div className="w-12 h-12 mx-auto mb-4">
                <img
                  src="https://via.placeholder.com/50" // Replace with QR icon
                  alt="Share QR"
                  className="w-full h-full"
                />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                Share Your Custom Link / QR Code
              </h3>
              <p className="text-sm sm:text-base">
                We give you a trackable link and flyer you can share anywhere:
                social media, in person, or text.
              </p>
            </div>
            <div className="bg-teal-500 text-white p-6 rounded-lg text-center">
              <div className="w-12 h-12 mx-auto mb-4">
                <img
                  src="https://via.placeholder.com/50" // Replace with sign-up icon
                  alt="Sign Up"
                  className="w-full h-full"
                />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                They Sign Up or Take Action
              </h3>
              <p className="text-sm sm:text-base">
                We partner with trusted businesses, services, and organizations
                with programs people want.
              </p>
            </div>
            <div className="bg-teal-500 text-white p-6 rounded-lg text-center">
              <div className="w-12 h-12 mx-auto mb-4">
                <img
                  src="https://via.placeholder.com/50" // Replace with check icon
                  alt="Complete Steps"
                  className="w-full h-full"
                />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                They Complete the Steps
              </h3>
              <p className="text-sm sm:text-base">
                Our team or the program partner follows up to verify interest or
                eligibility.
              </p>
            </div>
            <div className="bg-teal-500 text-white p-6 rounded-lg text-center">
              <div className="w-12 h-12 mx-auto mb-4">
                <img
                  src="https://via.placeholder.com/50" // Replace with money icon
                  alt="Get Paid"
                  className="w-full h-full"
                />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                You Get Paid
              </h3>
              <p className="text-sm sm:text-base">
                Earn every time someone completes the process using your link —
                tracked in real time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
