"use client";

import { useState } from "react";
import Link from "next/link";
import { CTAButton } from "@/components/ui/cta-button";
import { Phone, CaretDown, X, List } from "@/lib/icons";

// Élément de navigation récursif : un item peut avoir un href, un sous-menu, ou les deux.
type NavItem = {
  name: string;
  href?: string;
  submenu?: NavItem[];
};

export function HeaderSimple() {
  const [isOpen, setIsOpen] = useState(false);
  // Suppression de la logique complexe des sous-menus

  // Nettoyage simplifié

  const navigation: NavItem[] = [
    {
      name: "Qui sommes-nous",
      href: "/qui-sommes-nous",
    },
    {
      name: "Téléphonie d'entreprise",
      submenu: [
        {
          name: "Trunk SIP au compteur",
          href: "/telephonie-entreprise/trunk-sip-compteur",
        },
        {
          name: "Trunk SIP illimité",
          href: "/telephonie-entreprise/trunk-sip-illimite",
        },
        {
          name: "Téléphonie 3CX",
          href: "/telephonie-3cx",
          submenu: [
            {
              name: "3CX PRO",
              href: "/3cx-cloud",
            },
            {
              name: "3CX SMB PRO",
              href: "/telephonie-entreprise/3cx-smb-mutualisee",
            },
          ],
        },
        {
          name: "Téléphonie Yeastar",
          href: "/telephonie-entreprise/pbx-yeastar",
        },
        {
          name: "Aircall",
          href: "/telephonie-entreprise/aircall",
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
          name: "Trunk SIP agents IA",
          href: "/telephonie-entreprise/trunk-sip-agents-ia",
        },
      ],
    },
    { name: "Blog", href: "/blog" },
    { name: "Devis en ligne", href: "/devis-en-ligne" },
  ];

  // Suppression de toute la logique JavaScript des sous-menus

  return (
    <header
      suppressHydrationWarning
      className="fixed top-0 w-full z-[100] transition-all duration-300 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 flex-shrink-0 group"
          >
            {/* Logo E2I VoIP — <img> natif (pas next/image : piège hydratation) */}
            <img
              src="/images/Logo-e2ivoip-solo.png"
              alt="E2I VoIP"
              className="h-8 lg:h-10 w-auto"
            />
            <div className="hidden sm:block">
              <div className="text-xs lg:text-sm leading-tight max-w-[160px] lg:max-w-[180px] text-gray-secondary">
                Solutions de Téléphonie IP et communications d&apos;entreprise
              </div>
            </div>
          </Link>

          {/* Desktop Navigation - CSS Hover Simple */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                {item.href ? (
                  <Link
                    href={item.href}
                    className="font-medium transition-colors duration-200 flex items-center text-sm whitespace-nowrap py-2 text-gray-700 hover:text-red-primary"
                  >
                    {item.name}
                    {item.submenu && (
                      <CaretDown size={16} className="ml-1 transition-transform duration-200 text-gray-600 group-hover:rotate-180" />
                    )}
                  </Link>
                ) : (
                  <span className="font-medium transition-colors duration-200 flex items-center text-sm whitespace-nowrap py-2 cursor-pointer text-gray-700 hover:text-red-primary">
                    {item.name}
                    {item.submenu && (
                      <CaretDown size={16} className="ml-1 transition-transform duration-200 text-gray-600 group-hover:rotate-180" />
                    )}
                  </span>
                )}

                {/* Sous-menu CSS Hover */}
                {item.submenu && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 z-[200] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out">
                    <div className="py-2">
                      {item.submenu.map((subItem) => (
                        <div key={subItem.name} className="relative group/sub">
                          <Link
                            href={subItem.href ?? "#"}
                            className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-primary transition-colors duration-200"
                          >
                            {subItem.name}
                            {subItem.submenu && (
                              <CaretDown size={14} className="-rotate-90 text-gray-500 group-hover/sub:text-red-primary" />
                            )}
                          </Link>

                          {/* Sous-sous-menu latéral (3e niveau) */}
                          {subItem.submenu && (
                            <div className="absolute top-0 left-full ml-1 w-56 bg-white rounded-xl shadow-2xl border border-gray-200 z-[200] opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-200 ease-out">
                              <div className="py-2">
                                {subItem.submenu.map((leaf) => (
                                  <Link
                                    key={leaf.name}
                                    href={leaf.href ?? "#"}
                                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-primary transition-colors duration-200"
                                  >
                                    {leaf.name}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center flex-shrink-0">
            <CTAButton
              href="/contact"
              icon={Phone}
              className="!text-sm !px-6 !py-2 !font-medium"
            >
              Contact
            </CTAButton>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg transition-colors"
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isOpen ? (
              <X size={24} className="text-gray-700" />
            ) : (
              <List size={24} className="text-gray-700" />
            )}
          </button>

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
                          <div key={subItem.name}>
                            <Link
                              href={subItem.href ?? "#"}
                              className="block text-sm text-gray-600 hover:text-red-primary transition-colors py-1"
                              onClick={() => setIsOpen(false)}
                            >
                              {subItem.name}
                            </Link>
                            {subItem.submenu && (
                              <div className="ml-4 mt-1 space-y-1 border-l border-gray-200 pl-3">
                                {subItem.submenu.map((leaf) => (
                                  <Link
                                    key={leaf.name}
                                    href={leaf.href ?? "#"}
                                    className="block text-sm text-gray-500 hover:text-red-primary transition-colors py-1"
                                    onClick={() => setIsOpen(false)}
                                  >
                                    {leaf.name}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="mt-6">
                  <CTAButton href="/contact" icon={Phone} className="w-full">
                    Contact
                  </CTAButton>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
