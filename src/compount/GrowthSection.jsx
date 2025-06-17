import React from "react";
import img1 from "../assets/Professionals1.jpg";
import img2 from "../assets/Professionals2.jpg";
import img3 from "../assets/Professionals3.jpg";
import img4 from "../assets/Professionals4.jpg";
import img5 from "../assets/Professionals5.jpg";
import img6 from "../assets/Professionals6.jpg";
import { PiUsersThreeFill } from "react-icons/pi";
import { TbTargetArrow } from "react-icons/tb";
import { BiSolidCoinStack } from "react-icons/bi";



const GrowthSection = () => {
  return (
    <div className="w-full">
      {/* Top Section */}
      <div className="bg-white py-16 px-6 text-center">
        <h2 className="text-3xl font-bold text-cyan-600 uppercase tracking-widest">
          We Help You To Grow
        </h2>
        <h2 className="text-4xl font-extrabold text-gray-900 mt-2">
          Faster & Bigger
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mt-6 text-base">
          Lorem Ipsum Dolor Sit Amet Consectetur. Quis Integer Senectus Vel
          Consequat Mauris Fermentum Scelerisque. Sagittis Cursus Tellus Nisl
          Eget Tellus. Praesent Vitae Dignissim Tortor Lacus Congue Sit Purus
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-14 w-[90%] mx-auto">
          {[
            {
              icon: <PiUsersThreeFill size={64} />,
              title: "Professional Team",
              text: "Lorem Ipsum Dolor Sit Amet Consectetur. Quis Integer Senectus Vel Consequat Mauris Fermentum Scelerisque. Sagittis Cursus Tellus Nisl Eget Tellus",
            },
            {
              icon: <TbTargetArrow size={70} />,
              title: "Target Oriented",
              text: "Lorem Ipsum Dolor Sit Amet Consectetur. Quis Integer Senectus Vel Consequat Mauris Fermentum Scelerisque. Sagittis Cursus Tellus Nisl Eget Tellus",
            },
            {
              icon: <BiSolidCoinStack size={64} />,
              title: "Success Guaranteed",
              text: "Lorem Ipsum Dolor Sit Amet Consectetur. Quis Integer Senectus Vel Consequat Mauris Fermentum Scelerisque. Sagittis Cursus Tellus Nisl Eget Tellus",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white shadow-lg rounded-xl p-6 transition transform hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="w-24 h-24 mx-auto rounded-full border-4 border-cyan-500 text-cyan-600 flex items-center justify-center bg-cyan-50">
                {item.icon}
              </div>
              <h3 className="mt-6 font-semibold text-xl text-gray-800">
                {item.title}
              </h3>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="relative bg-gradient-to-r from-blue-500 to-cyan-400 py-8 px-6 text-center text-white mb-10">
        <div className="absolute top-10 left-[55%] w-20 h-20 bg-white/10 rounded-full"></div>
        <div className="absolute bottom-[40%] right-[10%] w-32 h-32 bg-white/10 rounded-full"></div>
        <div className="absolute bottom-[50%] right-[70%] w-32 h-32 bg-white/10 rounded-full"></div>
        <div className="absolute bottom-[10%] left-[8%] w-24 h-24 bg-white/10 rounded-full"></div>
        <h3 className="text-3xl font-bold mb-10">Our Professionals</h3>
        <div className="grid grid-cols-3 w-[80%] md:w-full mx-auto md:flex justify-center gap-4 flex-wrap">
          <div className="w-20 h-48 overflow-hidden rounded-full mt-10">
            <img
              src={img1}
              alt=""
              className="object-cover w-full h-full rounded-[30%]"
            />
          </div>
          <div className="w-20 h-48 overflow-hidden rounded-full">
            <img
              src={img2}
              alt=""
              className="object-cover w-full h-full rounded-[30%]"
            />
          </div>
          <div className="w-20 h-48 overflow-hidden rounded-full mt-10">
            <img
              src={img3}
              alt=""
              className="object-cover w-full h-full rounded-[30%]"
            />
          </div>
          <div className="w-20 h-48 overflow-hidden rounded-full">
            <img
              src={img4}
              alt=""
              className="object-cover w-full h-full rounded-[30%]"
            />
          </div>
          <div className="w-20 h-48 overflow-hidden rounded-full mt-10">
            <img
              src={img5}
              alt=""
              className="object-cover w-full h-full rounded-[30%]"
            />
          </div>
          <div className="w-20 h-48 overflow-hidden rounded-full">
            <img
              src={img6}
              alt=""
              className="object-cover w-full h-full rounded-[30%]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrowthSection;
