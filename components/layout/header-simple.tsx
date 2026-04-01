"use client";

import { useState } from "react";
import Link from "next/link";

type NavSubItem = { name: string; href: string };

type NavItem = {
  name: string;
  href?: string;
  submenu?: NavSubItem[];
};

export function HeaderSimple() {
  const [isOpen, setIsOpen] = useState(false);

  const navigation: NavItem[] = [
    {
      name: "Qui sommes-nous",
      href: "/qui-sommes-nous",
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
      submenu: [
        {
          name: "3CX PRO dédiée",
          href: "/telephonie-3cx",
        },
        {
          name: "3CX SMB mutualisée",
          href: "/telephonie-entreprise/3cx-smb-mutualisee",
        },
        {
          name: "PBX Yeastar",
          href: "/telephonie-entreprise/pbx-yeastar",
        },
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
      ],
    },
    { name: "Blog", href: "/blog" },
  ];

  const navLinkLeftClass =
    "font-medium transition-colors duration-200 flex items-center text-xs xl:text-sm whitespace-nowrap py-2 tracking-[-0.03em] text-gray-700 hover:text-red-primary";

  return (
    <header
      suppressHydrationWarning
      className="fixed top-0 w-full z-[100] transition-all duration-300 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200"
    >
      <div
        className="w-full max-w-screen-2xl mx-auto px-2 sm:px-3 lg:px-4 xl:px-5 2xl:px-6"
        data-testid="header-simple-container"
      >
        <div className="flex items-center justify-between gap-2 sm:gap-3 lg:gap-4 min-w-0 min-h-[4.5rem] h-20 lg:h-24">
          {/* Logo — shrink-0 sans min-w-0 pour éviter chevauchement avec la nav */}
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-3 shrink-0 group"
          >
            <div className="flex items-center shrink-0">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold leading-none">
                <span className="text-red-primary transition-colors">E</span>
                <span className="text-blue-marine">2</span>
                <span className="text-red-primary transition-colors">I</span>
              </div>
            </div>
            <div className="hidden sm:block min-w-0">
              <div className="text-xs sm:text-sm lg:text-sm xl:text-base leading-tight max-w-[120px] sm:max-w-[140px] lg:max-w-[128px] xl:max-w-[180px] text-gray-secondary">
                Solutions de Téléphonie IP et communications d&apos;entreprise
              </div>
            </div>
          </Link>

          {/* Desktop Navigation — une seule ligne (nowrap + espacements compacts) */}
          <nav
            className="hidden lg:flex flex-1 items-center justify-center min-w-0 min-h-0 px-1 lg:px-2 xl:px-3 overflow-x-auto overflow-y-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Navigation principale"
          >
            <div className="flex flex-nowrap items-center justify-center gap-x-2 lg:gap-x-2.5 xl:gap-x-3.5 shrink-0">
              {navigation.map((item) => (
                <div key={item.name} className="relative group">
                  {item.href ? (
                    <Link
                      href={item.href}
                      className={navLinkLeftClass}
                      data-testid={`header-simple-nav-${item.name
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                    >
                      {item.name}
                      {item.submenu && (
                        <i
                          className="lni lni-chevron-down w-3 h-3 ml-1 transition-transform duration-200 text-gray-600 group-hover:rotate-180"
                          aria-hidden="true"
                        />
                      )}
                    </Link>
                  ) : (
                    <span className={`${navLinkLeftClass} cursor-pointer`}>
                      {item.name}
                      {item.submenu && (
                        <i
                          className="lni lni-chevron-down w-3 h-3 ml-1 transition-transform duration-200 text-gray-600 group-hover:rotate-180"
                          aria-hidden="true"
                        />
                      )}
                    </span>
                  )}

                  {item.submenu && (
                    <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-none shadow-2xl border border-gray-200 z-[200] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out">
                      <div className="py-2">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-primary transition-colors duration-200"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            <div
              className="flex shrink-0 items-center gap-1.5 sm:gap-3 lg:gap-4 xl:gap-5 border-l-0 lg:border-l border-gray-200 lg:pl-5 xl:pl-6 lg:ml-1"
              data-testid="header-simple-cta-desktop"
            >
              <Link
                href="/devis-en-ligne"
                className="font-black tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[9px] sm:text-[10px] !text-red-primary hover:opacity-80 transition-all duration-200 whitespace-nowrap"
                style={{ color: "#E53E3E" }}
                data-testid="header-simple-devis-link"
              >
                Devis en ligne
              </Link>
              <a
                href="https://e2i-voip.com"
                target="_blank"
                rel="noopener noreferrer"
                className="monolith-btn bg-white border border-[#091421] text-[#091421] font-black tracking-[0.12em] sm:tracking-[0.2em] uppercase text-[8px] sm:text-[10px] px-2 py-1.5 sm:px-4 sm:py-2.5 rounded-none flex items-center gap-1 sm:gap-2 shrink-0"
                data-testid="header-simple-espace-client-link"
              >
                <i className="lni lni-user text-sm sm:text-base shrink-0" aria-hidden="true" />
                <span className="whitespace-nowrap">Espace Client</span>
              </a>
              <Link href="/contact" data-testid="header-simple-contact-link">
                <button
                  type="button"
                  className="monolith-btn bg-red-primary text-white font-black tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[9px] sm:text-[10px] px-3 py-2 sm:px-6 sm:py-2.5 rounded-none"
                >
                  Contact
                </button>
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-none transition-colors flex-shrink-0"
              aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {isOpen ? (
                <i className="lni lni-close h-5 w-5 text-gray-700" aria-hidden="true" />
              ) : (
                <i className="lni lni-menu h-5 w-5 text-gray-700" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg border-t border-gray-200 lg:hidden">
              <div className="flex flex-col space-y-4 p-4">
                {navigation.map((item) => (
                  <div key={item.name}>
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="text-base font-medium text-gray-700 hover:text-red-primary transition-colors block py-2"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <span className="text-base font-medium text-gray-700 block py-2">
                        {item.name}
                      </span>
                    )}
                    {item.submenu && (
                      <div className="ml-4 mt-2 space-y-2">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block text-sm text-gray-600 hover:text-red-primary transition-colors py-1"
                            onClick={() => setIsOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="mt-6 space-y-4 border-t border-gray-200 pt-6">
                  <Link
                    href="/devis-en-ligne"
                    className="block text-center font-black tracking-[0.2em] uppercase text-[10px] text-red-primary py-3"
                    onClick={() => setIsOpen(false)}
                    data-testid="header-simple-mobile-devis"
                  >
                    Devis en ligne
                  </Link>
                  <a
                    href="https://e2i-voip.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="monolith-btn block text-center bg-white border border-[#091421] text-[#091421] font-black tracking-[0.2em] uppercase text-[10px] py-2.5 rounded-none"
                    onClick={() => setIsOpen(false)}
                  >
                    Espace Client
                  </a>
                  <Link href="/contact" onClick={() => setIsOpen(false)}>
                    <button
                      type="button"
                      className="monolith-btn w-full bg-red-primary text-white font-black tracking-[0.2em] uppercase text-[10px] py-2.5 rounded-none"
                    >
                      Contact
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
