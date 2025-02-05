"use client"; // Make sure this is at the top if you're using React 18

import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router"; // Use 'next/router' instead of 'next/navigation'

export default function LanguageSwitcher() {
  const { t } = useTranslation("common"); // Use translation if needed

  return (
    <div>
      <main>
        <Link href={"/"} locale="en">
          {" "}
          {/* Use the current path and switch to English */}
          <h2>{t("welcome")}</h2> {/* Use translation keys */}
        </Link>
        <Link href={"/"} locale="ar">
          {" "}
          {/* Use the current path and switch to Arabic */}
          <h2>arabic</h2>
        </Link>
      </main>
    </div>
  );
}
