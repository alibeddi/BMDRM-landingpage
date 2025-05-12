"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, EffectCreative } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-creative";

const features = [
  {
    name: "Home Dashboard",
    icon: "/images/icons/dashboard.svg",
    description: "Monitor your video library and viewer activity.",
    image: "/images/screenshots/dashboard.png",
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
];

const FeaturesInAction = () => {
  const [selected, setSelected] = useState(0);
  const [slideDirection, setSlideDirection] = useState('next');
  const [swiperInitialized, setSwiperInitialized] = useState(false);
  const swiperRef = useRef(null);
  const intervalRef = useRef(null);
  const tabsContainerRef = useRef(null);
  const tabRefs = useRef([]);
  
  // Auto-slide functionality
  useEffect(() => {
    if (!swiperInitialized) return;
    
    intervalRef.current = setInterval(() => {
      if (swiperRef.current && swiperRef.current.swiper) {
        setSlideDirection('next');
        swiperRef.current.swiper.slideNext();
      }
    }, 5000);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [swiperInitialized]);
  
  const handleFeatureClick = (idx) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    if (swiperRef.current && swiperRef.current.swiper) {
      // Determine slide direction based on index comparison
      if (idx > selected) {
        setSlideDirection('next');
      } else if (idx < selected) {
        setSlideDirection('prev');
      }
      
      // Directly navigate to the selected slide
      swiperRef.current.swiper.slideTo(idx);
    }
    
    // Restart auto-slide
    intervalRef.current = setInterval(() => {
      if (swiperRef.current && swiperRef.current.swiper) {
        setSlideDirection('next');
        swiperRef.current.swiper.slideNext();
      }
    }, 5000);
  };

  const handleSlideChange = (swiper) => {
    setSelected(swiper.activeIndex);
  };
  
  const handleSwiperInit = () => {
    setSwiperInitialized(true);
  };

  return (
    <section className="section pt-0">
      <div className="container-xl">
        <div className="relative px-4 py-[70px] bg-transparent1 rounded-md">
          <div className="flex flex-col items-center">
 
            <div className="w-full mb-8 bg-transparent p-4">
              <div className="relative flex flex-wrap justify-center gap-3 mb-4" ref={tabsContainerRef}>
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
            </div>
        
            {/* Feature screenshot with Swiper */}
            <div className="w-full mb-8 overflow-hidden">
              <div className="swiper-container-wrapper">
                <Swiper
                  ref={swiperRef}
                  modules={[Pagination, Navigation, EffectCreative]}
                  effect="slide" // Changed from creative to standard slide
                  speed={800}
                  slidesPerView={1}
                  spaceBetween={20}
                  initialSlide={selected}
                  onSlideChange={handleSlideChange}
                  onInit={handleSwiperInit}
                  className="rounded-2xl overflow-hidden bg-transparent relative mx-auto max-w-5xl"
                >
                  {features.map((feature, idx) => (
                    <SwiperSlide key={feature.name} className="px-4 overflow-hidden">
                      <div className="bg-gray-100/70 rounded-2xl overflow-hidden">
                        {/* Image */}
                        <div className="w-full">
                          <Image
                            src={feature.image}
                            alt={feature.name}
                            width={900}
                            height={480}
                            className="object-cover w-full rounded-t-2xl"
                            priority={idx === selected}
                          />
                        </div>
                        
                        {/* Description */}
                        <div className="p-6 text-center">
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.name}</h3>
                          <p className="text-gray-700 font-medium text-lg leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
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