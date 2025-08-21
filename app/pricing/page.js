"use client";
import React, { useEffect, useState } from "react";
import SeoMeta from "@layouts/partials/SeoMeta";
import GSAPWrapper from "@layouts/components/GSAPWrapper";


const Pricing = () => {
  const [pricingTiers, setPricingTiers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPricing = async () => {
  try {
    setLoading(true);
    setError(null);

    const response = await fetch("/api/pricing");
    if (!response.ok) {
      throw new Error(`Error fetching pricing: ${response.statusText}`);
    }

    const data = await response.json();
    setPricingTiers(data || []);
  } catch (err) {
    setError(err.message || "Failed to fetch pricing");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchPricing();
  }, []);

const formatStorage = (bytes) => {
  if (!bytes) return "N/A";
  const gb = bytes / (1024 ** 3); // 1 GB = 1024^3 bytes
  return `${gb.toFixed(2)} GB`;
};

const formatBandwidth = (bytes) => {
  if (!bytes) return "N/A";
  const gb = bytes / (1024 ** 3);
  return `${gb.toFixed(2)} GB`;
};



const formatExpiresAfter = (expires) => {
  if (!expires) return "N/A";

  const [daysPart] = expires.split(".");
  const days = parseInt(daysPart, 10);

  if (days >= 365) {
    const years = Math.round(days / 365);
    return `${years} year${years > 1 ? "s" : ""}`;
  } else if (days >= 30) {
    const months = Math.round(days / 30);
    return `${months} month${months > 1 ? "s" : ""}`;
  } else {
    return `${days} day${days > 1 ? "s" : ""}`;
  }
};


  const formatPrice = (amount) => `$${amount}`;
  

  if (loading) return <p className="text-center py-10">Loading pricing plans...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;

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
                      <th className="text-left py-6 px-8 text-white font-semibold text-base">Plan</th>
                      <th className="text-center py-6 px-6 text-white font-semibold text-base">Price</th>
                      <th className="text-center py-6 px-4 text-white font-semibold text-base">Storage</th>
                      <th className="text-center py-6 px-4 text-white font-semibold text-base">Bandwidth</th>
                      <th className="text-center py-6 px-8 text-white font-semibold text-base">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pricingTiers.map((tier) => (
                      <tr
                        key={tier.id}
                        className="border-b border-border last:border-b-0 transition-all duration-300 hover:bg-theme-light/50"
                      >
                        <td className="py-8 px-8">
                          <div className="flex items-center gap-3">
                            <div>
                              <h3 className="text-lg font-semibold text-dark mb-1">{tier.name}</h3>
                             
                            </div>
                          </div>
                        </td>
                        <td className="py-8 px-6 text-center">
                          <div className="flex flex-col items-center">
                            <div className="text-2xl font-bold text-dark mb-1">
                              {formatPrice(tier.amount)}
                            </div>
                            <div className="text-sm text-text font-medium">{formatExpiresAfter(tier.expiresAfter)}</div>
                          </div>
                        </td>
                        <td className="py-8 px-4 text-center text-text font-medium">{formatStorage(tier.storage)}</td>
                        <td className="py-8 px-4 text-center text-text font-medium">{formatBandwidth(tier.bandwidth)}</td>
                        <td className="py-8 px-8 text-center">
                          <button className="px-6 py-3 rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/20 flex items-center gap-2 mx-auto bg-primary text-white hover:bg-primary/90 shadow-lg hover:shadow-xl">
                            Purchase
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="animate lg:hidden space-y-6">
            {pricingTiers.map((tier) => (
              <div
                key={tier.id}
                className="bg-white rounded-2xl shadow-[0px_4px_25px_rgba(0,0,0,.08)] p-8 border border-border transition-all duration-300 hover:shadow-[0px_8px_35px_rgba(0,0,0,.12)] hover:border-primary/30"
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-dark mb-2">{tier.name}</h3>
                    <p className="text-sm text-text">{tier.normalizedName || "Best for your needs"}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-dark">{formatPrice(tier.amount)}</div>
                    <div className="text-sm text-text font-medium mt-1">{tier.expiresAfter}</div>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  <div className="flex items-start gap-3 text-text">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <svg
                        className="w-3 h-3 text-primary"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm leading-relaxed">
                      Storage: {formatStorage(tier.storage)}, Bandwidth: {formatBandwidth(tier.bandwidth)}
                    </span>
                  </div>
                </div>

                <button className="w-full py-4 rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/20 flex items-center justify-center gap-2 bg-primary text-white hover:bg-primary/90 shadow-lg hover:shadow-xl">
                  Purchase
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </GSAPWrapper>
  );
};

export default Pricing;
