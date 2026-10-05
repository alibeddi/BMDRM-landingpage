import config from "@config/config.json";
import menu from "@config/menu.json";
import ChatButton from "@layouts/components/ChatButton";
import { LogoMark } from "@layouts/components/Logo";
import FooterScene from "@layouts/components/scenes/FooterScene";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";

const Footer = () => {
  const { copyright } = config.params;
  const { nav_button } = config;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer pattern-spots">
      <div className="footer-inner">
        <Link href="/" className="footer-brand" aria-label={config.site.title}>
          <LogoMark className="h-full w-auto" />
        </Link>

        <nav className="footer-card" aria-label="Footer">
          <div className="footer-cols">
            {menu.footer.map((column) => (
              <div key={column.title}>
                <p className="footer-title">{column.title}</p>
                <ul className="footer-links">
                  {column.links.map((item) => (
                    <li key={item.url}>
                      <Link href={item.url} className="footer-link">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                  {column.chat && nav_button.enable && (
                    <li>
                      <ChatButton className="footer-link">
                        {nav_button.label}
                      </ChatButton>
                    </li>
                  )}
                </ul>
              </div>
            ))}

            <div>
              <p className="footer-title">Legal</p>
              <ul className="footer-links">
                {menu.legal?.map((item) => (
                  <li key={item.url}>
                    <Link href={item.url} className="footer-link">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="footer-bottom footer-copy-write">
            {markdownify(
              copyright?.replace(/©\s*\d{4}/, `© ${currentYear}`) ||
                `© ${currentYear}, Powered by BM DRM`,
              "p",
            )}
          </div>
        </nav>
      </div>

      {/* the kingdom at rest, its paper ground running into the wordmark */}
      <FooterScene />

      <div className="footer-wordmark" aria-hidden="true">
        <span data-parallax="-0.3">BMDRM</span>
      </div>
    </footer>
  );
};

export default Footer;
