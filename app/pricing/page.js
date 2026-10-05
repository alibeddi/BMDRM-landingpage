import Cta from "@layouts/components/Cta";
import { Divider } from "@layouts/components/Frame";
import GSAPWrapper from "@layouts/components/GSAPWrapper";
import PricingHero from "@layouts/partials/PricingHero";
import PricingPlans from "@layouts/partials/PricingPlans";
import SeoMeta from "@layouts/partials/SeoMeta";
import { getListPage } from "@lib/contentParser";
import { fetchPublicPacks } from "@lib/pricing";

// re-render at most every 5 minutes with fresh packs
export const revalidate = 300;

const Pricing = async () => {
  const { frontmatter } = await getListPage("content/pricing/_index.md");
  const { title, description, hero, plans, cta } = frontmatter;

  // rendered on the server so prices are in the HTML; if the API is down the
  // plans section fetches them from the browser instead
  const packs = await fetchPublicPacks().catch((error) => {
    console.error("Pricing fetch error:", error);
    return null;
  });

  return (
    <GSAPWrapper>
      <SeoMeta title={title} description={description} />
      <PricingHero hero={hero} packs={packs} />
      <Divider />
      <PricingPlans data={plans} initialPacks={packs} />
      <Cta data={cta} />
    </GSAPWrapper>
  );
};

export default Pricing;
