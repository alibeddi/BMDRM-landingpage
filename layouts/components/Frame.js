// Blueprint frame: a section bounded by solid outer rules and dashed inner rules.
export const Frame = ({
  as: Tag = "section",
  className = "",
  innerClassName = "",
  children,
  ...props
}) => {
  return (
    <Tag className={`frame ${className}`} {...props}>
      <div className="frame-solid">
        <div className={`frame-dash ${innerClassName}`}>{children}</div>
      </div>
    </Tag>
  );
};

// Band between two framed sections: dashed rules above and below, with
// chamfered corners that draw in on scroll. `flip` mirrors the chamfers, so
// consecutive dividers alternate like on a technical drawing.
export const Divider = ({ flip = false, className = "" }) => {
  return (
    <div
      className={`divider dash-top dash-btm ${flip ? "divider-flip" : ""} ${className}`}
      aria-hidden="true"
    >
      <div className="divider-inner">
        <div className="divider-side">
          <span className="divider-diag">
            <i />
          </span>
          <span className="divider-node" />
        </div>
        <div className="divider-middle dash-sides" />
        <div className="divider-side">
          <span className="divider-diag">
            <i />
          </span>
          <span className="divider-node" />
        </div>
      </div>
    </div>
  );
};

export default Frame;
