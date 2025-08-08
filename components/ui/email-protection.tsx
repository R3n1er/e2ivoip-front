"use client"

import { useState, useEffect } from "react"
import { Mail } from "lucide-react"
import { Button } from "./button"

interface EmailProtectionProps {
  email: string
  className?: string
  variant?: "default" | "outline"
  children?: React.ReactNode
}

export function EmailProtection({ 
  email, 
  className = "", 
  variant = "outline",
  children 
}: EmailProtectionProps) {
  const [displayEmail, setDisplayEmail] = useState<string>("")
  const [isRevealed, setIsRevealed] = useState(false)

  useEffect(() => {
    // Décoder l'adresse email de manière sécurisée
    const decodeEmail = () => {
      // Protection basique : on peut améliorer avec des techniques plus avancées
      const parts = email.split("@")
      if (parts.length === 2) {
        const local = parts[0]
        const domain = parts[1]
        return `${local}@${domain}`
      }
      return email
    }

    if (isRevealed) {
      setDisplayEmail(decodeEmail())
    } else {
      // Afficher une version masquée
      const parts = email.split("@")
      if (parts.length === 2) {
        const local = parts[0]
        const domain = parts[1]
        const maskedLocal = local.length > 2 
          ? `${local.charAt(0)}${"*".repeat(local.length - 2)}${local.charAt(local.length - 1)}`
          : "***"
        const maskedDomain = domain.length > 2
          ? `${domain.charAt(0)}${"*".repeat(domain.length - 2)}${domain.charAt(domain.length - 1)}`
          : "***"
        setDisplayEmail(`${maskedLocal}@${maskedDomain}`)
      } else {
        setDisplayEmail("***@***")
      }
    }
  }, [email, isRevealed])

  const handleReveal = () => {
    setIsRevealed(true)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      // Optionnel : afficher une notification de succès
    } catch (err) {
      console.error("Erreur lors de la copie :", err)
    }
  }

  return (
    <Button
      variant={variant}
      className={className}
      onClick={isRevealed ? handleCopy : handleReveal}
    >
      <Mail className="w-5 h-5 mr-2" />
      {children || displayEmail}
    </Button>
  )
} 