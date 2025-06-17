import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { toast } from "react-toastify";
import { QRCodeSVG } from "qrcode.react"; // Correct named export for qrcode.react@4.2.0

export default function SingleOfferPage({
  offers,
  onGenerateLink,
  referralLinks,
  isLoading,
}) {
  console.log("SingleOfferPage: offers prop", offers);
  const { id } = useParams();
  console.log("SingleOfferPage: id from useParams", id);
  const navigate = useNavigate();

  // Handle missing offers data
  if (!offers || !Array.isArray(offers)) {
    return (
      <div className="bg-white min-h-screen py-20 px-6 text-center">
        <div className="bg-gradient-to-r from-blue-500 to-cyan-400 py-12 px-6 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Error</h1>
          <p className="max-w-2xl mx-auto text-lg mb-10 text-white/90">
            No offers data available. Please try again later.
          </p>
          <button
            onClick={() => navigate("/offers/health")}
            className="flex items-center gap-2 mx-auto bg-white text-blue-500 font-semibold py-3 px-6 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <FiArrowLeft size={18} />
            Back to Health Offers
          </button>
        </div>
      </div>
    );
  }

  // Find the selected offer
  const offer = offers.find((o) => o.id === id);
  console.log("SingleOfferPage: selected offer", offer);

  // Handle offer not found
  if (!offer) {
    return (
      <div className="bg-white min-h-screen py-20 px-6 text-center">
        <div className="relative bg-gradient-to-r from-blue-500 to-cyan-400 py-12 px-6 text-white">
          <div className="absolute top-10 left-[55%] w-20 h-20 bg-white/10 rounded-full"></div>
          <div className="absolute bottom-[40%] right-[10%] w-32 h-32 bg-white/10 rounded-full"></div>
          <div className="absolute bottom-[80%] left-[8%] w-24 h-24 bg-white/10 rounded-full"></div>
          <div className="absolute bottom-[4%] left-[70%] w-24 h-24 bg-white/10 rounded-full"></div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Offer Not Found
          </h1>
          <p className="max-w-2xl mx-auto text-lg mb-10 text-white/90">
            The offer you are looking for does not exist.
          </p>
          <button
            onClick={() => navigate("/offers/health")}
            className="flex items-center gap-2 mx-auto bg-white text-blue-500 font-semibold py-3 px-6 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <FiArrowLeft size={18} />
            Back to Health Offers
          </button>
        </div>
      </div>
    );
  }

  // Define sections for display
  const sections = [
    {
      title: "Overview",
      content: offer.details?.overview || <p>No overview available.</p>,
    },
    {
      title: "What Is It?",
      content: offer.details?.whatIs || (
        <p>No 'What Is' information available.</p>
      ),
    },
    {
      title: "Compliance",
      content: offer.details?.compliance || (
        <p>No compliance information available.</p>
      ),
    },
    {
      title: "Messaging",
      content: offer.details?.messaging || (
        <p>No messaging information available.</p>
      ),
    },
    {
      title: "Compensation",
      content: offer.details?.compensation || (
        <p>No compensation information available.</p>
      ),
    },
    {
      title: "Reminders",
      content: offer.details?.reminders || <p>No reminders available.</p>,
    },
    {
      title: "Referral Link",
      content: (
        <div>
          <button
            onClick={() => onGenerateLink(id)}
            className="border mt-4 mx-auto block bg-blue-500 text-white px-16 py-3 rounded-3xl hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={referralLinks[id] || isLoading}
            aria-label={
              referralLinks[id]
                ? "Referral link already generated"
                : "Generate referral link"
            }
          >
            {isLoading
              ? "Generating..."
              : referralLinks[id]
              ? "Link Generated"
              : "Generate Referral Link"}
          </button>
          {referralLinks[id] && (
            <div className="mt-4 text-left space-y-4">
              <div>
                <p className="text-sm text-gray-600">Referral Link:</p>
                <a
                  href={referralLinks[id]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline break-all"
                >
                  {referralLinks[id]}
                </a>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(referralLinks[id]);
                    toast.success("Link copied to clipboard!");
                  }}
                  className="ml-2 mt-2 px-4 py-2 bg-gray-200 rounded-lg text-sm text-gray-800 hover:bg-gray-300 transition-colors"
                  aria-label="Copy referral link to clipboard"
                >
                  Copy
                </button>
              </div>
              <div>
                <p className="text-sm text-gray-600">QR Code:</p>
                <div
                  className="mt-2 p-4 bg-white border border-gray-200 rounded-lg inline-block"
                  id="qr-code-container"
                >
                  <QRCodeSVG
                    value={referralLinks[id]}
                    size={128}
                    level="H"
                    includeMargin={true}
                    bgColor="#ffffff"
                    fgColor="#000000"
                    className="mx-auto"
                    title={`QR code for ${offer.title} referral link`}
                  />
                </div>
                <button
                  onClick={() => {
                    const svg = document.querySelector(
                      "#qr-code-container svg"
                    );
                    if (!svg) {
                      toast.error("QR code not found");
                      return;
                    }
                    const canvas = document.createElement("canvas");
                    const svgData = new XMLSerializer().serializeToString(svg);
                    const img = new Image();
                    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
                    img.onload = () => {
                      canvas.width = img.width;
                      canvas.height = img.height;
                      canvas.getContext("2d").drawImage(img, 0, 0);
                      const link = document.createElement("a");
                      link.download = `${offer.title.replace(
                        /\s+/g,
                        "_"
                      )}_QR_Code.png`;
                      link.href = canvas.toDataURL("image/png");
                      link.click();
                      toast.success("QR code downloaded!");
                    };
                    img.onerror = () => {
                      toast.error("Failed to generate QR code image");
                    };
                  }}
                  className="ml-2 mt-2 px-4 py-2 bg-gray-200 rounded-lg text-sm text-gray-800 hover:bg-gray-300 transition-colors"
                  aria-label="Download QR code"
                >
                  Download QR Code
                </button>
              </div>
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Contact",
      content: offer.details?.contact || (
        <p>No contact information available.</p>
      ),
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Header Section with Gradient Background */}
      <div className="relative bg-gradient-to-r from-blue-500 to-cyan-400 py-20 px-6 text-white">
        <div className="absolute top-10 left-[55%] w-20 h-20 bg-white/10 rounded-full"></div>
        <div className="absolute bottom-[40%] right-[10%] w-32 h-32 bg-white/10 rounded-full"></div>
        <div className="absolute bottom-[80%] left-[8%] w-24 h-24 bg-white/10 rounded-full"></div>
        <div className="absolute bottom-[4%] left-[70%] w-24 h-24 bg-white/10 rounded-full"></div>
        <div className="max-w-5xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate("/offers/health")}
            className="flex items-center gap-2 mb-8 bg-white text-blue-500 font-semibold py-3 px-6 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <FiArrowLeft size={18} />
            Back to Health Offers
          </button>

          {/* Header Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {offer.title}
              </h1>
              <p className="text-lg text-white/90">{offer.description}</p>
            </div>
            <div>
              <img
                src={offer.image}
                alt={offer.title}
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections with White Background */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800">
          Offer Details
        </h2>
        <div className="space-y-6">
          {sections.map((section, index) => (
            <div
              key={index}
              className="bg-blue-100 rounded-lg p-6 transition-all shadow-sm"
            >
              <h3 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">
                {section.title}
              </h3>
              <div className="text-sm md:text-base text-gray-600 space-y-4">
                {section.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
