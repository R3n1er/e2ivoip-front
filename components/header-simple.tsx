"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { CTAButton } from "@/components/ui/cta-button";
import { motion, AnimatePresence } from "framer-motion";

export function HeaderSimple() {
  const [isOpen, setIsOpen] = useState(false);

  // Nettoyage simplifié

  const navigation = [
    {
      name: "Qui sommes-nous",
      href: "/qui-sommes-nous",
    },
    {
      name: "Téléphonie d'entreprise",
      href: null,
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
          name: "3CX PRO",
          href: "/3cx-cloud",
        },
        {
          name: "3CX SMB mutualisée",
          href: "/telephonie-entreprise/3cx-smb-mutualisee",
        },
        { name: "PBX Yeastar", href: "/telephonie-entreprise/pbx-yeastar" },
      ],
    },
    { name: "Mobilité", href: "/mobilite" },
    {
      name: "Nos services",
      href: "/nos-services",
      submenu: [
        {
          name: "Studio attente téléphonique",
          href: "/nos-services/studio-attente",
        },
        {
          name: "Assistants vocaux IA",
          href: "/nos-services/assistants-vocaux-ia",
        },
      ],
    },
    { name: "Blog", href: "/blog" },
    { name: "Devis en ligne", href: "/devis-en-ligne" },
  ];

  // Suppression de toute la logique JavaScript des sous-menus

  return (
    <header
      className="fixed top-0 w-full z-[100] bg-white shadow-lg border-b border-gray-200 transition-shadow duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 flex-shrink-0 group"
          >
            <div className="flex items-center">
              <div className="text-xl lg:text-2xl font-bold">
                <span className="text-red-primary group-hover:text-red-primary transition-colors">
                  E
                </span>
                <span className="text-blue-marine">
                  2
                </span>
                <span className="text-red-primary group-hover:text-red-primary transition-colors">
                  I
                </span>
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="text-xs lg:text-sm leading-tight max-w-[160px] lg:max-w-[180px] text-gray-secondary">
                Solutions de Téléphonie IP
                <br />
                et communications d&apos;entreprise
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
                      <i className="lni lni-chevron-down w-3 h-3 ml-1 transition-transform duration-200 text-gray-600 group-hover:rotate-180"></i>
                    )}
                  </Link>
                ) : (
                  <span
                    className="font-medium transition-colors duration-200 flex items-center text-sm whitespace-nowrap py-2 cursor-pointer text-gray-700 hover:text-red-primary"
                  >
                    {item.name}
                    {item.submenu && (
                      <i className="lni lni-chevron-down w-3 h-3 ml-1 transition-transform duration-200 text-gray-600 group-hover:rotate-180"></i>
                    )}
                  </span>
                )}

                {/* Sous-menu CSS Hover */}
                {item.submenu && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 z-[200] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out">
                    <div className="py-2">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-primary transition-colors duration-150"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center flex-shrink-0">
            <CTAButton href="/contact" icon="lni-phone" className="!text-sm !px-6 !py-2 !font-medium">
              Contact
            </CTAButton>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg transition-colors"
          >
            {isOpen ? (
              <i className="lni lni-close h-5 w-5 text-gray-700"></i>
            ) : (
              <i className="lni lni-menu h-5 w-5 text-gray-700"></i>
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
                <div className="mt-6">
                  <CTAButton href="/contact" icon="lni-phone" fullWidth>
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
