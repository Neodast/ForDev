interface ImageProps {
  src: string;
  alt: string;
  className: string;
}

export default function FooterImage({ src, alt, className }: ImageProps) {
  return <img src={src} alt={alt} className={className} />;
}
