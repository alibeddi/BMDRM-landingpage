import { Frame } from "@layouts/components/Frame";
import { ArrowIcon } from "@layouts/components/Icons";
import { OrigamiFigure } from "@layouts/components/origami";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";

// Not found: the scout searches the horizon for the missing page.
const NotFound = ({ data }) => {
  const { frontmatter, content } = data;

  return (
    <Frame innerClassName="py-16 md:py-24">
      <div className="not-found">
        <div className="not-found-scout" aria-hidden="true">
          <OrigamiFigure name="scout" />
        </div>
        <p className="kicker">{frontmatter.title}</p>
        {markdownify(content, "div", "content not-found-text")}
        <Link href="/" className="btn btn-primary">
          Back to home
          <ArrowIcon className="btn-arrow" />
        </Link>
      </div>
    </Frame>
  );
};

export default NotFound;
