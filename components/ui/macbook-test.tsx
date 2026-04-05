"use client"

import { useMacBookBreakpoint } from "@/lib/macbook-breakpoints"
import { AnimatedText, SplitText } from "./animated-text"

export function MacBookTest() {
  const breakpoint = useMacBookBreakpoint()
  
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <AnimatedText className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Test d'optimisation MacBook Pro
          </h1>
          <p className="text-lg text-gray-600">
            Breakpoint détecté : <span className="font-semibold text-red-600">{breakpoint}</span>
          </p>
        </AnimatedText>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">MacBook Pro 13"</h3>
            <p className="text-gray-600">Résolution : 1280px</p>
            <p className="text-gray-600">Navigation : Compacte</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">MacBook Pro 14"</h3>
            <p className="text-gray-600">Résolution : 1440px</p>
            <p className="text-gray-600">Navigation : Standard</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">MacBook Pro 15"</h3>
            <p className="text-gray-600">Résolution : 1680px</p>
            <p className="text-gray-600">Navigation : Étendue</p>
          </div>
        </div>
        
        <div className="mt-8">
          <SplitText 
            text="Animations ReactBits et Lineicons installés avec succès !"
            className="text-2xl font-bold text-gray-900"
            delay={0.5}
          />
        </div>
      </div>
    </div>
  )
} 