"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const features = [
  {
    name: "Home Dashboard",
    icon: "/images/icons/dashboard.svg",
    description: "Monitor your video library and viewer activity.",
    image: "/images/screenshots/dashboard.png",
  },
  {
    name: "Notifications",
    icon: "/images/icons/notifications.svg",
    description: "Stay updated with important notifications.",
    image: "/images/screenshots/notifications.png",
  },
  {
    name: "Analytics RealTime",
    icon: "/images/icons/realtime.svg",
    description: "Get real-time insights into your video performance.",
    image: "/images/screenshots/realtime.png",
  },
  {
    name: "Analytics Bandwidths",
    icon: "/images/icons/bandwidths.svg",
    description: "Analyze your video's bandwidth usage.",
    image: "/images/screenshots/bandwidths.png",
  },
  {
    name: "Videos Dashboard",
    icon: "/images/icons/videos.svg",
    description: "Manage your videos and their stats.",
    image: "/images/screenshots/videos.png",
  },
  {
    name: "Plans",
    icon: "/images/icons/plans.svg",
    description: "Choose the plan that suits your needs.",
    image: "/images/screenshots/plans.png",
  },
];

const FeaturesInAction = () => {
  const [selected, setSelected] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [prevSelected, setPrevSelected] = useState(0);
  const intervalRef = useRef(null);
  const tabsContainerRef = useRef(null);
  const tabRefs = useRef([]);
  
  // Auto-slide functionality
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIsAnimating(true);
      setPrevSelected(selected);
      setTimeout(() => {
        setSelected((prev) => (prev + 1) % features.length);
        setIsAnimating(false);
      }, 500);
    }, 500000);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  
  const handleFeatureClick = (idx) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    setPrevSelected(selected);
    setIsAnimating(true);
    setTimeout(() => {
      setSelected(idx);
      setIsAnimating(false);
      
      // Restart auto-slide
      intervalRef.current = setInterval(() => {
        setIsAnimating(true);
        setPrevSelected(selected);
        setTimeout(() => {
          setSelected((prev) => (prev + 1) % features.length);
          setIsAnimating(false);
        }, 500);
      }, 5000);
    }, 300);
  };

  return (
    <section className="section pt-0">
      <div className="container-xl">
        <div className="relative px-4 py-[70px] bg-transparent1 rounded-md">
          <div className="flex flex-col items-center">
 
            <div className="w-full mb-8 bg-transparent p-4">
              <div className="relative flex flex-wrap justify-center gap-3 mb-4 " ref={tabsContainerRef}>
                {features.map((feature, idx) => (
                  <button
                    key={feature.name}
                    ref={(el) => (tabRefs.current[idx] = el)}
                    onClick={() => handleFeatureClick(idx)}
                    className={`flex items-center px-4 opacity-70 py-2 rounded-lg shadow-md ${
                      selected === idx
                        ? "!opacity-100 bg-white/90 !text-gray-700 relative"
                        : "bg-gray-100 !text-gray-500 hover:bg-white/90"
                    }`}
                    style={{
                      transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                      borderWidth: selected === idx ? "2px" : "0px",
                      borderStyle: "solid",
                      borderColor: "#9E72FF",
                      transform: selected === idx ? "scale(1.05)" : "scale(1)",
                    }}
                  >
                    <span className="mr-2">
                      <Image src={feature.icon} alt="" width={20} height={20} />
                    </span>
                    <span className="font-medium">{feature.name}</span>
                  </button>
                ))}
              </div>
              
              {/* Selected feature description */}
             
            </div>
        
            {/* Feature screenshot */}
            <div className="w-full mb-8">
              <div className="rounded-2xl overflow-hidden bg-transparent relative mx-auto max-w-5xl">
                <div 
                  className={`transition-all duration-500 ease-in-out shadow-2xl  ${
                    isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
                  }`}
                >
                  {/* Replace custom UI with image */}
                  <Image
                    src={features[selected].image}
                    alt={features[selected].name}
                    width={900}
                    height={480}
                    className="object-cover w-full rounded-2xl"
                    priority
                  />
                </div>
              </div>
            </div>
        
          </div>
          <div 
              className="text-center mb-8 max-w-2xl mx-auto  backdrop-blur-sm rounded-xl p-5 shadow-sm"
              style={{
                transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                transform: isAnimating ? "translateY(10px) scale(0.98)" : "translateY(0) scale(1)",
                opacity: isAnimating ? 0.7 : 1
              }}
            >
              <p className="text-gray-700 font-medium text-lg leading-relaxed">{features[selected].description}</p>
            </div>
          {/* Background decorative elements */}
          <div className="absolute -z-10 top-10 right-10 w-40 h-40 bg-indigo-100 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -z-10 bottom-10 left-10 w-60 h-60 bg-purple-100 rounded-full opacity-20 blur-3xl"></div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesInAction;