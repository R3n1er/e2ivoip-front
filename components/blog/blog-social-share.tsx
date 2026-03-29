interface BlogSocialShareProps {
  url: string;
  title: string;
}

export function BlogSocialShare({ url, title }: BlogSocialShareProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: "lni-linkedin-original",
      ariaLabel: `Partager sur LinkedIn : ${title}`,
    },
    {
      name: "Twitter / X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: "lni-twitter-original",
      ariaLabel: `Partager sur Twitter / X : ${title}`,
    },
    {
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: "lni-facebook-original",
      ariaLabel: `Partager sur Facebook : ${title}`,
    },
    {
      name: "Email",
      href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
      icon: "lni-envelope",
      ariaLabel: `Partager par email : ${title}`,
    },
  ];

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#091421] mr-2">
        Partager
      </span>
      {shareLinks.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target={link.name !== "Email" ? "_blank" : undefined}
          rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
          aria-label={link.ariaLabel}
          className="flex items-center justify-center w-9 h-9 border border-gray-200 rounded-none text-gray-500 hover:border-red-primary hover:text-red-primary transition-colors duration-200"
        >
          <i className={`lni ${link.icon}`} aria-hidden="true"></i>
        </a>
      ))}
    </div>
  );
}
