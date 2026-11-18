import React from 'react';

export interface PresentationMediaProps {
  /** Ruta del video. Vacía mientras el video no exista: se muestra la foto. */
  src: string;
  poster: string;
  alt: string;
  captionsSrc: string;
  captionsLang: string;
  title: string;
}

export function PresentationMedia({ src, poster, alt, captionsSrc, captionsLang, title }: PresentationMediaProps) {
  if (!src) {
    return (
      <img
        src={poster}
        alt={alt}
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover"
      />
    );
  }

  return (
    <video
      controls
      playsInline
      preload="none"
      poster={poster}
      aria-label={title}
      className="w-full h-full object-cover bg-[#0A0C1A]"
    >
      <source src={src} type="video/mp4" />
      <track kind="captions" src={captionsSrc} srcLang={captionsLang} label="Español" default />
    </video>
  );
}
