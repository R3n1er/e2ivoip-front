import Image, { type ImageProps } from "next/image";

/**
 * Wrapper next/image avec suppressHydrationWarning pour neutraliser
 * les mutations DOM des extensions (Dark Reader, Grammarly, etc.).
 */
export function SafeImage(props: ImageProps) {
  return <Image {...props} suppressHydrationWarning />;
}

export default SafeImage;
