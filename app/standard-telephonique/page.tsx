import { Metadata } from "next";
import NextLink from "next/link";
import { pageMetadata } from "@/lib/page-metadata";
import { JsonLd } from "@/components/seo/json-ld";
import { CTAButton, CTAButtonMarine } from "@/components/ui/cta-button";
import { ContactSectionSimple } from "@/components/contact-section-simple";
import { FaqSection } from "@/components/faq-section";
import { FAQ_STANDARD_TELEPHONIQUE } from "@/lib/faq-data";
import {
  STANDARD_TELEPHONE_HUB,
  getPublishedTerritories,
  standardTelephoneHref,
} from "@/lib/territoires/standard-telephonique";
import { serviceSchema } from "@/lib/structured-data";
import {
  CheckCircle,
  Phone,
  Warning,
  ArrowRight,
  Shield,
  Users,
  MapPin,
} from "@/lib/icons";

export const metadata: Metadata = pageMetadata({
  title: STANDARD_TELEPHONE_HUB.title,
  description: STANDARD_TELEPHONE_HUB.description,
  keywords:
    "standard téléphonique, standard téléphonique entreprise, remplacer standard téléphonique, PABX, IPBX, standard hébergé, fin du réseau cuivre",
  path: standardTelephoneHref(),
});

export default function StandardTelephoniquePage() {
  const territories = getPublishedTerritories();

  return (
    <div className="min-h-screen bg-white">
      <main className="pt-20">
        {/* Hero — le sujet expliqué à un acheteur, pas à un technicien */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-primary/10 border border-red-primary/20 text-red-primary text-sm font-medium mb-6">
                <Phone size={16} className="mr-2" aria-hidden="true" />
                Standard téléphonique d&apos;entreprise
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-dark mb-6 leading-tight">
                Remplacer votre standard téléphonique{" "}
                <span className="text-red-primary">
                  en Guyane, aux Antilles et à La Réunion
                </span>
              </h1>
              <p className="text-xl text-gray-secondary leading-relaxed mb-8">
                Un seul numéro, les appels orientés vers la bonne personne, et
                la possibilité de joindre vos équipes depuis un poste, un
                ordinateur ou un mobile. Sans jargon et sans matériel obsolète
                dans un placard.
              </p>
              <p className="text-lg text-ui-muted leading-relaxed mb-8">
                Un seul interlocuteur pour le standard et la ligne qui le
                raccorde : nous sommes à la fois l&apos;
                <strong>opérateur</strong> du réseau et l&apos;
                <strong>intégrateur</strong> qui installe.
              </p>
              {/* « Demander un devis » ne peut pas être l'action principale
                  (ligne éditoriale) : il conditionne le visiteur à demander un
                  prix avant d'avoir vu la valeur. Sur une requête
                  informationnelle comme « standard téléphonique », c'est aussi
                  perdre celui qui découvre le sujet. */}
              <div className="flex flex-col sm:flex-row gap-4">
                <CTAButton href="/contact">
                  Faire le point sur votre installation
                </CTAButton>
                <CTAButtonMarine
                  href="/devis-en-ligne?service=standard-telephonique"
                  icon="ArrowRight"
                >
                  Demander un devis
                </CTAButtonMarine>
              </div>
            </div>
          </div>
        </section>

        {/* Le problème — la fermeture du cuivre, expliquée sans jargon */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-gray-dark mb-6">
              Le cuivre ferme. Votre standard actuel{" "}
              <span className="text-red-primary">suivra</span>.
            </h2>
            <div className="max-w-4xl space-y-4 text-lg text-ui-muted leading-relaxed">
              <p>
                Le réseau téléphonique historique en cuivre est démonté par
                Orange, sous contrôle de l&apos;Arcep. Le calendrier est découpé
                en <strong>lots de communes</strong>, et non par département :
                aux Antilles-Guyane, les premières communes sont{" "}
                <strong>déjà coupées depuis 2025</strong>, d&apos;autres
                basculent au 31 janvier 2027, et La Réunion suit en 2029.
              </p>
              <p>
                Concrètement, si votre standard est raccordé au cuivre, il cesse
                de fonctionner à la date de votre commune. C&apos;est aussi le cas
                d&apos;équipements qu&apos;on oublie souvent : fax, alarmes,
                terminaux de paiement, ascenseurs et télésurveillance, qui
                utilisent parfois encore la même ligne.
              </p>
            </div>
            <div className="mt-8 max-w-4xl rounded-lg border border-red-primary/20 bg-red-primary/5 p-6">
              <div className="flex items-start gap-3">
                <Warning
                  size={24}
                  className="text-red-primary shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div className="text-gray-dark">
                  <p className="font-semibold mb-2">
                    La date qui vous concerne n&apos;est pas celle du département
                  </p>
                  <p>
                    Le calendrier est découpé en lots de communes. Deux communes
                    d&apos;un même département peuvent basculer à un an
                    d&apos;écart. La date exacte se vérifie sur le calendrier
                    officiel Orange, celui que nous consultons lors de
                    l&apos;audit.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ce qu'on installe — traduction des termes techniques en usage */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-gray-dark mb-4">
              Ce que nous installons,{" "}
              <span className="text-red-primary">concrètement</span>
            </h2>
            <p className="text-lg text-gray-secondary mb-12 max-w-3xl">
              Trois façons de remplacer votre standard, selon la taille de
              l&apos;équipe et la façon dont vos appels arrivent.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-sm border border-ui-border">
                <div className="w-12 h-12 rounded-lg bg-red-primary/10 flex items-center justify-center mb-4">
                  <Users size={24} className="text-red-primary" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-gray-dark mb-3">
                  Standard hébergé partagé
                </h3>
                <p className="text-ui-muted mb-4">
                  La solution la plus simple : aucun matériel chez vous. Vos
                  postes sont facturés par utilisateur et par mois, et le
                  standard vit dans le cloud.
                </p>
                <ul className="space-y-2 text-sm text-ui-muted">
                  <li className="flex items-start gap-2">
                    <CheckCircle
                      size={16}
                      className="text-red-primary shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    Idéal jusqu&apos;à quelques dizaines de postes
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle
                      size={16}
                      className="text-red-primary shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    Accueil, transfert, messagerie inclus
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle
                      size={16}
                      className="text-red-primary shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    Poste IP, ordinateur ou mobile
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-sm border border-ui-border">
                <div className="w-12 h-12 rounded-lg bg-red-primary/10 flex items-center justify-center mb-4">
                  <Shield size={24} className="text-red-primary" aria-hidden="true" />
                </div>
                {/* « Instance dédiée » seul est du vocabulaire
                    d'infrastructure : personne ne le recherche, et un
                    dirigeant peut comprendre qu'on lui vend une machine à
                    poser dans ses locaux. Le H3 nomme donc la chose —
                    un serveur de téléphonie dans le cloud — et garde le
                    terme métier en apposition. */}
                <h3 className="text-xl font-bold text-gray-dark mb-3">
                  Serveur de téléphonie dans le cloud — l&apos;instance dédiée
                </h3>
                <p className="text-ui-muted mb-4">
                  Votre propre serveur de téléphonie dans le cloud, isolé, avec
                  vos règles de routage, vos files d&apos;attente et votre
                  superviseur qualité d&apos;appel. Rien à installer ni à
                  maintenir dans vos locaux.
                </p>
                <ul className="space-y-2 text-sm text-ui-muted">
                  <li className="flex items-start gap-2">
                    <CheckCircle
                      size={16}
                      className="text-red-primary shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    Pour les sites multi-bâtiments et les centres d&apos;appels
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle
                      size={16}
                      className="text-red-primary shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    Configuration sur mesure
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle
                      size={16}
                      className="text-red-primary shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    Hébergement France / UE, conforme RGPD
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-sm border border-ui-border">
                <div className="w-12 h-12 rounded-lg bg-red-primary/10 flex items-center justify-center mb-4">
                  <Phone size={24} className="text-red-primary" aria-hidden="true" />
                </div>
                {/* Le H3 garde le vocabulaire de l'acheteur — un dirigeant
                    cherche à « raccorder » son standard, il ne connaît pas
                    forcément le terme du métier. Celui-ci est posé dès la
                    première phrase du corps, en équivalence explicite : la
                    page reste lisible sans jargon tout en portant « Trunk
                    SIP », que les prospects avertis recherchent et sur
                    lequel deux pages dédiées existent. */}
                <h3 className="text-xl font-bold text-gray-dark mb-3">
                  Raccordement au réseau téléphonique — le Trunk SIP
                </h3>
                <p className="text-ui-muted mb-4">
                  Le Trunk SIP est le lien entre votre standard et le réseau
                  téléphonique public. Il se facture au canal d&apos;appel
                  simultané — pas par personne : c&apos;est lui qui détermine
                  combien d&apos;appels passent en même temps.
                </p>
                <ul className="space-y-2 text-sm text-ui-muted">
                  <li className="flex items-start gap-2">
                    <CheckCircle
                      size={16}
                      className="text-red-primary shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    2 à 4 canaux suffisent pour 5 à 10 postes
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle
                      size={16}
                      className="text-red-primary shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    Numéros locaux et portabilité incluses
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle
                      size={16}
                      className="text-red-primary shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    {/* Les deux formules ont chacune leur page : lier ici
                        donne au hub le maillage descendant qui lui manquait
                        vers le silo Trunk SIP, à l'endroit exact où le
                        lecteur se demande laquelle le concerne. */}
                    Facturation{" "}
                    <NextLink
                      href="/telephonie-entreprise/trunk-sip-compteur"
                      className="text-red-primary hover:underline"
                    >
                      au compteur
                    </NextLink>{" "}
                    ou{" "}
                    <NextLink
                      href="/telephonie-entreprise/trunk-sip-illimite"
                      className="text-red-primary hover:underline"
                    >
                      au forfait
                    </NextLink>
                  </li>
                </ul>
              </div>
            </div>

            <p className="mt-8 text-sm text-gray-secondary">
              Le détail technique de chaque brique est sur la page{" "}
              <NextLink
                href="/telephonie-entreprise"
                className="text-red-primary hover:underline"
              >
                téléphonie d&apos;entreprise
              </NextLink>
              . Cette page explique le sujet ; l&apos;autre explique les
              produits.
            </p>
          </div>
        </section>

        {/* Comment ça se passe */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-gray-dark mb-12">
              Comment ça se passe,{" "}
              <span className="text-red-primary">étape par étape</span>
            </h2>

            <ol className="grid md:grid-cols-4 gap-8">
              {[
                {
                  step: "1",
                  title: "Audit de l'existant",
                  text: "Nous regardons ce que vous avez : lignes, postes, date de fermeture du cuivre sur votre commune, équipements branchés sur la même ligne.",
                },
                {
                  step: "2",
                  title: "Proposition chiffrée",
                  text: "Combien de postes, combien de canaux simultanés, quelle solution. Un chiffre, pas une fourchette.",
                },
                {
                  step: "3",
                  title: "Installation et portabilité",
                  text: "Nous configurons le standard, demandons la portabilité de vos numéros et formons vos équipes. L'ancien reste actif jusqu'au basculement.",
                },
                {
                  step: "4",
                  title: "Support",
                  text: "Un interlocuteur joignable sur votre heure locale, par mail et par téléphone, du lundi au vendredi.",
                },
              ].map((item) => (
                <li key={item.step}>
                  <div className="w-10 h-10 rounded-full bg-red-primary text-white font-bold flex items-center justify-center mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold text-gray-dark mb-2">
                    {item.title}
                  </h3>
                  <p className="text-ui-muted text-sm leading-relaxed">
                    {item.text}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Déclinaisons territoriales — maillage interne, pas pages satellites */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-gray-dark mb-4">
              Où nous{" "}
              <span className="text-red-primary">intervenons</span>
            </h2>
            <p className="text-lg text-gray-secondary mb-12 max-w-3xl">
              Chaque territoire a son numéro local, ses zones
              d&apos;intervention et sa propre date de fermeture du réseau
              cuivre.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {territories.map((t) => (
                <NextLink
                  key={t.slug}
                  href={standardTelephoneHref(t.slug)}
                  className="group bg-white rounded-xl p-6 shadow-sm border border-ui-border hover:shadow-md hover:border-red-primary/30 transition-all"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin
                      size={18}
                      className="text-red-primary"
                      aria-hidden="true"
                    />
                    <h3 className="text-lg font-bold text-gray-dark group-hover:text-red-primary transition-colors">
                      {t.label}
                    </h3>
                  </div>
                  {/* L'indicatif n'est pas affiché : il est le préfixe du
                      numéro juste à côté (0594 → 05 94 96 35 00), donc il
                      répétait l'information sans rien y ajouter. Il reste
                      dans le registre, où un test vérifie qu'il préfixe
                      bien le numéro réel du territoire. */}
                  <p className="text-sm text-gray-secondary mb-3 font-mono tabular-nums">
                    {t.phone.number}
                  </p>
                  <p className="text-sm text-ui-muted">
                    {/* Fait accompli d'abord : une commune déjà coupée est une
                        preuve, une échéance future se discute. */}
                    {t.copper.alreadyClosed[0]
                      ? `Cuivre : ${t.copper.alreadyClosed[0].commune} déjà coupée`
                      : t.copper.scheduled[0]
                        ? `Cuivre : ${t.copper.scheduled[0].commune} au ${t.copper.scheduled[0].technicalDate}`
                        : "Calendrier cuivre à vérifier par commune"}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm text-red-primary mt-3 group-hover:gap-2 transition-all">
                    Voir la page <ArrowRight size={14} aria-hidden="true" />
                  </span>
                </NextLink>
              ))}
            </div>
          </div>
        </section>

        <FaqSection
          items={FAQ_STANDARD_TELEPHONIQUE}
          title="Questions fréquentes"
          subtitle="Ce que les dirigeants nous demandent avant de changer de standard"
        />

        <ContactSectionSimple />
      </main>

      <JsonLd
        data={{
          ...serviceSchema({
            name: "Standard téléphonique d'entreprise",
            description: STANDARD_TELEPHONE_HUB.description,
            path: standardTelephoneHref(),
          }),
          serviceType: "Standard téléphonique hébergé et IPBX",
          areaServed: getPublishedTerritories().map((t) => ({
            "@type": "AdministrativeArea",
            name: t.label,
          })),
        }}
      />
    </div>
  );
}
