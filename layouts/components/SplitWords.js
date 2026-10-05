import { Fragment } from "react";

const EMPHASIS = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;

// Renders text as one span per word so words can be animated individually.
// Supports **bold** and *italic* markers, like the rest of the content.
// `--i` holds the running word index for staggered CSS animations.
const SplitWords = ({
  text,
  as: Tag = "span",
  className = "",
  wordClassName = "",
  startIndex = 0,
}) => {
  if (!text) return null;
  let index = startIndex;

  const renderWords = (value) =>
    value.split(/(\s+)/).map((word, i) => {
      if (!word) return null;
      if (/^\s+$/.test(word)) return " ";
      return (
        <span
          key={i}
          className={`split-word ${wordClassName}`}
          style={{ "--i": index++ }}
        >
          <span>{word}</span>
        </span>
      );
    });

  return (
    <Tag className={className}>
      {text
        .split(EMPHASIS)
        .filter(Boolean)
        .map((part, i) => {
          if (part.startsWith("**")) {
            return <strong key={i}>{renderWords(part.slice(2, -2))}</strong>;
          }
          if (part.startsWith("*")) {
            return <em key={i}>{renderWords(part.slice(1, -1))}</em>;
          }
          return <Fragment key={i}>{renderWords(part)}</Fragment>;
        })}
    </Tag>
  );
};

export default SplitWords;
