"use client";

import { useEffect, useRef, useState } from "react";

const TALLY_EMBED_URL =
  "https://tally.so/embed/mDY1bl?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1&formEventsForwarding=1";
const TALLY_SCRIPT_SRC = "https://tally.so/widgets/embed.js";
const TALLY_SCRIPT_ID = "tally-embed-script";

export function TallyEmbedDevis() {
  const [isClient, setIsClient] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) {
      return;
    }

    const loadEmbeds = () => {
      const tally = (window as any).Tally;
      if (tally && typeof tally.loadEmbeds === "function") {
        tally.loadEmbeds();
      } else if (iframeRef.current && !iframeRef.current.src) {
        iframeRef.current.src = TALLY_EMBED_URL;
      }
    };

    const existingScript = document.getElementById(
      TALLY_SCRIPT_ID,
    ) as HTMLScriptElement | null;

    if (existingScript) {
      if ((window as any).Tally) {
        loadEmbeds();
      } else {
        existingScript.addEventListener("load", loadEmbeds, { once: true });
        existingScript.addEventListener("error", loadEmbeds, { once: true });
      }

      return () => {
        existingScript.removeEventListener("load", loadEmbeds);
        existingScript.removeEventListener("error", loadEmbeds);
      };
    }

    const script = document.createElement("script");
    script.id = TALLY_SCRIPT_ID;
    script.src = TALLY_SCRIPT_SRC;
    script.async = true;
    script.addEventListener("load", loadEmbeds, { once: true });
    script.addEventListener("error", loadEmbeds, { once: true });
    document.body.appendChild(script);

    return () => {
      script.removeEventListener("load", loadEmbeds);
      script.removeEventListener("error", loadEmbeds);
    };
  }, [isClient]);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-red-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête améliorée avec badge et icônes */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-red-primary/10 text-red-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <i className="lni lni-calculator mr-2"></i>
            Devis personnalisé gratuit
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-dark mb-4">
            Obtenez votre <span className="text-red-primary">devis sur-mesure</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Remplissez ce formulaire en <strong>2 minutes</strong>, un expert vous répond sous <strong>24h</strong>
          </p>

          {/* Avantages du formulaire */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 text-gray-600">
              <i className="lni lni-checkmark-circle text-red-primary text-xl"></i>
              <span>100% Gratuit</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <i className="lni lni-shield text-blue-marine text-xl"></i>
              <span>Sans engagement</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <i className="lni lni-timer text-red-primary text-xl"></i>
              <span>Réponse rapide</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <i className="lni lni-users text-blue-marine text-xl"></i>
              <span>Expert dédié</span>
            </div>
          </div>
        </div>

        {/* Container du formulaire avec design amélioré */}
        <div className="relative">
          {/* Effet de décoration */}
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-red-primary/20 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-tl from-blue-600/20 to-transparent rounded-full blur-2xl"></div>
          
          {/* Card conteneur avec ombre et bordure */}
          <div className="relative bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            {/* Formulaire Tally iframe */}
            <div className="rounded-xl overflow-hidden">
              {isClient ? (
                <iframe
                  ref={iframeRef}
                  data-tally-src={TALLY_EMBED_URL}
                  loading="lazy"
                  width="100%"
                  height="500"
                  style={{ border: 0, margin: 0 }}
                  title="E2I VOIP - ☎️ Formulaire Devis Trunk SIP"
                  className="w-full"
                  allow="clipboard-read; clipboard-write"
                  sandbox="allow-scripts allow-forms allow-same-origin allow-popups"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-[500px] bg-gray-50">
                  <span className="text-gray-500">
                    Chargement du formulaire…
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
