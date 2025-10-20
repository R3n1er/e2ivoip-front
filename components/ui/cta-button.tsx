"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface CTAButtonProps {
  href: string;
  children: ReactNode;
  icon?: string;
  className?: string;
  onClick?: () => void;
  external?: boolean;
  fullWidth?: boolean;
}

export function CTAButton({ 
  href, 
  children, 
  icon, 
  className = "",
  onClick,
  external = false,
  fullWidth = false 
}: CTAButtonProps) {
  const buttonContent = (
    <button 
      onClick={onClick}
      className={`
        relative overflow-hidden 
        bg-red-primary text-white 
        font-semibold text-lg 
        px-12 py-5
        rounded-none border-0 
        shadow-md hover:shadow-xl 
        transform hover:-translate-y-0.5 active:translate-y-0 
        transition-all duration-200 
        group
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
    >
      <span className="relative z-10 flex items-center justify-center">
        {icon && <i className={`lni ${icon} mr-3 text-xl`}></i>}
        <span className="tracking-wide">{children}</span>
        <i className="lni lni-arrow-right ml-2 transition-transform group-hover:translate-x-1"></i>
      </span>
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-red-700 to-red-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
      {/* Click animation */}
      <div className="absolute inset-0 bg-black opacity-0 group-active:opacity-10 transition-opacity duration-150"></div>
    </button>
  );

  if (external) {
    const isTelOrMailto = href.startsWith("tel:") || href.startsWith("mailto:");
    return (
      <a
        href={href}
        suppressHydrationWarning={isTelOrMailto}
        {...(isTelOrMailto ? {} : { target: "_blank", rel: "noopener noreferrer" })}
        className="inline-block"
      >
        {buttonContent}
      </a>
    );
  }

  return (
    <Link href={href} className="inline-block">
      {buttonContent}
    </Link>
  );
}

// Variante bleu marine pour les CTA secondaires
export function CTAButtonMarine({ 
  href, 
  children, 
  icon, 
  className = "",
  onClick,
  external = false,
  fullWidth = false
}: CTAButtonProps) {
  const buttonContent = (
    <button 
      onClick={onClick}
      className={`
        relative overflow-hidden 
        bg-blue-marine text-white 
        font-semibold text-lg 
        px-12 py-5
        rounded-none border-0 
        shadow-md hover:shadow-xl 
        transform hover:-translate-y-0.5 active:translate-y-0 
        transition-all duration-200 
        group
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
    >
      <span className="relative z-10 flex items-center justify-center">
        {icon && <i className={`lni ${icon} mr-3 text-xl`}></i>}
        <span className="tracking-wide">{children}</span>
        <i className="lni lni-arrow-right ml-2 transition-transform group-hover:translate-x-1"></i>
      </span>
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-blue-marine opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
      {/* Click animation */}
      <div className="absolute inset-0 bg-black opacity-0 group-active:opacity-10 transition-opacity duration-150"></div>
    </button>
  );

  if (external) {
    const isTelOrMailto = href.startsWith("tel:") || href.startsWith("mailto:");
    return (
      <a
        href={href}
        suppressHydrationWarning={isTelOrMailto}
        {...(isTelOrMailto ? {} : { target: "_blank", rel: "noopener noreferrer" })}
        className="inline-block"
      >
        {buttonContent}
      </a>
    );
  }

  return (
    <Link href={href} className="inline-block">
      {buttonContent}
    </Link>
  );
}

// Variante secondaire outline pour les CTA moins importants
export function CTAButtonSecondary({ 
  href, 
  children, 
  icon, 
  className = "",
  onClick,
  external = false,
  fullWidth = false
}: CTAButtonProps) {
  const buttonContent = (
    <button 
      onClick={onClick}
      className={`
        relative overflow-hidden 
        bg-white text-red-primary 
        font-semibold text-lg 
        px-12 py-5
        rounded-none border-2 border-red-primary
        shadow-md hover:shadow-xl 
        transform hover:-translate-y-0.5 active:translate-y-0 
        transition-all duration-200 
        group
        hover:bg-red-primary hover:text-white
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
    >
      <span className="relative z-10 flex items-center justify-center">
        {icon && <i className={`lni ${icon} mr-3 text-xl`}></i>}
        <span className="tracking-wide">{children}</span>
        <i className="lni lni-arrow-right ml-2 transition-transform group-hover:translate-x-1"></i>
      </span>
      {/* Click animation */}
      <div className="absolute inset-0 bg-black opacity-0 group-active:opacity-10 transition-opacity duration-150"></div>
    </button>
  );

  if (external) {
    const isTelOrMailto = href.startsWith("tel:") || href.startsWith("mailto:");
    return (
      <a
        href={href}
        suppressHydrationWarning={isTelOrMailto}
        {...(isTelOrMailto ? {} : { target: "_blank", rel: "noopener noreferrer" })}
        className="inline-block"
      >
        {buttonContent}
      </a>
    );
  }

  return (
    <Link href={href} className="inline-block">
      {buttonContent}
    </Link>
  );
}
