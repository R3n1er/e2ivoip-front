"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, Phone, ChevronDown, Home, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { motion, AnimatePresence } from "framer-motion"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    {
      name: "Qui sommes-nous",
      href: "/qui-sommes-nous",
      submenu: [
        { name: "Notre histoire", href: "/qui-sommes-nous" },
        { name: "Notre équipe", href: "/qui-sommes-nous/equipe" },
        { name: "Nos certifications", href: "/qui-sommes-nous/certifications" },
        { name: "Nos partenaires", href: "/qui-sommes-nous/partenaires" },
      ],
    },
    {
      name: "Téléphonie d'entreprise",
      href: "/telephonie-entreprise",
      submenu: [
        { name: "Trunk SIP au compteur", href: "/telephonie-entreprise/trunk-sip-compteur" },
        { name: "Trunk SIP illimité", href: "/telephonie-entreprise/trunk-sip-illimite" },
        { name: "3CX PRO dédiée", href: "/telephonie-entreprise/3cx-pro-dediee" },
        { name: "3CX SMB mutualisée", href: "/telephonie-entreprise/3cx-smb-mutualisee" },
        { name: "PBX Yeastar", href: "/telephonie-entreprise/pbx-yeastar" },
        { name: "Mobilité", href: "/telephonie-entreprise/mobilite" },
      ],
    },
    {
      name: "Nos services",
      href: "/nos-services",
      submenu: [
        { name: "Studio attente téléphonique", href: "/nos-services/studio-attente" },
        { name: "Assistants vocaux IA", href: "/nos-services/assistants-vocaux-ia" },
        { name: "Devis en ligne", href: "/nos-services/devis-en-ligne" },
      ],
    },
    { name: "Blog", href: "/blog" },
    { name: "Devis en ligne", href: "/devis-en-ligne" },
  ]

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
          : 'bg-white/80 backdrop-blur-sm border-b border-white/30'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo - Optimisé pour MacBook Pro 13", 14", 15" */}
          <Link href="/" className="flex items-center space-x-3 flex-shrink-0 group">
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-xl lg:text-2xl font-bold">
                <span className={`group-hover:text-red-primary transition-colors ${isScrolled ? 'text-red-primary' : 'text-gray-800'}`}>
                  E
                </span>
                <span className={isScrolled ? 'text-blue-marine' : 'text-gray-800'}>2</span>
                <span className={`group-hover:text-red-primary transition-colors ${isScrolled ? 'text-red-primary' : 'text-gray-800'}`}>
                  I
                </span>
              </div>
            </motion.div>
            <div className="hidden sm:block">
              <div className={`text-xs lg:text-sm leading-tight max-w-[160px] lg:max-w-[180px] transition-colors ${
                isScrolled ? 'text-gray-secondary' : 'text-gray-600'
              }`}>
                Solutions de Téléphonie IP
                <br />
                et communications d'entreprise
              </div>
            </div>
          </Link>

          {/* Desktop Navigation - Optimisé pour MacBook Pro */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className={`font-medium transition-colors duration-200 flex items-center text-sm whitespace-nowrap py-2 ${
                    isScrolled 
                      ? 'text-gray-700 hover:text-red-primary' 
                      : 'text-gray-700 hover:text-red-primary'
                  }`}
                >
                  {item.name}
                  {item.submenu && (
                    <ChevronDown className={`w-3 h-3 ml-1 transition-transform ${
                      isScrolled ? 'text-gray-600' : 'text-gray-600'
                    } group-hover:rotate-180`} />
                  )}
                </Link>

                {item.submenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
                  >
                    <div className="py-2">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-primary transition-colors"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button - Optimisé pour MacBook Pro */}
          <div className="hidden lg:flex items-center flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="bg-red-primary hover:bg-red-600 text-white px-6 py-2 text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-200">
                <Phone className="w-4 h-4 mr-2" />
                Devis en ligne
              </Button>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="lg:hidden p-2 rounded-lg transition-colors"
              >
                <Menu className={`h-5 w-5 ${isScrolled ? 'text-gray-700' : 'text-gray-700'}`} />
              </motion.button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px] bg-white/95 backdrop-blur-md">
              <div className="flex flex-col space-y-4 mt-6">
                {navigation.map((item) => (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      className="text-base font-medium text-gray-700 hover:text-red-primary transition-colors block py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
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
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-6"
                >
                  <Button className="bg-red-primary hover:bg-red-600 text-white w-full">
                    <Phone className="w-4 h-4 mr-2" />
                    Devis en ligne
                  </Button>
                </motion.div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  )
}
