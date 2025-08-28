"use client";

export function TallyEmbedDevis() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-dark">
            Nous contacter pour un devis
          </h2>
          <p className="text-gray-600 mt-2">
            Remplissez ce formulaire, un expert vous répond sous 24h.
          </p>
        </div>
        <div className="rounded-2xl overflow-hidden shadow border">
          <iframe
            data-tally-src="https://tally.so/embed/mDY1bl?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1&formEventsForwarding=1"
            loading="lazy"
            width="100%"
            height="350"
            frameBorder={0}
            marginHeight={0}
            marginWidth={0}
            title="E2I VOIP -  ☎️ Formulaire Devis Trunk SIP"
          />
        </div>
      </div>
    </section>
  );
}


