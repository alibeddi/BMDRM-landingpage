"use client";

import Logo from "@components/Logo";
import config from "@config/config.json";
import menu from "@config/menu.json";
import { openChat } from "@lib/utils/chat";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const Header = () => {
  // Destructuring the main menu from menu object
  const { main } = menu;
  const { nav_button } = config;

  // States and refs declaration
  const [showMenu, setShowMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);

  const pathname = usePathname();

  // Settle the header into a solid bar once the page scrolls
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the mobile menu on navigation
  useEffect(() => {
    setShowMenu(false);
  }, [pathname]);

  // Close the mobile menu on outside click or Escape
  useEffect(() => {
    if (!showMenu) return;

    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setShowMenu(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showMenu]);

  return (
    <>
      <div className="header-height-fix" aria-hidden="true"></div>
      <header
        ref={headerRef}
        className={`header dash-top dash-btm ${scrolled ? "is-scrolled" : ""} ${
          showMenu ? "is-open" : ""
        }`}
      >
        <nav className="header-bar" aria-label="Main">
          {/* Logo */}
          <Logo />

          {/* Menu */}
          <ul id="nav-menu" className="nav-menu">
            {main.map((menu, i) => (
              <React.Fragment key={`menu-${i}`}>
                {menu.hasChildren ? (
                  <li className="nav-item nav-dropdown">
                    <span className="nav-link" tabIndex={0}>
                      {menu.name}
                      <svg
                        className="h-3 w-3 fill-current"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </span>
                    <ul className="nav-dropdown-list">
                      {menu.children.map((child, i) => (
                        <li key={`children-${i}`}>
                          <Link
                            href={child.url}
                            className={`nav-dropdown-link ${
                              pathname === child.url ? "active" : ""
                            }`}
                          >
                            {child.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li className="nav-item">
                    <Link
                      href={menu.url}
                      className={`nav-link ${
                        pathname === menu.url ? "active" : ""
                      }`}
                      aria-current={pathname === menu.url ? "page" : undefined}
                    >
                      {menu.name}
                    </Link>
                  </li>
                )}
              </React.Fragment>
            ))}
            {nav_button.enable && (
              <li className="nav-menu-cta">
                <button
                  type="button"
                  className="btn btn-primary w-full"
                  onClick={openChat}
                >
                  {nav_button.label}
                </button>
              </li>
            )}
          </ul>

          <div className="header-actions">
            {nav_button.enable && (
              <button
                type="button"
                className="btn btn-primary max-lg:hidden"
                onClick={openChat}
              >
                {nav_button.label}
              </button>
            )}

            {/* Navbar toggler */}
            <button
              type="button"
              className="nav-toggle"
              aria-controls="nav-menu"
              aria-expanded={showMenu}
              aria-label={showMenu ? "Close menu" : "Open menu"}
              onClick={() => setShowMenu(!showMenu)}
            >
              <span />
              <span />
            </button>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
