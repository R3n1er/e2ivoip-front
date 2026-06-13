import type { Metadata } from "next";

// La page devis-en-ligne est un client component ("use client") : les metadata
// ne peuvent pas y être exportées, on les définit donc via ce layout serveur.
export const metadata: Metadata = {
  title: "Devis en ligne — Trunk SIP, 3CX, portabilité & projets PBX",
  description:
    "Demandez votre devis VoIP gratuit en ligne : Trunk SIP, téléphonie 3CX, portabilité de numéros ou projet PBX sur mesure. Réponse sous 24h et accompagnement gratuit par les experts E2I VoIP.",
  keywords:
    "devis VoIP, devis trunk SIP, devis 3CX, portabilité numéro, devis téléphonie entreprise",
  alternates: { canonical: "/devis-en-ligne" },
  openGraph: {
    title: "Devis en ligne — Trunk SIP, 3CX & projets PBX | E2I VoIP",
    description:
      "Devis VoIP gratuit : Trunk SIP, 3CX, portabilité, projet PBX. Réponse sous 24h, accompagnement gratuit.",
    type: "website",
    locale: "fr_FR",
    url: "/devis-en-ligne",
    siteName: "E2I VoIP",
  },
};

export default function DevisEnLigneLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
