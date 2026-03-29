import { ContactFormAssistantIA } from "@/components/contact-form-assistant-ia";

export const dynamic = "force-dynamic";

export default function AssistantsVocauxIA() {
  return (
    <div className="min-h-screen bg-white">
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden bg-[#091421]">
          {/* Background Image avec incrustation */}
          <div className="absolute inset-0">
             <img
              src="/pexels-man-on-phone-e2ivoip-business-1.jpg"
              alt="Assistants vocaux IA E2I VoIP"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Gradient Overlay et Grille Monolith */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-marine/90 via-[#091421]/80 to-red-primary/90 pointer-events-none z-10" />
            <div className="absolute inset-0 monolith-grid-lines opacity-20 pointer-events-none z-10" />
            <div className="absolute inset-0 pointer-events-none z-20" style={{ boxShadow: "inset 0 0 100px rgba(9,20,33,1)" }} />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30">
            <div className="text-center">
              {/* Badge IA */}
              <div className="inline-flex items-center text-red-primary font-black uppercase text-[10px] tracking-widest px-4 py-2 border border-red-primary/30 bg-red-primary/5 mb-6">
                <i className="lni lni-brain text-red-primary mr-2" aria-hidden="true"></i>
                Intelligence Artificielle
              </div>

              <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight">
                Assistants vocaux <span className="text-red-primary">IA</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/95 mb-4 max-w-4xl mx-auto leading-relaxed font-bold">
                Révolutionnez votre accueil téléphonique avec
                l&rsquo;intelligence artificielle
              </p>
              <p className="text-lg text-white/80 mb-10 max-w-3xl mx-auto">
                Offrez une expérience client exceptionnelle 24h/24. Vos
                appelants sont accueillis, qualifiés et orientés
                automatiquement, même en dehors de vos horaires
                d&rsquo;ouverture.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a href="#contact" className="monolith-btn bg-red-primary">
                  <span className="block text-white font-black uppercase text-xs tracking-widest px-8 py-4 flex items-center justify-center gap-2">
                    <i className="lni lni-comments" aria-hidden="true" />
                    Parler à un expert
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Section Introduction */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Colonne gauche : Texte explicatif */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-dark mb-6">
                  Réinventez votre réception téléphonique grâce à
                  l&rsquo;assistant vocal{" "}
                  <span className="text-red-primary">IA sur mesure</span>
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Vous savez mieux que personne que chaque appel entrant est une
                  opportunité : un client potentiel, un partenaire stratégique
                  ou une demande urgente. Pourtant, manquer un appel, faire
                  patienter vos prospects ou perdre du temps avec des demandes
                  non qualifiées peut impacter votre croissance.
                </p>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Et si vous pouviez offrir une réponse professionnelle 24h/24,
                  tout en recentrant vos équipes sur l&rsquo;essentiel ?
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  C&rsquo;est précisément ce que nous vous proposons avec notre{" "}
                  <strong>service d&rsquo;assistant vocal intelligent</strong>,
                  conçu pour les entrepreneurs comme vous, qui veulent gagner en
                  efficacité sans sacrifier la qualité de l&rsquo;accueil.
                </p>
              </div>

              {/* Colonne droite : Avantages clés */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-100 p-6 flex flex-col items-start border-t-4 border-t-red-primary">
                  <div className="bg-[#f8fafc] w-12 h-12 flex items-center justify-center mb-4 border border-gray-100">
                    <i className="lni lni-phone text-2xl text-red-primary"></i>
                  </div>
                  <h3 className="text-base font-bold text-[#091421] mb-2 uppercase tracking-wide">
                    Accueil 24/7
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Plus jamais un appel en absence. Votre assistant répond à
                    toute heure avec professionnalisme.
                  </p>
                </div>

                <div className="bg-white border border-gray-100 p-6 flex flex-col items-start border-t-4 border-t-[#091421]">
                  <div className="bg-[#f8fafc] w-12 h-12 flex items-center justify-center mb-4 border border-gray-100">
                    <i className="lni lni-users text-2xl text-[#091421]"></i>
                  </div>
                  <h3 className="text-base font-bold text-[#091421] mb-2 uppercase tracking-wide">
                    Qualification
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Identifiez les leads chauds, triez les demandes et fixez des
                    rendez-vous directement.
                  </p>
                </div>

                <div className="bg-white border border-gray-100 p-6 flex flex-col items-start border-t-4 border-t-red-primary">
                  <div className="bg-[#f8fafc] w-12 h-12 flex items-center justify-center mb-4 border border-gray-100">
                    <i className="lni lni-timer text-2xl text-red-primary"></i>
                  </div>
                  <h3 className="text-base font-bold text-[#091421] mb-2 uppercase tracking-wide">
                    Gain de temps
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Libérez 30% du temps de vos équipes en automatisant le
                    filtrage des appels.
                  </p>
                </div>

                <div className="bg-white border border-gray-100 p-6 flex flex-col items-start border-t-4 border-t-[#091421]">
                  <div className="bg-[#f8fafc] w-12 h-12 flex items-center justify-center mb-4 border border-gray-100">
                    <i className="lni lni-rocket text-2xl text-[#091421]"></i>
                  </div>
                  <h3 className="text-base font-bold text-[#091421] mb-2 uppercase tracking-wide">
                    ROI immédiat
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Convertissez plus d&rsquo;opportunités sans augmenter vos
                    effectifs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Les 3 piliers */}
        <section className="py-24 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-[#091421] mb-6 uppercase tracking-tight">
                Les 3 piliers de votre{" "}
                <span className="text-red-primary">assistant IA</span>
              </h2>
              <p className="text-lg text-gray-500 max-w-3xl mx-auto uppercase tracking-widest text-xs font-bold">
                Une solution complète pour transformer votre accueil
                téléphonique
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Pilier 1 */}
              <div className="bg-white border border-gray-100 hover:border-red-primary/30 transition-colors p-8 flex flex-col items-start border-t-4 border-t-red-primary">
                <div className="bg-[#f8fafc] w-16 h-16 flex items-center justify-center mb-6 border border-gray-100">
                  <i className="lni lni-phone text-3xl text-red-primary"></i>
                </div>
                <h3 className="text-xl font-bold text-[#091421] mb-4 uppercase tracking-wide">
                  Un accueil impeccable, 24h/24
                </h3>
                <p className="text-gray-500 leading-relaxed text-sm">
                  Plus jamais un appel en absence ou une première impression
                  bâclée. Votre assistant gère les appels hors horaires ou en
                  surcharge avec une courtoisie irréprochable.
                </p>
              </div>

              {/* Pilier 2 */}
              <div className="bg-white border border-gray-100 hover:border-[#091421]/30 transition-colors p-8 flex flex-col items-start border-t-4 border-t-[#091421]">
                <div className="bg-[#f8fafc] w-16 h-16 flex items-center justify-center mb-6 border border-gray-100">
                  <i className="lni lni-checkmark-circle text-3xl text-[#091421]"></i>
                </div>
                <h3 className="text-xl font-bold text-[#091421] mb-4 uppercase tracking-wide">
                  La qualification automatique
                </h3>
                <p className="text-gray-500 leading-relaxed text-sm">
                  Pose les bonnes questions pour identifier les leads chauds,
                  trier les demandes et même fixer des rendez-vous directement
                  dans votre agenda. Vous ne perdez plus de temps.
                </p>
              </div>

              {/* Pilier 3 */}
              <div className="bg-white border border-gray-100 hover:border-red-primary/30 transition-colors p-8 flex flex-col items-start border-t-4 border-t-red-primary">
                <div className="bg-[#f8fafc] w-16 h-16 flex items-center justify-center mb-6 border border-gray-100">
                  <i className="lni lni-user text-3xl text-red-primary"></i>
                </div>
                <h3 className="text-xl font-bold text-[#091421] mb-4 uppercase tracking-wide">
                  Un relais humain maîtrisé
                </h3>
                <p className="text-gray-500 leading-relaxed text-sm">
                  Si la conversation nécessite une intervention humaine (pour un
                  devis complexe, une réclamation…), l&rsquo;assistant transfère
                  intelligemment vers la bonne personne dans votre équipe.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section Cas d'usage */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-[#091421] mb-6 uppercase tracking-tight">
                Cas d&rsquo;
                <span className="text-red-primary">usage concrets</span>
              </h2>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cas 1 : Accueil et orientation */}
              <div className="bg-[#f8fafc] border border-gray-100 p-8 flex flex-col">
                <div className="bg-white w-12 h-12 flex items-center justify-center mb-6 border border-gray-200">
                  <i className="lni lni-phone text-2xl text-red-primary"></i>
                </div>
                <h3 className="text-xl font-bold text-[#091421] mb-4 uppercase tracking-wide">
                  Accueil et orientation
                </h3>
                <p className="text-gray-500 text-sm mb-6 flex-grow">
                  L&rsquo;assistant accueille vos appelants et les oriente vers
                  le bon service automatiquement.
                </p>
                <div className="bg-white p-4 border border-gray-200 border-l-4 border-l-[#091421]">
                  <p className="text-xs text-gray-500 italic font-medium leading-relaxed">
                    « Bonjour, vous êtes bien chez E2I VoIP. Pour le service
                    commercial, dites 'commercial', pour le support
                    technique, dites 'support'... »
                  </p>
                </div>
              </div>

              {/* Cas 2 : Prise de rendez-vous */}
              <div className="bg-[#f8fafc] border border-gray-100 p-8 flex flex-col">
                <div className="bg-white w-12 h-12 flex items-center justify-center mb-6 border border-gray-200">
                  <i className="lni lni-calendar text-2xl text-[#091421]"></i>
                </div>
                <h3 className="text-xl font-bold text-[#091421] mb-4 uppercase tracking-wide">
                  Prise de rendez-vous
                </h3>
                <p className="text-gray-500 text-sm mb-6 flex-grow">
                  Gestion automatique des plannings et confirmation des créneaux
                  disponibles.
                </p>
                <div className="bg-white p-4 border border-gray-200 border-l-4 border-l-red-primary">
                  <p className="text-xs text-gray-500 italic font-medium leading-relaxed">
                    « Je peux vous proposer un rendez-vous mardi 15 à 14h ou
                    mercredi 16 à 10h. Quelle option vous convient ? »
                  </p>
                </div>
              </div>

              {/* Cas 3 : Support niveau 1 */}
              <div className="bg-[#f8fafc] border border-gray-100 p-8 flex flex-col">
                <div className="bg-white w-12 h-12 flex items-center justify-center mb-6 border border-gray-200">
                  <i className="lni lni-headphone text-2xl text-red-primary"></i>
                </div>
                <h3 className="text-xl font-bold text-[#091421] mb-4 uppercase tracking-wide">
                  Support niveau 1
                </h3>
                <p className="text-gray-500 text-sm mb-6 flex-grow">
                  Réponses aux questions fréquentes et résolution des problèmes
                  simples.
                </p>
                <div className="bg-white p-4 border border-gray-200 border-l-4 border-l-[#091421]">
                  <p className="text-xs text-gray-500 italic font-medium leading-relaxed">
                    « Pour redémarrer votre téléphone IP, maintenez le bouton
                    power enfoncé 5 secondes... »
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Fonctionnalités */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-[#091421] mb-6 uppercase tracking-tight">
                Fonctionnalités{" "}
                <span className="text-red-primary">professionnelles</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Feature 1 */}
              <div className="bg-white border border-gray-100 hover:border-red-primary/30 transition-colors p-8 flex flex-col items-center justify-center text-center">
                <div className="bg-[#f8fafc] w-16 h-16 flex items-center justify-center mb-6 border border-gray-100">
                  <i className="lni lni-question-circle text-3xl text-red-primary"></i>
                </div>
                <h3 className="text-base font-bold text-[#091421] uppercase tracking-wider mb-2">
                  IA conversationnelle
                </h3>
                <p className="text-gray-500 text-xs uppercase tracking-wider">
                  Assistants vocaux intelligents capables de comprendre et répondre naturellement
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white border border-gray-100 hover:border-[#091421]/30 transition-colors p-8 flex flex-col items-center justify-center text-center">
                <div className="bg-[#f8fafc] w-16 h-16 flex items-center justify-center mb-6 border border-gray-100">
                  <i className="lni lni-timer text-3xl text-[#091421]"></i>
                </div>
                <h3 className="text-base font-bold text-[#091421] uppercase tracking-wider mb-2">
                  Disponibilité 24/7
                </h3>
                <p className="text-gray-500 text-xs uppercase tracking-wider">
                  Vos clients sont accueillis et orientés à toute heure, même en dehors des horaires
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white border border-gray-100 hover:border-red-primary/30 transition-colors p-8 flex flex-col items-center justify-center text-center">
                <div className="bg-[#f8fafc] w-16 h-16 flex items-center justify-center mb-6 border border-gray-100">
                  <i className="lni lni-users text-3xl text-red-primary"></i>
                </div>
                <h3 className="text-base font-bold text-[#091421] uppercase tracking-wider mb-2">
                  Personnalisation avancée
                </h3>
                <p className="text-gray-500 text-xs uppercase tracking-wider">
                  Adaptez le comportement et les réponses selon votre secteur d&rsquo;activité
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-white border border-gray-100 hover:border-[#091421]/30 transition-colors p-8 flex flex-col items-center justify-center text-center">
                <div className="bg-[#f8fafc] w-16 h-16 flex items-center justify-center mb-6 border border-gray-100">
                  <i className="lni lni-bolt text-3xl text-[#091421]"></i>
                </div>
                <h3 className="text-base font-bold text-[#091421] uppercase tracking-wider mb-2">
                  Intégration CRM
                </h3>
                <p className="text-gray-500 text-xs uppercase tracking-wider">
                  Connexion directe avec vos outils métier pour un service client optimisé
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section Contact avec formulaire HubSpot */}
        <ContactFormAssistantIA />

        {/* Section CTA Final */}
        <section className="py-24 bg-[#091421] relative overflow-hidden">
          {/* Monolith Grid overlay */}
          <div className="absolute inset-0 monolith-grid-lines opacity-20 pointer-events-none" />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight">
              Prêt à <span className="text-red-primary">révolutionner</span>{" "}
              votre accueil téléphonique ?
            </h2>
            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
              Rejoignez les entreprises qui ont déjà transformé leur relation
              client avec l&rsquo;intelligence artificielle.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a href="#contact" className="monolith-btn bg-red-primary">
                <span className="block text-white font-black uppercase text-xs tracking-widest px-8 py-4 flex items-center justify-center gap-2">
                  <i className="lni lni-comments" aria-hidden="true" />
                  Demander une démo
                </span>
              </a>
              <a href="tel:+33189560500" className="monolith-btn bg-white">
                <span className="block text-[#091421] font-black uppercase text-xs tracking-widest px-8 py-4 flex items-center justify-center gap-2">
                  <i className="lni lni-phone" aria-hidden="true" />
                  01 89 56 05 00
                </span>
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
