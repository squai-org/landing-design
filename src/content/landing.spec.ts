import { describe, expect, it } from 'vitest';
import * as content from './landing';

/** Walks every string in the content module, skipping technical keys. */
const TECHNICAL_KEYS = new Set(['id', 'href', 'src', 'poster', 'captionsSrc', 'imageId', 'avatarUrl', 'url', 'email', 'phone']);

function collectStrings(value: unknown, path: string[] = [], out: Array<{ path: string; text: string }> = []) {
  if (typeof value === 'string') {
    out.push({ path: path.join('.'), text: value });
  } else if (Array.isArray(value)) {
    value.forEach((item, idx) => collectStrings(item, [...path, String(idx)], out));
  } else if (value && typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) {
      if (TECHNICAL_KEYS.has(key)) continue;
      collectStrings(child, [...path, key], out);
    }
  }
  return out;
}

function collectByKey(value: unknown, keyPattern: RegExp, out: Array<{ path: string; text: string }> = [], path: string[] = []) {
  if (Array.isArray(value)) {
    value.forEach((item, idx) => collectByKey(item, keyPattern, out, [...path, String(idx)]));
  } else if (value && typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) {
      if (keyPattern.test(key) && typeof child === 'string') {
        out.push({ path: [...path, key].join('.'), text: child });
      } else {
        collectByKey(child, keyPattern, out, [...path, key]);
      }
    }
  }
  return out;
}

const allStrings = collectStrings(content);

describe('estructura de la guía', () => {
  it('ordena las 12 secciones como pide la guía', () => {
    expect(content.SECTION_ORDER.map((s) => s.guide)).toEqual([
      'Encabezado',
      'Datos clave',
      'Presentación',
      '¿Es para ti?',
      'Qué vas a lograr',
      'Cómo es el programa',
      'Programa',
      'Quiénes enseñan',
      'Lo que dicen',
      'Inscripción',
      'Preguntas frecuentes',
      'Pie de página',
    ]);
  });

  it('muestra fecha, horario y precio desde el encabezado', () => {
    const heroText = collectStrings(content.HERO).map((s) => s.text).join(' ');
    expect(heroText).toContain(content.PROGRAM.startDateShort);
    expect(heroText).toContain(content.PROGRAM.scheduleShort);
    expect(heroText).toContain(content.PROGRAM.priceCOP);
    expect(heroText).toContain(content.PROGRAM.priceUSD);
  });

  it('tiene un temario de 8 sesiones con fecha, en orden', () => {
    expect(content.SESSIONS.items).toHaveLength(8);
    content.SESSIONS.items.forEach((session, idx) => {
      expect(session.number).toBe(idx + 1);
      expect(session.date).toMatch(/^\w{3} \d{1,2} \w{3}$/u);
      expect(session.topic.length).toBeGreaterThan(8);
    });
  });

  it('cada sesión tiene una fecha ISO que coincide con su día y va en orden', () => {
    const WEEKDAYS = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
    let previous = 0;
    for (const session of content.SESSIONS.items) {
      expect(session.isoDate).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}-05:00$/);
      const when = new Date(session.isoDate);
      expect(Number.isNaN(when.getTime())).toBe(false);
      expect(when.getTime()).toBeGreaterThan(previous);
      previous = when.getTime();
      const weekday = WEEKDAYS[new Date(session.isoDate.slice(0, 10) + 'T12:00:00Z').getUTCDay()];
      expect(session.date.startsWith(weekday)).toBe(true);
      expect(session.date).toContain(String(Number(session.isoDate.slice(8, 10))));
    }
  });

  it('incluye exactamente 3 testimonios con nombre y contexto', () => {
    expect(content.TESTIMONIALS.quotes).toHaveLength(3);
    for (const quote of content.TESTIMONIALS.quotes) {
      expect(quote.text.length).toBeGreaterThan(20);
      expect(quote.author.length).toBeGreaterThan(2);
      expect(quote.context.length).toBeGreaterThan(2);
    }
  });

  it('publica cifras de personas formadas, charlas y organizaciones', () => {
    expect(content.MENTORS.stats.map((s) => s.label)).toEqual([
      'personas formadas',
      'charlas dictadas',
      'organizaciones atendidas',
    ]);
  });

  it('presenta a Laura Villada y a Sebastián Rico', () => {
    expect(content.MENTORS.people.map((p) => p.name)).toEqual(['Laura Villada', 'Sebastián Rico']);
    expect(allStrings.some((s) => /\bSebas\b/u.test(s.text))).toBe(false);
  });

  it('deja listo el video de presentación con subtítulos en español', () => {
    expect(content.PRESENTATION.video.captionsSrc).toMatch(/\.vtt$/);
    expect(content.PRESENTATION.video.captionsLang).toBe('es');
  });

  it('enlaza la política de devoluciones y la de tratamiento de datos', () => {
    const hrefs = content.FOOTER.legalLinks.map((l) => l.href);
    expect(hrefs).toContain('/politica-de-devoluciones.html');
    expect(hrefs).toContain('/politica-de-datos.html');
  });
});

describe('imágenes de Pexels', () => {
  it('no repite ninguna foto en toda la página', () => {
    const ids = JSON.stringify(content).match(/"imageId":\s*(\d+)/g) ?? [];
    const numbers = ids.map((m) => m.replace(/\D/g, ''));
    expect(numbers.length).toBeGreaterThanOrEqual(13);
    const dupes = numbers.filter((id, idx) => numbers.indexOf(id) !== idx);
    expect(dupes).toEqual([]);
  });

  it('describe cada foto con un texto alternativo', () => {
    const missing: string[] = [];
    const walk = (value: unknown, path: string) => {
      if (Array.isArray(value)) value.forEach((v, i) => walk(v, `${path}.${i}`));
      else if (value && typeof value === 'object') {
        const obj = value as Record<string, unknown>;
        if ('imageId' in obj && (typeof obj.alt !== 'string' || obj.alt.length < 8)) missing.push(path);
        for (const [k, v] of Object.entries(obj)) walk(v, `${path}.${k}`);
      }
    };
    walk(content, 'content');
    expect(missing).toEqual([]);
  });
});

describe('voz y tono de Squai', () => {
  const BANNED: Array<[string, RegExp]> = [
    ['raya larga', /[—–]/u],
    ['emoji', /\p{Extended_Pictographic}/u],
    ['signo de exclamación', /[!¡]/u],
    ['real / reales', /(?<!\p{L})reale?s?(?!\p{L})/iu],
    ['verdadero', /(?<!\p{L})verdader[oa]s?(?!\p{L})/iu],
    ['de verdad / en verdad', /(?<!\p{L})(de|en) verdad(?!\p{L})/iu],
    ['de una vez', /de una vez/iu],
    ['inteligencia artificial (usar IA)', /inteligencia artificial/iu],
    ['cohorte o curso (usar programa)', /(?<!\p{L})(cohortes?|cursos?)(?!\p{L})/iu],
    ['adjetivos vacíos', /(transformador|revolucionari|disruptiv)/iu],
    ['verbos de marketing', /(empoder|desbloque)/iu],
    ['clichés de época', /(mundo actual|era digital|mundo cada vez)/iu],
    ['urgencia falsa', /es (hora|momento) de/iu],
    ['promesa mágica', /descubre el poder/iu],
    ['contraste de corrección', /no es que/iu],
    ['frase sentencia', /\.\s+(Por eso|Así que)(?!\p{L})/u],
    ['usted', /(?<!\p{L})usted(es)?(?!\p{L})/iu],
  ];

  for (const [name, pattern] of BANNED) {
    it(`no usa ${name}`, () => {
      const hits = allStrings.filter((s) => pattern.test(s.text)).map((s) => `${s.path}: ${s.text}`);
      expect(hits).toEqual([]);
    });
  }

  it('escribe los CTA con hasta siete palabras y 45 caracteres', () => {
    const ctas = collectByKey(content, /^cta/i);
    expect(ctas.length).toBeGreaterThanOrEqual(8);
    const tooLong = ctas.filter((c) => c.text.trim().split(/\s+/).length > 7 || c.text.length > 45);
    expect(tooLong).toEqual([]);
  });

  it('no usa CTA genéricos', () => {
    const ctas = collectByKey(content, /^cta/i).map((c) => c.text.toLowerCase());
    for (const generic of ['más información', 'ver más', 'click aquí', 'saber más', 'leer más']) {
      expect(ctas).not.toContain(generic);
    }
  });
});
