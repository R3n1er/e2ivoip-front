import { Metadata } from "next";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata({
  title: "Trunk SIP Agents Vocaux IA — Numéros DOM Antilles-Guyane-Réunion | E2I VoIP",
  description:
    "E2I VoIP, carrier SIP DOM : numéros locaux +596, +590, +594, +262 et interconnexion SIP pour VAPI, Rounded, ElevenLabs, Jambonz. Trunk BYOC validé pour vos agents vocaux IA en zones DOM.",
  keywords:
    "trunk SIP agents vocaux IA, carrier SIP DOM, BYOC SIP DOM, numéros DOM Guadeloupe Martinique, revendeur SIP DOM France, interconnexion VAPI Rounded, SIP trunk Réunion Guyane, Jambonz DOM, ElevenLabs SIP DOM",
  path: "/telephonie-entreprise/trunk-sip-agents-ia",
});

export default function TrunkSipAgentsIALayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
