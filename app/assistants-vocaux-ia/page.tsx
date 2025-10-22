import { CTAButton, CTAButtonSecondary } from "@/components/ui/cta-button";
import { ContactFormAssistantIA } from "@/components/contact-form-assistant-ia";

export const dynamic = "force-dynamic";

export default function AssistantsVocauxIA() {
  return (
    <div className="min-h-screen bg-white">
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="/pexels-man-on-phone-e2ivoip-business-1.jpg"
              alt="Assistants vocaux IA E2I VoIP"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-marine/90 via-blue-marine/75 to-red-primary/85 pointer-events-none z-10"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              {/* Badge IA */}
              <div className="inline-flex items-center justify-center bg-white rounded-full px-6 py-3 mb-6 shadow-lg">
                <i className="lni lni-brain text-red-primary text-2xl mr-2"></i>
                <span className="text-gray-dark text-sm font-semibold">Intelligence Artificielle</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
                Assistants vocaux <span className="text-white">IA</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/95 mb-4 max-w-4xl mx-auto leading-relaxed">
                Révolutionnez votre accueil téléphonique avec l&rsquo;intelligence artificielle
              </p>
              <p className="text-lg text-white/90 mb-10 max-w-3xl mx-auto">
                Offrez une expérience client exceptionnelle 24h/24. Vos appelants sont accueillis, qualifiés et orientés automatiquement, même en dehors de vos horaires d&rsquo;ouverture.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <CTAButton href="#contact" icon="lni-comments">
                  Parler à un expert
                </CTAButton>
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
                  Réinventez votre réception téléphonique grâce à l&rsquo;assistant vocal{" "}
                  <span className="text-red-primary">IA sur mesure</span>
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Vous savez mieux que personne que chaque appel entrant est une opportunité : un client potentiel, un partenaire stratégique ou une demande urgente. Pourtant, manquer un appel, faire patienter vos prospects ou perdre du temps avec des demandes non qualifiées peut impacter votre croissance.
                </p>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Et si vous pouviez offrir une réponse professionnelle 24h/24, tout en recentrant vos équipes sur l&rsquo;essentiel ?
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  C&rsquo;est précisément ce que nous vous proposons avec notre <strong>service d&rsquo;assistant vocal intelligent</strong>, conçu pour les entrepreneurs comme vous, qui veulent gagner en efficacité sans sacrifier la qualité de l&rsquo;accueil.
                </p>
              </div>

              {/* Colonne droite : Avantages clés */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-red-primary/10 rounded-2xl p-6 border border-red-primary/20">
                  <div className="bg-white w-14 h-14 rounded-xl flex items-center justify-center mb-4 shadow-sm">
                    <i className="lni lni-comments-alt text-2xl text-red-primary"></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-dark mb-3">Accueil 24/7</h3>
                  <p className="text-gray-600">
                    Plus jamais un appel en absence. Votre assistant répond à toute heure avec professionnalisme.
                  </p>
                </div>

                <div className="bg-blue-marine/10 rounded-2xl p-6 border border-blue-marine/20">
                  <div className="bg-white w-14 h-14 rounded-xl flex items-center justify-center mb-4 shadow-sm">
                    <i className="lni lni-users text-2xl text-blue-marine"></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-dark mb-3">Qualification automatique</h3>
                  <p className="text-gray-600">
                    Identifiez les leads chauds, triez les demandes et fixez des rendez-vous directement.
                  </p>
                </div>

                <div className="bg-red-primary/10 rounded-2xl p-6 border border-red-primary/20">
                  <div className="bg-white w-14 h-14 rounded-xl flex items-center justify-center mb-4 shadow-sm">
                    <i className="lni lni-timer text-2xl text-red-primary"></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-dark mb-3">Gain de temps</h3>
                  <p className="text-gray-600">
                    Libérez 30% du temps de vos équipes en automatisant le filtrage des appels.
                  </p>
                </div>

                <div className="bg-blue-marine/10 rounded-2xl p-6 border border-blue-marine/20">
                  <div className="bg-white w-14 h-14 rounded-xl flex items-center justify-center mb-4 shadow-sm">
                    <i className="lni lni-rocket text-2xl text-blue-marine"></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-dark mb-3">ROI immédiat</h3>
                  <p className="text-gray-600">
                    Convertissez plus d&rsquo;opportunités sans augmenter vos effectifs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Les 3 piliers */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-dark mb-6">
                Les 3 piliers de votre <span className="text-red-primary">assistant IA</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Une solution complète pour transformer votre accueil téléphonique
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Pilier 1 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="bg-gradient-to-br from-red-primary to-red-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  <i className="lni lni-phone text-3xl text-white"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-dark mb-4">
                  Un accueil impeccable, 24h/24
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Plus jamais un appel en absence ou une première impression bâclée. Votre assistant gère les appels hors horaires ou en surcharge avec une courtoisie irréprochable.
                </p>
              </div>

              {/* Pilier 2 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="bg-gradient-to-br from-blue-marine to-blue-900 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  <i className="lni lni-checkmark-circle text-3xl text-white"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-dark mb-4">
                  La qualification automatique des opportunités
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Pose les bonnes questions pour identifier les leads chauds, trier les demandes et même fixer des rendez-vous directement dans votre agenda. Vous ne perdez plus de temps avec les appels non prioritaires.
                </p>
              </div>

              {/* Pilier 3 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="bg-gradient-to-br from-red-primary to-red-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  <i className="lni lni-user text-3xl text-white"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-dark mb-4">
                  Un relais humain maîtrisé
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Si la conversation nécessite une intervention humaine (pour un devis complexe, une réclamation…), l&rsquo;assistant transfère intelligemment vers la bonne personne dans votre équipe, avec un contexte clair.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section Cas d'usage */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-dark mb-6">
                Cas d&rsquo;<span className="text-red-primary">usage concrets</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Découvrez comment l&rsquo;assistant vocal IA peut transformer votre quotidien
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cas 1 : Accueil et orientation */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200">
                <div className="bg-red-primary/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  <i className="lni lni-phone text-3xl text-red-primary"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-dark mb-4">
                  Accueil et orientation
                </h3>
                <p className="text-gray-600 mb-6">
                  L&rsquo;assistant accueille vos appelants et les oriente vers le bon service automatiquement.
                </p>
                <div className="bg-blue-marine/5 p-4 rounded-lg border-l-4 border-blue-marine">
                  <p className="text-sm text-gray-700 italic">
                    « Bonjour, vous êtes bien chez E2I VoIP. Pour le service commercial, dites &lsquo;commercial&rsquo;, pour le support technique, dites &lsquo;support&rsquo;... »
                  </p>
                </div>
              </div>

              {/* Cas 2 : Prise de rendez-vous */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200">
                <div className="bg-blue-marine/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  <i className="lni lni-calendar text-3xl text-blue-marine"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-dark mb-4">
                  Prise de rendez-vous
                </h3>
                <p className="text-gray-600 mb-6">
                  Gestion automatique des plannings et confirmation des créneaux disponibles.
                </p>
                <div className="bg-red-primary/5 p-4 rounded-lg border-l-4 border-red-primary">
                  <p className="text-sm text-gray-700 italic">
                    « Je peux vous proposer un rendez-vous mardi 15 à 14h ou mercredi 16 à 10h. Quelle option vous convient ? »
                  </p>
                </div>
              </div>

              {/* Cas 3 : Support niveau 1 */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200">
                <div className="bg-red-primary/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  <i className="lni lni-headphone text-3xl text-red-primary"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-dark mb-4">
                  Support niveau 1
                </h3>
                <p className="text-gray-600 mb-6">
                  Réponses aux questions fréquentes et résolution des problèmes simples.
                </p>
                <div className="bg-blue-marine/5 p-4 rounded-lg border-l-4 border-blue-marine">
                  <p className="text-sm text-gray-700 italic">
                    « Pour redémarrer votre téléphone IP, maintenez le bouton power enfoncé 5 secondes... »
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-dark mb-6">
                Fonctionnalités <span className="text-red-primary">professionnelles</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Feature 1 */}
              <div className="bg-white rounded-2xl p-6 text-center border border-gray-200 shadow-sm hover:shadow-lg transition-shadow">
                <div className="bg-red-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="lni lni-question-circle text-3xl text-red-primary"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-dark mb-3">IA conversationnelle</h3>
                <p className="text-gray-600">
                  Assistants vocaux intelligents capables de comprendre et répondre naturellement
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white rounded-2xl p-6 text-center border border-gray-200 shadow-sm hover:shadow-lg transition-shadow">
                <div className="bg-blue-marine/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="lni lni-timer text-3xl text-blue-marine"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-dark mb-3">Disponibilité 24/7</h3>
                <p className="text-gray-600">
                  Vos clients sont accueillis et orientés à toute heure, même en dehors des horaires d&rsquo;ouverture
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white rounded-2xl p-6 text-center border border-gray-200 shadow-sm hover:shadow-lg transition-shadow">
                <div className="bg-red-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="lni lni-users text-3xl text-red-primary"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-dark mb-3">Personnalisation avancée</h3>
                <p className="text-gray-600">
                  Adaptez le comportement et les réponses selon votre secteur d&rsquo;activité
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-white rounded-2xl p-6 text-center border border-gray-200 shadow-sm hover:shadow-lg transition-shadow">
                <div className="bg-blue-marine/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="lni lni-bolt text-3xl text-blue-marine"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-dark mb-3">Intégration CRM</h3>
                <p className="text-gray-600">
                  Connexion directe avec vos outils métier pour un service client optimisé
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section Contact avec formulaire HubSpot */}
        <ContactFormAssistantIA />

        {/* Section CTA Final */}
        <section className="py-20 bg-gradient-to-r from-red-primary to-blue-marine relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Prêt à révolutionner votre accueil téléphonique ?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Rejoignez les entreprises qui ont déjà transformé leur relation client avec l&rsquo;intelligence artificielle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <CTAButton href="#contact" icon="lni-comments">
                Demander une démo
              </CTAButton>
              <CTAButtonSecondary href="tel:+33189560500" external icon="lni-phone">
                01 89 56 05 00
              </CTAButtonSecondary>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
