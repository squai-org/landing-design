/**
 * Contenido de la landing "Fundamentos de IA para el Trabajo".
 *
 * Todo el texto que ve la persona vive aquí, en el orden de la guía de
 * secciones. Los datos marcados con `MUESTRA` son provisionales: el equipo
 * los está recopilando y se reemplazan sin tocar los componentes
 * (fechas, temario, testimonios, cifras, logos, video y datos legales).
 */
import { PROGRAM_PRICES, formatMoney } from '../utils/pricing';

export function pexelsUrl(imageId: number, width = 900): string {
  return `https://images.pexels.com/photos/${imageId}/pexels-photo-${imageId}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;
}

export interface PhotoContent {
  imageId: number;
  alt: string;
}

// MUESTRA: fecha, horario y cupos por confirmar.
export const PROGRAM = {
  name: 'Fundamentos de IA para el Trabajo',
  startDateShort: '2 de febrero',
  startDateLong: 'martes 2 de febrero de 2027',
  scheduleShort: 'Martes y jueves, 7:00 p. m.',
  scheduleLong: 'Martes y jueves de 7:00 a 8:30\u00a0p.\u00a0m., hora de Colombia',
  sessions: 8,
  seats: 25,
  priceCOP: formatMoney(PROGRAM_PRICES.COP, 'COP'),
  priceUSD: formatMoney(PROGRAM_PRICES.USD, 'USD'),
} as const;

export const SECTION_ORDER = [
  { id: 'inicio', guide: 'Encabezado' },
  { id: 'incluye', guide: 'Datos clave' },
  { id: 'presentacion', guide: 'Presentación' },
  { id: 'para-ti', guide: '¿Es para ti?' },
  { id: 'logros', guide: 'Qué vas a lograr' },
  { id: 'como-funciona', guide: 'Cómo es el programa' },
  { id: 'sesiones', guide: 'Programa' },
  { id: 'mentores', guide: 'Quiénes enseñan' },
  { id: 'testimonios', guide: 'Lo que dicen' },
  { id: 'inscripcion', guide: 'Inscripción' },
  { id: 'preguntas', guide: 'Preguntas frecuentes' },
  { id: 'contacto', guide: 'Pie de página' },
] as const;

export const NAV = {
  items: [
    { id: 'incluye', label: 'El programa' },
    { id: 'sesiones', label: 'Sesiones' },
    { id: 'mentores', label: 'Quiénes enseñan' },
    { id: 'preguntas', label: 'Preguntas' },
  ],
  ctaHeader: 'Inscribirme',
  ctaMobile: 'Inscribirme al programa',
};

/* 1. Encabezado: ¿qué es y es para mí? */
export const HERO = {
  // Mismo largo que el título de la referencia (33 caracteres) para que el
  // encabezado completo quepa en la primera pantalla.
  title: 'IA para tu trabajo, sin vueltas.',
  lead: 'Ocho sesiones en vivo para entender cómo funciona la IA, pedirle bien las cosas y cuidar tu información, pensadas para quienes ya la usan en su trabajo.',
  ctaPrimary: 'Inscribirme al programa',
  ctaSecondary: 'Ver las 8 sesiones',
  note: `Desde el ${PROGRAM.startDateShort} · ${PROGRAM.priceCOP} o ${PROGRAM.priceUSD}`,
  cardLive: {
    title: 'Programa en vivo',
    note: PROGRAM.scheduleShort,
    imageId: 3184291,
    alt: 'Equipo conversa alrededor de una mesa con portátiles durante una sesión práctica',
  },
  cardNoCode: {
    title: 'Sin saber programar',
    note: 'Empiezas desde lo que ya haces',
    imageId: 3182812,
    alt: 'Grupo de colegas sonríe mientras revisa algo en un portátil',
  },
};

/* 2. Datos clave: ¿qué incluye? */
export const INCLUDES = {
  title: 'Lo que incluye.',
  lead: 'Clases en vivo para aprender juntos y material para repasar a tu ritmo.',
  handwritten: 'Un mes, dos clases por semana',
  ctaCard: 'Inscribirme',
  cards: [
    {
      id: 'en-vivo',
      title: '8 sesiones en vivo',
      note: 'Clases de 90 minutos en línea, con tiempo para resolver tus dudas en cada una.',
      tags: ['En línea', '90 min'],
      photo: {
        imageId: 4226140,
        alt: 'Mujer en una videollamada con su grupo de clase mientras toma notas',
      },
    },
    {
      id: 'grabaciones',
      title: 'Grabación de cada clase',
      note: 'Si un día no puedes conectarte, la ves después y nos escribes tus preguntas.',
      tags: ['6 meses de acceso', 'A tu ritmo'],
      photo: {
        imageId: 4458554,
        alt: 'Mujer con audífonos mira una clase en su portátil desde el sofá',
      },
    },
    {
      id: 'guia',
      title: 'Guía y plantillas',
      note: 'Una guía por sesión con instrucciones listas para copiar, ajustar y usar en tu trabajo.',
      tags: ['PDF', 'Editables'],
      mockup: 'guide' as const,
    },
    {
      id: 'certificado',
      title: 'Certificado',
      note: 'Lo recibes al asistir al menos a 6 de las 8 sesiones.',
      tags: ['Digital', 'Con tu nombre'],
      mockup: 'certificate' as const,
    },
  ],
  // MUESTRA: textos de la portada de la guía y del certificado.
  guideMockup: {
    label: 'Guía de la sesión 3',
    title: 'Pedirle las cosas a la IA',
    steps: ['Di para quién es', 'Explica el objetivo', 'Pide un formato'],
  },
  certificateMockup: {
    label: 'Certificado de participación',
    program: PROGRAM.name,
    awardedTo: 'Tu nombre aquí',
    detail: '8 sesiones en vivo · 12 horas',
  },
};

/* 3. Presentación: ¿quién me va a enseñar? */
export const PRESENTATION = {
  title: 'Aprende IA, potencia tus habilidades.',
  handwritten: 'Laura y Sebastián te lo cuentan',
  lead: 'En este video de tres minutos te contamos para quién es el programa, cómo son las clases y qué te llevas al terminar.',
  body: 'Lo grabamos con subtítulos en español para que lo veas donde estés, incluso sin sonido.',
  cta: 'Conocer a Laura y Sebastián',
  // MUESTRA: cuando el video esté listo, se pone su ruta en `src`.
  video: {
    src: '',
    imageId: 3184403,
    alt: 'Dos personas sostienen un globo de diálogo frente a un tablero',
    captionsSrc: '/captions/presentacion-es.vtt',
    captionsLang: 'es',
    title: 'Video de presentación del programa',
  },
  mediaTitle: 'Video de presentación',
  mediaNoteReady: 'Con subtítulos en español',
  mediaNotePending: 'Muy pronto, con subtítulos',
  logosLabel: 'Han confiado en nosotros',
  // MUESTRA: reemplazar por logos autorizados.
  logos: ['Nodo', 'Aula 21', 'Cumbre', 'Ruta Pyme'],
};

/* 4. ¿Es para ti? ¿Entienden mi caso? */
export const AUDIENCE = {
  title: '¿Te ves en alguno de estos casos?',
  handwritten: 'Pasa el cursor o toca tu caso',
  cta: 'Quiero aprender para mi caso',
  defaultId: 'diario',
  items: [
    {
      id: 'diario',
      label: 'Usas IA a diario',
      example: 'Le pides cosas todos los días y las respuestas te salen genéricas, así que terminas reescribiéndolas.',
      images: [
        { imageId: 5940721, alt: 'Manos escriben en un portátil sobre un escritorio blanco' },
        { imageId: 3769021, alt: 'Mujer sonriente junto a su portátil' },
      ],
    },
    {
      id: 'equipo',
      label: 'Lideras un equipo',
      example: 'Tu equipo ya usa IA, pero cada quien le pregunta a su manera y nadie sabe qué datos se pueden compartir.',
      images: [
        { imageId: 3184325, alt: 'Equipo reunido alrededor de una mesa con portátiles' },
        { imageId: 3184405, alt: 'Líder de equipo sonríe con su grupo trabajando detrás' },
      ],
    },
    {
      id: 'negocio',
      label: 'Tienes tu negocio',
      example: 'Haces de todo en tu empresa y quieres que la IA te ayude con correos, cotizaciones y redes sin pagar diez herramientas.',
      images: [
        { imageId: 3184292, alt: 'Manos revisan gráficas impresas sobre una mesa' },
        { imageId: 3182765, alt: 'Dos personas conversan de pie en una oficina' },
      ],
    },
    {
      id: 'ensenas',
      label: 'Enseñas o formas',
      example: 'Tus estudiantes ya la usan para sus tareas y quieres entenderla para guiarlos con criterio.',
      images: [
        { imageId: 5212345, alt: 'Profesor frente al tablero mientras sus estudiantes levantan la mano' },
        { imageId: 5212317, alt: 'Profesora sonriente frente a un tablero con fórmulas' },
      ],
    },
    {
      id: 'vendes',
      label: 'Vendes y propones',
      example: 'Armas cotizaciones y propuestas, y quieres que cada una suene a ti y le hable a ese cliente.',
      images: [
        { imageId: 3184418, alt: 'Varias manos juntas sobre una mesa de trabajo' },
        { imageId: 3184416, alt: 'Dos personas se dan la mano al cerrar un acuerdo' },
      ],
    },
    {
      id: 'empiezas',
      label: 'Estás empezando',
      example: 'Te da curiosidad, pero no sabes por dónde empezar ni en qué herramienta confiar.',
      images: [
        { imageId: 4050315, alt: 'Persona trabaja en su portátil desde una mesa blanca, vista desde arriba' },
        { imageId: 3153198, alt: 'Grupo de colegas se ríe frente a un portátil' },
      ],
    },
  ],
};

/* 5. Qué vas a lograr: ¿qué gano? */
export const OUTCOMES = {
  title: 'Lo que vas a lograr.',
  lead: 'Cinco cosas que harás en tu trabajo con la IA que ya usas.',
  pills: [
    'Pedirle bien a la IA',
    'Revisar lo que responde',
    'Cuidar tus datos',
    'Elegir la herramienta',
    'Armar tus rutinas',
  ],
};

/* 6. Cómo es el programa: ¿cómo funciona? */
export const FLOW = {
  title: 'Cómo funciona.',
  handwritten: 'Cuatro pasos y ninguna letra pequeña',
  cta: 'Empezar mi inscripción',
  steps: [
    {
      step: 'Paso #1',
      title: 'Te inscribes en línea',
      copy: 'Dejas tu nombre, correo y WhatsApp, y pagas en la pasarela segura con el medio que prefieras.',
    },
    {
      step: 'Paso #2',
      title: 'Recibes tu acceso',
      copy: 'Te llega por correo el enlace de las clases y la guía de la primera sesión.',
    },
    {
      step: 'Paso #3',
      title: 'Practicas en vivo',
      copy: 'En cada clase explicamos un tema y lo pruebas con un caso de tu trabajo, con nosotros al lado.',
    },
    {
      step: 'Paso #4',
      title: 'Repasas y preguntas',
      copy: 'Entre clases ves la grabación, usas las plantillas y nos escribes por WhatsApp si algo no te sale.',
    },
  ],
};

/* 7. Programa: ¿qué voy a ver y cuándo? MUESTRA: temario y fechas.
   Se presenta como el carrusel "Our Nov books" de la referencia: una
   tarjeta por sesión con portada, etiquetas, título y resumen. */
export const SESSIONS = {
  title: 'Ocho sesiones, en un mes.',
  lead: `Empezamos el ${PROGRAM.startDateShort}. Dos clases por semana, de 90 minutos cada una.`,
  note: PROGRAM.scheduleLong,
  cta: 'Reservar mi cupo',
  prevLabel: 'Ver sesiones anteriores',
  nextLabel: 'Ver sesiones siguientes',
  time: '7:00 p. m.',
  items: [
    {
      number: 1,
      date: 'mar 2 feb',
      isoDate: '2027-02-02T19:00-05:00',
      topic: 'Cómo funciona la IA por dentro',
      copy: 'Qué pasa cuando le escribes y por qué a veces responde con seguridad algo que no es cierto.',
      tags: ['Fundamentos', 'En vivo'],
      illustration: { src: '/illustrations/sesiones/sesion-1.svg', alt: 'Persona señala hacia arriba junto a un chip con una chispa: cómo funciona la IA por dentro' },
    },
    {
      number: 2,
      date: 'jue 4 feb',
      isoDate: '2027-02-04T19:00-05:00',
      topic: 'Qué hace bien y dónde se equivoca',
      copy: 'Las tareas donde te ahorra horas y las señales que indican que no deberías confiarle algo.',
      tags: ['Criterio', 'En vivo'],
      illustration: { src: '/illustrations/sesiones/sesion-2.svg', alt: 'Persona encoge los hombros entre un globo con un error y otro con un acierto' },
    },
    {
      number: 3,
      date: 'mar 9 feb',
      isoDate: '2027-02-09T19:00-05:00',
      topic: 'Cómo pedirle las cosas (prompts)',
      copy: 'Una estructura sencilla para escribir instrucciones claras y obtener respuestas útiles.',
      tags: ['Prompts', 'Práctica'],
      illustration: { src: '/illustrations/sesiones/sesion-3.svg', alt: 'Persona escribe en su celular junto a un globo de mensaje con un texto a medio escribir' },
    },
    {
      number: 4,
      date: 'jue 11 feb',
      isoDate: '2027-02-11T19:00-05:00',
      topic: 'Darle contexto, ejemplos y formato',
      copy: 'Cómo compartir lo que sabes de tu caso para que la respuesta suene a ti y no a un robot.',
      tags: ['Prompts', 'Práctica'],
      illustration: { src: '/illustrations/sesiones/sesion-4.svg', alt: 'Persona lee una hoja junto a documentos con una lista y un bloque de formato' },
    },
    {
      number: 5,
      date: 'mar 16 feb',
      isoDate: '2027-02-16T19:00-05:00',
      topic: 'Revisar y corregir lo que responde',
      copy: 'Una lista de chequeo para detectar errores, datos inventados y tonos que no van.',
      tags: ['Criterio', 'Práctica'],
      illustration: { src: '/illustrations/sesiones/sesion-5.svg', alt: 'Persona con gafas trabaja en su portátil junto a un documento y una lupa' },
    },
    {
      number: 6,
      date: 'jue 18 feb',
      isoDate: '2027-02-18T19:00-05:00',
      topic: 'Cuidar tu información y la de tus clientes',
      copy: 'Qué datos nunca compartir, cómo anonimizarlos y qué ajustes revisar en cada herramienta.',
      tags: ['Seguridad', 'En vivo'],
      illustration: { src: '/illustrations/sesiones/sesion-6.svg', alt: 'Persona de brazos cruzados junto a un escudo con candado' },
    },
    {
      number: 7,
      date: 'mar 23 feb',
      isoDate: '2027-02-23T19:00-05:00',
      topic: 'Rutinas para correos, resúmenes y reportes',
      copy: 'Armamos plantillas para las tareas que repites cada semana y las dejamos listas para usar.',
      tags: ['Rutinas', 'Plantillas'],
      illustration: { src: '/illustrations/sesiones/sesion-7.svg', alt: 'Persona toma café junto a un sobre de correo y un reloj' },
    },
    {
      number: 8,
      date: 'jue 25 feb',
      isoDate: '2027-02-25T19:00-05:00',
      topic: 'Tu plan para usarla en tu trabajo',
      copy: 'Sales con un plan de 30 días para aplicar lo aprendido en tu rol, con nuestra revisión.',
      tags: ['Plan', 'Cierre'],
      illustration: { src: '/illustrations/sesiones/sesion-8.svg', alt: 'Persona señala un camino con pasos completados que termina en una bandera' },
    },
  ],
};

/* Franja de datos a la vista: fecha, horario y precio. */
export const KEY_FACTS = {
  summary: `Empieza el ${PROGRAM.startDateShort}. ${PROGRAM.scheduleLong}. Cuesta ${PROGRAM.priceCOP} en Colombia o ${PROGRAM.priceUSD} desde otro país.`,
  lineA: [
    `Empieza el ${PROGRAM.startDateShort}`,
    PROGRAM.scheduleShort,
    PROGRAM.priceCOP,
    `${PROGRAM.priceUSD} desde otro país`,
  ],
  lineB: [
    '8 sesiones en vivo',
    'Grabación de cada clase',
    'Guía por sesión',
    'Certificado',
    'PSE, Nequi, Bancolombia o tarjeta',
  ],
};

/* 8. Quiénes enseñan: ¿por qué ustedes? MUESTRA: cifras. */
export const MENTORS = {
  ctaTop: 'Quiero aprender con ellos',
  title: 'Quiénes te enseñan.',
  lead: 'Laura y Sebastián fundaron Squai después de años explicando IA en empresas y colegios. Ella diseña cómo aprendes y él revisa que cada ejemplo técnico funcione.',
  stats: [
    { value: '1.200+', label: 'personas formadas' },
    { value: '85', label: 'charlas dictadas' },
    { value: '30', label: 'organizaciones atendidas' },
  ],
  people: [
    {
      id: 'laura',
      name: 'Laura Villada',
      role: 'Estratega de adopción de IA y cofundadora',
      badge: 'Cofundadora',
      bio: 'Diseña cada sesión para que primero entiendas y después practiques, con ejemplos de tu día a día.',
      tags: ['Diseño de programas', 'Adopción en equipos'],
      avatarUrl: '/assets/aistudio/1_65be7eef.jpg',
      avatarAlt: 'Retrato de Laura Villada',
    },
    {
      id: 'sebastian',
      name: 'Sebastián Rico',
      role: 'Ingeniero de IA y cofundador',
      badge: 'Cofundador',
      bio: 'Revisa cada ejemplo técnico y te explica por qué funciona, sin promesas que nadie puede cumplir.',
      tags: ['Modelos de lenguaje', 'Seguridad de datos'],
      avatarUrl: '/assets/aistudio/perfil_61ac2c28.png',
      avatarAlt: 'Retrato de Sebastián Rico',
    },
  ],
};

/* 9. Lo que dicen: ¿a otros les sirvió? MUESTRA: testimonios por confirmar con permiso. */
export const TESTIMONIALS = {
  title: 'Lo que dicen después de una charla.',
  lead: 'Frases de personas que asistieron a nuestras charlas, publicadas con su permiso.',
  card: {
    tags: ['Charla', '2026'],
    title: 'IA para tu trabajo diario',
    copy: 'Charla de 90 minutos para equipos administrativos, docentes y personas que emprenden.',
    imageId: 7648047,
    alt: 'Público sonriente sentado durante una charla',
  },
  cta: 'Reservar mi cupo',
  note: {
    title: 'Quiénes asistieron',
    items: ['Equipos administrativos', 'Docentes de colegio', 'Áreas comerciales', 'Personas que emprenden'],
  },
  quotes: [
    {
      text: 'Por fin entendí por qué la IA me inventaba datos, y ahora reviso cada respuesta antes de enviarla.',
      author: 'Carolina M.',
      context: 'Coordinadora administrativa',
    },
    {
      text: 'Salí con tres plantillas que uso cada semana para mis informes.',
      author: 'Andrés P.',
      context: 'Analista financiero',
    },
    {
      text: 'Nadie me hizo sentir que preguntaba algo obvio, y pregunté mucho.',
      author: 'Marcela R.',
      context: 'Docente de secundaria',
    },
  ],
  badge: { value: MENTORS.stats[1].value, label: 'charlas' },
};

/* 10. Inscripción: ¿cuánto y cómo pago? */
export const SIGNUP = {
  title: 'Inscríbete en dos minutos.',
  lead: 'Te pedimos tres datos para reservar tu cupo y abrir el enlace de pago seguro.',
  priceLabel: 'Valor del programa',
  priceNote: `Pago único · ${PROGRAM.seats} cupos por grupo`,
  methodsCOP: 'Pagas en línea con PSE, Nequi, Bancolombia o tarjeta débito o crédito.',
  methodsUSD: 'Pagas en línea con tarjeta Visa, Mastercard o American Express.',
  refundNote: 'Si cancelas antes de la segunda sesión, te devolvemos el 100%.',
  refundLinkLabel: 'Ver la política de devoluciones',
  consent: 'Al enviar confirmas que los datos son tuyos. Si escribes el correo de tu jefe, el acceso le llega a tu jefe.',
  ctaSubmit: 'Ir al pago seguro',
  pendingLabel: 'Preparando tu enlace',
  secureNote: 'Pago seguro en línea · Confirmación por correo',
};

/* 11. Preguntas frecuentes: dudas antes de pagar. MUESTRA. */
export const FAQ = {
  title: 'Preguntas frecuentes.',
  lead: 'Lo que más nos preguntan antes de pagar, con respuestas cortas.',
  categories: ['Todas', 'Programa', 'Pagos', 'Requisitos'] as const,
  items: [
    {
      id: 'faq-programar',
      category: 'Requisitos' as const,
      q: '¿Necesito saber programar?',
      a: 'No. Empezamos desde cero, con cómo funciona la IA y cómo pedirle las cosas, y practicas con lo que ya haces en tu trabajo.',
    },
    {
      id: 'faq-herramientas',
      category: 'Requisitos' as const,
      q: '¿Qué necesito para las clases?',
      a: 'Un computador con internet y una cuenta gratuita de ChatGPT, Gemini o Copilot. Si ya pagas alguna, también sirve.',
    },
    {
      id: 'faq-ausencia',
      category: 'Programa' as const,
      q: '¿Qué pasa si no puedo asistir a una sesión?',
      a: 'Cada clase queda grabada y la puedes ver durante seis meses. Si te quedan dudas, nos escribes por WhatsApp.',
    },
    {
      id: 'faq-certificado',
      category: 'Programa' as const,
      q: '¿Cuándo recibo el certificado?',
      a: 'Te lo enviamos por correo la semana siguiente a la última sesión, si asististe al menos a 6 de las 8.',
    },
    {
      id: 'faq-grupo',
      category: 'Programa' as const,
      q: '¿Cuántas personas hay por grupo?',
      a: `Máximo ${PROGRAM.seats}, para que haya tiempo de revisar el caso de cada persona.`,
    },
    {
      id: 'faq-medios',
      category: 'Pagos' as const,
      q: '¿Qué medios de pago aceptan?',
      a: `En Colombia pagas ${PROGRAM.priceCOP} con PSE, Nequi, Bancolombia o tarjeta. Desde otro país pagas ${PROGRAM.priceUSD} con Visa, Mastercard o American Express.`,
    },
    {
      id: 'faq-factura',
      category: 'Pagos' as const,
      q: '¿Puedo pedir factura a nombre de mi empresa?',
      a: 'Sí. Cuando termines el pago nos escribes los datos de facturación y te la enviamos en máximo tres días hábiles.',
    },
    {
      id: 'faq-devolucion',
      category: 'Pagos' as const,
      q: '¿Y si me inscribo y después no puedo seguir?',
      a: 'Si cancelas antes de la segunda sesión, te devolvemos el 100%. El detalle está en la política de devoluciones.',
    },
    {
      id: 'faq-equipo',
      category: 'Programa' as const,
      q: '¿Puedo inscribir a varias personas de mi equipo?',
      a: 'Sí. Escríbenos por WhatsApp y te enviamos un solo enlace de pago para todo el grupo.',
    },
  ],
};

/* 12. Pie de página: ¿es una empresa real? MUESTRA: datos legales. */
export const FOOTER = {
  blurb: 'Programas de IA para personas, equipos e instituciones educativas, explicados con calma y con ejemplos de tu trabajo.',
  ctaWhatsApp: 'Escribirle al equipo Squai',
  company: {
    legalName: 'Squai S.A.S.',
    taxId: 'NIT 901.000.000-0',
    city: 'Medellín, Colombia',
    email: 'team@squai.io',
  },
  legalLinks: [
    { label: 'Política de devoluciones', href: '/politica-de-devoluciones.html' },
    { label: 'Política de tratamiento de datos', href: '/politica-de-datos.html' },
  ],
  newsletter: {
    title: 'Recibe las próximas fechas',
    copy: 'Te escribimos cuando abramos un grupo nuevo, con plantillas y ejemplos para tu trabajo. Nada de spam.',
    cta: 'Suscribirme',
  },
  priceLine: `Pago en Colombia: ${PROGRAM.priceCOP} · Desde otro país: ${PROGRAM.priceUSD} · PSE, Nequi, Bancolombia y tarjetas`,
  rights: 'Squai S.A.S. Todos los derechos reservados.',
  tagline: `${PROGRAM.name} · Programa en vivo y en línea`,
};
