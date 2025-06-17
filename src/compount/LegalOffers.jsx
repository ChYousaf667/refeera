import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import OfferCard from "./OfferCard";
import img1 from "../assets/pic1.png";
import img2 from "../assets/pic2.png";

export default function LegalOffers() {
  const offers = [
    {
      title: "Free Legal Hotline",
      description:
        "Quick access to legal advice on civil issues, tenant rights, and more.",
      image: img1,
    },
    {
      title: "Immigration Assistance",
      description:
        "Help people find trusted providers for green cards, work permits, and asylum claims.",
      image: img2,
    },
    {
      title: "Free Legal Hotline",
      description:
        "Quick access to legal advice on civil issues, tenant rights, and more.",
      image: img1,
    },
    {
      title: "Immigration Assistance",
      description:
        "Help people find trusted providers for green cards, work permits, and asylum claims.",
      image: img2,
    },
    {
      title: "Free Legal Hotline",
      description:
        "Quick access to legal advice on civil issues, tenant rights, and more.",
      image: img1,
    },
    {
      title: "Immigration Assistance",
      description:
        "Help people find trusted providers for green cards, work permits, and asylum claims.",
      image: img2,
    },
    {
      title: "Free Legal Hotline",
      description:
        "Quick access to legal advice on civil issues, tenant rights, and more.",
      image: img1,
    },
    {
      title: "Immigration Assistance",
      description:
        "Help people find trusted providers for green cards, work permits, and asylum claims.",
      image: img2,
    },
  ];

  return (
    <>
      <Navbar />
      <section className="relative bg-gradient-to-r from-blue-500 to-cyan-400 py-20 px-6 text-white text-center">
        <div className="absolute top-10 left-[55%] w-20 h-20 bg-white/10 rounded-full"></div>
        <div className="absolute bottom-[40%] right-[10%] w-32 h-32 bg-white/10 rounded-full"></div>
        <div className="absolute bottom-[80%] left-[8%] w-24 h-24 bg-white/10 rounded-full"></div>
        <div className="absolute bottom-[4%] left-[70%] w-24 h-24 bg-white/10 rounded-full"></div>
        <h1 className="text-4xl font-bold mb-6">Legal Offers</h1>
        <p className="max-w-2xl mx-auto text-lg mb-10">
          Empower your community by referring them to essential legal services.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {offers.map((offer, i) => (
            <OfferCard
              key={i}
              title={offer.title}
              description={offer.description}
              image={offer.image}
              onClick={() => alert(`Refer: ${offer.title}`)}
            />
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
