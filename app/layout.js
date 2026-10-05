import config from "@config/config.json";
import ChatWidget from "@layouts/components/ChatWidget";
import { OrigamiDefs } from "@layouts/components/origami";
import SceneObserver from "@layouts/components/SceneObserver";
import TwSizeIndicator from "@layouts/components/TwSizeIndicator";
import Footer from "@layouts/partials/Footer";
import Header from "@layouts/partials/Header";
import { Instrument_Serif, Plus_Jakarta_Sans } from "next/font/google";
import "../styles/style.scss";

const fontPrimary = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-primary",
  display: "swap",
});

// only used for italic accent words
const fontSecondary = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-secondary",
  display: "swap",
});

export const metadata = {
  icons: { icon: config.site.favicon },
};

export const viewport = {
  themeColor: "#f7f7f2",
};

export default function RootLayout({ children }) {
  return (
    <html
      suppressHydrationWarning={true}
      lang="en"
      className={`${fontPrimary.variable} ${fontSecondary.variable}`}
    >
      <body className="font-primary">
        <OrigamiDefs />
        <TwSizeIndicator />
        <Header />
        {children}
        <Footer />
        <ChatWidget />
        <SceneObserver />
      </body>
    </html>
  );
}
