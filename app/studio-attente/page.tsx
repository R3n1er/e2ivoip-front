export default function StudioAttente() {
  const services = [
    {
      icon: "lni-microphone",
      title: "Enregistrement professionnel",
      description:
        "Studio d'enregistrement avec voix off professionnelles en français et langues étrangères",
    },
    {
      icon: "lni-music",
      title: "Habillage musical",
      description:
        "Large choix de musiques libres de droits pour accompagner vos messages",
    },
    {
      icon: "lni-volume",
      title: "Messages sur mesure",
      description:
        "Création de messages personnalisés selon votre image de marque",
    },
    {
      icon: "lni-download",
      title: "Formats multiples",
      description:
        "Livraison dans tous les formats compatibles avec votre système téléphonique",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-6">
        {/* Hero Section */}
        <section className="py-24 relative overflow-hidden bg-[#091421] border-b border-[#1A2E44]">
          <div className="absolute inset-0 monolith-grid-lines opacity-20 pointer-events-none z-10" />
          <div className="absolute inset-0 pointer-events-none z-20" style={{ boxShadow: "inset 0 0 100px rgba(9,20,33,1)" }} />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight">
                Studio attente{" "}
                <span className="text-red-primary">téléphonique</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/95 mb-10 max-w-4xl mx-auto font-bold leading-relaxed">
                Créez une expérience d'attente agréable et professionnelle avec
                nos messages et musiques sur mesure
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <button className="monolith-btn bg-red-primary">
                  <span className="block text-white font-black uppercase text-xs tracking-widest px-8 py-4 flex items-center justify-center gap-2">
                    <i className="lni lni-play" aria-hidden="true" />
                    Écouter des exemples
                  </span>
                </button>
                <button className="monolith-btn bg-transparent border border-white/20 hover:border-white transition-colors">
                  <span className="block text-white font-black uppercase text-xs tracking-widest px-8 py-4 flex items-center justify-center gap-2">
                    <i className="lni lni-headphone" aria-hidden="true" />
                    Demander un devis
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-24 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-100 hover:border-red-primary/30 transition-colors p-8 flex flex-col items-center justify-center text-center"
                >
                  <div className="bg-[#f8fafc] w-16 h-16 flex items-center justify-center mb-6 border border-gray-100">
                    <i className={`lni ${service.icon} text-3xl text-red-primary`} aria-hidden="true"></i>
                  </div>
                  <h3 className="text-base font-bold text-[#091421] mb-2 uppercase tracking-wide">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 text-xs uppercase tracking-wider">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Examples */}
        <section className="py-24 bg-[#f8fafc]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-5xl font-black text-center text-[#091421] mb-12 uppercase tracking-tight">
              Exemples de <span className="text-red-primary">réalisations</span>
            </h2>
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white border border-gray-100 p-8 flex flex-col border-t-4 border-t-red-primary">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-[#091421] uppercase tracking-wide mb-2">Message d'accueil standard</h3>
                  <p className="text-gray-500 text-sm">
                    Message professionnel pour l'accueil de vos appelants
                  </p>
                </div>
                <div className="bg-[#f8fafc] p-6 border border-gray-100 flex flex-col flex-grow">
                  <p className="text-gray-500 italic mb-8 font-medium leading-relaxed border-l-4 border-l-[#091421] pl-4">
                    "Bonjour et merci d'appeler E2I VoIP, spécialiste des
                    solutions de téléphonie IP. Votre appel est important pour
                    nous, un conseiller va vous répondre dans quelques
                    instants. Merci de patienter."
                  </p>
                  <div className="mt-auto">
                    <button className="monolith-btn w-full hover:bg-gray-50">
                      <span className="block text-[#091421] font-black uppercase text-[10px] tracking-widest px-4 py-3 border border-gray-200 flex items-center justify-center gap-2">
                        <i className="lni lni-play" aria-hidden="true"></i>
                        Écouter l'exemple
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-100 p-8 flex flex-col border-t-4 border-t-[#091421]">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-[#091421] uppercase tracking-wide mb-2">Message promotionnel</h3>
                  <p className="text-gray-500 text-sm">
                    Promotion de vos services pendant l'attente
                  </p>
                </div>
                <div className="bg-[#f8fafc] p-6 border border-gray-100 flex flex-col flex-grow">
                  <p className="text-gray-500 italic mb-8 font-medium leading-relaxed border-l-4 border-l-red-primary pl-4">
                    "Saviez-vous que nos solutions de téléphonie IP permettent
                    de réduire vos coûts de communication jusqu'à 50% ?
                    Découvrez nos offres sur notre site web www.e2i-voip.com"
                  </p>
                  <div className="mt-auto">
                    <button className="monolith-btn w-full hover:bg-gray-50">
                      <span className="block text-[#091421] font-black uppercase text-[10px] tracking-widest px-4 py-3 border border-gray-200 flex items-center justify-center gap-2">
                        <i className="lni lni-play" aria-hidden="true"></i>
                        Écouter l'exemple
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
