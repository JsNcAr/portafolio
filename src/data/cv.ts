import type { Locale } from '@i18n/ui';

type Bilingual = Record<Locale, string>;

export interface Role {
  /** Stable id, used for anchors and keys. */
  id: string;
  org: string;
  /** Job title, kept in English in both locales: these are the titles as held. */
  title: string;
  start: string;
  end: string | null;
  location: string;
  summary: Bilingual;
  highlights: Array<Bilingual>;
  stack: string[];
}

/**
 * Source of truth for the CV. Titles and org names are not translated -- they
 * are proper nouns and the roles were held under these names.
 */
export const roles: Role[] = [
  {
    id: 'apollyon',
    org: 'Apollyon S.A.S',
    title: 'Lead Backend & DevOps Engineer (COO)',
    start: '2024-10',
    end: null,
    location: 'Bogotá',
    summary: {
      en: 'Offline-first proximity tracking and communication platform. Sole backend and infrastructure owner.',
      es: 'Plataforma de rastreo de proximidad y comunicación con enfoque offline-first. Único responsable del backend y la infraestructura.',
    },
    highlights: [
      {
        en: "Built the platform's fully asynchronous REST API in Python (FastAPI, SQLModel, PostgreSQL), designing the schema, migrations and error contracts from scratch.",
        es: 'Construí la API REST completamente asíncrona de la plataforma en Python (FastAPI, SQLModel, PostgreSQL), diseñando el esquema, las migraciones y los contratos de error desde cero.',
      },
      {
        en: 'Implemented multi-layered authentication — OAuth2, signed JWTs and API keys with 12-round bcrypt hashing — securing all user and device endpoints.',
        es: 'Implementé autenticación en varias capas — OAuth2, JWT firmados y llaves de API con hashing bcrypt de 12 rondas — asegurando todos los endpoints de usuarios y dispositivos.',
      },
      {
        en: 'Containerized every service with Docker and systemd on company-owned Debian servers, with Caddy handling edge routing and automatic TLS for the production API.',
        es: 'Contenericé cada servicio con Docker y systemd en servidores Debian propios de la empresa, con Caddy encargándose del enrutamiento de borde y del TLS automático para la API de producción.',
      },
      {
        en: 'Deployed a self-hosted GitLab instance and CI/CD pipelines that push backend updates to production on merge, plus branching rules and internal docs on GitLab Pages.',
        es: 'Desplegué una instancia de GitLab autoalojada y pipelines de CI/CD que llevan las actualizaciones del backend a producción al hacer merge, además de reglas de ramas y documentación interna en GitLab Pages.',
      },
      {
        en: 'Engineered a Bluetooth Low Energy mesh network for offline telemetry, applying Extended Kalman Filters and RSSI smoothing to turn noisy radio signals into usable spatial positioning.',
        es: 'Diseñé una red mesh de Bluetooth Low Energy para telemetría sin conexión, aplicando filtros de Kalman extendidos y suavizado de RSSI para convertir señales de radio ruidosas en posicionamiento espacial utilizable.',
      },
    ],
    stack: ['FastAPI', 'SQLModel', 'PostgreSQL', 'Docker', 'systemd', 'Caddy', 'GitLab CI/CD', 'BLE', 'Kalman filters'],
  },
  {
    id: 'personally-ai',
    org: 'Personally AI',
    title: 'Backend & Data Engineer, Head of Engineering (CTO)',
    start: '2025-07',
    end: '2026-02',
    location: 'Bogotá',
    summary: {
      en: 'AI automation studio. Grew engineering from a solo operation to a team of 5 while remaining hands-on.',
      es: 'Estudio de automatización con IA. Hice crecer el equipo de ingeniería de una operación individual a cinco personas sin dejar de programar.',
    },
    highlights: [
      {
        en: 'Designed and shipped secure REST APIs with FastAPI, Pydantic and SQLAlchemy, standardizing JWT and API-key authentication across client-facing endpoints.',
        es: 'Diseñé y entregué APIs REST seguras con FastAPI, Pydantic y SQLAlchemy, estandarizando la autenticación por JWT y llaves de API en los endpoints de cara al cliente.',
      },
      {
        en: 'Automated reporting for a marketing agency running 60+ client accounts — Selenium extraction from Meta Business Suite plus Pandas cleaning and analysis — replacing manual reports and cutting reporting effort by around 80%.',
        es: 'Automaticé los reportes de una agencia de marketing con más de 60 cuentas de clientes — extracción con Selenium desde Meta Business Suite más limpieza y análisis con Pandas — reemplazando los reportes manuales y reduciendo el esfuerzo de reporteo cerca de un 80%.',
      },
      {
        en: 'Built a CRM and lead-generation service processing thousands of leads per run via the Apollo API, using optimized queries and background task management for high-volume workloads.',
        es: 'Construí un servicio de CRM y generación de leads que procesa miles de leads por ejecución mediante la API de Apollo, con consultas optimizadas y gestión de tareas en segundo plano para cargas de alto volumen.',
      },
      {
        en: 'Ran hybrid infrastructure (Hetzner Cloud plus on-prem Debian) with Docker and Linux daemons, and reviewed architecture for an LLM lead-scoring chatbot integrated with HubSpot.',
        es: 'Operé infraestructura híbrida (Hetzner Cloud más Debian on-premise) con Docker y daemons de Linux, y revisé la arquitectura de un chatbot de puntuación de leads con LLM integrado con HubSpot.',
      },
    ],
    stack: ['FastAPI', 'Pydantic', 'SQLAlchemy', 'Selenium', 'Pandas', 'Apollo API', 'Hetzner Cloud', 'Docker'],
  },
  {
    id: 'atonga',
    org: 'Atonga',
    title: 'Backend Engineer / Co-CTO',
    start: '2024-10',
    end: '2025-06',
    location: 'Bogotá',
    summary: {
      en: 'AI-driven multichannel e-commerce platform for small entrepreneurs.',
      es: 'Plataforma de comercio electrónico multicanal impulsada por IA para pequeños emprendedores.',
    },
    highlights: [
      {
        en: 'Co-designed the backend architecture in Python and FastAPI over PostgreSQL, serving real-time requests from web and chat clients.',
        es: 'Codiseñé la arquitectura del backend en Python y FastAPI sobre PostgreSQL, atendiendo peticiones en tiempo real desde clientes web y de chat.',
      },
      {
        en: 'Integrated an LLM-powered assistant that lets sellers manage storefronts and buyers find products conversationally.',
        es: 'Integré un asistente con LLM que permite a los vendedores gestionar sus tiendas y a los compradores encontrar productos conversando.',
      },
      {
        en: 'Set engineering standards and remote workflows for the team, coordinating delivery through Jira and Slack.',
        es: 'Definí los estándares de ingeniería y los flujos de trabajo remoto del equipo, coordinando la entrega con Jira y Slack.',
      },
    ],
    stack: ['FastAPI', 'PostgreSQL', 'WebSockets', 'OpenAI API', 'Jira'],
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
  {
    id: 'uniandes-ta',
    org: 'Universidad de los Andes',
    title: 'Teaching Assistant',
    start: '2020-02',
    end: '2020-06',
    location: 'Bogotá',
    summary: {
      en: 'Supported coursework grading and student feedback for an undergraduate art history course.',
      es: 'Apoyé la calificación de trabajos y la retroalimentación a estudiantes en un curso de pregrado de historia del arte.',
    },
    highlights: [],
    stack: [],
  },
];

export const skills: Array<{ key: 'languages' | 'backend' | 'infra' | 'data'; items: string[] }> = [
  { key: 'languages', items: ['Python', 'SQL', 'Bash', 'Kotlin (basic)'] },
  {
    key: 'backend',
    items: ['FastAPI', 'SQLModel', 'SQLAlchemy', 'Pydantic', 'PostgreSQL', 'REST', 'WebSockets', 'Webhooks', 'OAuth2', 'JWT', 'RBAC', 'bcrypt'],
  },
  {
    key: 'infra',
    items: ['Debian / Ubuntu', 'Docker', 'systemd', 'Caddy', 'GitLab CI/CD', 'GitHub Actions', 'Hetzner Cloud', 'on-prem servers', 'Git'],
  },
  { key: 'data', items: ['Pandas', 'NumPy', 'Selenium', 'OpenCV', 'OpenAI API (RAG)', 'Extended Kalman Filters'] },
];

export const education = {
  degree: 'BSc Physics (in progress)',
  org: 'Universidad de los Andes, Colombia',
  start: '2018',
  end: null,
  note: {
    en: 'Coursework in mathematical modeling, numerical methods, statistics and computational physics. Recipient of the national "Ser Pilo Paga" merit scholarship.',
    es: 'Cursos en modelamiento matemático, métodos numéricos, estadística y física computacional. Becario de la beca nacional de mérito "Ser Pilo Paga".',
  },
};

export const certifications = [
  'FastAPI: Databases, Modularization and Production Deployment — Platzi',
  'Python Professional — Platzi',
  'Exploratory Data Analysis — Platzi',
  'Internet Computer Networks — Platzi',
  'Prompt Engineering with ChatGPT — Platzi',
];

export const contact = {
  email: 'jn.arias@uniandes.edu.co',
  /** Digits only, no plus sign -- the format wa.me requires. */
  whatsapp: '573196817363',
  whatsappDisplay: '+57 319 681 7363',
  github: 'https://github.com/JsNcAr',
  linkedin: 'https://linkedin.com/in/jason-nicolas-arias-gomez-50127b248',
  location: { en: 'Bogotá, Colombia — open to remote', es: 'Bogotá, Colombia — abierto a remoto' },
};
