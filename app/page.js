import Cta from "@layouts/components/Cta";
import GSAPWrapper from "@layouts/components/GSAPWrapper";
import Features from "@layouts/partials/Features";
import SeoMeta from "@layouts/partials/SeoMeta";
import ShortIntro from "@layouts/partials/ShortIntro";
import { getListPage } from "@lib/contentParser";
import Clients from "../layouts/components/Clients";
import FeaturesInAction from "@layouts/partials/FeaturesInAction";
const Home = async () => {
  const homepage = await getListPage("content/_index.md");
  const { frontmatter } = homepage;
  const { features, intro } = frontmatter;

  // Example screenshots data (replace with your actual images and descriptions)
  const featuresInActionItems = [
    {
      image: "/images/screenshots/feature1.png",
      description: "Upload and manage your videos securely.",
    },
    {
      image: "/images/screenshots/feature2.png",
      description: "Advanced analytics dashboard for your content.",
    },
    {
      image: "/images/screenshots/feature3.png",
      description: "Seamless video playback with DRM protection.",
    },
  ];

  return (
    <GSAPWrapper>
      <SeoMeta title="Home" />
      <ShortIntro intro={intro} />
      <FeaturesInAction items={featuresInActionItems} />
      <div className="w-full overflow-hidden md:w-auto md:overflow-visible">
        <Clients />
        <Features features={features} />
        <Cta />
      </div>
    </GSAPWrapper>
  );
};

export default Home;
