"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  STUDIO_DEMOS,
  STUDIO_DEMO_CATEGORIES,
  type StudioDemoCategory,
} from "@/lib/studio-demos";
import { Play, ArrowRight } from "@/lib/icons";

const TABS: { value: StudioDemoCategory; label: string }[] = [
  { value: "pre-decroche", label: "Pré-décroché" },
  { value: "attente", label: "Attente" },
  { value: "fermeture", label: "Fermeture" },
  { value: "occupation", label: "Occupation" },
  { value: "additionnel", label: "Additionnel" },
];

export function StudioDemoSection() {
  const [active, setActive] = useState<StudioDemoCategory>("pre-decroche");
  const demos = STUDIO_DEMOS.filter((d) => d.category === active);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-gray-dark mb-3">
            Écoutez des{" "}
            <span className="text-red-primary">exemples de messages</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Sélectionnez une catégorie, écoutez les démos, puis personnalisez le
            modèle dans votre demande de devis.
          </p>
        </div>

        {/* Onglets */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {TABS.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => setActive(tab.value)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors
                ${active === tab.value
                  ? "bg-red-primary text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-red-primary/50"}`}
              aria-pressed={active === tab.value}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Liste des démos */}
        <div className="grid md:grid-cols-2 gap-4 mb-10">
          {demos.map((demo) => (
            <Card key={demo.id} className="border-gray-200">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div className="bg-red-primary/10 w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                    <Play size={20} className="text-red-primary" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-semibold text-gray-dark truncate">
                        {demo.title}
                      </h3>
                      <span className="text-xs text-gray-400 shrink-0">
                        {demo.duration}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1 italic">
                      &ldquo;{demo.script.replace(/\{entreprise\}/g, "votre entreprise")}&rdquo;
                    </p>
                    <audio
                      controls
                      src={demo.src}
                      className="w-full mt-3 h-8"
                      preload="none"
                    >
                      Votre navigateur ne supporte pas la lecture audio.
                    </audio>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="mt-3 gap-1"
                    >
                      <a href={`/studio-attente/devis?demo=${demo.id}`}>
                        Utiliser ce modèle
                        <ArrowRight size={14} />
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {demos.length === 0 && (
          <p className="text-center text-gray-500">
            Aucune démo audio pour cette catégorie pour le moment.
          </p>
        )}

        {/* CTA formulaire */}
        <div className="text-center">
          <Button
            asChild
            className="bg-red-primary hover:bg-red-700 text-white px-8 py-3 text-base"
          >
            <a href="/studio-attente/devis">
              Construire ma demande de devis
              <ArrowRight size={20} className="ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
