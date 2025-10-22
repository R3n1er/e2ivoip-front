import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Assistants Vocaux IA | Accueil Téléphonique Intelligent 24/7 | E2I VoIP",
  description:
    "Révolutionnez votre accueil téléphonique avec l'intelligence artificielle. Assistant vocal IA 24/7 pour qualification d'appels, prise de RDV et support client automatisé.",
  keywords:
    "assistant vocal IA, accueil téléphonique IA, téléphonie intelligente, automatisation appels, qualification leads, prise de rendez-vous automatique",
};

export default function AssistantsVocauxIALayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
