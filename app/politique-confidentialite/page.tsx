import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Politique de Confidentialité | E2I VoIP",
  description: "Politique de confidentialité et protection des données personnelles d'E2I VoIP. Découvrez comment nous collectons, utilisons et protégeons vos informations.",
  keywords: "politique confidentialité, RGPD, protection données, E2I VoIP, vie privée",
}

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold mb-8" style={{ color: '#2D3848' }}>
            Politique de Confidentialité
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-lg mb-6" style={{ color: '#818096' }}>
              <strong>Dernière mise à jour :</strong> Décembre 2024
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4" style={{ color: '#2D3848' }}>
                1. Identité du responsable de traitement
              </h2>
              <p style={{ color: '#818096' }}>
                E2I Assistance, société par actions simplifiée au capital de 10 000 euros, 
                immatriculée au RCS de Cayenne sous le numéro 824 123 456, dont le siège social 
                est situé au 123 Avenue de la République, 97300 Cayenne, Guyane française.
              </p>
              <p style={{ color: '#818096' }}>
                <strong>Téléphone :</strong> 05 94 96 35 00<br />
                <strong>Email :</strong> contact@e2i-voip.com
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4" style={{ color: '#2D3848' }}>
                2. Données personnelles collectées
              </h2>
              <p style={{ color: '#818096' }}>
                Dans le cadre de nos services de téléphonie IP et de nos activités commerciales, 
                nous sommes amenés à collecter et traiter les données personnelles suivantes :
              </p>
              <ul className="list-disc pl-6 mt-4" style={{ color: '#818096' }}>
                <li>Données d'identification : nom, prénom, raison sociale</li>
                <li>Données de contact : adresse postale, adresse email, numéro de téléphone</li>
                <li>Données professionnelles : fonction, entreprise, secteur d'activité</li>
                <li>Données de connexion : adresse IP, logs de connexion</li>
                <li>Données de navigation : cookies, pages visitées, durée de visite</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4" style={{ color: '#2D3848' }}>
                3. Finalités du traitement
              </h2>
              <p style={{ color: '#818096' }}>
                Vos données personnelles sont collectées et traitées pour les finalités suivantes :
              </p>
              <ul className="list-disc pl-6 mt-4" style={{ color: '#818096' }}>
                <li>Gestion des demandes de devis et de contact</li>
                <li>Fourniture de nos services de téléphonie IP</li>
                <li>Support technique et assistance client</li>
                <li>Facturation et gestion comptable</li>
                <li>Prospection commerciale (avec votre consentement)</li>
                <li>Amélioration de nos services et de notre site web</li>
                <li>Respect de nos obligations légales et réglementaires</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4" style={{ color: '#2D3848' }}>
                4. Vos droits
              </h2>
              <p style={{ color: '#818096' }}>
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              <ul className="list-disc pl-6 mt-4" style={{ color: '#818096' }}>
                <li><strong>Droit d'accès :</strong> obtenir une copie de vos données personnelles</li>
                <li><strong>Droit de rectification :</strong> corriger vos données inexactes</li>
                <li><strong>Droit à l'effacement :</strong> supprimer vos données dans certains cas</li>
                <li><strong>Droit à la limitation :</strong> limiter le traitement de vos données</li>
                <li><strong>Droit à la portabilité :</strong> récupérer vos données dans un format structuré</li>
                <li><strong>Droit d'opposition :</strong> vous opposer au traitement pour motifs légitimes</li>
              </ul>
              <p className="mt-4" style={{ color: '#818096' }}>
                Pour exercer ces droits, contactez-nous à : <strong>contact@e2i-voip.com</strong>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4" style={{ color: '#2D3848' }}>
                5. Cookies et technologies similaires
              </h2>
              <p style={{ color: '#818096' }}>
                Notre site utilise des cookies pour améliorer votre expérience de navigation. 
                Nous utilisons :
              </p>
              <ul className="list-disc pl-6 mt-4" style={{ color: '#818096' }}>
                <li><strong>Cookies essentiels :</strong> nécessaires au fonctionnement du site</li>
                <li><strong>Cookies analytiques :</strong> pour mesurer l'audience (Google Analytics, HubSpot)</li>
                <li><strong>Cookies de personnalisation :</strong> pour améliorer votre expérience</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4" style={{ color: '#2D3848' }}>
                6. Contact
              </h2>
              <p style={{ color: '#818096' }}>
                Pour toute question concernant cette politique de confidentialité :
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p style={{ color: '#2D3848' }}>
                  <strong>E2I Assistance</strong><br />
                  123 Avenue de la République<br />
                  97300 Cayenne, Guyane française<br />
                  <strong>Téléphone :</strong> 05 94 96 35 00<br />
                  <strong>Email :</strong> contact@e2i-voip.com
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}