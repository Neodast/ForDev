import { Suspense } from 'react';

interface ImageProps {
  src: string;
  alt: string;
  className: string;
}

export function Image({ src, alt, className }: ImageProps) {
  return (
    <Suspense
      fallback={
        <div className='flex-1 items-center justify-center mt-16 h-96'>
          Img...
        </div>
      }
    >
      <img src={src} alt={alt} className={className} loading="lazy" />
    </Suspense>
  );
}