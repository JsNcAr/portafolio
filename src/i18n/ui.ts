export const LOCALES = ['en', 'es'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

/** BCP 47 tags for <html lang> and hreflang. */
export const HTML_LANG: Record<Locale, string> = { en: 'en-US', es: 'es-CO' };

/** Name each locale in its own language, never in the current one. */
export const LOCALE_NAME: Record<Locale, string> = { en: 'English', es: 'Español' };

export const ui = {
  en: {
    'site.name': 'Jason Arias',
    'site.role': 'Python backend engineer',
    'site.description':
      'Python backend engineer in Bogotá. FastAPI and PostgreSQL services, hardened auth, and the Debian infrastructure they run on.',

    'nav.label': 'Primary',
    'nav.home': 'Home',
    'nav.work': 'Work',
    'nav.opensource': 'Open source',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.skip': 'Skip to content',

    'lang.label': 'Language',
    'lang.switch': 'Leer en español',

    'home.lead': 'I build backends that stay up.',
    'home.intro.a':
      'Asynchronous FastAPI services on PostgreSQL, authentication that holds, and the Debian servers, containers and pipelines underneath them.',
    'home.intro.b':
      'Two years of production ownership: schema design through to reverse proxy and TLS, with nobody downstream to hand the hard part to.',
    'home.intro.c':
      'Physics at Universidad de los Andes behind the mathematical work: Kalman filtering, sensor fusion, and data pipelines that have to be right rather than merely finished.',

    'motif.alt':
      'A noisy position signal and the same signal after Kalman filtering: the raw trace swings wildly while the filtered line moves smoothly.',
    'motif.raw': 'raw samples',
    'motif.filtered': 'Kalman filtered',

    'home.selected': 'Selected work',
    'home.selected.note': 'Three systems I owned end to end.',
    'home.more': 'Read the case study',
    'home.allwork': 'All work',

    'home.now': 'Currently',
    'home.now.body':
      'Lead Backend and DevOps Engineer at Apollyon S.A.S, where I am the sole owner of the backend and the infrastructure it runs on.',

    'stack.title': 'Working stack',
    'stack.languages': 'Languages',
    'stack.backend': 'Backend',
    'stack.infra': 'Infrastructure',
    'stack.data': 'Data and AI',

    'footer.built':
      'Built with Astro. Static files, no tracking, no analytics, served by Caddy from a server I administer.',
    'footer.rights': 'All rights reserved.',
    'footer.contact': 'Get in touch',

    'meta.updated': 'Last updated',

    'notfound.code': 'Error 404',
    'notfound.title': 'That page does not exist.',
    'notfound.body':
      'The link may be out of date, or the page may not be built yet. Everything on the site is reachable from the pages below.',
    'notfound.home': 'Go to the home page',

    'work.title': 'Work',
    'work.lead': 'Five roles, and the systems behind them.',
    'work.intro':
      'Most of this work is private and proprietary, so what follows describes what I built and owned rather than linking to source. The public code that does corroborate it is on the open source page.',
    'work.present': 'Present',
    'work.role.current': 'Current role',
    'cs.read': 'Read the case study',
    'cs.back': 'All work',
    'cs.contents': 'Contents',
    'cs.stack': 'Stack',
    'cs.role': 'Role',
    'cs.period': 'Period',
    'cs.next': 'Next case study',
    'cs.prev': 'Previous case study',
    'cs.note': 'Written from work I owned. Company-internal details and figures are omitted.',

    'os.title': 'Open source',
    'os.lead': 'The public half.',
    'os.intro':
      'My strongest work sits in private company repositories. What is public is a mix of backend groundwork, data analysis, and the physics coursework where the numerical methods came from. I would rather show you that honestly than pad a grid.',
    'os.group.backend': 'Backend and infrastructure',
    'os.group.data': 'Data analysis',
    'os.group.numerical': 'Numerical methods and physics',
    'os.frontend.title': 'A note on the front ends',
    'os.frontend.body':
      'Some repositories here and elsewhere have web front ends. I planned and assembled those with AI tooling such as Lovable; they reflect how I scope and direct that work, not a claim to be a front-end engineer. My own craft is on the server side.',
    'os.coursework.title': 'A note on the coursework',
    'os.coursework.body':
      'The notebooks are university work and are labelled as such. They stay public because the mathematics in them is real and it is where the Kalman filtering and signal work came from.',
    'os.viewrepo': 'View repository',
    'os.profile': 'All repositories on GitHub',

    'about.title': 'About',
    'about.lead': 'Backend engineer, physics background, Bogotá.',
    'about.body.a':
      'I write Python services and run the machines they live on. In practice that has meant designing a schema, shipping the API over it, containerising it, putting a reverse proxy and TLS in front, and then being the person who is called when it stops responding at an inconvenient hour.',
    'about.body.b':
      'Most of my work has been at small companies where there was no platform team to hand the infrastructure to. That is the reason the CV reads across backend and DevOps rather than one or the other: the boundary was mine to cover.',
    'about.body.c':
      'The physics degree is not decoration. Sensor fusion, Extended Kalman Filters and RSSI smoothing on a Bluetooth mesh are the kind of problem where the mathematics decides whether the feature works, and that is the part I enjoy most.',
    'about.body.d':
      'I am not a front-end engineer, and I try not to be described as one. Where my projects have interfaces, I planned them and built them with AI tooling. I would rather be judged on the API underneath.',
    'about.timeline': 'Experience',
    'about.education': 'Education',
    'about.certifications': 'Certifications',
    'about.languages': 'Languages',
    'about.lang.es': 'Spanish — native',
    'about.lang.en': 'English — professional working',
    'about.lang.ja': 'Japanese — elementary',

    'contact.title': 'Contact',
    'contact.lead': 'Open to backend and infrastructure work.',
    'contact.intro':
      'Email is the surest way to reach me, and I answer within a couple of days. I am in Bogotá on Colombia time and I work remotely without trouble.',
    'contact.email.label': 'Email',
    'contact.github.label': 'GitHub',
    'contact.linkedin.label': 'LinkedIn',
    'contact.location.label': 'Based in',
    'contact.cv.title': 'Curriculum vitae',
    'contact.cv.body': 'The same material as this site, on two pages.',
    'contact.cv.download': 'Download the CV (PDF)',
  },

  es: {
    'site.name': 'Jason Arias',
    'site.role': 'Ingeniero backend de Python',
    'site.description':
      'Ingeniero backend de Python en Bogotá. Servicios en FastAPI y PostgreSQL, autenticación endurecida y la infraestructura Debian sobre la que corren.',

    'nav.label': 'Principal',
    'nav.home': 'Inicio',
    'nav.work': 'Trabajo',
    'nav.opensource': 'Código abierto',
    'nav.about': 'Perfil',
    'nav.contact': 'Contacto',
    'nav.skip': 'Saltar al contenido',

    'lang.label': 'Idioma',
    'lang.switch': 'Read in English',

    'home.lead': 'Construyo backends que se mantienen en pie.',
    'home.intro.a':
      'Servicios asíncronos en FastAPI sobre PostgreSQL, autenticación que resiste, y los servidores Debian, contenedores y pipelines que los sostienen.',
    'home.intro.b':
      'Dos años de responsabilidad en producción: del diseño del esquema hasta el proxy inverso y el TLS, sin nadie más abajo a quien pasarle la parte difícil.',
    'home.intro.c':
      'Física en la Universidad de los Andes detrás del trabajo matemático: filtros de Kalman, fusión de sensores y pipelines de datos que tienen que estar correctos, no solamente terminados.',

    'motif.alt':
      'Una señal de posición ruidosa y la misma señal tras un filtro de Kalman: la traza cruda oscila con violencia mientras la línea filtrada se mueve con suavidad.',
    'motif.raw': 'muestras crudas',
    'motif.filtered': 'filtrado de Kalman',

    'home.selected': 'Trabajo seleccionado',
    'home.selected.note': 'Tres sistemas de los que fui responsable de principio a fin.',
    'home.more': 'Leer el caso',
    'home.allwork': 'Todo el trabajo',

    'home.now': 'Actualmente',
    'home.now.body':
      'Lead Backend and DevOps Engineer en Apollyon S.A.S, donde soy el único responsable del backend y de la infraestructura sobre la que corre.',

    'stack.title': 'Stack de trabajo',
    'stack.languages': 'Lenguajes',
    'stack.backend': 'Backend',
    'stack.infra': 'Infraestructura',
    'stack.data': 'Datos e IA',

    'footer.built':
      'Hecho con Astro. Archivos estáticos, sin rastreo ni analítica, servidos por Caddy desde un servidor que yo administro.',
    'footer.rights': 'Todos los derechos reservados.',
    'footer.contact': 'Escribirme',

    'meta.updated': 'Última actualización',

    'notfound.code': 'Error 404',
    'notfound.title': 'Esa página no existe.',
    'notfound.body':
      'Puede que el enlace esté desactualizado, o que la página aún no esté construida. Todo el sitio se alcanza desde las páginas de abajo.',
    'notfound.home': 'Ir a la página de inicio',

    'work.title': 'Trabajo',
    'work.lead': 'Cinco roles, y los sistemas detrás de ellos.',
    'work.intro':
      'Casi todo este trabajo es privado y propietario, así que lo que sigue describe lo que construí y de lo que fui responsable, sin enlazar al código. El código público que sí lo respalda está en la página de código abierto.',
    'work.present': 'Actualidad',
    'work.role.current': 'Rol actual',
    'cs.read': 'Leer el caso',
    'cs.back': 'Todo el trabajo',
    'cs.contents': 'Contenido',
    'cs.stack': 'Stack',
    'cs.role': 'Rol',
    'cs.period': 'Periodo',
    'cs.next': 'Siguiente caso',
    'cs.prev': 'Caso anterior',
    'cs.note': 'Escrito sobre trabajo del que fui responsable. Se omiten detalles y cifras internas de las empresas.',

    'os.title': 'Código abierto',
    'os.lead': 'La mitad pública.',
    'os.intro':
      'Mi trabajo más fuerte está en repositorios privados de empresa. Lo que es público es una mezcla de bases de backend, análisis de datos, y los trabajos de física de donde salieron los métodos numéricos. Prefiero mostrarlo así, con honestidad, antes que rellenar una cuadrícula.',
    'os.group.backend': 'Backend e infraestructura',
    'os.group.data': 'Análisis de datos',
    'os.group.numerical': 'Métodos numéricos y física',
    'os.frontend.title': 'Una nota sobre los frontends',
    'os.frontend.body':
      'Algunos repositorios aquí y en otros lugares tienen interfaces web. Esas las planeé y las armé con herramientas de IA como Lovable; reflejan cómo defino y dirijo ese trabajo, no una pretensión de ser ingeniero de frontend. Mi oficio está del lado del servidor.',
    'os.coursework.title': 'Una nota sobre los trabajos de universidad',
    'os.coursework.body':
      'Los cuadernos son trabajos de universidad y están marcados como tales. Siguen públicos porque las matemáticas que contienen son reales y es de ahí que salió el trabajo con filtros de Kalman y señales.',
    'os.viewrepo': 'Ver el repositorio',
    'os.profile': 'Todos los repositorios en GitHub',

    'about.title': 'Perfil',
    'about.lead': 'Ingeniero backend, formación en física, Bogotá.',
    'about.body.a':
      'Escribo servicios en Python y administro las máquinas donde viven. En la práctica eso ha significado diseñar un esquema, entregar la API encima, ponerla en contenedores, dejarle un proxy inverso con TLS al frente, y después ser la persona a la que llaman cuando deja de responder a una hora inconveniente.',
    'about.body.b':
      'La mayor parte de mi trabajo ha sido en empresas pequeñas donde no había un equipo de plataforma a quien pasarle la infraestructura. Por eso la hoja de vida cruza backend y DevOps en lugar de quedarse en uno de los dos: ese límite me tocaba a mí.',
    'about.body.c':
      'El pregrado en física no es decoración. La fusión de sensores, los filtros de Kalman extendidos y el suavizado de RSSI sobre una malla Bluetooth son el tipo de problema donde las matemáticas deciden si la funcionalidad sirve, y esa es la parte que más disfruto.',
    'about.body.d':
      'No soy ingeniero de frontend y trato de que no me describan como tal. Donde mis proyectos tienen interfaz, la planeé y la construí con herramientas de IA. Prefiero que me evalúen por la API que está debajo.',
    'about.timeline': 'Experiencia',
    'about.education': 'Educación',
    'about.certifications': 'Certificaciones',
    'about.languages': 'Idiomas',
    'about.lang.es': 'Español — nativo',
    'about.lang.en': 'Inglés — profesional de trabajo',
    'about.lang.ja': 'Japonés — elemental',

    'contact.title': 'Contacto',
    'contact.lead': 'Abierto a trabajo de backend e infraestructura.',
    'contact.intro':
      'El correo es la forma más segura de contactarme, y respondo en un par de días. Estoy en Bogotá, en hora de Colombia, y trabajo en remoto sin problema.',
    'contact.email.label': 'Correo',
    'contact.github.label': 'GitHub',
    'contact.linkedin.label': 'LinkedIn',
    'contact.location.label': 'Ubicado en',
    'contact.cv.title': 'Hoja de vida',
    'contact.cv.body': 'El mismo material de este sitio, en dos páginas.',
    'contact.cv.download': 'Descargar la hoja de vida (PDF)',
  },
} as const;

export type UIKey = keyof (typeof ui)['en'];
