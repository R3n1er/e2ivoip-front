import Link from "next/link";
import Image from "next/image";

export function ThreeCXBadge() {
  return (
    <Link
      href="https://www.3cx.fr/"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center space-x-3 bg-white rounded-lg p-3 shadow-lg transition hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      {/* 3CX Bronze Partner Badge Image */}
      <div className="relative w-32 h-16">
        <Image
          src="/images/logo-3CX-partner-e2i/Bronze Partner badge-min.jpeg"
          alt="3CX Bronze Partner Badge"
          fill
          className="object-contain"
          sizes="(max-width: 768px) 128px, 160px"
        />
      </div>
    </Link>
  );
}
