import { beforeAll, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PresentationSection } from './AardvarkInteractiveSections';
import { PRESENTATION } from '../content/landing';

// Separate file so motion's module state starts with reduced motion enabled.
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: query.includes('prefers-reduced-motion'),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }),
  });
});

describe('PresentationSection con movimiento reducido', () => {
  it('no fija el scroll y muestra la frase completa como texto', () => {
    render(<PresentationSection onMeetMentors={() => {}} />);
    expect(screen.queryByTestId('presentation-track')).toBeNull();
    const phrase = screen.getByText(PRESENTATION.curvedText);
    expect(phrase.closest('[aria-hidden="true"]')).toBeNull();
    expect(phrase.closest('.sr-only')).toBeNull();
  });
});
