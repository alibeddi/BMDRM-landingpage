import Cta from "@layouts/components/Cta";
import GSAPWrapper from "@layouts/components/GSAPWrapper";
import Features from "@layouts/partials/Features";
import SeoMeta from "@layouts/partials/SeoMeta";
import ShortIntro from "@layouts/partials/ShortIntro";
import { getListPage } from "@lib/contentParser";
import Clients from "../layouts/components/Clients";
const Home = async () => {
  const homepage = await getListPage("content/_index.md");
  const { frontmatter } = homepage;
  const { features, intro } = frontmatter;
  return (
    <GSAPWrapper>
      <SeoMeta title="Home" />

      <ShortIntro intro={intro} />
      <div className="w-full overflow-hidden md:w-auto md:overflow-visible">     
        <Clients />
       <Features features={features} />
      <Cta /> 
      </div>   
  / </GSAPWrapper>
  );
};

export default Home;
