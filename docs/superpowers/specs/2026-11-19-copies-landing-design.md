# Copies de la landing: revisión para conversión

- Fecha: 19 de noviembre de 2026
- Rama: `claude/laughing-pasteur-7b7wqq`
- Fuente del copy: los textos que envió el equipo para las 11 secciones (encabezado a preguntas frecuentes)
- Archivos que toca: `src/content/landing.ts` (casi todo), algunos componentes y la política de devoluciones (detalle en la sección 7)

## 1. Intención y por qué

La landing vende **Fundamentos de IA**, un programa en vivo de 20 horas, y su trabajo es que una persona que llega sin saber mucho de IA termine pagando el cupo. El equipo escribió copies nuevos con datos actualizados (fechas, precio con descuento, cupos, política de devoluciones) y con un tono más cercano. Esta revisión hace tres cosas:

1. Revisa la intención de cada bloque y la ajusta para que cada sección resuelva la duda que la persona tiene en ese punto de la página.
2. Ajusta el texto a los espacios del diseño actual, para que el diseño no cambie.
3. Propone mejoras de interacción en las secciones donde el copy nuevo las necesita o donde ayudan a convertir.

## 2. Framework: secuencia de objeciones con nivel de consciencia

### Enfoques que se consideraron

| Enfoque | Lo que aporta | Por qué sí o no |
|---|---|---|
| **Secuencia de objeciones con nivel de consciencia de Schwartz** (elegido) | Cada sección responde la siguiente pregunta que la persona se hace antes de pagar. El nivel de consciencia define cómo se abre la página. | Encaja con las 12 secciones que ya tiene el diseño y con la guía de voz (sin miedo, sin urgencia falsa, sin humo). |
| PAS (problema, agitación, solución) | Convierte bien con tráfico frío. | La agitación se apoya en miedo y urgencia, que la guía de voz prohíbe. Si se suaviza, pierde la fuerza que lo justifica. |
| StoryBrand | La persona es la protagonista y Squai es la guía, algo que encaja con hablar de igual a igual. | Pide un plan de 3 pasos y una sección de "lo que pierdes si no actúas", y obliga a reordenar secciones, con más cambios de diseño. |

El equipo eligió el primero el 19 de noviembre de 2026.

### Cómo se aplica

**Nivel de consciencia del lector:** consciente del problema. La persona oyó que la IA ahorra tiempo, quizá la probó, pero no sabe cómo sacarle provecho. Por eso la página abre con el problema que la persona reconoce, no con el producto. El título del equipo ya hace esto bien.

**Secuencia de objeciones**, una por sección:

| # | Sección | Pregunta que responde | Trabajo de la sección | CTA |
|---|---|---|---|---|
| 1 | Encabezado | ¿Qué es esto y es para mí? | Reconocer el problema, prometer algo concreto y dar fecha y precio a la vista | Inscribirme al programa |
| 2 | Datos clave | ¿Cómo es y qué incluye? | Quitar las dudas de formato: en vivo, grabado, desde cero, grupo pequeño | Inscribirme (al pasar el cursor) |
| 3 | Presentación | ¿Quién está detrás? | Poner cara y voz, y dar la primera prueba (más de 200 personas) | Conocer a Laura y Sebastián |
| 4 | ¿Es para ti? | ¿Entienden mi caso? | Que la persona se reconozca en un perfil, y decir para quién no es | Cambia según el perfil |
| 5 | Qué vas a lograr | ¿Qué gano? | Resultados concretos que se pueden comprobar | Ninguno, el ritmo sigue |
| 6 | Cómo es el programa | ¿Cómo funciona en la práctica? | Quitar la incertidumbre de antes, durante y después | Empezar mi inscripción |
| 7 | Programa | ¿Qué voy a ver? | Temario con fechas, sin abrumar | Reservar mi cupo de enero |
| 8 | Equipo | ¿Por qué ustedes? | Autoridad con datos que existen | Aprender con Laura y Sebastián |
| 9 | Testimonios | ¿A otros les sirvió? | Prueba social con nombre y contexto | Reservar mi cupo |
| 10 | Precio e inscripción | ¿Cuánto cuesta, cómo pago y qué pasa si…? | Precio con descuento, qué incluye, fechas y política de devoluciones junto al formulario | Inscribirme al programa |
| 11 | Preguntas frecuentes | Lo que todavía frena el pago | Respuestas cortas a las objeciones que quedan | Escríbenos por WhatsApp |

**Fórmula dentro de cada bloque** (la de la guía de voz): una situación que la persona reconoce, lo que aprende, el puente al programa y el CTA. No todos los bloques necesitan las cuatro partes.

## 3. Metas, no metas y anti-metas

**Metas**

- Cada sección responde una sola pregunta y su CTA continúa lo que el texto venía diciendo.
- Todos los datos (fechas, precios, cupos, horas, políticas) son los nuevos y coinciden en toda la página, en la pasarela y en la política de devoluciones.
- El copy cabe en los espacios del diseño actual en celular (402 px), tableta (834 px) y escritorio (1920 px).
- El texto pasa los tests de voz y tono que ya existen (`src/content/landing.spec.ts`).

**No metas**

- Rediseñar secciones o cambiar la paleta, la tipografía o las animaciones.
- Cerrar el formulario automáticamente después del 22 de enero (queda como sugerencia en la sección 9).
- Escribir los términos y condiciones.

**Anti-metas** (cosas que harían fallar la revisión aunque todo funcione)

- Publicar cifras, logos o testimonios que no existen o no tienen permiso. Hoy la página muestra datos de prueba ("1.200+ personas formadas", "85 charlas", logos de "Nodo" o "Aula 21") que salen en esta revisión.
- Mostrar el descuento después del 31 de diciembre, o cobrar un precio distinto al que dice la página.
- Que el título del encabezado ocupe media pantalla y empuje el CTA fuera de la vista.

## 4. Restricciones

### Voz y tono

La guía de voz (`public/assets/aistudio/voice-and-tone-squai_bb1f7cb1.md`) se aplica a todo el copy, y `landing.spec.ts` revisa las reglas más fáciles de romper:

- "IA" en lugar de "inteligencia artificial", y "programa" en lugar de "curso".
- Sin rayas largas, emojis ni signos de exclamación.
- CTA de hasta 7 palabras y 45 caracteres, sin CTA genéricos.
- Lenguaje inclusivo desde la neutralidad. Por ejemplo, "más productivo", "perdido" o "rico" se reescriben sin marcar género.

### Espacio disponible por elemento

Medido sobre los textos que hoy se ven bien en el diseño.

| Elemento | Estilo | Límite recomendado |
|---|---|---|
| Título del encabezado | `aardvark-h1` (160 px en escritorio) | 55 caracteres, unas 4 líneas |
| Párrafo del encabezado | `aardvark-lead` | 200 caracteres |
| Etiqueta de perfil en ¿Es para ti? | Texto grande centrado | 24 caracteres, una línea |
| Píldora de resultado | `aardvark-benefit-pill-text` | 30 caracteres |
| Nota de tarjeta en Datos clave | `aardvark-small` | 120 caracteres |
| Texto de paso en Cómo es el programa | `aardvark-body` en tarjeta de 4 columnas | 150 caracteres |
| Tema en Programa | Insignia oscura | 45 caracteres, dos líneas |
| Testimonio manuscrito | `aardvark-handwritten-lg` | 140 caracteres |
| CTA | Botón | 7 palabras y 45 caracteres |

## 5. Datos que cambian

| Dato | Hoy en la página | Nuevo | Dónde se toca |
|---|---|---|---|
| Inicio | 2 de febrero de 2027 | 26 de enero de 2027 | `PROGRAM` |
| Fin | No aparece | 18 de febrero de 2027 | `PROGRAM`, inscripción |
| Cierre de inscripciones | No aparece | 22 de enero de 2027 | `PROGRAM`, inscripción |
| Horario | Martes y jueves, 7:00 a 8:30 p. m. | Martes y jueves, 6:30 a 9:00 p. m. (Colombia) | `PROGRAM` |
| Duración por sesión | 90 minutos | 2 horas y media | `INCLUDES`, `SESSIONS` |
| Horas totales | 12 | 20 | Maqueta del certificado |
| Cupos | 25 | 30 | `PROGRAM.seats` |
| Precio COP | $399.000 | $440.000 hasta el 31 de diciembre, después $550.000 | `pricing.ts` y servidor |
| Precio USD | 129 | 147 hasta el 31 de diciembre, después 185 (ver pregunta 2) | `pricing.ts` y servidor |
| Grabaciones | 6 meses | Hasta un mes después de la última sesión | `INCLUDES`, `FAQ` |
| Certificado | Asistir a 6 de 8 | Asistir a 7 de 8 (80%), y una falta justificada con anticipación no cuenta | `INCLUDES`, `FAQ` |
| Devoluciones | 100% si cancelas antes de la segunda sesión | Ceder el cupo, o devolución solo por fuerza mayor | `SIGNUP`, `FAQ`, `politica-de-devoluciones.html` |
| Medios de pago | PSE, Nequi, Bancolombia o tarjeta | Tarjeta débito o crédito, PSE, Nequi y Bre-B (ver pregunta 4) | `SIGNUP`, `FAQ`, servidor |
| Herramientas | ChatGPT, Gemini o Copilot | Claude, ChatGPT o Gemini | `AUDIENCE`, `FAQ` |
| Comunidad | WhatsApp con el equipo | Comunidad de WhatsApp que sigue abierta al terminar | `FLOW`, `INCLUDES` |
| Video | Tres minutos | Menos de 2 minutos | `PRESENTATION` |

## 6. Copy por sección

Cada sección tiene cuatro partes: la revisión de la intención del copy original, el copy final con la clave donde va en `landing.ts`, cómo encaja en el diseño y la interacción sugerida.

### 6.1 Encabezado (`HERO`)

**Revisión de la intención**

- El título original le habla bien a alguien consciente del problema: reconoce lo que oyó y presenta como normal que todavía no sepa usarla. Se mantiene esa intención, con dos ajustes. Con 106 caracteres, el original ocuparía 8 o 9 líneas a 160 px. Además usa "inteligencia artificial (IA)", que la guía y los tests no permiten.
- "Una herramienta que potencia tus habilidades" podría estar en la página de cualquier producto de IA. Se cambia por una promesa concreta que cierra lo que abre el título (ahorrar tiempo en lo que ya haces). "Aprende IA, potencia tus habilidades" sigue en el texto curvo de la Presentación.
- "100% en vivo, sin clases pregrabadas" junto a "sesiones grabadas" (en Datos clave) puede confundir. Aquí se deja el "en vivo", y en Datos clave se aclara que las sesiones en vivo quedan grabadas.

**Copy final**

- `title`: Has oído que la IA ahorra tiempo y aún no sabes cómo.
  - Alternativa que da primero la solución, por si se quiere probar después: "Aprende a sacarle provecho a la IA desde las bases."
- `lead`: En 20 horas en vivo entiendes la IA desde las bases y aprendes a usarla en las tareas que haces todos los días.
- `facts` (elemento nuevo, lista corta debajo del párrafo):
  - Inicia el 26 de enero de 2027
  - Martes y jueves, 6:30 a 9:00 p. m. (hora de Colombia)
  - $440.000 COP o 147 USD con 20% de descuento hasta el 31 de diciembre
- `ctaPrimary`: Inscribirme al programa
- `ctaSecondary`: Ver las 8 sesiones
- `note` (manuscrito): 100% en vivo, sin clases pregrabadas que nunca vas a ver.
- `cardLive`: título "Sesiones en vivo", nota "Martes y jueves, 6:30 p. m."
- `cardNoCode`: título "Sin conocimientos previos", nota "Empiezas desde las bases"
- Texto alternativo de la foto: mientras no exista la foto de Laura y Sebastián, la foto de stock lleva una descripción de lo que muestra (ver pregunta 7).

**Encaje con el diseño:** el título queda en unas 4 líneas, como el actual (47 caracteres). Lo único nuevo es la lista de datos, en `aardvark-small` y con el mismo color del párrafo, sin cambiar la columna ni las tarjetas.

**Interacción sugerida:** al pasar el 31 de diciembre, la lista de datos cambia sola al precio completo, sin descuento. No se usa cuenta regresiva, porque la guía evita la urgencia y la fecha escrita ya da el dato.

### 6.2 Datos clave (`INCLUDES`)

**Revisión de la intención:** los 10 puntos están bien escritos y cada uno quita una duda, pero el diseño tiene 4 tarjetas grandes con foto, y 10 tarjetas romperían la sección. Se agrupan en 4 tarjetas por la duda que resuelven, y las etiquetas de cada tarjeta llevan los datos que se escanean. El punto 2 (4 semanas) pasa a la nota manuscrita, y el 8 (mentores) pasa a la sección Equipo, donde tiene más fuerza. Así no se pierde ninguno.

**Copy final**

- `title`: Lo que incluye el programa.
- `lead`: Sesiones en vivo para aprender con nosotros y recursos para repasar por tu cuenta.
- `handwritten`: Terminas en 4 semanas, con 2 sesiones por semana
- Tarjeta 1, `en-vivo` (puntos 1 y 5)
  - Título: En vivo y en grupo pequeño
  - Nota: Entras desde donde estés a sesiones en directo de 2 horas y media, con máximo 30 personas y espacio para tus dudas.
  - Etiquetas: En vivo · Máx. 30 personas
- Tarjeta 2, `grabaciones` (puntos 3 y 6)
  - Título: Si faltas, la ves grabada
  - Nota: Cada sesión queda grabada, y entre sesiones resuelves tus dudas en la comunidad de WhatsApp.
  - Etiquetas: Grabaciones · WhatsApp
- Tarjeta 3, `guia` (puntos 4, 7 y 9), con la maqueta de la guía
  - Título: Desde las bases, con cualquier IA
  - Nota: No necesitas haber usado la IA antes, y como entiendes cómo funciona, no dependes de una sola aplicación.
  - Etiquetas: Desde cero · Guías de apoyo
- Tarjeta 4, `certificado` (punto 10), con la maqueta del certificado
  - Título: Certificado al terminar
  - Nota: Lo sumas a tu hoja de vida o lo guardas como prueba de un reto cumplido.
  - Etiquetas: Digital · Con tu nombre
- Maquetas: la guía se llama "Guía de apoyo" en lugar de "Guía de la sesión 3", y el detalle del certificado pasa a "8 sesiones en vivo · 20 horas".

**Encaje con el diseño:** cero cambios de estructura. Las notas miden entre 75 y 118 caracteres, dentro del límite.

**Interacción sugerida (opcional):** hoy, al hacer clic en una tarjeta, la página baja al formulario. Para alguien que todavía está entendiendo qué incluye, eso es un salto brusco. Se propone que cada tarjeta lleve a su respuesta en Preguntas frecuentes (grabaciones a "¿Qué pasa si falto?", certificado a "¿Qué certificado recibo?") y que el botón "Inscribirme" que aparece al pasar el cursor siga llevando al formulario.

### 6.3 Presentación (`PRESENTATION`)

**Revisión de la intención:** el título promete poco tiempo (menos de 2 minutos), que es justo lo que baja la fricción de darle play. "Más de 200 personas" es la primera prueba concreta de la página. Los logos actuales son de prueba, así que salen.

**Copy final**

- `curvedText`: Aprende IA, potencia tus habilidades (sin cambio)
- `srTitle`: Cómo es aprender con nosotros
- `handwritten`: Laura y Sebastián te lo cuentan (sin cambio)
- `lead`: En menos de 2 minutos te contamos cómo es aprender con nosotros.
- `body`: Hemos dado charlas a más de 200 personas y acompañado a profesionales y equipos de trabajo de distintas áreas.
- `cta`: Conocer a Laura y Sebastián (sin cambio)
- `mediaNoteReady`: Menos de 2 minutos, con subtítulos
- `mediaNotePending`: Muy pronto, con subtítulos (sin cambio)
- `logos`: lista vacía. El componente oculta la fila de logos cuando está vacía.
- Video: el que hay en `public/assets` dura 25 segundos y no es este. `video.src` sigue vacío hasta que exista el video de presentación, con subtítulos y sin reproducción automática (el componente ya funciona así).

**Interacción sugerida:** registrar un evento de analítica cuando alguien le da play, para saber si el video ayuda a convertir.

### 6.4 ¿Es para ti? (`AUDIENCE`)

**Revisión de la intención**

- Tres perfiles bien elegidos, y el cierre ("puedes empezar sin haber usado la IA antes") quita la objeción principal.
- "No es para ti si…" es el bloque más valioso para la confianza, porque descartar a alguien hace creíble todo lo demás. Se ajusta "para hacerte rico" (marca género) y se mantienen las dos ideas: aquí no se enseña a construir agentes, y con lo básico bien aprendido ya se logra mucho.
- "Ser más productivo" marca género, y se reescribe.
- Las etiquetas originales son largas para el texto grande de la lista, así que se acortan y el detalle va en el ejemplo.

**Copy final**

- `title`: ¿Es para ti?
- `handwritten`: Pasa el cursor o toca tu caso (sin cambio)
- Perfil `empresa`
  - Etiqueta: Trabajas en una empresa
  - Ejemplo: Quizá ya usaste la IA, pero todavía no sabes cómo apoyarte en ella para terminar a tiempo y evitar las horas extra.
  - CTA: Ahorrar tiempo en mi trabajo
- Perfil `negocio`
  - Etiqueta: Trabajas por tu cuenta
  - Ejemplo: En tu negocio haces de todo, desde ventas hasta atención al cliente, y la IA puede ahorrarte tiempo en esas tareas.
  - CTA: Ahorrar tiempo en mi negocio
- Perfil `curiosidad`
  - Etiqueta: Te da curiosidad la IA
  - Ejemplo: Todo el mundo habla de la IA y quieres entender de qué se trata y cómo podrías usarla en tu día a día.
  - CTA: Entender la IA desde las bases
- `closing`: En cualquiera de los tres casos puedes empezar sin haber usado la IA antes.
- `notForYou`
  - Título: No es para ti si…
  - Texto: Buscas construir agentes (asistentes de IA que hacen tareas por su cuenta) para ganar plata mientras duermes. Aquí no enseñamos a construirlos, porque con lo básico bien aprendido ya logras mucho y preferimos no venderte lo que no necesitas.
  - Manuscrito: No te vendemos humo.
- `needs`
  - Título: Lo que necesitas
  - Lista: Un computador. · Conexión a internet. · Una cuenta gratuita en Claude, ChatGPT o Gemini. Si aún no la tienes, te ayudamos a crearla en la primera sesión.
  - Nota: Con la versión gratuita puedes empezar, aunque tiene un límite de uso. Más adelante decides si te conviene una cuenta de pago, según cuánto uses la IA.

**Encaje con el diseño:** la lista interactiva pasa de 6 perfiles a 3 y queda con más aire. Cada perfil conserva sus dos fotos. "No es para ti" y "Lo que necesitas" van debajo del CTA en dos columnas (una en celular), con los colores de la misma banda (texto `#d2d7fc` sobre `#303163`) y el manuscrito en dorado, como el de la cabecera de la sección.

**Interacción sugerida (incluida):** el CTA cambia según el perfil elegido, para que continúe lo que la persona acaba de leer. La analítica ya registra qué perfil eligió.

### 6.5 Qué vas a lograr (`OUTCOMES`)

**Revisión de la intención**

- Los seis resultados son concretos y se pueden comprobar, que es lo que la guía pide. Los títulos originales son frases largas, así que se acortan para las píldoras y la frase completa va en el detalle.
- Los puntos 5 y 6 se cruzaban ("verificas lo que te responde" estaba en "cuidar tu información"), así que se mueve "verificar" al 6.
- El chiste ("A veces la IA enreda más que el que te debe plata") funciona: sale de lo absurdo de la situación y no del lector.

**Copy final**

- `title`: Lo que vas a lograr.
- `lead`: Seis cosas que vas a poder hacer con la herramienta de IA que uses.
- Resultados (píldora y detalle):
  1. Delegar tareas que repites. Defines qué tareas puede hacer la IA y la preparas para que las repita cada vez que las necesites.
  2. Ordenar tu trabajo. Reúnes en un solo lugar lo que tienes pendiente, decides qué va primero y ajustas tu plan con la IA.
  3. Crear sin resultados genéricos. Preparas documentos, presentaciones e imágenes que suenan y se ven como tuyos, y analizas información para llegar a tus propias conclusiones.
  4. Conseguir respuestas útiles. Aprendes a pedirle las cosas con claridad y a mejorar el resultado paso a paso hasta que te sirve.
  5. Cuidar tu información. Sabes qué información puedes compartirle a la IA y cómo proteger tus datos y los de tu trabajo.
  6. Saber cuándo confiar en la IA. Entiendes cómo funciona por dentro, por qué a veces inventa respuestas con seguridad y cómo verificar lo que te dice.
- `handwritten` (junto a la píldora 6): A veces la IA enreda más que el que te debe plata.
- `closing`: En la primera semana eliges un proyecto personal y lo trabajas durante el programa con lo que vas aprendiendo.

**Encaje con el diseño:** las píldoras miden entre 18 y 30 caracteres, como las actuales. Hay 6 y no 5, así que se agrega un sexto estilo de color a la secuencia actual.

**Interacción sugerida (incluida):** cada píldora es un botón, y al elegirla su detalle aparece debajo, con el mismo patrón de ¿Es para ti? (`aria-pressed` y un área `aria-live`). Al cargar, la primera aparece elegida, para que el detalle se vea sin tener que descubrir la interacción.

### 6.6 Cómo es el programa (`FLOW`)

**Revisión de la intención:** los 4 momentos (antes, durante, entre sesiones y al terminar) responden justo lo que preocupa a quien nunca tomó un programa en vivo, y encajan con las 4 tarjetas del diseño. Los textos originales miden entre 200 y 260 caracteres y se recortan a unos 150 sin perder ningún dato.

**Copy final**

- `title`: Cómo es el programa.
- `handwritten`: Cuatro pasos y ninguna letra pequeña (sin cambio)
- `cta`: Empezar mi inscripción (sin cambio)
- Paso 1, Antes de empezar: Una semana antes del inicio te llega por correo el enlace de las sesiones y la invitación a la comunidad de WhatsApp, donde ya puedes resolver dudas.
- Paso 2, En cada sesión: Hay explicación, ejemplos en vivo y práctica en tu herramienta de IA, y no avanzamos hasta que las dudas queden resueltas.
- Paso 3, Entre sesiones: Trabajas tu proyecto personal con lo que aprendes, y si algo no te queda claro, lo preguntas en la comunidad de WhatsApp.
- Paso 4, Al terminar: Recibes tu certificado, la comunidad sigue abierta y puedes ver las grabaciones hasta un mes después de la última sesión.

**Encaje con el diseño:** sin cambios. Las ilustraciones son abstractas (formulario, sobre, chat, video) y siguen sirviendo para los cuatro momentos.

### 6.7 Programa (`SESSIONS`)

**Revisión de la intención:** "Lo que vemos en las 8 sesiones" lista 6 temas. Está bien como temario, pero el diseño actual muestra 8 sesiones con fecha y tema, y no se sabe qué tema va en cada sesión. La propuesta muestra los 6 temas como temas y deja las 8 fechas en una línea aparte. Si el equipo tiene la distribución por sesión, se agrega (ver pregunta 5).

**Copy final**

- `titleTop`: Lo que vemos
- `titleBox`: en 8 sesiones.
- `note` (manuscrito, arriba a la derecha): Martes y jueves de 6:30 a 9:00 p. m., hora de Colombia
- `tagline` (manuscrito): Terminas en 4 semanas
- `summary` (nuevo): 8 sesiones de 2 horas y media, 2 por semana. Repartimos las 20 horas para que aprendas paso a paso sin abrumarte.
- `calendar` (nuevo, con `<time>` por fecha): 26 y 28 de enero · 2, 4, 9, 11, 16 y 18 de febrero
- `cta`: Reservar mi cupo de enero
- Temas (título, descripción y lo que incluye):
  1. Qué es la IA y cómo funciona. Ves cómo aprende y por qué a veces inventa respuestas con seguridad.
     - Qué es la IA y qué mitos la rodean
     - Cómo aprende y cómo decide qué responder
     - Por qué inventa información y cuándo desconfiar
  2. Conceptos básicos y uso seguro. Aprendes a pedirle las cosas con claridad, a comprobar lo que responde y a decidir qué información compartir con ella.
     - Qué es una instrucción (prompt) y cómo se escribe bien
     - Contexto, memoria y límites de uso (tokens)
     - Cómo mejorar un resultado y evitar que solo te dé la razón
     - Cómo detectar errores, información inventada y sesgos
     - Qué pasa con lo que escribes y cómo proteger tu información
  3. De tareas sencillas a procesos. Aprendes a usar la IA en procesos que se repiten paso a paso, más allá de un chat.
     - Chats sueltos, proyectos y habilidades guardadas (skills)
     - Tareas programadas: pedirle a la IA que actúe en un horario
     - Cómo elegir la forma de usarla según la tarea
  4. Productividad y planeación. Organizas tu información y tus pendientes para decidir, con ayuda de la IA, qué tareas atender primero.
     - Reunir la información en un solo lugar
     - Organizar tus tareas para decidir qué atender primero
     - Planear un proyecto, hacerle seguimiento y ajustarlo
  5. Documentos, presentaciones e imágenes. Los preparas con la IA y los ajustas hasta que suenen y se vean como tuyos.
     - Cómo armar un documento o una presentación por secciones
     - Plantillas que puedes reutilizar
     - Imágenes con estilo propio, y cómo editarlas
  6. Analizar información. Le das tus documentos o datos a la IA para resumirlos, compararlos y sacar tus propias conclusiones.
     - Cómo plantear la pregunta que quieres responder
     - Resumir, comparar y buscar patrones
     - Tablas y revisión de las conclusiones

Se ajustaron dos cosas del temario original. "Habilidades" cambia a "habilidades guardadas (skills)", porque para alguien que empieza, "habilidades" no dice qué es. Además, se acortaron los títulos de los temas 2, 3 y 5 para que quepan en la insignia.

**Encaje con el diseño:** las insignias oscuras se mantienen. En vez de 8 en 4 columnas, son 6 en 3 columnas (2 filas), y la línea gris de cada insignia dice "Tema 1" en lugar de la fecha.

**Interacción sugerida (incluida):** al elegir una insignia, debajo de la cuadrícula aparece un panel con la descripción y la lista de ese tema, con el mismo patrón de las secciones 4 y 5. Así la cuadrícula no salta de tamaño y el temario completo no abruma.

### Franja de datos (`KEY_FACTS`)

- `lineA`: Empieza el 26 de enero · Martes y jueves, 6:30 p. m. · $440.000 COP hasta el 31 de diciembre · 147 USD desde otro país
- `lineB`: 8 sesiones en vivo · Grabación de cada sesión · Guías y recursos · Comunidad en WhatsApp · Certificado · Tarjeta, PSE, Nequi o Bre-B
- `summary` (para lectores de pantalla): una sola oración con los mismos datos.
- Después del 31 de diciembre, los precios de esta franja pasan solos al precio completo.

### 6.8 Equipo (`MENTORS`)

**Revisión de la intención:** las biografías dan autoridad con hechos que se pueden comprobar (años, cargos, títulos), que es lo que la guía pide. "Uno de los dos será tu mentor" se reescribe para que no marque género. Las cifras actuales son de prueba y se cambian por datos que existen.

**Copy final**

- `ctaTop`: Aprender con Laura y Sebastián
- `title`: Quiénes te enseñan.
- `lead`: Laura y Sebastián saben explicar desde las bases y han llevado la IA a equipos de trabajo, así que lo que aprendes con ellos te sirve en la práctica.
- Laura Villada
  - Rol: Estratega de adopción de IA
  - Distintivo: Cofundadora (sin cambio)
  - Biografía: Fue docente durante 5 años y directora de operaciones en una empresa de tecnología en EE. UU., donde optimizó procesos con IA y acompañó su adopción en los equipos.
  - Etiquetas: Magíster en ingeniería · 5 años como docente
- Sebastián Rico
  - Rol: Ingeniero de IA
  - Distintivo: Cofundador (sin cambio)
  - Biografía: Lleva más de 8 años en tecnología liderando equipos y guiando a personas de distintos roles. Ha desarrollado soluciones con IA, y entender en detalle cómo funciona le permite explicarla de forma sencilla.
  - Etiquetas: 8 años en tecnología · Soluciones con IA
- `closing` (manuscrito, nuevo): Laura o Sebastián acompaña a tu grupo durante el programa.
- `stats`:
  - 200+: personas en nuestras charlas
  - 5: años de Laura como docente
  - 8+: años de Sebastián en tecnología

### 6.9 Testimonios (`TESTIMONIALS`)

**Revisión de la intención**

- Los tres testimonios cubren las tres dudas grandes: "no soy de tecnología", "ya la uso pero mal" y "no sé por dónde empezar". Además tienen nombre y contexto.
- Miden entre 230 y 330 caracteres y el diseño los muestra en letra manuscrita grande, así que se usan fragmentos textuales (sin cambiar palabras, con […] donde se corta), que necesitan el visto bueno de cada persona.
- Hay una corrección de concordancia en el de Manuela: "me cuesta mucho ciertas cosas" pasa a "me cuestan mucho ciertas cosas".

**Copy final**

- `title`: Así fue aprender con nosotros.
- `lead`: Esto nos contaron personas que estuvieron en nuestras capacitaciones y consultorías, publicado con su permiso.
- Testimonio 1, Manuela A. (capacitación de IA): "Nunca me había sentido tan cómoda en una clase de tecnología […] me llevé cosas que todos los días me ayudan a que el día rinda."
- Testimonio 2, Juan Pablo V. (consultoría con Laura): "La forma en que me explicaste todo el funcionamiento de la IA me hizo caer en cuenta de lo mal que la estaba usando."
- Testimonio 3, Claudia M. (consultoría con Sebastián): "Yo venía muy enredada de todo lo que quería hacer con IA, pero me diste un foco y me enseñaste dónde vale la pena meter IA y cómo hacerlo."
- `card`
  - Etiquetas: Charlas · Consultorías
  - Título: Charlas, capacitaciones y consultorías
  - Texto: Con profesionales y equipos de trabajo de distintas áreas.
- `badge`: 200+ personas
- `note`
  - Título: Quiénes han aprendido con nosotros
  - Lista: Profesionales de distintas áreas · Equipos de trabajo · Personas que emprenden
- `cta`: Reservar mi cupo (sin cambio)

**Encaje con el diseño:** hoy el componente pasa el contexto a minúsculas (`toLowerCase`) y escribiría "consultoría con laura". Se quita ese cambio y el contexto se escribe ya en minúscula, con los nombres propios en mayúscula.

**Interacción sugerida (opcional):** un enlace "Leer completo" bajo cada fragmento que muestre el testimonio entero.

### 6.10 Precio e inscripción (`SIGNUP`)

**Revisión de la intención**

- Juntar precio, qué incluye, fechas y política de devoluciones al lado del formulario es lo que más convierte, porque la persona no tiene que subir a buscar nada.
- "Sin sentirte perdido" marca género y se reescribe.
- "Ahorras $110.000 si te inscribes en diciembre" no es exacto, porque el descuento ya aplica en noviembre. Se cambia a "antes del 31 de diciembre".
- El botón del formulario dice lo mismo que el del encabezado, porque es la misma acción. Debajo sigue la nota de pago seguro.

**Copy final**

- `title`: Aprende IA sin perderte.
- `lead`: Te pedimos tres datos para reservar tu cupo y abrir el enlace de pago seguro. (sin cambio)
- `priceLabel`: Valor del programa
- Precio: el precio completo tachado y el precio con descuento al lado, en la moneda elegida ($550.000 COP y $440.000 COP, o 185 USD y 147 USD). Para lectores de pantalla se lee "Antes $550.000 COP, ahora $440.000 COP".
- `discountNote`: 20% de descuento hasta el 31 de diciembre.
- `savings` (manuscrito): Te ahorras $110.000 si te inscribes antes del 31 de diciembre (en USD: "Te ahorras 38 USD…").
- `priceNote`: Pago único · Grupo de máximo 30 personas
- `includesTitle`: Qué incluye
- `includes`:
  - 8 sesiones en vivo de 2 horas y media
  - Grabaciones de cada sesión
  - Comunidad de WhatsApp
  - Guías y recursos de apoyo
  - Certificado al terminar
  - Acompañamiento en tu proyecto personal
- `datesTitle`: Fechas
- `dates`:
  - Inscripciones hasta el 22 de enero de 2027
  - Del 26 de enero al 18 de febrero de 2027
  - Martes y jueves, de 6:30 a 9:00 p. m. (hora de Colombia) y de 5:30 a 8:00 p. m. (hora de Ciudad de México)
- `methodsCOP`: Pagas con tarjeta débito o crédito, PSE, Nequi o Bre-B.
- `methodsUSD`: Desde otro país pagas con tarjeta débito o crédito.
- `refundNote`: Si no puedes asistir, puedes ceder tu cupo a otra persona, y si una causa de fuerza mayor te impide empezar o seguir el programa, te devolvemos el dinero.
- `refundLinkLabel`: Ver la política de devoluciones (sin cambio)
- `legal`: Al inscribirte aceptas los términos y condiciones (con enlace, ver pregunta 3).
- `consent`: sin cambio (el chiste del correo del jefe ya cumple la guía).
- `ctaSubmit`: Inscribirme al programa (el botón agrega el precio: "Inscribirme al programa ($440.000 COP)").
- `secureNote`: Pago seguro en línea · Confirmación por correo (sin cambio)

**Encaje con el diseño:** las listas "Qué incluye" y "Fechas" van en la columna izquierda, entre el precio y los medios de pago, con `aardvark-small`. En escritorio el formulario es más alto que esa columna, así que no se descuadra.

**Interacción sugerida (incluida):** al cambiar la moneda cambian el precio, el precio tachado y el ahorro. Después del 31 de diciembre desaparecen el tachado, el descuento y el ahorro, y queda el precio completo.

### 6.11 Preguntas frecuentes (`FAQ`)

**Revisión de la intención:** las 10 preguntas cubren las objeciones que quedan. Hay tres ajustes:

- "Cursos y videos gratis" pasa a "videos y tutoriales gratis", porque la guía usa "programa" y nunca "curso".
- La respuesta sobre la diferencia con los videos gratis se recorta a la mitad.
- Salen dos preguntas que hoy están en la página y no vienen en el copy nuevo: factura a nombre de una empresa e inscripción de varias personas de un equipo (ver pregunta 9).

**Copy final**

- `title`: Preguntas frecuentes.
- `lead`: Lo que más nos preguntan antes de pagar, con respuestas cortas. (sin cambio)
- Categorías: Todas · Programa · Pagos · Requisitos (sin cambio)
- Preguntas:
  1. Requisitos. ¿Necesito saber de tecnología? No necesitas saber de tecnología, porque te explicamos todo desde las bases y sin tecnicismos. Solo necesitas un computador, conexión a internet y una cuenta gratuita en alguna herramienta de IA.
  2. Requisitos. ¿Tengo que pagar alguna herramienta de IA? No para empezar, porque puedes usar la versión gratuita de Claude, ChatGPT o Gemini. Las versiones gratuitas tienen un límite de uso, y más adelante decides si te conviene una cuenta de pago según lo que quieras hacer y cuánto uses la IA.
  3. Requisitos. Si ya uso la IA, ¿me sirve el programa? Sí, porque entender cómo funciona por dentro te ayuda a sacarle más provecho. Ves con claridad cosas que quizá no habías entendido bien, como por qué a veces inventa respuestas, qué información conviene compartirle y cómo usarla en tareas que se repiten.
  4. Programa. ¿Qué pasa si falto a una sesión? Todas las sesiones quedan grabadas, así que si faltas a una, la ves en grabación hasta un mes después de la última sesión y no te quedas atrás.
  5. Programa. ¿Cuál es el horario en mi país? Las sesiones son los martes y jueves, de 6:30 a 9:00 p. m. en Colombia. En otros países:
     - México (Ciudad de México): de 5:30 a 8:00 p. m.
     - Perú y Ecuador: de 6:30 a 9:00 p. m.
     - Venezuela: de 7:30 a 10:00 p. m.
     - Argentina, Chile y Uruguay: de 8:30 a 11:00 p. m.
  6. Programa. ¿En qué se diferencia de los videos y tutoriales gratis? Los videos gratis no suelen tener un método ni a alguien que responda tus dudas. Aquí vas de las bases a la práctica con explicaciones, ejemplos en vivo y tiempo para practicar en tu herramienta de IA. Además, estás en un grupo de máximo 30 personas donde tus dudas se resuelven en el momento, y trabajas en un proyecto personal durante todo el programa.
  7. Programa. ¿Cómo me conecto a las sesiones? Una semana antes del inicio te llega por correo el enlace para conectarte a las sesiones y la invitación a la comunidad de WhatsApp.
  8. Programa. ¿Qué certificado recibo? Al terminar recibes un certificado de Squai que acredita que completaste el programa (nombre según la pregunta 1). Lo recibes si asistes al menos a 7 de las 8 sesiones, y si avisas con anticipación y justificas una falta, no se cuenta como ausencia.
  9. Pagos. ¿Cómo pago? Al inscribirte ves los medios de pago disponibles: tarjeta débito o crédito, PSE, Nequi y Bre-B. Si estás fuera de Colombia, pagas con tarjeta débito o crédito.
  10. Pagos. ¿Qué pasa si no puedo asistir o seguir el programa? Si no puedes asistir, puedes ceder tu cupo a otra persona. Si una causa de fuerza mayor, como un accidente o una enfermedad, te impide empezar o seguir el programa, te devolvemos el dinero.
- `closing`: ¿Sigues con dudas? (seguido de un enlace)
- `ctaWhatsApp`: Escríbenos por WhatsApp (abre el widget de WhatsApp que ya existe)

Se revisaron las zonas horarias para enero y febrero de 2027: México no cambia de horario desde 2022, y Chile está en horario de verano (UTC-3). Las horas del copy son correctas.

**Encaje con el diseño:** el componente hoy muestra cada respuesta como un solo párrafo. Se le agrega soporte para una lista opcional, que usa la pregunta del horario.

### 6.12 Pie de página, metadatos y política de devoluciones

- `FOOTER.priceLine`: Hasta el 31 de diciembre: $440.000 COP o 147 USD · Tarjeta, PSE, Nequi y Bre-B (después del 31, el precio completo)
- `FOOTER.tagline`: {nombre del programa} · Programa en vivo y en línea
- `index.html`: título "Squai · {nombre del programa}". La descripción sería: "Programa en vivo de 20 horas para entender la inteligencia artificial (IA) desde las bases y usarla en las tareas de todos los días. Inicia el 26 de enero de 2027."
  - Aquí se deja "inteligencia artificial" a propósito, porque es lo que la gente escribe en el buscador. El test de voz no revisa este archivo.
- `politica-de-devoluciones.html`: se reescribe con la política nueva (ceder el cupo, devolución por fuerza mayor, cómo pedirla y en qué plazo). Es un texto legal, y el equipo debe revisarlo antes de publicar.

## 7. Cambios de código que exige el copy

1. **Precio por fecha** (`src/utils/pricing.ts` y `server.ts`): precio completo y precio con descuento por moneda, con fecha límite el 31 de diciembre de 2026 a las 23:59 (hora de Colombia). `calculatePriceBreakdown` usa la fecha, así que la pasarela cobra lo mismo que dice la página. Lleva tests de los dos lados de la fecha.
2. **Encabezado:** lista de datos (`HERO.facts`).
3. **¿Es para ti?:** 3 perfiles, CTA por perfil, cierre y el bloque "No es para ti si…" con "Lo que necesitas".
4. **Qué vas a lograr:** píldoras como botones, panel de detalle, nota manuscrita, cierre y sexto estilo de color.
5. **Programa:** 6 temas en 3 columnas, panel del tema elegido, línea de resumen y calendario con `<time>`.
6. **Presentación:** ocultar la fila de logos si la lista está vacía.
7. **Equipo:** nota manuscrita de cierre.
8. **Testimonios:** quitar `toLowerCase` y usar los fragmentos.
9. **Inscripción:** precio tachado, ahorro manuscrito, listas "Qué incluye" y "Fechas", y texto legal con enlace.
10. **Preguntas frecuentes:** lista opcional en las respuestas y cierre con enlace que abre el widget de WhatsApp.
11. **Política de devoluciones:** texto nuevo.
12. **Tests** (`landing.spec.ts`): el temario pasa de 8 sesiones con fecha a 6 temas más un calendario de 8 fechas, y se actualizan las etiquetas de las cifras. Las reglas de voz y tono no cambian.
13. **Verificación visual:** capturas antes y después en 402, 834 y 1920 px de ancho, sección por sección, para confirmar que el diseño no se movió.

## 8. Decisiones que tomé (revísalas al leer)

- El copy del equipo es la fuente de verdad para los datos. Donde choca con la página actual, gana el copy nuevo.
- Título del encabezado acortado a 53 caracteres, y párrafo con promesa concreta en lugar de "potencia tus habilidades".
- Los 10 datos clave quedan agrupados en las 4 tarjetas.
- Salen las cifras y logos de prueba, y entran solo datos que vienen en el copy (200+ personas, 5 años, 8 años).
- Temario mostrado como 6 temas, sin asignarlos a sesiones.
- Testimonios recortados con […], pendientes del visto bueno.
- Los textos con género marcado ("productivo", "perdido", "rico", "tu mentor") se reescribieron en neutro.
- La meta descripción conserva "inteligencia artificial" por búsqueda.
- El descuento se apaga solo después del 31 de diciembre, sin cuenta regresiva.

## 9. Lo que queda para quien implementa

- Mantener el estilo y las animaciones de cada componente al agregar los elementos nuevos, usando las clases `aardvark-*` y los colores que ya tiene cada banda.
- Los nombres exactos de las claves nuevas en `landing.ts`.
- Sugerencias que quedan fuera de esta rama y se pueden hacer después:
  - Que las tarjetas de Datos clave lleven a su pregunta frecuente.
  - El enlace "Leer completo" en testimonios.
  - El evento de analítica al darle play al video.
  - Cerrar el formulario después del 22 de enero, con un mensaje y la opción de dejar el correo para el próximo grupo.

## 10. Preguntas para el equipo

1. **Nombre del programa.** La página dice "Fundamentos de IA para el Trabajo", y la respuesta del certificado dice "Fundamentos de Inteligencia Artificial Generativa". ¿Cuál es? Si es el segundo, propongo mostrarlo como "Fundamentos de IA Generativa".
2. **Precio en USD.** El 20% de 185 USD da 148 USD, no 147. ¿Se cobra 147 (21% de descuento) o 148?
3. **Términos y condiciones.** El copy enlaza a un documento que hoy no existe en el repo. ¿Existe en otro lugar? Si no, el texto legal enlaza por ahora a las dos políticas que sí existen.
4. **Bre-B.** La pasarela (Bold) hoy ofrece tarjeta, PSE, Nequi y Bancolombia. ¿Tu cuenta de Bold tiene Bre-B activo? Si no, el copy debe decir lo que la pasarela ofrece.
5. **Temas por sesión.** ¿Sabes qué tema va en cada una de las 8 sesiones? Si no, se muestran los 6 temas sin número de sesión.
6. **Testimonios.** ¿Las tres personas dieron permiso de publicarlos con nombre y apellido abreviado? ¿Aceptan los fragmentos con […] y la corrección "me cuestan"?
7. **Foto del encabezado.** ¿Existe la foto de Laura y Sebastián enseñando en una sesión en vivo? Mientras no exista, se queda la foto de stock con un texto alternativo que describe lo que muestra.
8. **Política de devoluciones.** ¿La nueva (ceder el cupo o devolución por fuerza mayor) reemplaza a la de "100% antes de la segunda sesión"? Las personas que ya pagaron con la política anterior la conservan.
9. **Preguntas que salen.** ¿Sigue siendo cierto que se puede pedir factura a nombre de una empresa y que se pueden inscribir varias personas de un equipo con un solo pago? Si es así, las dejo en Preguntas frecuentes.
