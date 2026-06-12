import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Trunk SIP Agents Vocaux IA — Numéros DOM Antilles-Guyane-Réunion | E2I VoIP",
  description:
    "E2I VoIP, carrier SIP DOM : numéros locaux +596, +590, +594, +262 et interconnexion SIP pour VAPI, Rounded, ElevenLabs, Jambonz. Trunk BYOC validé pour vos agents vocaux IA en zones DOM.",
  keywords:
    "trunk SIP agents vocaux IA, carrier SIP DOM, BYOC SIP DOM, numéros DOM Guadeloupe Martinique, revendeur SIP DOM France, interconnexion VAPI Rounded, SIP trunk Réunion Guyane, Jambonz DOM, ElevenLabs SIP DOM",
  openGraph: {
    title: "Trunk SIP Agents Vocaux IA — Numéros DOM | E2I VoIP",
    description:
      "Carrier SIP DOM pour intégrateurs IA. Numéros locaux +596, +590, +594, +262. Interconnexion validée VAPI, Rounded, ElevenLabs, Jambonz.",
    type: "website",
    locale: "fr_FR",
    url: "https://e2ivoip.fr/telephonie-entreprise/trunk-sip-agents-ia",
    siteName: "E2I VoIP",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trunk SIP Agents Vocaux IA — Numéros DOM | E2I VoIP",
    description:
      "Carrier SIP DOM pour intégrateurs IA. Numéros locaux Antilles-Guyane-Réunion. Trunk BYOC pour VAPI, Rounded, ElevenLabs, Jambonz.",
  },
};

export default function TrunkSipAgentsIALayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
