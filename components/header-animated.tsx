"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, Phone, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

export function HeaderAnimated() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [isHoveringSubmenu, setIsHoveringSubmenu] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const submenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const submenuRef = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll();

  // Assurer le montage côté client pour éviter les erreurs d'hydratation
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Animation de scroll optimisée avec useMotionValueEvent
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (isMounted) {
      setIsScrolled(latest > 10);
    }
  });

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
    { name: "Devis en ligne", href: "/devis-en-ligne" },
  ];

  // Animations variants optimisées
  const headerVariants = {
    hidden: { 
      y: -100,
      opacity: 0 
    },
    visible: { 
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] // ease-out
      }
    }
  };

  const logoVariants = {
    idle: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  const submenuVariants = {
    hidden: { 
      opacity: 0, 
      y: -10, 
      scale: 0.95 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      y: -10, 
      scale: 0.95,
      transition: {
        duration: 0.15,
        ease: "easeIn"
      }
    }
  };

  const buttonVariants = {
    idle: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: { 
      scale: 0.95,
      transition: {
        duration: 0.1,
        ease: "easeInOut"
      }
    }
  };

  const mobileButtonVariants = {
    idle: { scale: 1 },
    hover: { 
      scale: 1.1,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: { 
      scale: 0.9,
      transition: {
        duration: 0.1,
        ease: "easeInOut"
      }
    }
  };

  const handleMouseEnter = (itemName: string) => {
    if (submenuTimeoutRef.current) {
      clearTimeout(submenuTimeoutRef.current);
      submenuTimeoutRef.current = null;
    }
    setActiveSubmenu(itemName);
    setIsHoveringSubmenu(false);
  };

  const handleMouseLeave = () => {
    submenuTimeoutRef.current = setTimeout(() => {
      if (!isHoveringSubmenu) {
        setActiveSubmenu(null);
      }
    }, 300);
  };

  const handleSubmenuMouseEnter = () => {
    setIsHoveringSubmenu(true);
    if (submenuTimeoutRef.current) {
      clearTimeout(submenuTimeoutRef.current);
      submenuTimeoutRef.current = null;
    }
  };

  const handleSubmenuMouseLeave = () => {
    setIsHoveringSubmenu(false);
    submenuTimeoutRef.current = setTimeout(() => {
      setActiveSubmenu(null);
    }, 300);
  };

  // Rendu conditionnel pour éviter l'hydratation
  if (!isMounted) {
    return (
      <header className="fixed top-0 w-full z-[100] bg-transparent backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Version statique pendant l'hydratation */}
            <Link href="/" className="flex items-center space-x-3 flex-shrink-0">
              <div className="flex items-center">
                <div className="text-xl lg:text-2xl font-bold">
                  <span className="text-white">E</span>
                  <span className="text-white">2</span>
                  <span className="text-white">I</span>
                </div>
              </div>
            </Link>
            <div className="lg:hidden">
              <Menu className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <motion.header
      variants={headerVariants}
      initial="hidden"
      animate="visible"
      className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200"
          : "bg-transparent backdrop-blur-sm border-b border-white/20"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo Animé */}
          <Link
            href="/"
            className="flex items-center space-x-3 flex-shrink-0 group"
          >
            <motion.div
              variants={logoVariants}
              initial="idle"
              whileHover="hover"
              className="flex items-center"
            >
              <div className="text-xl lg:text-2xl font-bold">
                <span
                  className={`group-hover:text-red-primary transition-colors ${
                    isScrolled ? "text-red-primary" : "text-white"
                  }`}
                >
                  E
                </span>
                <span
                  className={isScrolled ? "text-blue-marine" : "text-white"}
                >
                  2
                </span>
                <span
                  className={`group-hover:text-red-primary transition-colors ${
                    isScrolled ? "text-red-primary" : "text-white"
                  }`}
                >
                  I
                </span>
              </div>
            </motion.div>
            <div className="hidden sm:block">
              <div
                className={`text-xs lg:text-sm leading-tight max-w-[160px] lg:max-w-[180px] transition-colors ${
                  isScrolled ? "text-gray-secondary" : "text-white/80"
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
                        ? "text-gray-700 hover:text-red-primary"
                        : "text-white hover:text-red-400"
                    }`}
                  >
                    {item.name}
                    {item.submenu && (
                      <motion.div
                        animate={{ rotate: activeSubmenu === item.name ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown
                          className={`w-3 h-3 ml-1 ${
                            isScrolled ? "text-gray-600" : "text-white/70"
                          }`}
                        />
                      </motion.div>
                    )}
                  </Link>
                ) : (
                  <span
                    className={`font-medium transition-colors duration-200 flex items-center text-sm whitespace-nowrap py-2 cursor-pointer ${
                      isScrolled
                        ? "text-gray-700 hover:text-red-primary"
                        : "text-white hover:text-red-400"
                    }`}
                  >
                    {item.name}
                    {item.submenu && (
                      <motion.div
                        animate={{ rotate: activeSubmenu === item.name ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown
                          className={`w-3 h-3 ml-1 ${
                            isScrolled ? "text-gray-600" : "text-white/70"
                          }`}
                        />
                      </motion.div>
                    )}
                  </span>
                )}

                {/* Sous-menu avec AnimatePresence optimisée */}
                {item.submenu && (
                  <AnimatePresence mode="wait">
                    {activeSubmenu === item.name && (
                      <motion.div
                        ref={submenuRef}
                        variants={submenuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 z-[200]"
                        onMouseEnter={handleSubmenuMouseEnter}
                        onMouseLeave={handleSubmenuMouseLeave}
                      >
                        <div className="py-2">
                          {item.submenu.map((subItem, index) => (
                            <motion.div
                              key={subItem.name}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05, duration: 0.2 }}
                            >
                              <Link
                                href={subItem.href}
                                className="block px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-primary transition-colors duration-150"
                              >
                                {subItem.name}
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button Animé */}
          <div className="hidden lg:flex items-center flex-shrink-0">
            <motion.div
              variants={buttonVariants}
              initial="idle"
              whileHover="hover"
              whileTap="tap"
            >
              <Link href="/contact">
                <Button className="!bg-red-primary hover:bg-red-600 !text-white px-6 py-2 text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-200">
                  <Phone className="w-4 h-4 mr-2" />
                  Contact
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <motion.button
            variants={mobileButtonVariants}
            initial="idle"
            whileHover="hover"
            whileTap="tap"
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg transition-colors"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: 0, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X
                    className={`h-5 w-5 ${
                      isScrolled ? "text-gray-700" : "text-white"
                    }`}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 0, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu
                    className={`h-5 w-5 ${
                      isScrolled ? "text-gray-700" : "text-white"
                    }`}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg border-t border-gray-200 lg:hidden overflow-hidden"
              >
                <motion.div
                  initial={{ y: -20 }}
                  animate={{ y: 0 }}
                  exit={{ y: -20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="flex flex-col space-y-4 p-4"
                >
                  {navigation.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
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
                          {item.submenu.map((subItem, subIndex) => (
                            <motion.div
                              key={subItem.name}
                              initial={{ opacity: 0, x: -15 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ 
                                delay: (index * 0.1) + (subIndex * 0.05), 
                                duration: 0.2 
                              }}
                            >
                              <Link
                                href={subItem.href}
                                className="block text-sm text-gray-600 hover:text-red-primary transition-colors py-1"
                                onClick={() => setIsOpen(false)}
                              >
                                {subItem.name}
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: navigation.length * 0.1, duration: 0.3 }}
                    className="mt-6"
                  >
                    <Link href="/contact">
                      <Button className="!bg-red-primary hover:bg-red-600 !text-white w-full">
                        <Phone className="w-4 h-4 mr-2" />
                        Contact
                      </Button>
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
}