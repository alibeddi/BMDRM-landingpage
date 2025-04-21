"use client";
import React from "react";
import SeoMeta from "@layouts/partials/SeoMeta";
import GSAPWrapper from "@layouts/components/GSAPWrapper";

const pricingTiers = [
  {
    name: "Lite",
    price: "$40/3 Months",
    description: "For individuals getting started",
    features: [
      "Max storage: 50,00 GB",
      "Bandwidth: 200,00 GB",
      "Bandwidth Cost: $0.9/GB",
      "Storage cost per Gb: 0.6$",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Starter",
    price: "$120/year",
    description: "Best for growing teams",
    features: [
      "Max storage: 100,00 GB",
      "Bandwidth: 1 000,00 GB",
      "Bandwidth Cost: $0.06/GB",
      "Storage Cost per Gb: 0.6$",
    ],
    cta: "Choose Starter",
    highlighted: true,
  },
  {
    name: "Value",
    price: "$320/year",
    description: "Best for growing teams",
    features: [
      "Max storage: 200,00 GB",
      "Bandwidth: 2,50 TB",
      "Bandwidth Cost: $0.06/GB",
      "Storage cost per Gb: 0.6$",
    ],
    cta: "Choose Value",
    // highlighted: true,
  },
  {
    name: "Express",
    price: "$560/year",
    description: "Best for growing teams",
    features: [
      "Storage: 400 GB",
      "Bandwidth: 5 TB",
      "Bandwidth Cost: $0.06/GB",
      "Storage Cost: $0.6/GB",
    ],
    cta: "Choose Express",
    // highlighted: true,
  },
  {
    name: "Pro",
    price: "$1,280/year",
    description: "Best for growing teams",
    features: [
      "Storage: 1 TB",
      "Bandwidth: 15 TB",
      "Bandwidth Cost: $0.06/GB",
      "Storage Cost: $0.6/GB",
    ],
    cta: "Choose Pro",
    highlighted: true,
  },
  {
    name: "Plus",
    price: "$2400/year",
    description: "Best for growing teams",
    features: [
      "Storage: 1.2 TB",
      "Bandwidth: 30 TB",
      "Bandwidth Cost: $0.06/GB",
      "Storage Cost: $0.6/GB",
    ],
    cta: "Choose Plus",
    // highlighted: true,
  },
  {
    name: "Premium",
    price: "$4000/year",
    description: "Best for growing teams",
    features: [
      "Max storage: 2,00 TB",
      "Bandwidth: 50,00 TB",
      "Bandwidth Cost: $0.06/GB",
      "Storage Cost: $0.6/GB",
    ],
    cta: "Choose Premium",
    // highlighted: true,
  },
  {
    name: "Supreme",
    price: "$20800/year",
    description: "Best for growing teams",
    features: [
      "Storage: 20 TB",
      "Bandwidth: 500,00 TB",
      "Bandwidth Cost: $0.06/GB",
      "Storage Cost: $0.6/GB",
    ],
    cta: "Choose Supreme",
    highlighted: true,
  },
  {
    name: "Custom",
    price: "Contact Us",
    description: "Custom solutions for enterprises",
    features: [
      "All Pro Features",
      "Dedicated Manager",
      "Custom Integrations",
      "Upload API, Multi-user access",
    ],
    cta: "Contact Sales",
    // highlighted: false,
  },
];
//  bg-gradient-to-br from-gray-50 to-purple-50
const Pricing = () => {
  return (
    <GSAPWrapper>
      <SeoMeta title="Pricing" />
      <section className="min-h-screen bg-transparent py-16 px-4 flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-purple-900 text-center">
          Our Pricing Plans
        </h1>
        <p className="text-lg text-purple-800 mb-12 text-center max-w-2xl">
          Choose the plan that fits your needs. Upgrade, downgrade, or cancel
          anytime. No hidden fees.
        </p>
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, idx) => (
            <div
              key={tier.name}
              className={`relative rounded-3xl shadow-xl bg-white p-8 flex flex-col items-center border transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                tier.highlighted
                  ? "border-purple-600 scale-105 ring-4 ring-purple-100 z-10"
                  : "border-gray-200"
              }`}
            >
              {tier.highlighted && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-xs px-4 py-1 rounded-full font-semibold tracking-wide shadow-md animate-bounce">
                  Most Popular
                </span>
              )}
              <h2 className="text-2xl font-bold text-purple-900 mb-2">
                {tier.name}
              </h2>
              <div className="text-4xl font-extrabold text-purple-700 mb-2">
                {tier.price}
              </div>
              <p className="text-purple-800 mb-6 text-center">
                {tier.description}
              </p>
              <ul className="mb-8 w-full">
                {tier.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 mb-2 text-purple-700"
                  >
                    <svg
                      className="w-5 h-5 text-purple-500"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 rounded-xl font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                  tier.highlighted
                    ? "bg-purple-600 text-white hover:bg-purple-700 shadow-lg"
                    : "bg-purple-100 text-purple-900 hover:bg-purple-200"
                }`}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>
      </section>
      <style jsx>{`
        .animate-bounce {
          animation: bounce 1.2s infinite;
        }
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
      `}</style>
    </GSAPWrapper>
  );
};

export default Pricing;
