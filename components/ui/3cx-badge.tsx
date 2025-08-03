import Image from "next/image"

export function ThreeCXBadge() {
  return (
    <div className="flex items-center space-x-3 bg-white rounded-lg p-3 shadow-lg">
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
    </div>
  )
} 