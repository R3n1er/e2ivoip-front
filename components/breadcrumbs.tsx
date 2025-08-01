"use client"

import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

interface BreadcrumbItem {
  name: string
  href: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  return (
    <nav className={`flex items-center space-x-1 text-sm text-gray-600 ${className}`} aria-label="Breadcrumb">
      <Link
        href="/"
        className="flex items-center hover:text-red-600 transition-colors"
        aria-label="Accueil"
      >
        <Home className="w-4 h-4" />
      </Link>
      
      {items.map((item, index) => (
        <div key={item.href} className="flex items-center">
          <ChevronRight className="w-4 h-4 mx-1 text-gray-400" />
          {index === items.length - 1 ? (
            <span className="text-gray-900 font-medium">{item.name}</span>
          ) : (
            <Link
              href={item.href}
              className="hover:text-red-600 transition-colors"
            >
              {item.name}
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
} 