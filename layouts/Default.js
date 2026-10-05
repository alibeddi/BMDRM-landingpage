import MDXContent from "app/helper/MDXContent";
import Banner from "./components/Banner";
import { Divider, Frame } from "./components/Frame";

const Default = ({ data }) => {
  const { frontmatter, content } = data;
  const { title } = frontmatter;

  return (
    <section>
      <Banner title={title} />
      <Frame as="div" innerClassName="py-12 md:py-16">
        <div className="content mx-auto max-w-[48rem]">
          <MDXContent content={content} />
        </div>
      </Frame>
      <Divider flip />
    </section>
  );
};

export default Default;
