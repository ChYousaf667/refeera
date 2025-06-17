import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import img1 from "../assets/about3.jpg"; // for Finance
import img2 from "../assets/about1.jpg"; // for Health
import img3 from "../assets/pic1.png"; // for Legal

const AllOffers = () => {
  const navigate = useNavigate();

  const categories = [
    {
      title: "Finance Offers",
      description: "Access free or low-cost financial services and support.",
      image: img1,
      path: "/offers/finance",
    },
    {
      title: "Health Offers",
      description: "Connect with health services that improve well-being.",
      image: img2,
      path: "/offers/health",
    },
    {
      title: "Legal Offers",
      description: "Find essential legal aid and immigration help.",
      image: img3,
      path: "/offers/legal",
    },
  ];

  return (
    <>
      <Navbar />
      <section className="bg-gradient-to-r from-blue-500 to-cyan-400 py-20 px-6 text-white text-center">
        <h1 className="text-4xl font-bold mb-6">Explore All Offers</h1>
        <p className="text-lg mb-10 max-w-xl mx-auto">
          Choose a category to discover services that help individuals and
          families.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {categories.map((cat, index) => (
            <div
              key={index}
              onClick={() => navigate(cat.path)}
              className="bg-white cursor-pointer rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 overflow-hidden"
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-600 mb-2">
                  {cat.title}
                </h3>
                <p className="text-gray-700 text-sm">{cat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AllOffers;
