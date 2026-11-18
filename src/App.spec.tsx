import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import axe from 'axe-core';
import App from './App';
import * as primitives from './components/AardvarkPrimitives';
import { SECTION_ORDER, PROGRAM } from './content/landing';

function renderApp() {
  return render(<App />);
}

describe('landing: orden y estructura', () => {
  it('renderiza las 12 secciones en el orden de la guía', () => {
    const { container } = renderApp();
    const ids = SECTION_ORDER.map((s) => s.id);
    const found = ids.map((id) => container.querySelector(`#${id}`));
    expect(found.every(Boolean)).toBe(true);
    const positions = found.map((el) =>
      Array.from(container.querySelectorAll('[id]')).indexOf(el as Element)
    );
    expect([...positions].sort((a, b) => a - b)).toEqual(positions);
  });

  it('cada sección tiene un nombre accesible', () => {
    const { container } = renderApp();
    for (const { id } of SECTION_ORDER) {
      const el = container.querySelector(`#${id}`) as HTMLElement;
      const labelledBy = el.getAttribute('aria-labelledby');
      const label = el.getAttribute('aria-label') ?? (labelledBy ? document.getElementById(labelledBy)?.textContent : null);
      expect(label, `sección #${id}`).toBeTruthy();
    }
  });

  it('tiene un solo h1 y muestra fecha, horario y precio en el encabezado', () => {
    renderApp();
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    const hero = document.getElementById('inicio') as HTMLElement;
    expect(hero).toHaveTextContent(PROGRAM.startDateShort);
    expect(hero).toHaveTextContent(PROGRAM.scheduleShort);
    expect(hero).toHaveTextContent(PROGRAM.priceCOP);
  });

  it('lista las 8 sesiones del programa', () => {
    renderApp();
    const sessions = document.getElementById('sesiones') as HTMLElement;
    expect(within(sessions).getAllByRole('listitem')).toHaveLength(8);
  });

  it('muestra los testimonios como citas', () => {
    renderApp();
    const section = document.getElementById('testimonios') as HTMLElement;
    const quotes = section.querySelectorAll('blockquote');
    expect(quotes.length).toBeGreaterThanOrEqual(3);
  });

  it('enlaza las políticas en el pie de página', () => {
    renderApp();
    const footer = screen.getByRole('contentinfo');
    expect(within(footer).getByRole('link', { name: /devoluciones/i })).toHaveAttribute('href', '/politica-de-devoluciones.html');
    expect(within(footer).getByRole('link', { name: /tratamiento de datos/i })).toHaveAttribute('href', '/politica-de-datos.html');
  });
});

describe('sección de mentores', () => {
  it('nombra a Sebastián Rico y a Laura Villada', () => {
    renderApp();
    const section = document.getElementById('mentores') as HTMLElement;
    expect(within(section).getByRole('heading', { name: 'Sebastián Rico' })).toBeInTheDocument();
    expect(within(section).getByRole('heading', { name: 'Laura Villada' })).toBeInTheDocument();
  });

  it('elimina las ilustraciones de las tarjetas', () => {
    renderApp();
    const cards = screen.getAllByTestId('mentor-card');
    expect(cards).toHaveLength(2);
    for (const card of cards) {
      expect(card.querySelector('svg[viewBox="0 0 280 150"]')).toBeNull();
    }
    expect(primitives).not.toHaveProperty('MentorIllustration');
  });

  it('agranda la tarjeta y todos sus componentes un 30%', () => {
    renderApp();
    const card = screen.getAllByTestId('mentor-card')[0];
    const expected: Record<string, string> = {
      '--mc-w': '421px', // 324px base
      '--mc-min-h': '605px', // 465px
      '--mc-avatar': '153px', // 118px
      '--mc-avatar-top': '156px', // 120px
      '--mc-avatar-left': '57px', // 44px
      '--mc-stamp-offset': '26px', // 20px
      '--mc-stamp-font': '21px', // 16px
      '--mc-frame-pad': '18px', // 14px
      '--mc-frame-radius': '42px', // 32px
      '--mc-inner-radius': '29px', // 22px
      '--mc-inner-pad': '31px', // 24px
      '--mc-block-lg': '125px', // 96px
      '--mc-block-sm': '114px', // 88px
    };
    for (const [prop, value] of Object.entries(expected)) {
      expect(card.style.getPropertyValue(prop), prop).toBe(value);
    }
  });
});

describe('accesibilidad', () => {
  it('no tiene violaciones de axe (estructura, nombres, alt)', async () => {
    const { container } = renderApp();
    const results = await axe.run(container, {
      rules: {
        // jsdom no calcula estilos; el contraste se revisa en navegador.
        'color-contrast': { enabled: false },
      },
    });
    const summary = results.violations.map((v) => `${v.id}: ${v.nodes.length} → ${v.nodes[0]?.html.slice(0, 120)}`);
    expect(summary).toEqual([]);
  });

  it('todas las imágenes tienen alt (vacío solo si son decorativas)', () => {
    const { container } = renderApp();
    const imgs = Array.from(container.querySelectorAll('img'));
    expect(imgs.length).toBeGreaterThan(5);
    for (const img of imgs) {
      expect(img.hasAttribute('alt'), img.outerHTML.slice(0, 120)).toBe(true);
      if (img.getAttribute('alt') === '') {
        expect(img.closest('[aria-hidden="true"]'), img.outerHTML.slice(0, 120)).not.toBeNull();
      }
    }
  });
});
