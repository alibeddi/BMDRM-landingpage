"use client";
import config from "@config/config.json";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
import Circle from "./Circle";
import ImageFallback from "./ImageFallback";

const Cta = () => {
  const { title, content, button, enable } = config.call_to_action;
  const handleChatboxClick = () => {
    const chatboxElement = document.querySelector(".chatbox-logo");
    if (chatboxElement) {
      chatboxElement.click();
    } else {
      console.warn("Chatbox element not found.");
    }
  };
  if (!enable) return;

  return (
    <section className="cta section pt-0">
      <div className="container-xl">
        <div className="section relative px-4 text-center">
          <div className="animate">
            {markdownify("GET BMDRM NOW", "h2", "section-title")}
            {markdownify(
              "Our secure video hosting platform ensures your content is protected with advanced encryption and seamless",
              "p",
              "mt-10",
            )}
            <div
              onClick={handleChatboxClick}
              className="btn cursor-pointer btn-primary mt-10"
            >
              Contact us now
            </div>
          </div>
          <div className="bg-theme animated-bg absolute top-0 left-0 w-full after:hidden">
            <ImageFallback
              src="/images/wave.svg"
              fill={true}
              sizes="100vw"
              alt="bg wave"
            />
            <Circle
              className="left-[10%] top-12"
              width={32}
              height={32}
              fill={false}
            />
            <Circle className="left-[3%] bottom-[13%]" width={85} height={85} />
            <Circle
              className="left-[15%] bottom-[35%]"
              width={47}
              height={47}
              fill={false}
            />

            <Circle className="right-[12%] top-[12%]" width={20} height={20} />
            <Circle
              className="right-[2%] bottom-[30%]"
              width={73}
              height={73}
              fill={false}
            />
            <Circle
              className="right-[19%] bottom-[16%]"
              width={37}
              height={37}
              fill={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;
