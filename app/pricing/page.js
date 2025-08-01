"use client";
import React from "react";
import SeoMeta from "@layouts/partials/SeoMeta";
import GSAPWrapper from "@layouts/components/GSAPWrapper";

const pricingTiers = [
  {
    name: "Lite",
    price: "$40",
    period: "/3 Months",
    description: "For individuals getting started",
    features: [
      "Max storage: 50,00 GB",
      "Bandwidth: 200,00 GB",
      "Bandwidth Cost: $0.9/GB",
      "Storage cost per Gb: 0.6$",
    ],
    cta: "Purchase",
  },
  {
    name: "Starter",
    price: "$120",
    period: "/year",
    description: "Best for growing teams",
    features: [
      "Max storage: 100,00 GB",
      "Bandwidth: 1 000,00 GB",
      "Bandwidth Cost: $0.06/GB",
      "Storage Cost per Gb: 0.6$",
    ],
    cta: "Purchase",
  },
  {
    name: "Value",
    price: "$320",
    period: "/year",
    description: "Best for growing teams",
    features: [
      "Max storage: 200,00 GB",
      "Bandwidth: 2,50 TB",
      "Bandwidth Cost: $0.06/GB",
      "Storage cost per Gb: 0.6$",
    ],
    cta: "Purchase",
  },
  {
    name: "Express",
    price: "$560",
    period: "/year",
    description: "Best for growing teams",
    features: [
      "Storage: 400 GB",
      "Bandwidth: 5 TB",
      "Bandwidth Cost: $0.06/GB",
      "Storage Cost: $0.6/GB",
    ],
    cta: "Purchase",
  },
  {
    name: "Pro",
    price: "$1,280",
    period: "/year",
    description: "Best for growing teams",
    features: [
      "Storage: 1 TB",
      "Bandwidth: 15 TB",
      "Bandwidth Cost: $0.06/GB",
      "Storage Cost: $0.6/GB",
    ],
    cta: "Purchase",
  },
  {
    name: "Plus",
    price: "$2,400",
    period: "/year",
    description: "Best for growing teams",
    features: [
      "Storage: 1.2 TB",
      "Bandwidth: 30 TB",
      "Bandwidth Cost: $0.06/GB",
      "Storage Cost: $0.6/GB",
    ],
    cta: "Purchase",
  },
  {
    name: "Premium",
    price: "$4,000",
    period: "/year",
    description: "Best for growing teams",
    features: [
      "Max storage: 2,00 TB",
      "Bandwidth: 50,00 TB",
      "Bandwidth Cost: $0.06/GB",
      "Storage Cost: $0.6/GB",
    ],
    cta: "Purchase",
  },
  {
    name: "Supreme",
    price: "$20,800",
    period: "/year",
    description: "Best for growing teams",
    features: [
      "Storage: 20 TB",
      "Bandwidth: 500,00 TB",
      "Bandwidth Cost: $0.06/GB",
      "Storage Cost: $0.6/GB",
    ],
    cta: "Purchase",
  },
  {
    name: "Custom",
    price: "Contact Us",
    period: "",
    description: "Custom solutions for enterprises",
    features: [
      "All Pro Features",
      "Dedicated Manager",
      "Custom Integrations",
      "Upload API, Multi-user access",
    ],
    cta: "Contact Sales",
  },
];

const Pricing = () => {
  // Extract data for table columns
  const extractFeatureValue = (features, keyword) => {
    const feature = features.find(f => 
      f.toLowerCase().includes(keyword.toLowerCase()) && 
      (keyword !== 'bandwidth' || !f.toLowerCase().includes('cost'))
    );
    if (!feature) return 'N/A';
    
    const parts = feature.split(':');
    return parts.length > 1 ? parts[1].trim() : feature;
  };

  return (
    <GSAPWrapper>
      <SeoMeta title="Pricing" />
      <section className="section bg-body">
        <div className="container-xl">
          {/* Header */}
          <div className="animate text-center mb-16">
            <p className="uppercase text-light mb-4 tracking-wider text-sm font-medium">PRICING PLANS</p>
            <h1 className="h2 text-dark mb-6">Choose Your Perfect Plan</h1>
            <p className="text-text max-w-2xl mx-auto leading-relaxed">
              Simple, transparent pricing that grows with you. Try any plan free for 30 days.
            </p>
          </div>

          {/* Desktop Table */}
          <div className="animate from-right hidden lg:block">
            <div className="bg-white rounded-2xl shadow-[0px_4px_25px_rgba(0,0,0,.08)] overflow-hidden border border-border">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-primary border-b border-border">
                      <th className="text-left py-6 px-8 text-white font-semibold text-base">
                        Plan
                      </th>
                      <th className="text-center py-6 px-6 text-white font-semibold text-base">
                        Price
                      </th>
                      <th className="text-center py-6 px-4 text-white font-semibold text-base">
                        Storage
                      </th>
                      <th className="text-center py-6 px-4 text-white font-semibold text-base">
                        Bandwidth
                      </th>
                      <th className="text-center py-6 px-4 text-white font-semibold text-base">
                        Bandwidth Cost
                      </th>
                      <th className="text-center py-6 px-4 text-white font-semibold text-base">
                        Storage Cost
                      </th>
                      <th className="text-center py-6 px-8 text-white font-semibold text-base">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pricingTiers.map((tier, idx) => {
                      const storage = extractFeatureValue(tier.features, 'storage');
                      const bandwidth = extractFeatureValue(tier.features, 'bandwidth');
                      const bandwidthCost = extractFeatureValue(tier.features, 'bandwidth cost');
                      const storageCost = extractFeatureValue(tier.features, 'storage cost');
                      
                      return (
                        <tr
                          key={tier.name}
                          className="border-b border-border last:border-b-0 transition-all duration-300 hover:bg-theme-light/50"
                        >
                          <td className="py-8 px-8">
                            <div className="flex items-center gap-3">
                              <div>
                                <h3 className="text-lg font-semibold text-dark mb-1">
                                  {tier.name}
                                </h3>
                                <p className="text-sm text-text leading-relaxed">
                                  {tier.description}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="py-8 px-6 text-center">
                            <div className="flex flex-col items-center">
                              {tier.price === 'Contact Us' ? (
                                <div className="text-lg font-semibold text-primary">
                                  Contact Us
                                </div>
                              ) : (
                                <>
                                  <div className="text-2xl font-bold text-dark mb-1">
                                    {tier.price}
                                  </div>
                                  <div className="text-sm text-text font-medium">
                                    {tier.period}
                                  </div>
                                </>
                              )}
                            </div>
                          </td>
                          <td className="py-8 px-4 text-center text-text font-medium">
                            {storage}
                          </td>
                          <td className="py-8 px-4 text-center text-text font-medium">
                            {bandwidth}
                          </td>
                          <td className="py-8 px-4 text-center text-text font-medium">
                            {bandwidthCost}
                          </td>
                          <td className="py-8 px-4 text-center text-text font-medium">
                            {storageCost}
                          </td>
                          <td className="py-8 px-8 text-center">
                            <button
                              className="px-6 py-3 rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/20 flex items-center gap-2 mx-auto bg-primary text-white hover:bg-primary/90 shadow-lg hover:shadow-xl"
                            >
                              {tier.cta}
                              {tier.cta !== 'Contact Sales' && (
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 5l7 7-7 7"
                                  />
                                </svg>
                              )}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="animate lg:hidden space-y-6">
            {pricingTiers.map((tier, idx) => (
              <div
                key={tier.name}
                className="bg-white rounded-2xl shadow-[0px_4px_25px_rgba(0,0,0,.08)] p-8 border border-border transition-all duration-300 hover:shadow-[0px_8px_35px_rgba(0,0,0,.12)] hover:border-primary/30"
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-dark mb-2">
                      {tier.name}
                    </h3>
                    <p className="text-sm text-text">{tier.description}</p>
                  </div>
                  <div className="text-right">
                    {tier.price === 'Contact Us' ? (
                      <div className="text-lg font-semibold text-primary">
                        Contact Us
                      </div>
                    ) : (
                      <>
                        <div className="text-2xl font-bold text-dark">
                          {tier.price}
                        </div>
                        <div className="text-sm text-text font-medium mt-1">
                          {tier.period}
                        </div>
                      </>
                    )}
                  </div>
                </div>
                
                {/* Features */}
                <div className="space-y-3 mb-8">
                  {tier.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3 text-text">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                        <svg
                          className="w-3 h-3 text-primary"
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
                      </div>
                      <span className="text-sm leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
                
                {/* CTA Button */}
                <button
                  className="w-full py-4 rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/20 flex items-center justify-center gap-2 bg-primary text-white hover:bg-primary/90 shadow-lg hover:shadow-xl"
                >
                  {tier.cta}
                  {tier.cta !== 'Contact Sales' && (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  )}
                </button>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="animate text-center mt-16">
            <p className="text-text mb-6">
              Need a custom solution? We&#39;re here to help.
            </p>
            <button className="bg-theme-light text-dark px-8 py-3 rounded-lg font-medium hover:bg-primary hover:text-white transition-all duration-300 border border-border hover:border-primary">
              Contact Sales
            </button>
          </div>
        </div>
      </section>
    </GSAPWrapper>
  );
};

export default Pricing;
