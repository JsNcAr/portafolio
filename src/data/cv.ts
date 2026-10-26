import type { Locale } from '@i18n/ui';

type Bilingual = Record<Locale, string>;

export interface Role {
  /** Stable id, used for anchors and keys. */
  id: string;
  org: string;
  /** The organisation's public site, where it has one. Read by the structured data. */
  orgUrl?: string;
  /** Job title, kept in English in both locales: these are the titles as held. */
  title: string;
  start: string;
  end: string | null;
  location: string;
  summary: Bilingual;
  highlights: Array<Bilingual>;
  stack: string[];
  /**
   * Scannable figures for the case study header. Only ever numbers already
   * stated in `highlights` -- this is a restatement for a reader who skims,
   * never a new claim. Roles without measured outcomes simply omit it.
   */
  metrics?: Array<{ value: Bilingual; label: Bilingual }>;
  /**
   * When the case study prose was last revised, as a full date (YYYY-MM-DD) taken
   * from the MDX files' git history. The page shows only the month; the sitemap
   * needs the day, and a day that is merely the 1st of the month would be invented.
   */
  updated?: string;
}

/**
 * Source of truth for the CV. Titles and org names are not translated -- they
 * are proper nouns and the roles were held under these names.
 */
export const roles: Role[] = [
  {
    id: 'apollyon',
    org: 'Apollyon S.A.S',
    orgUrl: 'https://apollyon.lat',
    title: 'Backend & DevOps Engineer',
    start: '2024-10',
    end: null,
    location: 'Bogotá',
    summary: {
      en: 'Co-founded engineering venture building Korvy, an offline-first event tracking platform. Sole backend and infrastructure owner (full-time focus between contracts; maintained on weekends during full-time roles).',
      es: 'Emprendimiento de ingeniería cofundado para construir Korvy, una plataforma offline-first de rastreo para eventos. Único responsable de backend e infraestructura (dedicación completa entre contratos; mantenido en fines de semana durante roles de tiempo completo).',
    },
    highlights: [
      {
        en: 'Built the asynchronous REST API for Korvy in Python (FastAPI, SQLModel, PostgreSQL), designing the relational schema, migrations, and explicit error contracts for offline firmware retry logic.',
        es: 'Construí la API REST asíncrona de Korvy en Python (FastAPI, SQLModel, PostgreSQL), diseñando el esquema relacional, las migraciones y contratos de error explícitos para la lógica de reintento del firmware sin conexión.',
      },
      {
        en: 'Implemented multi-layered authentication — OAuth2, signed JWTs, and API keys with 12-round bcrypt hashing — securing all user and device telemetry endpoints.',
        es: 'Implementé autenticación en varias capas — OAuth2, JWT firmados y llaves de API con hashing bcrypt de 12 rondas — asegurando todos los endpoints de usuarios y telemetría de dispositivos.',
      },
      {
        en: 'Containerized every service with Docker and systemd on company-owned Debian servers, with Caddy handling edge routing and automatic TLS for the production API.',
        es: 'Puse cada servicio en contenedores con Docker y systemd en servidores Debian propios de la empresa, con Caddy encargándose del enrutamiento de borde y del TLS automático para la API de producción.',
      },
      {
        en: 'Deployed a self-hosted GitLab instance and CI/CD pipelines running automated pytest suites and linting gates before pushing containerized updates to production on merge, plus internal docs on GitLab Pages.',
        es: 'Desplegué una instancia de GitLab autoalojada y pipelines de CI/CD que ejecutan suites automatizadas de pytest y controles de lint antes de llevar actualizaciones en contenedores a producción al hacer merge, además de documentación interna en GitLab Pages.',
      },
      {
        en: 'Implemented radio-frequency telemetry ingestion over a Bluetooth Low Energy (BLE) mesh, applying Extended Kalman Filters and RSSI smoothing to turn noisy radio signals into usable spatial positioning.',
        es: 'Implementé la ingesta de telemetría de radiofrecuencia sobre una red mesh de Bluetooth Low Energy (BLE), aplicando filtros de Kalman extendidos y suavizado de RSSI para convertir señales de radio ruidosas en posicionamiento espacial utilizable.',
      },
    ],
    stack: ['FastAPI', 'SQLModel', 'PostgreSQL', 'pytest', 'Docker', 'systemd', 'Caddy', 'GitLab CI/CD', 'BLE', 'Kalman filters'],
    updated: '2026-10-26',
  },
  {
    id: 'personally-ai',
    org: 'Personally AI',
    title: 'Backend & Data Engineer',
    start: '2025-07',
    end: '2026-02',
    location: 'Bogotá',
    summary: {
      en: 'AI automation studio. Rehired to standardize backend architecture, lead client API delivery, and mentor a growing engineering team from 1 to 5 developers while remaining hands-on.',
      es: 'Estudio de automatización con IA. Recontratado para estandarizar la arquitectura backend, liderar la entrega de APIs para clientes y guiar el crecimiento del equipo de ingeniería de 1 a 5 desarrolladores sin dejar de programar.',
    },
    highlights: [
      {
        en: 'Designed and shipped secure REST APIs with FastAPI, Pydantic, and SQLAlchemy, managing schema evolution with Alembic migrations and standardizing JWT and API-key authentication across client-facing endpoints.',
        es: 'Diseñé y entregué APIs REST seguras con FastAPI, Pydantic y SQLAlchemy, gestionando la evolución de esquemas con migraciones en Alembic y estandarizando la autenticación por JWT y llaves de API en los endpoints de cara al cliente.',
      },
      {
        en: 'Automated reporting for a marketing agency running 60+ client accounts — Selenium extraction from Meta Business Suite plus Pandas cleaning and analysis — replacing manual reports and cutting reporting effort by around 80%.',
        es: 'Automaticé los reportes de una agencia de marketing con más de 60 cuentas de clientes — extracción con Selenium desde Meta Business Suite más limpieza y análisis con Pandas — reemplazando los reportes manuales y reduciendo el tiempo dedicado a los reportes en cerca de un 80%.',
      },
      {
        en: 'Built a CRM and lead-generation service processing thousands of leads per run via the Apollo API, using optimized SQL queries and background task management for high-volume workloads.',
        es: 'Construí un servicio de CRM y generación de leads que procesa miles de leads por ejecución mediante la API de Apollo, con consultas SQL optimizadas y gestión de tareas en segundo plano para cargas de alto volumen.',
      },
      {
        en: 'Ran hybrid infrastructure (Hetzner Cloud plus on-prem Debian) with Docker and Linux daemons, led code reviews for 4 developers, and reviewed architecture for an LLM lead-scoring chatbot integrated with HubSpot.',
        es: 'Operé infraestructura híbrida (Hetzner Cloud más Debian on-premise) con Docker y daemons de Linux, lideré revisiones de código para 4 desarrolladores y revisé la arquitectura de un chatbot de puntuación de leads con LLM integrado con HubSpot.',
      },
    ],
    stack: ['FastAPI', 'Pydantic', 'SQLAlchemy', 'Alembic', 'Selenium', 'Pandas', 'Apollo API', 'Hetzner Cloud', 'Docker'],
    metrics: [
      { value: { en: '60+', es: '60+' }, label: { en: 'client accounts reported on', es: 'cuentas de clientes con reportes' } },
      { value: { en: '~80%', es: '~80%' }, label: { en: 'less reporting effort', es: 'menos esfuerzo en reportes' } },
      { value: { en: '1 to 5', es: '1 a 5' }, label: { en: 'engineers, team I mentored', es: 'ingenieros, equipo que guié' } },
    ],
    updated: '2026-10-26',
  },
  {
    id: 'atonga',
    org: 'Atonga',
    title: 'Backend Engineer',
    start: '2024-10',
    end: '2025-06',
    location: 'Bogotá',
    summary: {
      en: 'AI-driven multichannel e-commerce platform for small entrepreneurs.',
      es: 'Plataforma de comercio electrónico multicanal impulsada por IA para pequeños emprendedores.',
    },
    highlights: [
      {
        en: 'Co-designed the core backend architecture in Python and FastAPI over PostgreSQL, serving real-time requests from web and chat clients over a single unified domain model.',
        es: 'Codiseñé la arquitectura central del backend en Python y FastAPI sobre PostgreSQL, atendiendo peticiones en tiempo real desde clientes web y de chat sobre un único modelo de dominio unificado.',
      },
      {
        en: 'Integrated an LLM-powered assistant (OpenAI API, WebSockets) that lets sellers manage storefronts and buyers find products conversationally.',
        es: 'Integré un asistente con LLM (OpenAI API, WebSockets) que permite a los vendedores gestionar sus tiendas y a los compradores encontrar productos conversando.',
      },
      {
        en: 'Set engineering standards, API contracts, and remote workflows for the team, coordinating delivery through Jira and Slack.',
        es: 'Definí los estándares de ingeniería, contratos de API y flujos de trabajo remoto del equipo, coordinando la entrega con Jira y Slack.',
      },
    ],
    stack: ['FastAPI', 'PostgreSQL', 'WebSockets', 'OpenAI API', 'Jira'],
    updated: '2026-10-26',
  },
  {
    id: 'personally-ai-dev',
    org: 'Personally AI',
    title: 'Python Developer',
    start: '2024-05',
    end: '2024-10',
    location: 'Bogotá',
    summary: {
      en: 'First engineering role at the studio, focused on document extraction and operations automation.',
      es: 'Primer rol de ingeniería en el estudio, enfocado en extracción de documentos y automatización de operaciones.',
    },
    highlights: [
      {
        en: 'Built an OCR pipeline for complex documents combining OpenCV preprocessing, Tesseract and the GPT-4o vision model for high-accuracy extraction.',
        es: 'Construí un pipeline de OCR para documentos complejos combinando preprocesamiento con OpenCV, Tesseract y el modelo de visión GPT-4o para una extracción de alta precisión.',
      },
      {
        en: 'Delivered Python automation tools that removed repetitive manual steps from client operations workflows.',
        es: 'Entregué herramientas de automatización en Python que eliminaron pasos manuales repetitivos de los flujos de operaciones de los clientes.',
      },
    ],
    stack: ['OpenCV', 'Tesseract', 'GPT-4o vision', 'Python'],
  },
];

/**
 * The opening paragraph of the CV. Kept CV-shaped (claims plus evidence) rather
 * than reusing the site's home-page copy, which is written for a different reader.
 */
export const summary: Bilingual = {
  en: 'Python backend engineer with 2+ years building and running production APIs end to end: asynchronous FastAPI services on PostgreSQL, schema migrations with Alembic, hardened OAuth2/JWT authentication, automated pytest suites in CI/CD, and Dockerized deployments on Debian Linux servers. Comfortable owning the whole path from relational schema design to Caddy reverse proxy and TLS, and equally at home in data-heavy backend workloads — automated ETL pipelines, high-volume API integrations, and Kalman-filtered telemetry. Grounded in rigorous mathematical and physics training (Universidad de los Andes & Universidad Nacional de Colombia).',
  es: 'Ingeniero de backend Python con más de dos años construyendo y operando APIs en producción de punta a punta: servicios asíncronos en FastAPI sobre PostgreSQL, migraciones con Alembic, autenticación reforzada con OAuth2 y JWT, suites automatizadas de pytest en CI/CD y despliegues en contenedores sobre servidores Debian Linux. Me hago cargo de todo el camino, del diseño del esquema relacional al proxy inverso con Caddy y TLS, y me muevo con la misma soltura en cargas intensivas de datos: pipelines ETL automatizados, integraciones de alto volumen y telemetría filtrada con Kalman. Base matemática y física sólida (Universidad de los Andes y Universidad Nacional de Colombia).',
};

export const skills: Array<{ key: 'languages' | 'backend' | 'infra' | 'data'; items: string[] }> = [
  { key: 'languages', items: ['Python (Asyncio)', 'SQL', 'Bash / Shell', 'C++ (Numerical)', 'Kotlin (Basic)'] },
  {
    key: 'backend',
    items: ['FastAPI', 'SQLModel', 'SQLAlchemy', 'Alembic', 'Pydantic', 'PostgreSQL', 'asyncpg', 'REST APIs', 'WebSockets', 'Webhooks', 'OAuth2 / JWT', 'RBAC', 'bcrypt', 'pytest'],
  },
  {
    key: 'infra',
    items: ['Debian / Ubuntu', 'Docker', 'Docker Compose', 'systemd', 'Caddy (Automatic TLS)', 'GitLab CI/CD', 'GitHub Actions', 'Hetzner Cloud', 'On-prem Linux servers', 'Git'],
  },
  {
    key: 'data',
    items: ['Pandas', 'NumPy', 'Selenium', 'OpenCV', 'Tesseract OCR', 'OpenAI API (RAG & Structured Outputs)', 'Extended Kalman Filters (EKF)', 'ETL Pipelines'],
  },
];

export const education = {
  degree: {
    en: 'BSc in Physics (80% Completed)',
    es: 'Pregrado en Física (80% completado)',
  },
  org: 'Universidad de los Andes & Universidad Nacional de Colombia',
  track: {
    en: 'Flexible evening track',
    es: 'Horario nocturno flexible',
  },
  note: {
    en: 'Completed 8 semesters of core and computational physics at Universidad de los Andes (mathematical modeling, numerical methods in C++/Python, differential equations, and statistical mechanics) as a recipient of the national "Ser Pilo Paga" merit scholarship; completing remaining credits on a flexible, non-blocking schedule at Universidad Nacional de Colombia.',
    es: 'Ocho semestres cursados de física fundamental y computacional en la Universidad de los Andes (modelamiento matemático, métodos numéricos en C++/Python, ecuaciones diferenciales y mecánica estadística) como beneficiario de la beca nacional de mérito "Ser Pilo Paga"; cursando los créditos finales en horario flexible en la Universidad Nacional de Colombia.',
  },
};

export const certifications = [
  'FastAPI: Databases, Modularization and Production Deployment — Platzi',
  'Python Professional & Exploratory Data Analysis — Platzi',
  'Computer Networks & Internet Infrastructure — Platzi',
];

export const contact = {
  email: 'jn.arias@uniandes.edu.co',
  /** Digits only, no plus sign -- the format wa.me requires. */
  whatsapp: '573196817363',
  whatsappDisplay: '+57 319 681 7363',
  github: 'https://github.com/JsNcAr',
  linkedin: 'https://linkedin.com/in/jason-nicolas-arias-gomez-50127b248',
  location: { en: 'Bogotá, Colombia — open to remote', es: 'Bogotá, Colombia — abierto a trabajo remoto' },
};
