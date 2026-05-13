import config from "@config/config.json";
import menu from "@config/menu.json";
import Logo from "@layouts/components/Logo";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";

const Footer = () => {
  const { copyright, footer_content } = config.params;
  const { email, phone, location } = config.contact_info;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="">
      <div className="container">
        {/* <div className="row border-y border-border py-12">
          <div className="animate md:col-6 lg:col-4">
            <Logo />
            {markdownify(footer_content, "p", "mt-3")}
          </div>

          <div className="animate mt-8 md:col-6 lg:col-2 lg:mt-0">
            <h3 className="h5">Company</h3>
            <ul className="mt-5 leading-10">
              {menu.footer.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.url}
                    className="hover:text-primary hover:underline"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="animate mt-8 md:col-6 lg:col-3 lg:mt-0">
            <h3 className="h5">Legal</h3>
            <ul className="mt-5 leading-10">
              {menu.legal?.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.url}
                    className="hover:text-primary hover:underline"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="animate mt-8 md:col-6 lg:col-3 lg:mt-0">
            <h3 className="h5">Location & Contact</h3>
            <ul className="mt-5 leading-10">
              {location && <li>{markdownify(location)}</li>}
              {phone && (
                <li>
                  <Link href={`tel:${phone}`}>{phone}</Link>
                </li>
              )}
              {email && (
                <li>
                  <Link href={`mailto:${email}`}>{email}</Link>
                </li>
              )}
            </ul>
          </div>
        </div> */}

        {/* bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 py-6 text-center md:flex-row md:text-left">
          <div className="footer-copy-write text-sm">
            {markdownify(
              copyright?.replace(/©\s*\d{4}/, `© ${currentYear}`) ||
              `© ${currentYear}, Powered by BM DRM`,
              "span",
            )}
          </div>
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
            {menu.legal?.map((item) => (
              <li key={`bottom-${item.name}`}>
                <Link
                  href={item.url}
                  className="text-text hover:text-primary hover:underline"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
