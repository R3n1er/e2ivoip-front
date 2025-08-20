"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, Phone, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeaderSimple() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [isHoveringSubmenu, setIsHoveringSubmenu] = useState(false);
  const submenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Nettoyer le timeout lors du démontage du composant
  useEffect(() => {
    return () => {
      if (submenuTimeoutRef.current) {
        clearTimeout(submenuTimeoutRef.current);
      }
    };
  }, []);

  const navigation = [
    {
      name: "Qui sommes-nous",
      href: "/qui-sommes-nous",
      submenu: [
        { name: "Nos certifications", href: "/qui-sommes-nous/certifications" },
        { name: "Nos partenaires", href: "/qui-sommes-nous/partenaires" },
      ],
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
    { name: "Assistance", href: "/assistance" },
    { name: "Devis en ligne", href: "/devis-en-ligne" },
  ];

  const handleMouseEnter = (itemName: string) => {
    // Annuler le timeout de fermeture s'il existe
    if (submenuTimeoutRef.current) {
      clearTimeout(submenuTimeoutRef.current);
      submenuTimeoutRef.current = null;
    }

    setActiveSubmenu(itemName);
    setIsHoveringSubmenu(false);
  };

  const handleMouseLeave = () => {
    // Démarrer le délai de fermeture
    submenuTimeoutRef.current = setTimeout(() => {
      if (!isHoveringSubmenu) {
        setActiveSubmenu(null);
      }
    }, 300); // 300ms de délai
  };

  const handleSubmenuMouseEnter = () => {
    setIsHoveringSubmenu(true);
    // Annuler le timeout de fermeture
    if (submenuTimeoutRef.current) {
      clearTimeout(submenuTimeoutRef.current);
      submenuTimeoutRef.current = null;
    }
  };

  const handleSubmenuMouseLeave = () => {
    setIsHoveringSubmenu(false);
    // Démarrer le délai de fermeture
    submenuTimeoutRef.current = setTimeout(() => {
      setActiveSubmenu(null);
    }, 300); // 300ms de délai
  };

  return (
    <header
      className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
        isScrolled
          ? "bg-transparent backdrop-blur-sm border-b border-white/20"
          : "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200"
      }`}
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
                <span
                  className={`group-hover:text-red-primary transition-colors ${
                    isScrolled ? "text-white" : "text-red-primary"
                  }`}
                >
                  E
                </span>
                <span
                  className={isScrolled ? "text-white" : "text-blue-marine"}
                >
                  2
                </span>
                <span
                  className={`group-hover:text-red-primary transition-colors ${
                    isScrolled ? "text-white" : "text-red-primary"
                  }`}
                >
                  I
                </span>
              </div>
            </div>
            <div className="hidden sm:block">
              <div
                className={`text-xs lg:text-sm leading-tight max-w-[160px] lg:max-w-[180px] transition-colors ${
                  isScrolled ? "text-white/80" : "text-gray-secondary"
                }`}
              >
                Solutions de Téléphonie IP
                <br />
                et communications d&apos;entreprise
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.name)}
                onMouseLeave={handleMouseLeave}
              >
                {item.href ? (
                  <Link
                    href={item.href}
                    className={`font-medium transition-colors duration-200 flex items-center text-sm whitespace-nowrap py-2 ${
                      isScrolled
                        ? "text-white hover:text-red-400"
                        : "text-gray-700 hover:text-red-primary"
                    }`}
                  >
                    {item.name}
                    {item.submenu && (
                      <ChevronDown
                        className={`w-3 h-3 ml-1 transition-transform duration-200 ${
                          isScrolled ? "text-white/70" : "text-gray-600"
                        } ${activeSubmenu === item.name ? "rotate-180" : ""}`}
                      />
                    )}
                  </Link>
                ) : (
                  <span
                    className={`font-medium transition-colors duration-200 flex items-center text-sm whitespace-nowrap py-2 cursor-pointer ${
                      isScrolled
                        ? "text-white hover:text-red-400"
                        : "text-gray-700 hover:text-red-primary"
                    }`}
                  >
                    {item.name}
                    {item.submenu && (
                      <ChevronDown
                        className={`w-3 h-3 ml-1 transition-transform duration-200 ${
                          isScrolled ? "text-white/70" : "text-gray-600"
                        } ${activeSubmenu === item.name ? "rotate-180" : ""}`}
                      />
                    )}
                  </span>
                )}

                {/* Sous-menu simplifié */}
                {item.submenu && activeSubmenu === item.name && (
                  <div 
                    className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 z-[200]"
                    onMouseEnter={handleSubmenuMouseEnter}
                    onMouseLeave={handleSubmenuMouseLeave}
                  >
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
            <Link href="/contact">
              <Button className="!bg-red-primary hover:bg-red-600 !text-white px-6 py-2 text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-200">
                <Phone className="w-4 h-4 mr-2" />
                Contact
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg transition-colors"
          >
            {isOpen ? (
              <X
                className={`h-5 w-5 ${
                  isScrolled ? "text-white" : "text-gray-700"
                }`}
              />
            ) : (
              <Menu
                className={`h-5 w-5 ${
                  isScrolled ? "text-white" : "text-gray-700"
                }`}
              />
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
                <Link href="/contact" className="mt-6">
                  <Button className="!bg-red-primary hover:bg-red-600 !text-white w-full">
                    <Phone className="w-4 h-4 mr-2" />
                    Contact
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}