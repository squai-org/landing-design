import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PresentationMedia } from './PresentationMedia';

const base = {
  poster: 'https://images.pexels.com/photos/1/pexels-photo-1.jpeg',
  alt: 'Dos personas explican frente a un tablero',
  captionsSrc: '/captions/presentacion-es.vtt',
  captionsLang: 'es',
  title: 'Video de presentación',
};

describe('PresentationMedia', () => {
  it('muestra la foto mientras no hay video', () => {
    render(<PresentationMedia {...base} src="" />);
    expect(screen.getByRole('img', { name: base.alt })).toBeInTheDocument();
    expect(document.querySelector('video')).toBeNull();
  });

  it('reproduce el video con subtítulos en español cuando existe', () => {
    render(<PresentationMedia {...base} src="/video/presentacion.mp4" />);
    const video = document.querySelector('video') as HTMLVideoElement;
    expect(video).not.toBeNull();
    expect(video).toHaveAttribute('controls');
    expect(video).toHaveAttribute('poster', base.poster);
    expect(video).toHaveAttribute('aria-label', base.title);
    const track = video.querySelector('track') as HTMLTrackElement;
    expect(track).toHaveAttribute('kind', 'captions');
    expect(track).toHaveAttribute('srclang', 'es');
    expect(track).toHaveAttribute('src', base.captionsSrc);
    expect(track).toHaveAttribute('default');
  });
});
