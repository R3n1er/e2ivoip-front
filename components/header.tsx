"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { LineIcon } from "lineicons-react";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          name: "3CX PRO dédiée",
          href: "/telephonie-entreprise/3cx-pro-dediee",
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
        { name: "Devis en ligne", href: "/nos-services/devis-en-ligne" },
      ],
    },
    { name: "Blog", href: "/blog" },
    { name: "Devis en ligne", href: "/devis-en-ligne" },
  ];

  // Plus besoin de logique complexe, DaisyUI gère le hover automatiquement

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200"
          : "bg-white/80 backdrop-blur-sm border-b border-white/30"
      }`}
      data-testid="main-header"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo - Optimisé pour MacBook Pro 13", 14", 15" */}
          <Link
            href="/"
            className="flex items-center space-x-3 flex-shrink-0 group"
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

          {/* Desktop Navigation avec DaisyUI + Framer Motion */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="dropdown dropdown-hover dropdown-bottom dropdown-end"
              >
                {item.href ? (
                  <div className="flex items-center">
                    <Link
                      href={item.href}
                      className={`font-medium transition-colors duration-200 flex items-center text-sm whitespace-nowrap py-2 hover:text-red-primary ${
                        isScrolled ? "text-gray-700" : "text-gray-700"
                      }`}
                      data-testid={`nav-link-${item.name
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                    >
                      {item.name}
                    </Link>
                  </div>
                ) : (
                  <div
                    tabIndex={0}
                    role="button"
                    className={`font-medium transition-colors duration-200 flex items-center text-sm whitespace-nowrap py-2 cursor-pointer hover:text-red-primary ${
                      isScrolled ? "text-gray-700" : "text-gray-700"
                    }`}
                    data-testid={`nav-dropdown-${item.name
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
                    {item.name}
                    {item.submenu && (
                      <motion.div
                        className="ml-1"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <LineIcon
                          name="lni-chevron-down"
                          className="text-sm text-gray-600 transition-all duration-200 hover:text-red-primary"
                          aria-hidden="true"
                        />
                      </motion.div>
                    )}
                  </div>
                )}

                {/* Sous-menu avec DaisyUI + Framer Motion - Uniquement pour les éléments avec submenu */}
                {item.submenu && item.submenu.length > 0 && (
                  <motion.div
                    className="dropdown-content menu bg-base-100 rounded-box w-64 p-2 shadow-2xl border border-base-300 z-[9999] mt-2"
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                      duration: 0.2,
                    }}
                    data-testid={`submenu-${item.name
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
                    {item.submenu.map((subItem) => (
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
                  </motion.div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button DaisyUI - Optimisé pour MacBook Pro */}
          <div className="hidden lg:flex items-center flex-shrink-0">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/contact">
                <button
                  className="btn btn-primary bg-red-primary hover:bg-red-600 border-none text-white px-6 py-2 text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                  data-testid="header-contact-button"
                >
                  <LineIcon
                    name="lni-phone"
                    className="text-lg mr-2"
                    aria-hidden="true"
                  />
                  Contact
                </button>
              </Link>
            </motion.div>
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
                  {navigation.map((item) => (
                    <div key={item.name}>
                      {item.href ? (
                        <Link
                          href={item.href}
                          className="text-base font-medium hover:text-primary transition-colors block py-2"
                          onClick={() => setIsOpen(false)}
                          data-testid={`mobile-link-${item.name
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                        >
                          {item.name}
                        </Link>
                      ) : (
                        <span className="text-base font-medium block py-2">
                          {item.name}
                        </span>
                      )}
                      {item.submenu && (
                        <div className="ml-4 mt-2 space-y-2">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block text-sm hover:text-primary transition-colors py-1"
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
                  ))}
                  <div className="mt-6">
                    <Link href="/contact">
                      <button
                        className="btn btn-primary bg-red-primary hover:bg-red-600 border-none text-white w-full"
                        data-testid="mobile-contact-button"
                      >
                        <LineIcon
                          name="lni-phone"
                          className="text-lg mr-2"
                          aria-hidden="true"
                        />
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
    </motion.header>
  );
}
