import { Frame } from "@layouts/components/Frame";
import { OrigamiFigure } from "@layouts/components/origami";
import SplitWords from "@layouts/components/SplitWords";

// Large statement whose words light up while scrolling, next to the origami
// mounted knight, on his own with no background, riding toward the text.
const Statement = ({ statement }) => {
  return (
    <Frame innerClassName="py-16 md:py-24">
      <div className="statement">
        <div className="statement-content">
          <p className="kicker" data-reveal>
            {statement.kicker}
          </p>
          <p className="statement-text" data-scrub-words>
            <SplitWords text={statement.lead} />{" "}
            <SplitWords
              text={statement.muted}
              className="statement-muted"
              startIndex={statement.lead.split(/\s+/).length}
            />
          </p>
        </div>

        <figure className="statement-media">
          <div data-parallax="-0.08">
            <OrigamiFigure name="rider" flip className="statement-figure" />
          </div>
          {statement.caption && (
            <figcaption className="statement-caption">
              <span>Fig. 01</span>
              <span>{statement.caption}</span>
            </figcaption>
          )}
        </figure>
      </div>
    </Frame>
  );
};

export default Statement;
