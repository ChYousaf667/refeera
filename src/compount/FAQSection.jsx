import React from "react";
import img2 from "../assets/faqs1.png";
import img3 from "../assets/faqs2.png";


const FAQSection = () => {
  return (
    <section className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-6 py-7">
      <div className="max-w-[90%] mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        {/* Text Section */}
        <div>
          <h2 className="text-3xl font-bold mb-4">FAQ’s</h2>
          <p className="text-white/90 text-base leading-7">
            Lorem Ipsum Dolor Sit Amet Consectetur. Quis Integer Senectus Vel
            Consequat Mauris Fermentum Scelerisque. Sagittis Cursus Tellus Nisl
            Eget Tellus. Praesent Vitae Dignissim Tortor Lacus.
          </p>
        </div>

        {/* Images Section */}
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          <div className="w-full max-w-sm">
            <img
              src={img3}
              alt="Discussion"
              className="w-full h-auto aspect-square bg-[#033D53] object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="w-full max-w-sm md:mt-[15%]">
            <img
              src={img2}
              alt="Question Icon"
              className="w-full h-auto aspect-square bg-[#007681] object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
