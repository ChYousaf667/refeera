import { FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import pic1 from "../assets/pic1.png";
import pic2 from "../assets/pic2.png";
import pic3 from "../assets/pic3.png";

const testimonials = [
  {
    name: "Jasmine Jey",
    image: pic2,
    rating: 4,
    review:
      "Lorem ipsum dolor sit amet consectetur. Vitae nibh laoreet pellentesque enim gravida neque tortor lectus quam.",
  },
  {
    name: "Sara Roy",
    image: pic1,
    rating: 5,
    review:
      "Lorem ipsum dolor sit amet consectetur. Vitae nibh laoreet pellentesque enim gravida neque tortor lectus quam.",
  },
  {
    name: "Jackob Smith",
    image: pic3,
    rating: 5,
    review:
      "Lorem ipsum dolor sit amet consectetur. Vitae nibh laoreet pellentesque enim gravida neque tortor lectus quam.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-gradient-to-br from-sky-100 via-white to-sky-200 py-16 px-4 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
        Testimonials
      </h2>

      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        pagination={{ clickable: true }}
        breakpoints={{
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        modules={[Pagination]}
        className="px-4"
      >
        {testimonials.map((t, index) => (
          <SwiperSlide key={index}>
            <div
              className={`rounded-xl p-6 max-w-sm w-full mx-auto transition-all duration-300 ${
                index === 1
                  ? "bg-[#003366] text-white shadow-lg scale-105"
                  : "bg-white text-gray-800 shadow-md"
              }`}
            >
              <img
                src={t.image}
                alt={t.name}
                className="w-16 h-16 rounded-full mx-auto mb-4 object-cover border-2 border-white shadow"
              />
              <h3 className="font-semibold text-lg">{t.name}</h3>

              <div className="flex justify-center items-center my-2">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-sm mx-0.5" />
                ))}
              </div>

              <div className="flex justify-center mb-4">
                <span className="text-sm bg-cyan-500 text-white px-3 py-1 rounded-full">
                  20
                </span>
              </div>

              <p className="text-sm leading-relaxed">{t.review}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mt-10">
        <a
          href="#"
          className="font-semibold text-blue-900 hover:underline inline-flex items-center text-lg"
        >
          View All
          <span className="ml-2 text-xl">→</span>
        </a>
      </div>
    </section>
  );
}
