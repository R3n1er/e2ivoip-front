import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politique de confidentialité | E2I VoIP',
  description: 'Notre politique de confidentialité - E2I ASSISTANCE',
  openGraph: {
    title: 'Politique de confidentialité | E2I VoIP',
    description: 'Notre politique de confidentialité - E2I ASSISTANCE',
  },
}

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="min-h-screen bg-base-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary mb-4">
              Politique de confidentialité
            </h1>
            <p className="text-xl text-base-content/70">E2I ASSISTANCE</p>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="lead">
              La société E2I ASSISTANCE est responsable du traitement des données que vous confiez à l'occasion de nos relations en ligne à travers ce site internet.
            </p>

            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD) en vigueur en Europe et à la Loi Informatique et Libertés, la société E2I ASSISTANCE vous informe des conditions d'utilisation et de protection de vos données et des moyens vous permettant d'exercer vos droits et recours.
            </p>

            <h2>1. Identité du responsable du traitement et moyens de contact</h2>
            <div className="bg-base-200 p-6 rounded-lg">
              <p><strong>E2I ASSISTANCE</strong></p>
              <p>Responsable du traitement des données personnelles</p>
              <p>Contact : via notre <a href="/contact" className="link link-primary">formulaire de contact</a></p>
            </div>

            <h2>2. Quelles sont les données recueillies et utilisées par notre société et pour quelles raisons ?</h2>
            <p>
              Notre société, selon les finalités des besoins, collecte et utilise vos données personnelles. Cela concerne plusieurs traitements.
            </p>

            <h3>2.1 Connaître nos visiteurs et améliorer notre site Internet</h3>
            <p>
              Le site peut collecter, lorsque vous l'y autorisez, des traces de votre navigation, appelées cookies. Ces traces, par défaut, ne sont pas collectées, sauf si vous l'acceptez par l'intermédiaire de notre bandeau concernant les cookies qui apparaît en page d'accueil. Elles sont utilisées par notre service informatique aux fins de statistiques et sont conservées 13 mois.
            </p>

            <h3>2.2 La gestion des demandes de contact</h3>
            <p>
              Le site peut collecter vos données à travers un formulaire de gestion de demande de contact. La base juridique de ce traitement est l'intérêt légitime de l'association. Les données concernent des données d'identification telles que le nom, prénom, e-mail, téléphone et des données d'information sur votre demande telles que l'objet, le détail de votre message et la date de votre demande. Les destinataires de vos données sont les services de l'association (informatique et service sollicité).
            </p>
            <p><strong>Les données sont conservées 2 ans.</strong></p>

            <h3>2.3 La gestion des candidatures</h3>
            <p>
              Le site peut collecter vos données à travers une demande de candidature afin de postuler à une offre d'emploi. La base juridique de ce traitement est l'intérêt légitime de la société et des relations pré-contractuelles. Les données concernent des données d'identification telles que le nom, prénom, e-mail téléphone, adresse, et des données d'information professionnelle sur votre candidature telles que le type de poste, la date de la demande, votre CV et vos motivations. Les destinataires de vos données sont les services de l'association (informatique et service sollicité).
            </p>
            <p><strong>Les données sont conservées 2 ans.</strong></p>

            <h3>2.4 La gestion des paiements</h3>
            <p>
              Les données de paiement sont traitées de manière sécurisée par nos prestataires de paiement certifiés, conformément aux standards de sécurité PCI DSS.
            </p>

            <h3>2.5 La gestion de vos images</h3>
            <p>
              Le site lorsque vous avez donné votre accord par écrit peut utiliser votre image. La base légale du traitement est votre consentement. La finalité est la diffusion de votre image dans le but de promouvoir les activités de la société. Les destinataires de vos données personnelles sont les visiteurs du site internet ou de tout média utilisé par la société. La durée de conservation des données correspond au temps de la durée de notre actualité et ne peut dépasser 10 ans.
            </p>

            <h2>3. Les lieux où vos données sont hébergées</h2>
            <p>
              Vos données sont stockées, en premier lieu, sur notre site, chez le prestataire hébergeur dûment conforme, puis sur nos serveurs en local. Dans le cas de certains traitements, vos données peuvent être stockées auprès de nos prestataires de services cloud comme Microsoft, Google, HubSpot.
            </p>

            <h2>4. Comment vos données sont-elles protégées ?</h2>
            <p>
              Afin de préserver la confidentialité et la sécurité de vos données personnelles et notamment de les protéger contre la destruction illicite ou accidentelle, la perte ou l'altération accidentelle ou encore la divulgation ou l'accès non autorisé, notre société a pris les mesures techniques et organisationnelles appropriées, conformément aux dispositions légales applicables, comme, par exemple, le chiffrement des données pendant les transmissions.
            </p>

            <h2>5. Contenu embarqué depuis d'autres sites internet</h2>
            <p>
              Les articles de ce site peuvent inclure des contenus intégrés (par exemple des vidéos, images, articles...). Le contenu intégré depuis d'autres sites se comporte de la même manière que si le visiteur se rendait sur cet autre site.
            </p>
            <p>
              Ces sites web pourraient collecter des données sur vous, utiliser des cookies, embarquer des outils de suivis tiers, suivre vos interactions avec ces contenus embarqués si vous disposez d'un compte connecté sur leur site web.
            </p>

            <h2>6. Vos droits</h2>
            <p>
              Vous disposez de droits dit informatique et libertés. Pour les exercer, vous pouvez nous écrire à notre adresse postale ou en nous écrivant par le <a href="/contact" className="link link-primary">formulaire de contact</a>.
            </p>

            <div className="bg-primary/10 p-6 rounded-lg">
              <h3>Les droits informatique et libertés sont les suivants :</h3>
              
              <h4><strong>Droit d'accès :</strong></h4>
              <p>
                Vous pouvez exercer votre droit d'accès pour connaître les données personnelles vous concernant. Dans ce cas, nous pourrons vous demander une preuve de votre identité pour en vérifier l'exactitude.
              </p>

              <h4><strong>Droit de rectification :</strong></h4>
              <p>
                Si les données personnelles détenues par l'association sont inexactes, vous pouvez demander la mise à jour de vos informations.
              </p>

              <h4><strong>Droit d'effacement ou « droit à l'oubli » :</strong></h4>
              <p>
                Vous pouvez demander la suppression de vos données à caractère personnel dans les conditions prévues par l'article 18 du RGPD.
              </p>

              <h4><strong>Droit à la limitation du traitement :</strong></h4>
              <p>
                Vous avez le droit de demander à l'association de limiter le traitement de vos données personnelles conformément aux hypothèses prévues par l'article 18 du RGPD.
              </p>

              <h4><strong>Droit à la portabilité des données :</strong></h4>
              <p>
                Vous pouvez demander à l'association de vous remettre vos données pour les transmettre à un tiers dans les conditions prévues par l'article 20 du RGPD.
              </p>

              <h4><strong>Droit d'opposition :</strong></h4>
              <p>
                Vous pouvez vous opposer à ce que vos données soient traitées conformément aux hypothèses prévues par l'article 21 du RGPD.
              </p>
            </div>

            <div className="alert alert-info">
              <div>
                <h4><strong>Délai de réponse</strong></h4>
                <p>
                  Toute demande d'exercice de vos droits fera l'objet d'un contrôle d'identité proportionné à la demande. Une réponse vous sera adressée dans le délai d'un mois suivant la réception de la demande.
                </p>
              </div>
            </div>

            <h3>Réclamation (plainte) auprès de la CNIL :</h3>
            <p>
              Si vous estimez, après nous avoir contactés, que vos droits « Informatique et Libertés » ne sont pas respectés, vous pouvez adresser une réclamation à la CNIL.
            </p>

            <div className="text-center mt-12 p-8 bg-base-200 rounded-lg">
              <h3>Nous sommes certifiés !</h3>
              <p>
                E2I Assistance est partenaire <strong>3CX Bronze</strong> et certifié ! 
                Visitez le site internet de notre partenaire et souscrivez à une version d'évaluation du standard téléphonique.
              </p>
              <a 
                href="https://www.3cx.fr/pabx/download-pabx-ip/?resellerId=208715" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-primary mt-4"
              >
                Découvrir 3CX
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}