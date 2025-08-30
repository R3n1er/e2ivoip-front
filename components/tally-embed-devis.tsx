"use client";

export function TallyEmbedDevis() {
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
              <i className="lni lni-checkmark-circle text-green-600 text-xl"></i>
              <span>100% Gratuit</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <i className="lni lni-shield text-blue-600 text-xl"></i>
              <span>Sans engagement</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <i className="lni lni-timer text-orange-500 text-xl"></i>
              <span>Réponse rapide</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <i className="lni lni-users text-red-primary text-xl"></i>
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
              <iframe
                src="https://tally.so/embed/mDY1bl?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1&formEventsForwarding=1"
                loading="lazy"
                width="100%"
                height="500"
                style={{ border: 0, margin: 0 }}
                title="E2I VOIP - ☎️ Formulaire Devis Trunk SIP"
                className="w-full"
                allow="clipboard-read; clipboard-write"
                sandbox="allow-scripts allow-forms allow-same-origin allow-popups"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}


