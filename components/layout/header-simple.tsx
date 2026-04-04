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
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

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
          name: "Trunk SIP illimite",
          href: "/telephonie-entreprise/trunk-sip-illimite",
        },
      ],
    },
    {
      name: "Telephonie d'entreprise",
      submenu: [
        {
          name: "3CX PRO dediee",
          href: "/telephonie-3cx",
        },
        {
          name: "3CX SMB mutualisee",
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
          name: "Studio attente telephonique",
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

  return (
    <header
      className="fixed top-0 z-50 flex justify-between items-center w-full px-8 h-24 max-w-none bg-white transition-colors duration-300 border-b border-gray-200/50"
    >
      {/* Logo + Nav */}
      <div className="flex items-center space-x-12">
        <Link href="/" className="text-xl font-black text-[#091421] tracking-tighter">
          <span className="text-red-primary">E</span>
          <span>2</span>
          <span className="text-red-primary">I</span>
          <span className="ml-1 text-sm font-bold text-gray-secondary hidden sm:inline">VoIP</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-8">
          {navigation.map((item) => (
            <div key={item.name} className="relative group">
              {item.href && !item.submenu ? (
                <Link
                  href={item.href}
                  className="font-medium text-sm text-gray-500 hover:text-[#091421] transition-all duration-200"
                  data-testid={`header-simple-nav-${item.name.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {item.name}
                </Link>
              ) : (
                <Link
                  href={item.href || "#"}
                  className="font-medium text-sm text-gray-500 hover:text-[#091421] flex items-center gap-1 transition-all duration-200"
                  data-testid={`header-simple-nav-${item.name.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {item.name}
                  {item.submenu && (
                    <i className="lni lni-chevron-down text-xs transition-transform duration-200 group-hover:rotate-180" aria-hidden="true" />
                  )}
                </Link>
              )}

              {/* Dropdown — zone de hover continue (pt-4 transparent pour combler le gap) */}
              {item.submenu && (
                <div className="absolute top-full left-0 w-64 pt-2 z-[60] hidden group-hover:block">
                  <div className="bg-white shadow-xl border border-gray-100 py-4 flex flex-col">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="px-6 py-3 text-sm font-medium text-[#091421] hover:bg-gray-50 hover:text-red-primary transition-colors"
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
      </div>

      {/* CTA droite */}
      <div className="flex items-center space-x-4 sm:space-x-6">
        <Link
          href="/devis-en-ligne"
          className="hidden sm:block tracking-[-0.03em] uppercase text-[11px] hover:opacity-70 transition-all duration-200 font-black whitespace-nowrap"
          style={{ color: "#b91c1c" }}
          data-testid="header-simple-devis-link"
        >
          Devis en ligne
        </Link>
        <a
          href="https://e2i-voip.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex monolith-btn bg-white border border-[#091421] text-[#091421] font-bold tracking-[-0.03em] uppercase text-[11px] px-5 py-2.5 rounded-none items-center gap-2"
          data-testid="header-simple-espace-client-link"
        >
          <i className="lni lni-user text-base" aria-hidden="true" />
          Espace Client
        </a>
        <Link
          href="/contact"
          className="monolith-btn bg-red-primary text-white font-bold tracking-[-0.03em] uppercase text-[11px] px-5 py-2.5 sm:px-7 rounded-none"
          data-testid="header-simple-contact-link"
        >
          Contact
        </Link>

        {/* Hamburger mobile */}
        <button
          type="button"
          onClick={() => { setIsOpen(!isOpen); setOpenSubmenu(null); }}
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
        <div className="absolute top-full left-0 right-0 bg-white shadow-xl border-t border-gray-100 lg:hidden z-[60]">
          <div className="flex flex-col py-4">
            {navigation.map((item) => (
              <div key={item.name}>
                {item.submenu ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setOpenSubmenu(openSubmenu === item.name ? null : item.name)}
                      className="w-full flex items-center justify-between px-8 py-4 text-sm font-medium text-[#091421] hover:bg-gray-50 transition-colors"
                    >
                      {item.name}
                      <i
                        className={`lni lni-chevron-down text-xs transition-transform duration-200 ${openSubmenu === item.name ? "rotate-180" : ""}`}
                        aria-hidden="true"
                      />
                    </button>
                    {openSubmenu === item.name && (
                      <div className="bg-gray-50 border-y border-gray-100">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-12 py-3 text-sm text-gray-500 hover:text-red-primary transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href || "#"}
                    className="block px-8 py-4 text-sm font-medium text-[#091421] hover:bg-gray-50 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}

            {/* Mobile CTAs */}
            <div className="mt-4 mx-8 space-y-3 border-t border-gray-100 pt-4">
              <Link
                href="/devis-en-ligne"
                className="block text-center tracking-[-0.03em] uppercase text-[11px] font-black py-3"
                style={{ color: "#b91c1c" }}
                onClick={() => setIsOpen(false)}
                data-testid="header-simple-mobile-devis"
              >
                Devis en ligne
              </Link>
              <a
                href="https://e2i-voip.com"
                target="_blank"
                rel="noopener noreferrer"
                className="monolith-btn block text-center bg-white border border-[#091421] text-[#091421] font-bold tracking-[-0.03em] uppercase text-[11px] py-3 rounded-none"
                onClick={() => setIsOpen(false)}
              >
                Espace Client
              </a>
              <Link
                href="/contact"
                className="monolith-btn block text-center bg-red-primary text-white font-bold tracking-[-0.03em] uppercase text-[11px] py-3 rounded-none"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
