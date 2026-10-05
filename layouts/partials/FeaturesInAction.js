import CursorDemo from "@layouts/components/CursorDemo";
import { Divider, Frame } from "@layouts/components/Frame";
import { ArrowIcon } from "@layouts/components/Icons";
import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

// Dashboard screenshots presented as alternating text/image blocks, each
// walked through by an animated cursor (CursorDemo).
const FeaturesInAction = ({ data }) => {
  return (
    <>
      <Divider />
      <Frame innerClassName="pt-16 md:pt-24 pb-4 md:pb-8">
        <div className="mx-auto max-w-[40rem] text-center" data-reveal-stagger>
          <p className="kicker">{data.kicker}</p>
          {markdownify(data.title, "h2", "mt-5")}
          {markdownify(
            data.description,
            "p",
            "mx-auto mt-5 max-w-[28rem] text-ink/60",
          )}
        </div>
      </Frame>

      {data.list.map((item, index) => (
        <Fragment key={item.name}>
          <Divider flip={index % 2 === 0} />
          <Frame innerClassName="py-14 md:py-20">
            <div className={`platform ${index % 2 ? "platform-reverse" : ""}`}>
              <div className="platform-content" data-reveal-stagger>
                <p className="kicker">
                  <span className="platform-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item.name}
                </p>
                <h2 className="platform-title">{item.title}</h2>
                <p className="max-w-[22rem] text-ink/60">{item.description}</p>
              </div>
              <div className="platform-media" data-reveal="clip">
                <div className="media-frame" data-parallax="-0.08">
                  <div className="media-frame-inner">
                    <Image
                      src={item.image}
                      alt={`${item.name} screenshot`}
                      width={1504}
                      height={857}
                      sizes="(min-width: 992px) 38rem, 100vw"
                      className="platform-image"
                    />
                    <CursorDemo image={item.image} />
                  </div>
                </div>
              </div>
            </div>
          </Frame>
        </Fragment>
      ))}

      {/* call to action sitting on a dashed band */}
      <Divider />
      <div className="band dash-btm">
        <div className="frame">
          <div className="frame-solid">
            <div className="frame-dash flex justify-center">
              <Link href={data.button.link} className="btn btn-primary">
                {data.button.label}
                <ArrowIcon className="btn-arrow" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Frame as="div" innerClassName="h-16 md:h-24" aria-hidden="true" />
    </>
  );
};

export default FeaturesInAction;
