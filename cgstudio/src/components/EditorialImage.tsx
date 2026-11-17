import React, { useState } from 'react';

interface EditorialImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
  fallbackTitle?: string;
}

export const EditorialImage: React.FC<EditorialImageProps> = ({
  src,
  alt,
  className = 'w-full h-full object-cover',
  containerClassName = '',
  priority = false,
  fallbackTitle = 'CG Studio by Cássia Gonçalves',
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-champagne/70 border border-sand/70 p-8 text-center ${containerClassName}`}
        role="img"
        aria-label={alt}
      >
        <span className="font-display text-3xl tracking-widest text-espresso mb-2">
          CG
        </span>
        <p className="font-display text-xl text-espresso">{fallbackTitle}</p>
        <p className="text-xs text-deep/75 mt-2 max-w-xs leading-relaxed">
          {alt}
        </p>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden bg-champagne/40 ${containerClassName}`}>
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding={priority ? 'sync' : 'async'}
        onError={() => setHasError(true)}
        className={className}
      />
    </div>
  );
};
