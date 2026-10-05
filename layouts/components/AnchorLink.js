"use client";

// In-page link that scrolls smoothly (instantly with reduced motion) and
// still works as a plain anchor without JS.
const AnchorLink = ({ href, className, children }) => {
  const handleClick = (event) => {
    const target = document.querySelector(href);
    if (!target) return;
    event.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    history.replaceState(null, "", href);
  };

  return (
    <a href={href} className={className} onClick={handleClick}>
      {children}
    </a>
  );
};

export default AnchorLink;
