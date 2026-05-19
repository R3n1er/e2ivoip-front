import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Trunk SIP DOM pour agents vocaux IA | Interconnexion VAPI, Rounded, ElevenLabs | E2I VoIP",
  description:
    "Numéros locaux Antilles-Guyane-Réunion et trunk SIP pour interconnecter vos agents vocaux IA (VAPI, Rounded, ElevenLabs, Jambonz). Carrier DOM — BYOC compatible.",
  keywords:
    "trunk SIP agents IA, BYOC DOM, interconnexion VAPI Martinique, numéro local Guadeloupe IA, SIP trunk Réunion, carrier SIP Antilles",
  openGraph: {
    title: "Trunk SIP DOM pour agents vocaux IA | E2I VoIP",
    description:
      "Numéros locaux DOM et trunk SIP pour interconnecter vos agents vocaux IA. Compatible VAPI, Rounded, ElevenLabs, Jambonz.",
    type: "website",
    locale: "fr_FR",
    url: "https://e2ivoip.fr/telephonie-entreprise/trunk-sip-agents-ia",
    siteName: "E2I VoIP",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trunk SIP DOM pour agents vocaux IA | E2I VoIP",
    description:
      "Carrier SIP DOM pour intégrateurs IA. Numéros locaux Antilles-Guyane-Réunion.",
  },
};

export default function TrunkSipAgentsIALayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
