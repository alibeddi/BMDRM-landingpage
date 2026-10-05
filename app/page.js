import Clients from "@layouts/components/Clients";
import Cta from "@layouts/components/Cta";
import { Divider } from "@layouts/components/Frame";
import GSAPWrapper from "@layouts/components/GSAPWrapper";
import Features from "@layouts/partials/Features";
import FeaturesInAction from "@layouts/partials/FeaturesInAction";
import HomeHero from "@layouts/partials/HomeHero";
import SeoMeta from "@layouts/partials/SeoMeta";
import ShortIntro from "@layouts/partials/ShortIntro";
import Statement from "@layouts/partials/Statement";
import { getListPage } from "@lib/contentParser";

const Home = async () => {
  const homepage = await getListPage("content/_index.md");
  const { frontmatter } = homepage;
  const { hero, intro, statement, features_in_action, clients, features } =
    frontmatter;

  return (
    <GSAPWrapper>
      <SeoMeta title="Home" />
      <HomeHero hero={hero} />
      <Divider />
      <ShortIntro intro={intro} />
      <Divider flip />
      <Statement statement={statement} />
      <FeaturesInAction data={features_in_action} />
      <Clients clients={clients} />
      <Features features={features} />
      <Cta />
    </GSAPWrapper>
  );
};

export default Home;
