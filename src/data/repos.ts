import type { Locale } from '@i18n/ui';

type Bilingual = Record<Locale, string>;

export type RepoGroup = 'backend' | 'data' | 'numerical';

export interface Repo {
  name: string;
  url: string;
  group: RepoGroup;
  language: string;
  /** Our own description, not GitHub's -- it says why the repo is worth opening. */
  blurb: Bilingual;
  tags: string[];
  /** The one repo that best corroborates the CV. Rendered larger. */
  lead?: boolean;
}

const gh = (name: string) => `https://github.com/JsNcAr/${name}`;

export const repos: Repo[] = [
  {
    name: 'basic_api',
    url: gh('basic_api'),
    group: 'backend',
    language: 'Python',
    lead: true,
    blurb: {
      en: 'A FastAPI starter with the authentication layer already solved: OAuth2 with signed JWTs, async PostgreSQL through SQLModel, and login by username, email or phone against one identity. The closest public equivalent to the auth work described in the case studies.',
      es: 'Un punto de partida en FastAPI con la capa de autenticación ya resuelta: OAuth2 con JWT firmados, PostgreSQL asíncrono a través de SQLModel, e inicio de sesión por usuario, correo o teléfono contra una sola identidad. Lo más parecido que tengo en público al trabajo de autenticación descrito en los casos.',
    },
    tags: ['FastAPI', 'OAuth2', 'JWT', 'SQLModel', 'asyncpg'],
  },
  {
    name: 'celestian-mechanics-calculations-api',
    url: gh('celestian-mechanics-calculations-api'),
    group: 'backend',
    language: 'Python',
    blurb: {
      en: 'A FastAPI service for common celestial-mechanics calculations. Physics and backend in the same repository, which is roughly how the two halves of my work meet.',
      es: 'Un servicio en FastAPI para cálculos frecuentes de mecánica celeste. Física y backend en el mismo repositorio, que es más o menos donde se encuentran las dos mitades de mi trabajo.',
    },
    tags: ['FastAPI', 'Python', 'orbital mechanics'],
  },
  {
    name: 'Daemons',
    url: gh('Daemons'),
    group: 'backend',
    language: 'Python',
    blurb: {
      en: 'The daemons running on my own Linux server. Small, unglamorous, and the reason I am comfortable claiming systemd and Debian administration on a CV.',
      es: 'Los daemons que corren en mi propio servidor Linux. Pequeños, poco vistosos y la razón por la que puedo poner administración de systemd y Debian en una hoja de vida.',
    },
    tags: ['Linux', 'systemd', 'self-hosted'],
  },
  {
    name: 'Telegram_bot',
    url: gh('Telegram_bot'),
    group: 'backend',
    language: 'Python',
    blurb: {
      en: 'A multipurpose Telegram bot, including a dynamic-DNS updater for a home server on a changing IP.',
      es: 'Un bot de Telegram multipropósito, que incluye un actualizador de DNS dinámico para un servidor casero con IP cambiante.',
    },
    tags: ['Telegram', 'dynamic DNS', 'self-hosted'],
  },
  {
    name: 'Bogota-Apartments-Rework',
    url: gh('Bogota-Apartments-Rework'),
    group: 'data',
    language: 'Python',
    blurb: {
      en: 'Rental and sale prices for apartments in Bogotá: extraction, cleaning, visualisation and predictive modelling. A rework of an existing open-source dataset project rather than a fork left untouched.',
      es: 'Precios de arriendo y venta de apartamentos en Bogotá: extracción, limpieza, visualización y modelado predictivo. Una reelaboración de un proyecto existente de datos abiertos, no un fork sin tocar.',
    },
    tags: ['ETL', 'Pandas', 'modelling'],
  },
  {
    name: 'GSalud_Analysis',
    url: gh('GSalud_Analysis'),
    group: 'data',
    language: 'Jupyter',
    blurb: {
      en: 'Financial analysis for a dental clinic, reading from MySQL and analysed in Pandas. Real books rather than a sample dataset.',
      es: 'Análisis financiero de una clínica dental, leyendo desde MySQL y analizado con Pandas. Contabilidad real, no un conjunto de datos de ejemplo.',
    },
    tags: ['Pandas', 'MySQL', 'EDA'],
  },
  {
    name: 'Monopoly_Game_Statistics',
    url: gh('Monopoly_Game_Statistics'),
    group: 'data',
    language: 'Jupyter',
    blurb: {
      en: 'A Monte Carlo study of a Monopoly board: which squares actually pay, and how long it takes to find out.',
      es: 'Un estudio de Monte Carlo sobre un tablero de Monopoly: qué casillas realmente rinden y cuánto hay que simular para saberlo.',
    },
    tags: ['Monte Carlo', 'simulation', 'statistics'],
  },
  {
    name: 'MetodosComputacionales_2',
    url: gh('MetodosComputacionales_2'),
    group: 'numerical',
    language: 'Jupyter / C++',
    blurb: {
      en: 'Fourier analysis, ordinary differential equations and PDEs, in C++ and Python. University coursework, kept public because it is where the numerical methods behind the Kalman filtering work were actually learned.',
      es: 'Análisis de Fourier, ecuaciones diferenciales ordinarias y en derivadas parciales, en C++ y Python. Trabajo de universidad, público porque ahí es donde realmente aprendí los métodos numéricos detrás del trabajo con filtros de Kalman.',
    },
    tags: ['Fourier', 'PDEs', 'C++'],
  },
  {
    name: 'Metodos1_JasonArias_SergioCruz',
    url: gh('Metodos1_JasonArias_SergioCruz'),
    group: 'numerical',
    language: 'Jupyter',
    blurb: {
      en: 'Interpolation, numerical integration, Monte Carlo, least squares and hidden Markov models. Coursework, paired with another student.',
      es: 'Interpolación, integración numérica, Monte Carlo, mínimos cuadrados y modelos ocultos de Márkov. Trabajo de curso, en pareja con otro estudiante.',
    },
    tags: ['Monte Carlo', 'least squares', 'HMM'],
  },
  {
    name: 'University',
    url: gh('University'),
    group: 'numerical',
    language: 'Jupyter',
    blurb: {
      en: 'Physics coursework and lab analysis from the degree at Universidad de los Andes: modern physics, waves and fluids, mechanics, astrophysics.',
      es: 'Trabajos de física y análisis de laboratorio del pregrado en la Universidad de los Andes: física moderna, ondas y fluidos, mecánica, astrofísica.',
    },
    tags: ['physics', 'lab analysis', 'NumPy'],
  },
];

/** GitHub profile figures worth stating plainly rather than as badges. */
export const githubProfile = {
  url: 'https://github.com/JsNcAr',
  handle: 'JsNcAr',
  since: '2020',
};
