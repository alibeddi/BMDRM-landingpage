"use client";
import { markdownify } from "@lib/utils/textConverter";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import ImageFallback from "./ImageFallback";

const CLIENTS = [
  "/images/clients/ostedhy.svg",
  "/images/clients/softylines.svg",
  "/images/clients/taki.svg",
  "/images/clients/webschool.svg",
];
const Clients = () => {
  return (
    <div className="section  container">
      <div className="animate text-center">
        <p>Our clients</p>
        {markdownify("Trusted by", "h2", "section-title mt-4")}
      </div>
      <div className="animate from-right  bg-white col-12 mt-16">
        <Swiper
          loop={true}
          slidesPerView={3}
          breakpoints={{
            992: {
              slidesPerView: 5,
            },
          }}
          spaceBetween={20}
          autoPlay={{ delay: 3000 }}
        >
          {CLIENTS.map((brand, index) => (
            <SwiperSlide
              className=" h-[max-content] cursor-pointer px-6 py-6 grayscale  transition hover:grayscale-0 lg:px-10"
              key={"brand-" + index}
              autoPlay
            >
              <div className="relative h-[70px] w-[100px]">
                <ImageFallback
                  className="object-contain"
                  src={brand}
                  sizes="100vw"
                  alt=""
                  fill={true}
                  priority={true}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Clients;
