import type { Metadata } from "next";
import { HomePageContent } from "@/components/home-page-content";

// Le title et la description sont hérités du layout racine (ils y sont écrits
// pour la home). Seul le canonical est déclaré ici : le layout n'en fournit
// plus de valeur par défaut, pour éviter que les pages internes en héritent.
export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return <HomePageContent />;
}
