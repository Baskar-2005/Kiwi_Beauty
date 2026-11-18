import {useState} from 'react';
import {Sparkles} from 'lucide-react';

interface StudioImageProps {
  src: string;
  alt: string;
  title?: string;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
  darkFallback?: boolean;
}

export function StudioImage({
  src,
  alt,
  title,
  className = '',
  imgClassName = '',
  eager = false,
  darkFallback = false,
}: StudioImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center p-6 text-center ${
          darkFallback
            ? 'bg-gradient-to-br from-[#1B1A1D] via-[#131214] to-[#0E0E10] text-[#F7F4EE]/80'
            : 'bg-gradient-to-br from-[#EAE2D6] via-[#F2ECE2] to-[#E5DBCC] text-[#141312]/70'
        } ${className}`}
        role="img"
        aria-label={alt}
      >
        <Sparkles className="h-5 w-5 opacity-50 mb-2" aria-hidden="true" />
        <span className="font-serif text-base tracking-wide">
          {title || 'Kiwi Studio'}
        </span>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onError={() => setFailed(true)}
        className={`w-full h-full object-cover transition-transform duration-700 ease-out ${imgClassName}`}
      />
    </div>
  );
}
