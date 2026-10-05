import { Divider, Frame } from "@layouts/components/Frame";
import BannerScene from "@layouts/components/scenes/BannerScene";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";

// Page header for regular pages: breadcrumb kicker and title in a blueprint
// frame, over an origami landscape (`scene`: "hills", "kingdom", or null).
const Banner = ({ title, scene = "hills" }) => {
  return (
    <div className="page-banner">
      <Frame
        as="div"
        innerClassName={`pt-16 text-center md:pt-24 ${scene ? "" : "pb-16 md:pb-24"}`}
      >
        <nav aria-label="Breadcrumb" className="rise" style={{ "--i": 0 }}>
          <ol className="kicker flex items-center justify-center gap-2">
            <li>
              <Link href="/" className="transition-opacity hover:opacity-60">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-ink/60" aria-current="page">
              {title}
            </li>
          </ol>
        </nav>
        <div className="rise mx-auto mt-6 max-w-[48rem]" style={{ "--i": 1 }}>
          {markdownify(title, "h1")}
        </div>
        {scene && (
          <div className="banner-land" aria-hidden="true">
            <BannerScene variant={scene} />
          </div>
        )}
      </Frame>
      <Divider />
    </div>
  );
};

export default Banner;
