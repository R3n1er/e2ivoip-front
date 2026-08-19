import Link from "next/link";
import { SafeImage as Image } from "@/components/ui/safe-image";

/**
 * Badge partenaire 3CX Silver. Le fichier source est quasi carré (160×156) :
 * le conteneur suit ce ratio, sinon `object-contain` réduit le badge à la
 * moitié de sa taille utile dans une boîte au format paysage.
 */
export function ThreeCXBadge() {
  return (
    <Link
      href="https://www.3cx.fr/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="3CX Silver Partner — voir le site de notre partenaire"
      className="inline-flex flex-shrink-0 items-center justify-center rounded-lg bg-white p-5 shadow-lg transition hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-primary"
    >
      <div className="relative h-40 w-40">
        <Image
          src="/images/logo-3CX-partner-e2i/3cx-Silver-Partner-badge.webp"
          alt="3CX Silver Partner Badge"
          fill
          className="object-contain"
          sizes="160px"
        />
      </div>
    </Link>
  );
}
