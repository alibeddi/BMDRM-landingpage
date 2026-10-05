import {
  FeaturesArcs,
  FeaturesTimeline,
  FeaturesTimelineMobile,
} from "@layouts/components/FeaturesArt";
import { OrigamiFigure } from "@layouts/components/origami";
import FortressScene from "@layouts/components/scenes/FortressScene";
import { markdownify } from "@lib/utils/textConverter";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";

// Dark section listing the key features: the fortress by night opens it,
// the timeline landscape closes it.
const Features = ({ features }) => {
  return (
    <section className="features-dark">
      <FeaturesArcs />
      <FortressScene />

      <div className="features-dark-inner">
        <div className="features-dark-heading" data-reveal-stagger>
          <p className="kicker">{features.sub_title}</p>
          {markdownify(features.title, "h2", "features-dark-title")}
          {markdownify(features.description, "p", "features-dark-lead")}
        </div>

        <ul className="features-dark-grid" data-reveal-stagger>
          {features.list.map((item, index) => (
            <li key={"feature-" + index} className="feature-item">
              <span className="feature-item-icon">
                <FeatherIcon icon={item.icon} size={18} strokeWidth={1.6} />
              </span>
              <h3 className="feature-item-title">{item.title}</h3>
              <p className="feature-item-text">{item.content}</p>
            </li>
          ))}
        </ul>
      </div>

      <FeaturesTimeline />
      <FeaturesTimelineMobile />
      {/* a sentinel watching over the stream, standing on the right-hand hill */}
      <div className="features-sentinel">
        <OrigamiFigure name="knight" />
      </div>
    </section>
  );
};

export default Features;
