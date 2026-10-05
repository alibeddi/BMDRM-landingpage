import config from "@config/config.json";
import Link from "next/link";
import { LogoMark } from "./LogoMark";

export { LogoMark };

const Logo = ({ className = "" }) => {
  const { title } = config.site;

  return (
    <Link href="/" className={`navbar-brand ${className}`}>
      <LogoMark className="h-full w-auto" title={title} />
    </Link>
  );
};

export default Logo;
