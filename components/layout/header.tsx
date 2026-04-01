"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LineIcon } from "lineicons-react";
import { motion, AnimatePresence } from "framer-motion";

type NavSubItem = { name: string; href: string };

type NavItem = {
  name: string;
  href: string | null;
  submenu?: NavSubItem[];
};

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation: NavItem[] = [
    {
      name: "Qui sommes-nous",
      href: "/qui-sommes-nous",
      submenu: [
        {
          name: "Nos certifications",
          href: "/qui-sommes-nous#certifications",
        },
        {
          name: "Nos partenaires",
          href: "/qui-sommes-nous#partenaires",
        },
      ],
    },
    {
      name: "Trunk SIP",
      href: "/telephonie-entreprise/trunk-sip",
      submenu: [
        {
          name: "Trunk SIP au compteur",
          href: "/telephonie-entreprise/trunk-sip-compteur",
        },
        {
          name: "Trunk SIP illimité",
          href: "/telephonie-entreprise/trunk-sip-illimite",
        },
      ],
    },
    {
      name: "Téléphonie d'entreprise",
      href: null,
      submenu: [
        {
          name: "3CX PRO dédiée",
          href: "/telephonie-3cx",
        },
        {
          name: "3CX SMB mutualisée",
          href: "/telephonie-entreprise/3cx-smb-mutualisee",
        },
        { name: "PBX Yeastar", href: "/telephonie-entreprise/pbx-yeastar" },
      ],
    },
    {
      name: "Nos services",
      href: "/nos-services",
      submenu: [
        {
          name: "Studio attente téléphonique",
          href: "/studio-attente",
        },
        {
          name: "Assistants vocaux IA",
          href: "/nos-services/assistants-vocaux-ia",
        },
        { name: "Devis en ligne", href: "/nos-services/devis-en-ligne" },
      ],
    },
    { name: "Blog", href: "/blog" },
  ];

  const navLinkLeftClass =
    "font-medium transition-colors duration-200 flex items-center text-sm whitespace-nowrap py-2 tracking-[-0.03em] text-gray-700 hover:text-blue-marine";

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-gray-200"
          : "bg-white/80 backdrop-blur-sm border-b border-white/30"
      }`}
      data-testid="main-header"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center gap-2 min-w-0 h-16 lg:h-24 overflow-x-auto overflow-y-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {/* Logo - Optimisé pour MacBook Pro 13", 14", 15" */}
          <Link
            href="/"
            className="flex items-center space-x-3 flex-shrink-0 min-w-0 group"
          >
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-xl lg:text-2xl font-bold" data-testid="logo">
                <span
                  className={`group-hover:text-red-primary transition-colors ${
                    isScrolled ? "text-red-primary" : "text-gray-800"
                  }`}
                >
                  E
                </span>
                <span
                  className={isScrolled ? "text-blue-marine" : "text-gray-800"}
                >
                  2
                </span>
                <span
                  className={`group-hover:text-red-primary transition-colors ${
                    isScrolled ? "text-red-primary" : "text-gray-800"
                  }`}
                >
                  I
                </span>
              </div>
            </motion.div>
            <div className="hidden sm:block">
              <div
                className={`text-xs lg:text-sm leading-tight max-w-[160px] lg:max-w-[180px] transition-colors ${
                  isScrolled ? "text-gray-secondary" : "text-gray-600"
                }`}
              >
                Solutions de Téléphonie IP
                <br />
                et communications d&apos;entreprise
              </div>
            </div>
          </Link>

          {/* Desktop Navigation — typo plus légère que le bloc CTA droite */}
          <nav className="hidden lg:flex items-center flex-1 justify-center min-w-0 space-x-5 xl:space-x-7">
            {navigation.map((item) => {
              const hasSubmenu = Boolean(
                item.submenu && item.submenu.length > 0
              );
              const slug = item.name.toLowerCase().replace(/\s+/g, "-");

              const triggerContent = (() => {
                if (hasSubmenu && item.href && item.name === "Trunk SIP") {
                  return (
                    <div
                      className="flex items-center"
                      data-testid="nav-dropdown-trunk-sip"
                    >
                      <Link
                        href={item.href}
                        className={`${navLinkLeftClass}`}
                        data-testid="nav-link-trunk-sip"
                        onFocus={() => setOpenMenu(item.name)}
                        onBlur={() => setOpenMenu(null)}
                      >
                        {item.name}
                      </Link>
                      <motion.div
                        className="ml-1"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <LineIcon
                          name="lni-chevron-down"
                          className={`text-sm text-gray-600 transition-all duration-200 hover:text-red-primary ${
                            openMenu === item.name ? "rotate-180" : ""
                          }`}
                          aria-hidden="true"
                          data-testid={`icon-chevron-down-${slug}`}
                        />
                      </motion.div>
                    </div>
                  );
                }

                if (item.href) {
                  return (
                    <div className="flex items-center">
                      <Link
                        href={item.href}
                        className={navLinkLeftClass}
                        data-testid={`nav-link-${slug}`}
                        onMouseEnter={() =>
                          hasSubmenu && setOpenMenu(item.name)
                        }
                        onMouseLeave={() => hasSubmenu && setOpenMenu(null)}
                        onFocus={() => hasSubmenu && setOpenMenu(item.name)}
                        onBlur={() => hasSubmenu && setOpenMenu(null)}
                      >
                        {item.name}
                      </Link>
                      {hasSubmenu && (
                        <motion.div
                          className="ml-1"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <LineIcon
                            name="lni-chevron-down"
                            className={`text-sm text-gray-600 transition-all duration-200 hover:text-red-primary ${
                              openMenu === item.name ? "rotate-180" : ""
                            }`}
                            aria-hidden="true"
                            data-testid={`icon-chevron-down-${slug}`}
                          />
                        </motion.div>
                      )}
                    </div>
                  );
                }

                return (
                  <div className="flex items-center">
                    <span
                      tabIndex={0}
                      role="button"
                      className={`${navLinkLeftClass} cursor-pointer hover:text-red-primary`}
                      data-testid={`nav-dropdown-${slug}`}
                      onFocus={() => hasSubmenu && setOpenMenu(item.name)}
                      onBlur={() => hasSubmenu && setOpenMenu(null)}
                    >
                      {item.name}
                    </span>
                    {hasSubmenu && (
                      <motion.div
                        className="ml-1"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <LineIcon
                          name="lni-chevron-down"
                          className={`text-sm text-gray-600 transition-all duration-200 hover:text-red-primary ${
                            openMenu === item.name ? "rotate-180" : ""
                          }`}
                          aria-hidden="true"
                          data-testid={`icon-chevron-down-${slug}`}
                        />
                      </motion.div>
                    )}
                  </div>
                );
              })();

              return (
                <div
                  key={item.name}
                  className="dropdown dropdown-hover dropdown-bottom dropdown-end"
                  onMouseEnter={() => hasSubmenu && setOpenMenu(item.name)}
                  onMouseLeave={() => hasSubmenu && setOpenMenu(null)}
                >
                  {triggerContent}

                  <AnimatePresence>
                    {hasSubmenu && openMenu === item.name && (
                      <motion.div
                        className="dropdown-content bg-base-100 rounded-none w-64 p-2 shadow-[4px_4px_0_0_#1F2937] border border-base-300 z-[9999] mt-2"
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                          duration: 0.2,
                        }}
                        data-testid={`submenu-${slug}`}
                      >
                        <ul className="menu w-full p-0 m-0">
                        {item.submenu?.map((subItem) => (
                          <li key={subItem.name}>
                            <motion.div
                              whileHover={{
                                backgroundColor: "var(--primary)",
                                color: "var(--primary-content)",
                                x: 4,
                              }}
                              transition={{ duration: 0.15 }}
                            >
                              <Link
                                href={subItem.href}
                                className="text-sm transition-colors duration-150 block w-full"
                                data-testid={`submenu-link-${subItem.name
                                  .toLowerCase()
                                  .replace(/\s+/g, "-")}`}
                              >
                                {subItem.name}
                              </Link>
                            </motion.div>
                          </li>
                        ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          {/* CTA + drawer : CTA visibles dès md ; regroupés à droite avec le menu */}
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            <div className="flex shrink-0 items-center gap-1.5 sm:gap-3 lg:gap-4 xl:gap-5 border-l-0 lg:border-l border-gray-200 lg:pl-5 xl:pl-6 lg:ml-1">
              <Link
                href="/devis-en-ligne"
                className="font-black tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[9px] sm:text-[10px] !text-red-primary hover:opacity-80 transition-all duration-200 whitespace-nowrap"
                style={{ color: "#E53E3E" }}
                data-testid="header-devis-link"
              >
                Devis en ligne
              </Link>
              <a
                href="https://e2i-voip.com"
                target="_blank"
                rel="noopener noreferrer"
                className="monolith-btn bg-white border border-[#091421] text-[#091421] font-black tracking-[0.12em] sm:tracking-[0.2em] uppercase text-[8px] sm:text-[10px] px-2 py-1.5 sm:px-4 sm:py-2.5 rounded-none flex items-center gap-1 sm:gap-2 shrink-0"
                data-testid="header-espace-client-link"
              >
                <i className="lni lni-user text-sm sm:text-base shrink-0" aria-hidden="true" />
                <span className="whitespace-nowrap">Espace Client</span>
              </a>
              <Link href="/contact">
                <button
                  type="button"
                  className="monolith-btn bg-red-primary text-white font-black tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[9px] sm:text-[10px] px-3 py-2 sm:px-6 sm:py-2.5 rounded-none"
                  data-testid="header-contact-button"
                >
                  Contact
                </button>
              </Link>
            </div>

          {/* Mobile menu DaisyUI drawer */}
          <div className="drawer drawer-end lg:hidden">
            <input
              id="mobile-drawer"
              type="checkbox"
              className="drawer-toggle"
              checked={isOpen}
              onChange={(e) => setIsOpen(e.target.checked)}
            />
            <div className="drawer-content">
              <label
                htmlFor="mobile-drawer"
                className="btn btn-square btn-ghost drawer-button"
                data-testid="mobile-menu-button"
              >
                <LineIcon
                  name={isOpen ? "lni-close" : "lni-menu"}
                  className={`text-2xl ${
                    isScrolled ? "text-gray-700" : "text-gray-700"
                  }`}
                  aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
                  role="img"
                />
              </label>
            </div>
            <div className="drawer-side z-50">
              <label
                htmlFor="mobile-drawer"
                aria-label="Fermer le menu"
                className="drawer-overlay"
              ></label>
              <div
                className="menu min-h-full w-80 bg-base-100 text-base-content p-4"
                data-testid="mobile-menu"
              >
                <div className="flex flex-col space-y-4 mt-6">
                  {navigation.map((item) => {
                    const hasSubmenu = Boolean(
                      item.submenu && item.submenu.length > 0
                    );
                    const slug = item.name
                      .toLowerCase()
                      .replace(/\s+/g, "-");
                    return (
                      <div key={item.name}>
                        {item.href ? (
                          <Link
                            href={item.href}
                            className="text-sm font-medium tracking-[-0.03em] text-gray-800 hover:text-red-primary transition-colors block py-2"
                            onClick={() => setIsOpen(false)}
                            data-testid={`mobile-link-${slug}`}
                          >
                            {item.name}
                          </Link>
                        ) : (
                          <span className="text-sm font-medium tracking-[-0.03em] text-gray-800 block py-2">
                            {item.name}
                          </span>
                        )}
                        {item.submenu && (
                          <div className="ml-4 mt-2 space-y-2">
                            {item.submenu.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className="block text-sm text-gray-600 hover:text-primary transition-colors py-1"
                                onClick={() => setIsOpen(false)}
                                data-testid={`mobile-submenu-${subItem.name
                                  .toLowerCase()
                                  .replace(/\s+/g, "-")}`}
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                  <div className="mt-8 space-y-4 border-t border-gray-200 pt-6">
                    <Link
                      href="/devis-en-ligne"
                      className="block text-center font-black tracking-[0.2em] uppercase text-[10px] text-red-primary hover:opacity-80 transition-all py-3"
                      onClick={() => setIsOpen(false)}
                      data-testid="mobile-devis-link"
                    >
                      Devis en ligne
                    </Link>
                    <a
                      href="https://e2i-voip.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="monolith-btn block text-center bg-white border border-[#091421] text-[#091421] font-black tracking-[0.2em] uppercase text-[10px] py-2.5 rounded-none"
                      onClick={() => setIsOpen(false)}
                      data-testid="mobile-espace-client-link"
                    >
                      Espace Client
                    </a>
                    <Link href="/contact" onClick={() => setIsOpen(false)}>
                      <button
                        type="button"
                        className="monolith-btn w-full text-white bg-red-primary font-black tracking-[0.2em] uppercase text-[10px] flex items-center justify-center px-7 py-2.5 rounded-none"
                        data-testid="mobile-contact-button"
                      >
                        Contact
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
