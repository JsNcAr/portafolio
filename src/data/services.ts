import type { Locale } from '@i18n/ui';

type Bilingual = Record<Locale, string>;

export type ServiceGroup = 'engineering' | 'teaching';

/** Who the client would actually be contracting with. */
export type Delivery = 'apollyon' | 'direct' | 'either';

export type PriceUnit = 'project' | 'month' | 'hour' | 'hour-per-student';

/**
 * Structured rather than a pre-formatted string, so figures render with tabular
 * numerals and locale-correct grouping, and changing a number never means
 * editing prose.
 */
export interface Price {
  from: number;
  /** Omit for an open-ended "from X". */
  to?: number;
  currency: 'COP' | 'USD';
  unit: PriceUnit;
}

/**
 * Priced per locale, not converted. The Spanish page quotes COP for a Colombian
 * client and the English page quotes USD for an international one; those are two
 * pricing decisions, and a live exchange rate would misrepresent both.
 */
export type PriceByLocale = Record<Locale, Price>;

export interface Service {
  id: string;
  group: ServiceGroup;
  title: Bilingual;
  blurb: Bilingual;
  /** Proper nouns; never translated. */
  stack: string[];
  delivery: Delivery;
  /** null when no rate is set -- the price line then does not render at all. */
  price: PriceByLocale | null;
  /** The one service that leads. Rendered larger, on the accent ground. */
  lead?: boolean;
}

/**
 * Adapted from the four capability pillars on apollyon.lat, rewritten in the
 * first person. The originals are "we"-voiced and carry the company's founding
 * story and registration details, none of which belong on a personal site.
 */
export const services: Service[] = [
  {
    id: 'backend-infrastructure',
    group: 'engineering',
    lead: true,
    delivery: 'either',
    price: null,
    title: {
      en: 'Backend and infrastructure',
      es: 'Backend e infraestructura',
    },
    blurb: {
      en: 'Asynchronous FastAPI services on PostgreSQL, containerised with Docker and supervised by systemd, behind Caddy with automatic TLS. Deployed to hardware you own rather than a platform you rent, and handed over with the documentation needed to run it without me. This is the work I do every day.',
      es: 'Servicios asíncronos en FastAPI sobre PostgreSQL, en contenedores con Docker y supervisados por systemd, detrás de Caddy con TLS automático. Desplegados en hardware propio en vez de una plataforma alquilada, y entregados con la documentación necesaria para operarlos sin mí. Es el trabajo que hago todos los días.',
    },
    stack: ['FastAPI', 'PostgreSQL', 'Docker', 'systemd', 'Caddy', 'Debian'],
  },
  {
    id: 'automation',
    group: 'engineering',
    delivery: 'direct',
    price: null,
    title: {
      en: 'Automation and integrations',
      es: 'Automatización e integraciones',
    },
    blurb: {
      en: 'Workflows that connect a CRM, a database, email and messaging and then run without anyone watching. Where a system has no API, Selenium reads the interface built for people. Cleaning and analysis in Pandas. Built to fail loudly rather than quietly return nothing.',
      es: 'Flujos que conectan un CRM, una base de datos, correo y mensajería y después corren sin que nadie los vigile. Donde un sistema no tiene API, Selenium lee la interfaz hecha para personas. Limpieza y análisis con Pandas. Construidos para fallar de forma ruidosa y no para devolver nada en silencio.',
    },
    stack: ['n8n', 'Selenium', 'Pandas', 'Python'],
  },
  {
    id: 'ai-assistants',
    group: 'engineering',
    delivery: 'either',
    price: null,
    title: {
      en: 'AI assistants and retrieval',
      es: 'Asistentes de IA y recuperación',
    },
    blurb: {
      en: 'Retrieval over your own documents, so answers cite something real instead of being invented. WhatsApp assistants on the channel your customers already use. Local models where the data cannot leave your infrastructure. Bounded to what the underlying API already permits.',
      es: 'Recuperación sobre tus propios documentos, para que las respuestas citen algo real en lugar de inventarlo. Asistentes de WhatsApp en el canal que tus clientes ya usan. Modelos locales cuando los datos no pueden salir de tu infraestructura. Acotados a lo que la API de base ya permite.',
    },
    stack: ['RAG', 'OpenAI API', 'Local LLMs', 'WhatsApp'],
  },
  {
    id: 'custom-software',
    group: 'engineering',
    delivery: 'apollyon',
    price: null,
    title: {
      en: 'CRMs, dashboards and web apps',
      es: 'CRMs, dashboards y aplicaciones web',
    },
    blurb: {
      en: 'Lead management, conversion funnels and live operational metrics, on a data model designed for the questions you actually ask. Interfaces are scoped and assembled with AI tooling; the API, schema and deployment underneath them are built the usual way.',
      es: 'Gestión de leads, embudos de conversión y métricas operativas en vivo, sobre un modelo de datos diseñado para las preguntas que realmente haces. Las interfaces se definen y se arman con herramientas de IA; la API, el esquema y el despliegue que las sostienen se construyen de la forma habitual.',
    },
    stack: ['FastAPI', 'PostgreSQL', 'Dashboards', 'WebSockets'],
  },
];

/**
 * Websites are their own section rather than another card: the offer has two
 * prices (a build and a monthly), and it is the only service with live work a
 * prospective client can go and look at.
 */
export interface SiteExample {
  name: string;
  url: string;
  note: Bilingual;
}

export const websites = {
  blurb: {
    en: 'A site for your business, designed, built and then actually kept online. Fast, accessible, works on a phone, and findable — a static build behind a reverse proxy with automatic TLS, on infrastructure I run. The design is scoped and assembled with AI tooling; the build, the hosting and the uptime are mine.',
    es: 'Un sitio para tu negocio, diseñado, construido y después realmente mantenido en línea. Rápido, accesible, funciona en el teléfono y se encuentra en buscadores — un build estático detrás de un proxy inverso con TLS automático, en infraestructura que yo opero. El diseño se define y se arma con herramientas de IA; la construcción, el hosting y el tiempo en línea son míos.',
  } as Bilingual,
  stack: ['Static build', 'Caddy', 'TLS', 'Debian'],
  build: {
    en: { from: 250000, currency: 'COP', unit: 'project' },
    es: { from: 250000, currency: 'COP', unit: 'project' },
  } as PriceByLocale,
  hosting: {
    en: { from: 25000, currency: 'COP', unit: 'month' },
    es: { from: 25000, currency: 'COP', unit: 'month' },
  } as PriceByLocale,
  examples: [
    {
      name: 'gsalud.co',
      url: 'https://gsalud.co',
      note: {
        en: 'A dental and facial aesthetics clinic in Bogotá. Designed, built and hosted by me.',
        es: 'Una clínica de odontología y estética facial en Bogotá. Diseñada, construida y hospedada por mí.',
      },
    },
    {
      name: 'apollyon.lat',
      url: 'https://apollyon.lat',
      note: {
        en: 'The company site for Apollyon S.A.S, bilingual, on the same hosting.',
        es: 'El sitio de empresa de Apollyon S.A.S, bilingüe, sobre el mismo hosting.',
      },
    },
  ] as SiteExample[],
};

/** Teaching is a different kind of offer and gets its own treatment on the page. */
export interface ClassFormat {
  id: string;
  title: Bilingual;
  note: Bilingual;
  price: PriceByLocale | null;
}

export interface Audience {
  id: string;
  label: Bilingual;
  note: Bilingual;
}

export const classSubjects: Bilingual[] = [
  { en: 'Programming', es: 'Programación' },
  { en: 'Python', es: 'Python' },
  { en: 'Mathematics', es: 'Matemáticas' },
  { en: 'Physics', es: 'Física' },
  { en: 'Numerical methods', es: 'Métodos numéricos' },
];

export const classFormats: ClassFormat[] = [
  {
    id: 'one-to-one',
    price: {
      en: { from: 15, currency: 'USD', unit: 'hour' },
      es: { from: 40000, currency: 'COP', unit: 'hour' },
    },
    title: { en: 'One to one', es: 'Uno a uno' },
    note: {
      en: 'Remote, by video call. The session goes wherever you are actually stuck.',
      es: 'Remoto, por videollamada. La sesión va a donde realmente estés atascado.',
    },
  },
  {
    id: 'small-group',
    price: null,
    title: { en: 'Small group', es: 'Grupo pequeño' },
    note: {
      en: 'Two to four people, remote. Priced per student, which usually makes it the cheaper route before an exam.',
      es: 'De dos a cuatro personas, remoto. Se cobra por estudiante, que suele ser la opción más barata antes de un examen.',
    },
  },
];

export const classAudiences: Audience[] = [
  {
    id: 'university',
    label: { en: 'University students', es: 'Estudiantes universitarios' },
    note: {
      en: 'Calculus, computational physics, numerical methods. The same coursework I did at Universidad de los Andes and left public.',
      es: 'Cálculo, física computacional, métodos numéricos. Los mismos cursos que hice en la Universidad de los Andes y dejé públicos.',
    },
  },
  {
    id: 'school',
    label: { en: 'School students', es: 'Estudiantes de colegio' },
    note: {
      en: 'Secondary mathematics and physics, and a first real programming language.',
      es: 'Matemáticas y física de bachillerato, y un primer lenguaje de programación de verdad.',
    },
  },
  {
    id: 'developers',
    label: { en: 'Working developers', es: 'Desarrolladores en ejercicio' },
    note: {
      en: 'Python and backend depth: async, schema design, authentication, getting it deployed and keeping it up.',
      es: 'Profundidad en Python y backend: asincronía, diseño de esquemas, autenticación, desplegarlo y mantenerlo en pie.',
    },
  },
  {
    id: 'career-changers',
    label: { en: 'Career changers', es: 'Personas cambiando de carrera' },
    note: {
      en: 'Coming into programming from another field, with structured teaching rather than a playlist of videos.',
      es: 'Llegando a la programación desde otro campo, con enseñanza estructurada y no una lista de videos.',
    },
  },
];
