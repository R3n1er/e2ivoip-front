"use client";

export function TallyFormEmbed() {
  return (
    <div className="card bg-base-100 shadow-xl border-0">
      <div className="card-header bg-gradient-to-r from-red-primary to-blue-marine text-white rounded-t-2xl p-6">
        <h2 className="card-title text-2xl font-bold text-white mb-2">
          Votre projet de téléphonie IP en moins de 5 min
        </h2>
        <p className="text-white/90">
          Remplissez ce formulaire pour recevoir votre devis personnalisé
        </p>
      </div>
      <div className="card-body p-8">
        <div 
          dangerouslySetInnerHTML={{
            __html: `
              <iframe data-tally-src="https://tally.so/embed/n9xqDG?alignLeft=1&hideTitle=1&dynamicHeight=1&formEventsForwarding=1" loading="lazy" width="100%" height="250" frameborder="0" marginheight="0" marginwidth="0" title="E2I VOIP - ☎️ Votre projet de téléphonie IP en moins de 5 min"></iframe>
              <script>var d=document,w="https://tally.so/widgets/embed.js",v=function(){"undefined"!=typeof Tally?Tally.loadEmbeds():d.querySelectorAll("iframe[data-tally-src]:not([src])").forEach((function(e){e.src=e.dataset.tallySrc}))};if("undefined"!=typeof Tally)v();else if(d.querySelector('script[src="'+w+'"]')==null){var s=d.createElement("script");s.src=w,s.onload=v,s.onerror=v,d.body.appendChild(s);}</script>
            `
          }}
        />
      </div>
    </div>
  );
}