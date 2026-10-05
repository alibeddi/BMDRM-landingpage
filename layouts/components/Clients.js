import { ArrowIcon } from "@layouts/components/Icons";
import { markdownify } from "@lib/utils/textConverter";
import fs from "fs";
import Image from "next/image";
import Link from "next/link";
import path from "path";

// intrinsic size of a logo in /public, read from its SVG viewBox, so squarish
// marks can be drawn taller than wide wordmarks and still look the same size
const logoSize = (src) => {
  try {
    const svg = fs.readFileSync(
      path.join(process.cwd(), "public", src),
      "utf8",
    );
    const [, , w, h] = svg
      .match(/viewBox="([^"]+)"/)[1]
      .split(/[\s,]+/)
      .map(Number);
    return { width: Math.round(w), height: Math.round(h) };
  } catch {
    return { width: 190, height: 63 };
  }
};

// Client logos, in their own colours, on a card over the striped band.
const Clients = ({ clients }) => {
  return (
    <section className="clients pattern-stripes">
      <div className="clients-card" data-reveal>
        <div className="clients-head">
          <div className="clients-heading" data-reveal-stagger>
            <p className="kicker">{clients.kicker}</p>
            {markdownify(clients.title, "h2")}
            {markdownify(clients.description, "p", "text-ink/60")}
          </div>
          {clients.button && (
            <Link href={clients.button.link} className="btn btn-primary">
              {clients.button.label}
              <ArrowIcon className="btn-arrow" />
            </Link>
          )}
        </div>

        <ul className="clients-grid" data-reveal-stagger>
          {clients.list.map((client) => {
            const { width, height } = logoSize(client.logo);
            return (
              <li key={client.name} className="clients-cell">
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={width}
                  height={height}
                  className={`clients-logo ${width / height < 2 ? "is-square" : ""}`}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Clients;
