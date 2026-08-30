import { pageMetadata } from "@/lib/page-metadata";
import type { Metadata } from "next";

// La page devis-en-ligne est un client component ("use client") : les metadata
// ne peuvent pas y être exportées, on les définit donc via ce layout serveur.
export const metadata: Metadata = pageMetadata({
  title: "Devis en ligne — Trunk SIP, 3CX, portabilité & projets PBX",
  description:
    "Demandez votre devis VoIP gratuit en ligne : Trunk SIP, téléphonie 3CX, portabilité de numéros ou projet PBX sur mesure. Réponse rapide et accompagnement gratuit par les experts E2I VoIP.",
  keywords:
    "devis VoIP, devis trunk SIP, devis 3CX, portabilité numéro, devis téléphonie entreprise",
  path: "/devis-en-ligne",
});

export default function DevisEnLigneLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
