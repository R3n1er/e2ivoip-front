import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BlogBreadcrumbProps {
  items: BreadcrumbItem[];
}

export function BlogBreadcrumb({ items }: BlogBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center flex-wrap gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.href} className="flex items-center gap-2">
              {isLast ? (
                <span
                  className="text-[10px] font-black uppercase tracking-[0.2em] text-[#091421]"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-red-primary transition-colors duration-200"
                >
                  {item.label}
                </Link>
              )}
              {!isLast && (
                <span className="text-[10px] text-gray-400" aria-hidden="true">
                  &gt;
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export interface BreadcrumbJsonLdItem {
  name: string;
  item: string;
}

export function generateBreadcrumbJsonLd(
  items: BreadcrumbItem[],
  baseUrl = "https://www.e2i-voip.com"
): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `${baseUrl}${item.href}`,
    })),
  };
}
