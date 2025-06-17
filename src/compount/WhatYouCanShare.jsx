// components/WhatYouCanShare.js
import React from "react";
import img1 from "../assets/share1.png";
import img2 from "../assets/share2.png";
import img3 from "../assets/share3.png";
import img4 from "../assets/share4.png";

const items = [
  {
    image: img1,
    title: "Free consultations service trials",
  },
  {
    image: img2,
    title: "Promotional signup offers",
  },
  {
    image: img3,
    title: "Community help resources",
  },
  {
    image: img4,
    title: "Verified partner products or programs",
  },
];

export default function WhatYouCanShare() {
  return (
    <section className="py-16 px-4 text-center bg-white">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
        What You Can Share
      </h2>
      <p className="max-w-2xl mx-auto text-gray-600 mb-12">
        Referrra works with growing companies and helpful programs — from
        everyday services to life-changing solutions. New campaigns are added
        weekly.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className="rounded-full border-4 border-cyan-300 p-4 w-32 h-32 flex items-center justify-center mb-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-sm font-medium text-gray-800">{item.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
