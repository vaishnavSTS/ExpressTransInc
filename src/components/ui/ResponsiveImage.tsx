import { imageSrc, imageSrcSet, type SiteImage } from '../../data/images';

interface ResponsiveImageProps {
  image: SiteImage;
  sizes: string;
  className?: string;
  /** Above-the-fold images load eagerly with high priority; everything else is lazy. */
  priority?: boolean;
  /** Decorative usage (text conveys the meaning): empty alt so screen readers skip it. */
  decorative?: boolean;
}

export function ResponsiveImage({ image, sizes, className = '', priority = false, decorative = false }: ResponsiveImageProps) {
  return (
    <img
      src={imageSrc(image)}
      srcSet={imageSrcSet(image)}
      sizes={sizes}
      width={image.width}
      height={image.height}
      alt={decorative ? '' : image.alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
      className={className}
    />
  );
}
