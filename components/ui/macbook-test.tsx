"use client"

import { useMacBookBreakpoint } from "@/lib/macbook-breakpoints"
import { AnimatedText, SplitText } from "./animated-text"

export function MacBookTest() {
  const breakpoint = useMacBookBreakpoint()
  
  return (
    <div className="p-8 bg-ui-surface min-h-screen">
      <div className="max-w-7xl mx-auto">
        <AnimatedText className="mb-8">
          <h1 className="text-4xl font-bold text-gray-dark mb-4">
            Test d'optimisation MacBook Pro
          </h1>
          <p className="text-lg text-ui-muted">
            Breakpoint détecté : <span className="font-semibold text-red-600">{breakpoint}</span>
          </p>
        </AnimatedText>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">MacBook Pro 13"</h3>
            <p className="text-ui-muted">Résolution : 1280px</p>
            <p className="text-ui-muted">Navigation : Compacte</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">MacBook Pro 14"</h3>
            <p className="text-ui-muted">Résolution : 1440px</p>
            <p className="text-ui-muted">Navigation : Standard</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">MacBook Pro 15"</h3>
            <p className="text-ui-muted">Résolution : 1680px</p>
            <p className="text-ui-muted">Navigation : Étendue</p>
          </div>
        </div>
        
        <div className="mt-8">
          <SplitText 
            text="Animations ReactBits et Lineicons installés avec succès !"
            className="text-2xl font-bold text-gray-dark"
            delay={0.5}
          />
        </div>
      </div>
    </div>
  )
} 