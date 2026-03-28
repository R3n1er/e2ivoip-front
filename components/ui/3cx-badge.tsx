import Link from "next/link";
import Image from "next/image";

export function ThreeCXBadge() {
  return (
    <Link
      href="https://www.3cx.fr/"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center space-x-3 bg-white rounded-none p-3 shadow-lg transition hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      {/* 3CX Silver Partner Badge Image */}
      <div className="relative w-32 h-16">
        <Image
          src="/images/logo-3CX-partner-e2i/3cx-Silver-Partner-badge.webp"
          alt="3CX Silver Partner Badge"
          fill
          className="object-contain"
          sizes="(max-width: 768px) 128px, 160px"
          priority
        />
      </div>
    </Link>
  );
}
