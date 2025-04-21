import Circle from "@layouts/components/Circle";
import VideoPopupServer from "@layouts/components/VideoPopupServer";
import { markdownify } from "@lib/utils/textConverter";

const ShortIntroServer = () => {
  return (
    <section className="section pt-0">
      <div className="container-xl">
        <div
          style={{
            zIndex: "9 !important",
          }}
          className="relative px-4 py-[70px] bg-[#F5F5F5] z-[-99] rounded-md"
        >
          <div className="text-center">
            <div className="animate">
              <p>View Demo</p>
              {markdownify(
                "Video Hosting with BMDRM",
                "h2",
                "mt-4 section-title",
              )}
              {markdownify(
                "Our secure video hosting platform ensures your content is protected with advanced encryption and seamless streaming",
                "p",
                "mt-10",
              )}
            </div>
            <div className="mx-auto mt-10 h-full max-h-[394px] w-full max-w-[716px]">
              <VideoPopupServer />
            </div>
          </div>
          <div className="bg-theme absolute left-0 top-0 w-full">
            <Circle
              className="hidden md:block left-[10%] top-12"
              width={32}
              height={32}
              fill={false}
            />
            <Circle
              className=" hidden md:block left-[3%] top-[30%]"
              width={85}
              height={85}
            />
            <Circle
              className="hidden md:block bottom-[52%] left-[22%]"
              width={20}
              height={20}
            />
            <Circle
              className="hidden md:block bottom-[35%] left-[15%]"
              width={47}
              height={47}
              fill={false}
            />
            <Circle
              className="hidden md:block bottom-[6%] left-[6%]"
              width={62}
              height={62}
              fill={false}
            />
            <Circle
              className=" hidden md:block right-[12%] top-[12%]"
              width={20}
              height={20}
            />
            <Circle
              className="right-[2%] top-[30%]"
              width={73}
              height={73}
              fill={false}
            />
            <Circle
              className="hidden md:block right-[19%] top-[50%]"
              width={37}
              height={37}
              fill={false}
            />
            <Circle
              className="hidden md:block right-[33%] top-[52%]"
              width={20}
              height={20}
            />
            <Circle
              className="bottom-[18%] right-[5%]"
              width={65}
              height={65}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShortIntroServer;
