import React from "react";
import img1 from "../assets/about1.jpg";
import img2 from "../assets/about2.jpg";
import img3 from "../assets/about3.jpg";
import img4 from "../assets/about4.jpg";

export default function AboutUs() {
  return (
    <>
      <section className="relative bg-gradient-to-r from-blue-500 to-cyan-400 text-white pb-64 pt-20 px-4 md:mb-24 md:px-10">
        <div className="absolute top-10 left-[55%] w-20 h-20 bg-white/10 rounded-full"></div>
        <div className="absolute bottom-[40%] right-[10%] w-32 h-32 bg-white/10 rounded-full"></div>
        <div className="absolute bottom-[10%] left-[8%] w-24 h-24 bg-white/10 rounded-full"></div>
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 tracking-tight">
            About Us
          </h2>
          <p className="text-sm sm:text-base md:text-lg leading-relaxed text-white/90">
            Lorem ipsum dolor sit amet consectetur. Quis integer senectus vel
            consequat mauris fermentum scelerisque. Sagittis cursus tellus nisl
            eget tellus. Praesent vitae dignissim tortor lacus congue sit purus
            tempus. Lorem ipsum dolor sit amet consectetur. Quis integer
            senectus vel consequat mauris fermentum scelerisque. Sagittis cursus
            tellus nisl eget tellus.
          </p>
        </div>

        {/* Floating Image Cards */}
        <div className="absolute bottom-5 sm:bottom-[-120px] left-1/2 transform -translate-x-1/2 w-full ms:max-w-6xl px-4">
          <div className="flex flex-wrap justify-center items-start gap-6">
            {[img1, img2, img3, img4].map((img, idx) => (
              <div
                key={idx}
                className={`bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-300 hidden sm:block ${
                  idx % 2 !== 0 ? "mt-6 sm:mt-20" : "mt-0"
                } max-w-[180px] sm:max-w-[200px] w-full aspect-[3/4]`}
              >
                <img
                  src={img}
                  alt={`about-${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            {[img1, img2].map((img, idx) => (
              <div
                key={idx}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300 w-32 aspect-[3/4] md:hidden"
              >
                <img
                  src={img}
                  alt={`about-${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
