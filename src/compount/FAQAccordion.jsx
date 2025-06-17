import React, { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import { FaRegCommentDots } from "react-icons/fa6";

const faqs = [
  {
    category: "General Questions",
    items: [
      {
        question: "What is Referra?",
        answer:
          "Referra is a community-powered referral platform that connects everyday people to free or low-cost government, legal, and healthcare services — and rewards trusted partners for making those connections.",
      },
      {
        question: "Is Referra free for consumers?",
        answer:
          "Yes. All services offered through Referra are $0 upfront for consumers. We never charge the public for access.",
      },
      {
        question: "How does Referra make money?",
        answer:
          "Referra earns revenue from organizations and programs that pay for qualified leads, enrollments, or referrals — such as ACA health plans, legal networks, or prescription card programs.",
      },
    ],
  },
  {
    category: "Partner Questions",
    items: [
      {
        question: "Who can become a Referra Partner?",
        answer:
          "Anyone! From Uber drivers and barbers to tax office staff and community influencers — if you have local reach, you're a fit. No license required for most offers.",
      },
      {
        question: "How much can I earn?",
        answer:
          "Partners can earn $10–$100+ per qualified referral, depending on the service. For example:",
      },
      {
        question: "When do I get paid?",
        answer:
          "Payments are processed weekly or bi-weekly depending on the offer and validation timeline.",
      },
      {
        question: "Do I need to sell anything?",
        answer:
          "No. You’re not selling — you’re connecting people to free services they already qualify for. You share links, post flyers, or help fill forms. That’s it.",
      },
      {
        question: "Can I refer other partners?",
        answer:
          "Yes! We have a referral bonus program for recruiting new partners who meet lead thresholds.",
      },
    ],
  },
  {
    category: "Platform & Technology",
    items: [
      {
        question: "Is there an app or dashboard?",
        answer:
          "Yes. Partners get access to a secure dashboard to track their referrals, earnings, and training resources.",
      },
      {
        question: "How do you track my referrals?",
        answer:
          "We use unique QR codes, referral links, and smart forms tied to your account.",
      },
      {
        question: "Is there training?",
        answer:
          "Absolutely. Each offer comes with a media kit and training guide so you know exactly what to do.",
      },
    ],
  },
  {
    category: "Legal & Compliance",
    items: [
      {
        question: "Is this legal?",
        answer:
          "Yes. Referra is built with compliance in mind. We follow all applicable referral laws, use disclaimers, and vet both our partners and the organizations we send leads to.",
      },
      {
        question: "Are there any offers where I can’t get paid directly?",
        answer:
          "Some highly regulated offers (like personal injury referrals) may limit direct consumer incentives. But you can still earn partner commissions as long as you follow our training and terms",
      },
      {
        question: "Is my data safe?",
        answer:
          "Yes. We use industry-standard encryption and never sell your personal information",
      },
    ],
  },
  {
    category: "Getting Started",
    items: [
      {
        question: "How do I sign up?",
        answer:
          "Click the “Become a Partner” button and fill out the quick onboarding form. You’ll get immediate access to your dashboard and first offer kit",
      },
      {
        question: "Is there a cost to join?",
        answer:
          "No! It’s 100% free to join. In fact, we give sign-up bonuses to early partners who reach their first lead goals.",
      },
      {
        question: "What locations are supported?",
        answer:
          "We’re live in all 50 states, though offer availability may vary based on location.",
      },
    ],
  },
];


export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  let itemCount = 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-8">
        What’s In Your  Mind ?
      </h2>

      {faqs.map((group, groupIdx) => (
        <div key={groupIdx} className="mb-6">
          <h3 className="text-lg md:text-xl font-semibold mb-4">
            {group.category}
          </h3>
          <div className="space-y-4">
            {group.items.map((faq, idx) => {
              const currentIndex = itemCount++;
              return (
                <div
                  key={currentIndex}
                  className="transition-all rounded-md bg-[#22ACB961]"
                >
                  <button
                    onClick={() => toggle(currentIndex)}
                    className="w-full flex items-start gap-4 p-4 text-left"
                  >
                    <div className="bg-[#007681] text-white rounded-full p-2 text-lg">
                      <FaRegCommentDots />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-sm md:text-base">
                        {faq.question}
                      </h4>
                      {openIndex === currentIndex && (
                        <p className="mt-2 text-sm">{faq.answer}</p>
                      )}
                    </div>
                    <div className="text-white bg-[#0B456A] rounded-full mt-1">
                      {openIndex === currentIndex ? (
                        <FiMinus size={18} />
                      ) : (
                        <FiPlus size={18} />
                      )}
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
