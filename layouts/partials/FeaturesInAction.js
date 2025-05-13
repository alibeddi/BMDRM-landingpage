"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
  const [swiperInitialized, setSwiperInitialized] = useState(false);
  const swiperRef = useRef(null);
  const intervalRef = useRef(null);
  const paginationRef = useRef(null);
  
  // Auto-slide functionality
  useEffect(() => {
    if (!swiperInitialized) return;
    
    intervalRef.current = setInterval(() => {
      if (swiperRef.current && swiperRef.current.swiper) {
        swiperRef.current.swiper.slideNext();
      }
    }, 5000);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [swiperInitialized]);

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
            
            {/* Title replacing buttons */}
            <div className="w-full mb-10 text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Features in Action</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Explore our platform's powerful features through these interactive examples</p>
            </div>
        
            {/* Feature screenshot with Swiper */}
            <div className="w-full mb-8 overflow-hidden">
              <div className="swiper-container-wrapper">
                <Swiper
                  ref={swiperRef}
                  modules={[Navigation, Pagination]}
                  effect="slide"
                  speed={800}
                  slidesPerView={1}
                  spaceBetween={20}
                  loop={true}
                  initialSlide={selected}
                  onSlideChange={handleSlideChange}
                  onInit={handleSwiperInit}
                  pagination={{
                    el: paginationRef.current,
                    type: "bullets",
                    clickable: true,
                    dynamicBullets: true,
                  }}
                  onBeforeInit={(swiper) => {
                    swiper.params.pagination.el = paginationRef.current;
                  }}
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
                        
                        {/* Description with smaller font */}
                        <div className="p-6 text-center">
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.name}</h3>
                          <p className="text-gray-700 text-sm leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                
                {/* Pagination dots */}
                <div className="mt-16 flex justify-center pl-12">
                  <div className="pagination pl-8" ref={paginationRef}></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Background decorative elements */}
          <div className="absolute -z-10 top-10 right-10 w-40 h-40 bg-indigo-100 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -z-10 bottom-10 left-10 w-60 h-60 bg-purple-100 rounded-full opacity-20 blur-3xl"></div>
        </div>
      </div>
      <style jsx global>{`
        .swiper-container-wrapper {
          position: relative;
          overflow: hidden;
          width: 100%;
          border-radius: 1rem;
        }
        .swiper-slide {
          box-sizing: border-box;
          overflow: hidden;
        }
        .swiper-wrapper {
          will-change: transform;
        }
      `}</style>
    </section>
  );
};

export default FeaturesInAction;