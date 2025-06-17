import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { generateReferralLink, reset } from "../features/referral/referralSlice";
import Navbar from "./Navbar";
import Footer from "./Footer";
import OfferCard from "./OfferCard";
import SingleOfferPage from "./SingleOfferPage";

export default function HealthOffers() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { referralLink, isLoading, isError, message } = useSelector(
    (state) => state.referral
  );

  // Store referral links for each offer
  const [referralLinks, setReferralLinks] = useState({
    aca: null,
    rx: null,
    medicare: null,
  });

  // Assume partnerId is stored in user profile or hardcoded for testing
  const partnerId = user?.partnerId || "6841727d41f279f199d31f21";
  const token = user?.token;

  // Debug auth state
  useEffect(() => {
    console.log("HealthOffers auth state:", { user, partnerId, token });
  }, [user, partnerId, token]);

  // Handle errors
  useEffect(() => {
    if (isError) {
      toast.error(message || "Failed to generate referral link");
      dispatch(reset());
    }
  }, [isError, message, dispatch]);

  // Update referralLinks when a new referralLink is generated
  useEffect(() => {
    if (referralLink) {
      console.log("New referralLink received:", referralLink);
      const urlParams = new URLSearchParams(referralLink.split("?")[1]);
      const offerId = urlParams.get("offerId");
      if (offerId && offers.find((offer) => offer.id === offerId)) {
        setReferralLinks((prev) => ({
          ...prev,
          [offerId]: referralLink,
        }));
        toast.success(`Referral link for ${offerId.toUpperCase()} generated!`);
        dispatch(reset());
      }
    }
  }, [referralLink, dispatch]);

  // Function to generate referral link
  const handleGenerateLink = async (offerId) => {
    if (!partnerId) {
      toast.error("Partner ID is missing");
      return;
    }
    if (!offerId) {
      toast.error("Offer ID is missing");
      return;
    }
    if (!token) {
      toast.error("Authentication token is missing. Please log in.");
      return;
    }
    if (referralLinks[offerId]) {
      toast.info(`Referral link for ${offerId.toUpperCase()} already generated`);
      return;
    }
    console.log("Dispatching generateReferralLink with:", {
      partnerId,
      offerId,
    });
    await dispatch(generateReferralLink({ partnerId, offerId }));
  };

  // Offers array (same as the older version)
  const offers = [
    {
      id: "aca",
      title: "ACA Marketplace Insurance",
      description:
        "Help clients enroll in affordable health insurance through the ACA Marketplace with the assistance of licensed agents.",
      image: "https://picsum.photos/400/300?random=1",
      details: {
        overview: (
          <>
            <p>
              As a Referra Partner, you can refer individuals who may qualify for
              Affordable Care Act (ACA) health coverage through the official
              government Marketplace.
            </p>
            <p>
              Your role is to help generate awareness and connect consumers to a
              licensed agent who will complete the enrollment process. You do not
              sell insurance or provide plan advice.
            </p>
          </>
        ),
        whatIs: (
          <>
            <h3 className="text-xl font-semibold mb-2">What is ACA Coverage?</h3>
            <p>
              The Affordable Care Act (ACA) allows eligible consumers to enroll in
              quality, affordable health insurance through Healthcare.gov or their
              state-based marketplace.
            </p>
            <p>Eligible consumers may qualify for:</p>
            <ul className="list-disc list-inside mb-4">
              <li>$0 premium plans (based on income and household size)</li>
              <li>Comprehensive medical coverage</li>
              <li>Preventive care, prescriptions, emergency services, and more</li>
            </ul>
          </>
        ),
        compliance: (
          <>
            <h3 className="text-xl font-semibold mb-2">
              Important Compliance Information for Partners
            </h3>
            <ul className="list-disc list-inside mb-4">
              <li>✅ You are referring interested consumers only.</li>
              <li>✅ You do not market specific plans or carriers.</li>
              <li>
                ✅ You do not discuss plan benefits, coverage details, or premiums.
              </li>
              <li>
                ✅ You do not enroll consumers or collect sensitive enrollment
                information.
              </li>
              <li>
                ✅ All enrollments must be completed by a licensed health insurance
                agent.
              </li>
            </ul>
            <p>
              Partners may promote awareness of the availability of ACA plans and
              may provide general information about the existence of $0 premium
              plans, but must not make any guarantees of eligibility or outcomes.
            </p>
          </>
        ),
        messaging: (
          <>
            <h3 className="text-xl font-semibold mb-2">
              Approved Messaging for Partners
            </h3>
            <p>
              <strong>DO:</strong>
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>
                Let people know they may qualify for free or low-cost ACA health
                insurance.
              </li>
              <li>Share that help is available through a licensed agent.</li>
              <li>Encourage consumers to check their eligibility.</li>
            </ul>
            <p>
              <strong>DON’T:</strong>
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>State or imply that everyone qualifies for free coverage.</li>
              <li>
                Use false urgency (e.g., “only today!”) unless during an actual
                enrollment period.
              </li>
              <li>Advertise specific plan names, carriers, or benefits.</li>
              <li>Promise any particular coverage or dollar amount.</li>
            </ul>
            <p>
              <strong>Example Approved Language:</strong>
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>
                ✅ Headline: "See if You Qualify for Free or Low-Cost Health
                Insurance through the ACA!"
              </li>
              <li>
                ✅ Body Text: "Millions of Americans qualify for $0 or low-cost
                health coverage under the Affordable Care Act. We can connect you
                with a licensed agent to help check your eligibility and explore
                your options — no obligation. Submit your information today!"
              </li>
              <li>
                ✅ Disclaimer: "Referra is not a licensed insurance agency or
                carrier and does not provide insurance advice. Referrals are sent
                to licensed insurance agents who complete all enrollments. Plan
                availability, eligibility, and savings vary by state and
                individual circumstances."
              </li>
            </ul>
          </>
        ),
        compensation: (
          <>
            <h3 className="text-xl font-semibold mb-2">Partner Compensation</h3>
            <p>
              Partners are eligible to earn commissions for referred consumers who
              successfully enroll in ACA plans through our approved agent network.
            </p>
            <p>
              Commissions are only paid on verified enrollments completed by
              licensed agents.
            </p>
            <p>Partner earnings will be displayed in your Partner Dashboard.</p>
            <p>Compensation is subject to applicable laws and regulations.</p>
          </>
        ),
        reminders: (
          <>
            <h3 className="text-xl font-semibold mb-2">Important Reminders</h3>
            <ul className="list-disc list-inside mb-4">
              <li>Follow all guidance provided by Referra when promoting ACA offers.</li>
              <li>Only use approved marketing materials and approved language.</li>
              <li>Never present yourself as an insurance agent unless properly licensed.</li>
              <li>Never advise consumers on plan selection.</li>
            </ul>
          </>
        ),
        contact: (
          <>
            <p>
              Questions? Please contact{" "}
              <a href="mailto:partners@getreferra.com" className="underline">
                partners@getreferra.com
              </a>{" "}
              for guidance on compliant marketing.
            </p>
          </>
        ),
      },
    },
    {
      id: "rx",
      title: "Rx Prescription Discount Card",
      description:
        "Refer consumers to a FREE Prescription Discount Card accepted at over 65,000 pharmacies to save on medications.",
      image: "https://picsum.photos/400/300?random=2",
      details: {
        overview: (
          <>
            <p>
              As a Referra Partner, you can help consumers access a FREE
              Prescription Discount Card that may help them save on their
              out-of-pocket costs for prescription medications.
            </p>
            <p>
              Your role is to refer consumers to download or request the discount
              card — you do not provide medical advice, process prescriptions, or
              guarantee any savings.
            </p>
          </>
        ),
        whatIs: (
          <>
            <h3 className="text-xl font-semibold mb-2">What Is an Rx Discount Card?</h3>
            <p>
              A Prescription Discount Card is a free card or digital coupon that
              allows consumers to receive discounts on their medications at
              participating pharmacies.
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>It is not insurance and does not replace insurance.</li>
              <li>
                It can be used by consumers with or without insurance to
                potentially lower their costs on eligible prescriptions.
              </li>
              <li>Accepted at over 65,000 pharmacies nationwide (including major chains).</li>
            </ul>
            <h3 className="text-xl font-semibold mb-2">Who Can Use It?</h3>
            <p>
              Anyone can use the Rx Discount Card — there are no eligibility
              restrictions.
            </p>
            <p>It is especially helpful for:</p>
            <ul className="list-disc list-inside mb-4">
              <li>Consumers without insurance</li>
              <li>Consumers with high deductibles or gaps in coverage</li>
              <li>Consumers seeking savings on medications not covered by their insurance</li>
            </ul>
          </>
        ),
        compensation: (
          <>
            <h3 className="text-xl font-semibold mb-2">Partner Compensation</h3>
            <p>
              Partners are eligible to earn commissions for referred consumers who
              activate or use the Rx Discount Card (based on program-specific
              tracking and terms).
            </p>
            <p>
              Compensation is paid based on verified card activations or usage,
              depending on the program.
            </p>
            <p>Partner earnings will be displayed in your Partner Dashboard.</p>
            <p>Compensation is subject to applicable laws and Referra program policies.</p>
          </>
        ),
        reminders: (
          <>
            <h3 className="text-xl font-semibold mb-2">Important Reminders</h3>
            <ul className="list-disc list-inside mb-4">
              <li>Always use Referra-approved marketing materials and approved language.</li>
              <li>Do not misrepresent the Rx Discount Card as insurance.</li>
              <li>Do not provide advice about specific medications or drug savings.</li>
              <li>Do not collect or request personal health or prescription data from consumers.</li>
            </ul>
          </>
        ),
        contact: (
          <p>
            Questions? Contact{" "}
            <a href="mailto:partners@getreferra.com" className="underline">
              partners@getreferra.com
            </a>{" "}
            for compliance questions and marketing guidance.
          </p>
        ),
      },
    },
    {
      id: "medicare",
      title: "Medicare Advantage Plans",
      description:
        "Connect clients with licensed agents to explore Medicare Advantage or related plans tailored to their needs.",
      image: "https://picsum.photos400/300?random=3",
      details: {
        overview: (
          <>
            <p>
              As a Referra Partner, you can help raise awareness and refer eligible
              consumers to licensed agents who specialize in Medicare Advantage
              (Part C) plans and other Medicare-related coverage.
            </p>
            <p>
              Partners do not sell insurance or provide plan advice — your role is
              to refer interested individuals to our licensed agent network.
            </p>
          </>
        ),
        whatIs: (
          <>
            <h3 className="text-xl font-semibold mb-2">What Is Medicare Advantage?</h3>
            <p>
              Medicare Advantage (also known as Medicare Part C) is an alternative
              to Original Medicare, offered by private insurance companies
              approved by Medicare.
            </p>
            <p>Medicare Advantage plans may include:</p>
            <ul className="list-disc list-inside mb-4">
              <li>Medical and hospital coverage</li>
              <li>Prescription drug coverage (Part D)</li>
              <li>
                Additional benefits such as dental, vision, hearing, and wellness
                programs (varies by plan and carrier)
              </li>
            </ul>
            <h3 className="text-xl font-semibold mb-2">Who May Qualify?</h3>
            <ul className="list-disc list-inside mb-4">
              <li>Individuals age 65 or older enrolled in Medicare Part A and Part B</li>
              <li>Individuals under 65 with certain disabilities</li>
              <li>
                Consumers looking for enhanced benefits and services beyond
                Original Medicare
              </li>
            </ul>
          </>
        ),
        compliance: (
          <>
            <h3 className="text-xl font-semibold mb-2">
              Important Compliance Information for Partners
            </h3>
            <ul className="list-disc list-inside mb-4">
              <li>✅ You are referring interested consumers only.</li>
              <li>✅ You do not market or promote specific plans or carriers.</li>
              <li>✅ You do not discuss plan benefits, coverage details, or costs.</li>
              <li>
                ✅ You do not enroll consumers or collect sensitive enrollment
                information.
              </li>
              <li>
                ✅ All enrollments must be completed by a licensed and certified
                Medicare agent.
              </li>
            </ul>
            <p>
              Partners must follow CMS marketing guidelines and Referra policies
              at all times.
            </p>
          </>
        ),
        compensation: (
          <>
            <h3 className="text-xl font-semibold mb-2">Partner Compensation</h3>
            <p>
              Partners are eligible to earn commissions for referred consumers who
              enroll in Medicare Advantage plans through our approved agent
              network.
            </p>
            <p>
              Commissions are only paid on verified enrollments completed by
              licensed agents.
            </p>
            <p>Partner earnings will be displayed in your Partner Dashboard.</p>
            <p>Compensation is subject to applicable laws, CMS regulations, and Referra policies.</p>
          </>
        ),
        reminders: (
          <>
            <h3 className="text-xl font-semibold mb-2">Important Reminders</h3>
            <ul className="list-disc list-inside mb-4">
              <li>Use only Referra-approved marketing materials and language.</li>
              <li>
                Never state or imply affiliation with Medicare, CMS, or the
                federal government.
              </li>
              <li>Do not discuss or market plan specifics.</li>
              <li>
                Do not advise on Medicare plan selection unless licensed and
                certified.
              </li>
            </ul>
          </>
        ),
        contact: (
          <p>
            Questions? Contact{" "}
            <a href="mailto:partners@getreferra.com" className="underline">
              partners@getreferra.com
            </a>{" "}
            for compliance and marketing guidance.
          </p>
        ),
      },
    },
  ];

  console.log("HealthOffers: offers array", offers); // Debug log

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <section className="relative bg-gradient-to-r from-blue-500 to-cyan-400 py-20 px-6 text-white text-center">
              <div className="absolute top-10 left-[55%] w-20 h-20 bg-white/10 rounded-full"></div>
              <div className="absolute bottom-[40%] right-[10%] w-32 h-32 bg-white/10 rounded-full"></div>
              <div className="absolute bottom-[80%] left-[8%] w-24 h-24 bg-white/10 rounded-full"></div>
              <div className="absolute bottom-[4%] left-[70%] w-24 h-24 bg-white/10 rounded-full"></div>
              <h1 className="text-4xl font-bold mb-6">Health Offers</h1>
              <p className="max-w-2xl mx-auto text-lg mb-10">
                Refer clients to health services including ACA Marketplace
                insurance, prescription discounts, and Medicare plans.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {offers.map((offer) => (
                  <OfferCard
                    key={offer.id}
                    title={offer.title}
                    description={offer.description}
                    image={offer.image}
                    onClick={() => navigate(`/offers/health/offer/${offer.id}`)}
                  />
                ))}
              </div>
            </section>
          }
        />
        <Route
          path="/offer/:id"
          element={<SingleOfferPage offers={offers} onGenerateLink={handleGenerateLink} referralLinks={referralLinks} />}
        />
      </Routes>
      <Footer />
    </>
  );
}