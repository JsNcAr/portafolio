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
    'home.also': 'Also available for project work and classes.',
    'home.also.link': 'Services',
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
    'footer.colophon': 'How this is built and served',
    'contact.whatsapp.label': 'WhatsApp',
    'contact.whatsapp.prefill': 'Hi Jason, I found you through jsncar.tech.',
    'svc.whatsapp': 'Message on WhatsApp',
    'svc.whatsapp.prefill':
      'Hi Jason, I saw your services page and would like to talk about a project.',
    'svc.classes.whatsapp.prefill':
      'Hi Jason, I saw your services page and would like to ask about classes.',
    'svc.classes.book': 'Ask about classes',
    'footer.contact': 'Get in touch',

    'nav.services': 'Services',

    'svc.title': 'Services',
    'svc.lead': 'Backends, automation, and teaching.',
    'svc.intro':
      'Two kinds of work. Systems built and operated for companies, and one-to-one teaching in programming, mathematics and physics. Both are things I do; neither is a side effect of the other.',

    'svc.engineering': 'Engineering',
    'svc.engineering.note': 'Scoped, built, deployed and handed over.',
    'svc.from': 'From',
    'svc.enquire': 'Start a conversation',

    'svc.delivery.direct': 'Contracted directly with me',
    'svc.delivery.apollyon': 'Delivered through Apollyon S.A.S',
    'svc.delivery.either': 'Direct, or through Apollyon for larger builds',

    'svc.how': 'How it works',
    'svc.how.caption':
      'The same three steps whatever the engagement. You get working software at each one, not a status update.',
    'svc.how.1': 'Discovery',
    'svc.how.1.note': 'Your bottleneck and existing stack, then a scope',
    'svc.how.2': 'Build',
    'svc.how.2.note': 'Iterative, reviewable, tested',
    'svc.how.3': 'Handover',
    'svc.how.3.note': 'Documented, on infrastructure you own',

    'svc.sites': 'Websites',
    'svc.sites.lead': 'A site for your business, and someone to keep it online.',
    'svc.sites.build': 'Design and build',
    'svc.sites.hosting': 'Hosting and upkeep',
    'svc.sites.examples': 'Built and hosted by me',
    'svc.sites.shot': 'Home page of',
    'svc.sites.visit': 'Visit',

    'svc.classes': 'Classes',
    'svc.classes.lead': 'Programming, mathematics and physics.',
    'svc.classes.intro':
      'I have taught privately alongside my degree for most of my time at university, so this is not a sideline I picked up recently. Remote, in Spanish or English. I read physics at Universidad de los Andes, and the numerical methods coursework behind these subjects is public on my GitHub, so you can see how I work through a problem before booking anything.',
    'svc.classes.subjects': 'Subjects',
    'svc.classes.formats': 'Formats',
    'svc.classes.who': 'Who I teach',

    'svc.contracting': 'Who you would be contracting with',
    'svc.contracting.body':
      'I am COO of Apollyon S.A.S in Bogotá, and larger builds run through the company: a team, a contract, and continuity if I am not the one holding it. Smaller engagements and all teaching are direct with me. Each service above says which applies, and I will tell you plainly if a project belongs on the other side of that line.',

    'svc.cta.title': 'Have something worth building?',
    'svc.cta.body':
      'Tell me what you are trying to build, automate or untangle. I will come back with an architecture and a realistic timeline, not a brochure.',

    'col.title': 'Colophon',
    'col.lead': 'One machine, and how I run it.',
    'col.intro': 'The footer says this site is served by Caddy from a server I administer. This page is that sentence written out: what runs on the host, how a change reaches production, and how the whole thing fails.',

    'col.site': 'This site',
    'col.site.body': 'Astro, built to static files. No runtime, no database behind it, no framework shipped to the browser, no tracking and no analytics. Every colour, size and duration resolves from one token file, and seventeen render gates — contrast, keyboard operation, target size, reduced motion, RTL mirroring, silent overflow — run over every page in both themes before anything ships.',

    'col.edge': 'The edge',
    'col.edge.body': 'Caddy terminates TLS with certificates it obtains and renews on its own, serves over HTTP/2, redirects www to the apex and strips trailing slashes so each page has one URL, and returns the Spanish 404 to Spanish paths. Content is read from disk per request, so publishing restarts nothing.',
    'col.edge.headers': 'Every response carries',
    'col.edge.csp.note': 'No third-party origin is permitted at all. Fonts, styles and scripts are served from this host, so nothing on the page can call anywhere else.',
    'col.edge.verify': 'Independent scanners, so this is checkable rather than claimed:',

    'col.deploy': 'Getting a change out',
    'col.deploy.caption': 'The gates run before the push, on my own machine. They call scripts that are not part of the deployed repository, so the server could not run them even if it tried.',
    'col.deploy.1': 'Gate and push',
    'col.deploy.1.note': 'seventeen gates, then origin',
    'col.deploy.2': 'Pull',
    'col.deploy.2.note': 'on the host, via a deploy key',
    'col.deploy.3': 'Build beside',
    'col.deploy.3.note': 'into a directory nobody is serving',
    'col.deploy.4': 'Swap',
    'col.deploy.4.note': 'two renames',
    'col.deploy.body': 'The swap is the part that matters. Astro clears its output directory when a build starts, so building straight into the directory Caddy serves would empty the site for the length of every build, and leave it empty if that build failed. Building beside it and renaming makes the change effectively instant and leaves the previous build in place, so a rollback is the same two renames in the other order — no reload, nothing to reconfigure.',

    'col.host': 'The host',
    'col.host.body': 'One bare-metal Debian machine that I install, patch and answer for. It runs this site alongside a number of other services, described here by what they do rather than by where they are.',
    'col.host.proxy': 'Reverse proxy and TLS',
    'col.host.proxy.v': 'Caddy, in front of every site and service on the box.',
    'col.host.db': 'Relational database',
    'col.host.db.v': 'PostgreSQL, on the fastest disk and deliberately off the media pools.',
    'col.host.objects': 'Object storage',
    'col.host.objects.v': 'An S3-compatible store for application media.',
    'col.host.containers': 'Containers',
    'col.host.containers.v': 'Docker, with persistent volumes pinned to a dedicated disk so a full root partition cannot take the daemon down with it.',
    'col.host.ci': 'Source control and delivery',
    'col.host.ci.v': 'A self-hosted Git forge with push-to-deploy pipelines. Each repository gets its own key, so a compromised pipeline reaches one project rather than the host.',
    'col.host.ai': 'Local model inference',
    'col.host.ai.v': 'For work where the data cannot leave the machine it is already on.',
    'col.host.ops': 'Monitoring and hardening',
    'col.host.ops.v': 'Per-host metrics with alerting rules, SMART disk monitoring, and fail2ban on the exposed surface.',

    'col.fails': 'How it fails',
    'col.fails.body': 'It is one machine on a residential connection with a dynamic address, which is worth saying plainly on a page about reliability. A dynamic DNS updater watches that address and republishes it when it changes, so an address change costs the poll interval plus the record TTL. There is no second machine, so a kernel update takes everything down together — deliberately, at a time I pick. That is the right trade for a personal host and the wrong one for a company, which is why the production systems in the case studies are built differently.',

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
    'contact.services':
      'For project work or classes rather than a role, the services page has what I offer and how each engagement is contracted.',
    'contact.services.link': 'See services',
    'contact.looking': 'What I am looking for',
    'contact.looking.role': 'Role',
    'contact.looking.role.v': 'Backend, infrastructure or platform engineering. Employment or contract.',
    'contact.looking.where': 'Where',
    'contact.looking.where.v': 'Remote, or on site in Bogotá.',
    'contact.looking.hours': 'Overlap',
    'contact.looking.hours.v': 'Bogotá is UTC-5 and Colombia keeps no daylight saving, so the overlap with United States business hours is a full day and does not shift twice a year.',

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
    'site.role': 'Ingeniero de backend Python',
    'site.description':
      'Ingeniero de backend Python en Bogotá. Servicios en FastAPI y PostgreSQL, autenticación reforzada y la infraestructura Debian sobre la que corren.',

    'nav.label': 'Principal',
    'nav.home': 'Inicio',
    'nav.work': 'Trabajo',
    'nav.opensource': 'Código abierto',
    'nav.about': 'Perfil',
    'nav.contact': 'Contacto',
    'nav.skip': 'Saltar al contenido',

    'lang.label': 'Idioma',
    'lang.switch': 'Read in English',

    'home.lead': 'Construyo backends que no se caen.',
    'home.intro.a':
      'Servicios asíncronos en FastAPI sobre PostgreSQL, autenticación que resiste y los servidores Debian, contenedores y pipelines que los sostienen.',
    'home.intro.b':
      'Dos años a cargo de producción: del diseño del esquema hasta el proxy inverso y el TLS, sin nadie a quien pasarle la parte difícil.',
    'home.intro.c':
      'Detrás del trabajo matemático, física en la Universidad de los Andes: filtros de Kalman, fusión de sensores y pipelines de datos que tienen que estar bien, no solo terminados.',

    'motif.alt':
      'Una señal de posición ruidosa y la misma señal tras un filtro de Kalman: la señal sin procesar oscila de forma errática mientras la línea filtrada se mueve con suavidad.',
    'motif.raw': 'muestras sin procesar',
    'motif.filtered': 'filtrado de Kalman',

    'home.selected': 'Trabajo seleccionado',
    'home.selected.note': 'Tres sistemas que llevé de principio a fin.',
    'home.more': 'Leer el caso',
    'home.allwork': 'Todo el trabajo',

    'home.now': 'Actualmente',
    'home.also': 'También disponible para trabajo por proyecto y clases.',
    'home.also.link': 'Servicios',
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
    'footer.colophon': 'Cómo está hecho y cómo se sirve',
    'contact.whatsapp.label': 'WhatsApp',
    'contact.whatsapp.prefill': 'Hola Jason, te encontré por jsncar.tech.',
    'svc.whatsapp': 'Escribir por WhatsApp',
    'svc.whatsapp.prefill':
      'Hola Jason, vi tu página de servicios y me gustaría hablar de un proyecto.',
    'svc.classes.whatsapp.prefill':
      'Hola Jason, vi tu página de servicios y quiero preguntar por las clases.',
    'svc.classes.book': 'Preguntar por clases',
    'footer.contact': 'Escribirme',

    'nav.services': 'Servicios',

    'svc.title': 'Servicios',
    'svc.lead': 'Backends, automatización y clases.',
    'svc.intro':
      'Dos tipos de trabajo. Sistemas construidos y operados para empresas, y clases uno a uno de programación, matemáticas y física. Hago las dos cosas; ninguna es un subproducto de la otra.',

    'svc.engineering': 'Ingeniería',
    'svc.engineering.note': 'Definido, construido, desplegado y entregado.',
    'svc.from': 'Desde',
    'svc.enquire': 'Iniciar una conversación',

    'svc.delivery.direct': 'Contratado directamente conmigo',
    'svc.delivery.apollyon': 'Entregado a través de Apollyon S.A.S',
    'svc.delivery.either': 'Directo, o por Apollyon para desarrollos grandes',

    'svc.how': 'Cómo funciona',
    'svc.how.caption':
      'Los mismos tres pasos en cualquier proyecto. En cada uno recibes software que funciona, no un informe de avance.',
    'svc.how.1': 'Descubrimiento',
    'svc.how.1.note': 'Tu cuello de botella y tu stack, luego un alcance',
    'svc.how.2': 'Construcción',
    'svc.how.2.note': 'Iterativa, revisable, probada',
    'svc.how.3': 'Entrega',
    'svc.how.3.note': 'Documentada, en infraestructura tuya',

    'svc.sites': 'Sitios web',
    'svc.sites.lead': 'Un sitio para tu negocio, y alguien que lo mantenga en línea.',
    'svc.sites.build': 'Diseño y construcción',
    'svc.sites.hosting': 'Hosting y mantenimiento',
    'svc.sites.examples': 'Construidos y hospedados por mí',
    'svc.sites.shot': 'Página de inicio de',
    'svc.sites.visit': 'Visitar',

    'svc.classes': 'Clases',
    'svc.classes.lead': 'Programación, matemáticas y física.',
    'svc.classes.intro':
      'He dado clases particulares en paralelo a mi carrera durante la mayor parte de mi tiempo en la universidad, así que no es algo que empecé hace poco. Remotas, en español o en inglés. Estudié física en la Universidad de los Andes, y los trabajos de métodos numéricos detrás de estas materias están públicos en mi GitHub, así que puedes ver cómo resuelvo un problema antes de reservar nada.',
    'svc.classes.subjects': 'Materias',
    'svc.classes.formats': 'Formatos',
    'svc.classes.who': 'A quién le enseño',

    'svc.contracting': 'Con quién estarías contratando',
    'svc.contracting.body':
      'Soy COO de Apollyon S.A.S en Bogotá, y los desarrollos grandes van por la empresa: un equipo, un contrato y continuidad si no soy yo quien lo sostiene. Los proyectos más pequeños y todas las clases son directamente conmigo. Cada servicio de arriba dice cuál aplica, y te diré con claridad si un proyecto pertenece al otro lado de esa línea.',

    'svc.cta.title': '¿Tienes algo que valga la pena construir?',
    'svc.cta.body':
      'Cuéntame qué estás intentando construir, automatizar o desenredar. Te respondo con una arquitectura y un cronograma realista, no con un folleto.',

    'col.title': 'Colofón',
    'col.lead': 'Una máquina y cómo la administro.',
    'col.intro': 'El pie de página dice que este sitio lo sirve Caddy desde un servidor que yo administro. Esta página desarrolla esa frase: qué corre en el servidor, cómo llega un cambio a producción y cómo falla todo esto.',

    'col.site': 'Este sitio',
    'col.site.body': 'Astro, compilado a archivos estáticos. Sin runtime, sin base de datos detrás, sin framework enviado al navegador, sin rastreo ni analítica. Cada color, tamaño y duración sale de un solo archivo de tokens, y diecisiete verificaciones de render — contraste, operación por teclado, tamaño de los objetivos, movimiento reducido, espejado RTL, desbordamiento silencioso — corren sobre cada página en ambos temas antes de publicar nada.',

    'col.edge': 'El borde',
    'col.edge.body': 'Caddy termina el TLS con certificados que obtiene y renueva solo, sirve sobre HTTP/2, redirige www al dominio raíz y quita las barras finales para que cada página tenga una sola URL, y devuelve el 404 en español a las rutas en español. El contenido se lee del disco en cada petición, así que publicar no reinicia nada.',
    'col.edge.headers': 'Cada respuesta lleva',
    'col.edge.csp.note': 'No se permite ningún origen externo. Las fuentes, los estilos y los scripts se sirven desde este mismo servidor, así que nada en la página puede llamar a otro lado.',
    'col.edge.verify': 'Escáneres independientes, para que esto se pueda comprobar en vez de solo afirmarlo:',

    'col.deploy': 'Sacar un cambio a producción',
    'col.deploy.caption': 'Las verificaciones corren antes del push, en mi propia máquina. Llaman scripts que no son parte del repositorio desplegado, así que el servidor no podría correrlas aunque lo intentara.',
    'col.deploy.1': 'Verificar y hacer push',
    'col.deploy.1.note': 'diecisiete verificaciones, luego origin',
    'col.deploy.2': 'Pull',
    'col.deploy.2.note': 'en el servidor, con llave de despliegue',
    'col.deploy.3': 'Construir al lado',
    'col.deploy.3.note': 'en un directorio que nadie está sirviendo',
    'col.deploy.4': 'Intercambiar',
    'col.deploy.4.note': 'dos renombrados',
    'col.deploy.body': 'El intercambio es lo que importa. Astro borra su directorio de salida al empezar un build, así que construir directamente en el directorio que sirve Caddy dejaría el sitio vacío durante todo el build, y vacío del todo si ese build falla. Construir al lado y renombrar hace que el cambio sea prácticamente instantáneo y deja el build anterior en su sitio, así que revertir son los mismos dos renombrados al revés: sin recargar nada y sin reconfigurar nada.',

    'col.host': 'El servidor',
    'col.host.body': 'Una sola máquina física con Debian que yo instalo, actualizo y de la que respondo. Corre este sitio junto con varios servicios más, descritos aquí por lo que hacen y no por dónde están.',
    'col.host.proxy': 'Proxy inverso y TLS',
    'col.host.proxy.v': 'Caddy, delante de cada sitio y servicio de la máquina.',
    'col.host.db': 'Base de datos relacional',
    'col.host.db.v': 'PostgreSQL, en el disco más rápido y deliberadamente fuera de los discos de medios.',
    'col.host.objects': 'Almacenamiento de objetos',
    'col.host.objects.v': 'Un almacén compatible con S3 para los medios de las aplicaciones.',
    'col.host.containers': 'Contenedores',
    'col.host.containers.v': 'Docker, con los volúmenes persistentes fijados a un disco aparte para que una partición raíz llena no se lleve el daemon por delante.',
    'col.host.ci': 'Control de versiones y despliegue',
    'col.host.ci.v': 'Un servidor Git propio con pipelines de push-to-deploy. Cada repositorio tiene su propia llave, así que un pipeline comprometido llega a un proyecto y no al servidor entero.',
    'col.host.ai': 'Inferencia local de modelos',
    'col.host.ai.v': 'Para trabajo donde los datos no pueden salir de la máquina en la que ya están.',
    'col.host.ops': 'Monitoreo y endurecimiento',
    'col.host.ops.v': 'Métricas por host con reglas de alerta, monitoreo SMART de discos y fail2ban sobre la superficie expuesta.',

    'col.fails': 'Cómo falla',
    'col.fails.body': 'Es una sola máquina en una conexión residencial con dirección dinámica, y vale la pena decirlo sin rodeos en una página sobre confiabilidad. Un actualizador de DNS dinámico vigila esa dirección y la republica cuando cambia, así que un cambio de dirección cuesta el intervalo de consulta más el TTL del registro. No hay una segunda máquina, así que una actualización de kernel tumba todo junto, a propósito y a la hora que yo elija. Ese es el intercambio correcto para un servidor personal y el incorrecto para una empresa, y por eso los sistemas en producción de los casos están construidos de otra manera.',

    'meta.updated': 'Última actualización',

    'notfound.code': 'Error 404',
    'notfound.title': 'Esa página no existe.',
    'notfound.body':
      'Puede que el enlace esté desactualizado, o que la página aún no esté construida. Puedes llegar a todo el sitio desde las páginas de abajo.',
    'notfound.home': 'Ir a la página de inicio',

    'work.title': 'Trabajo',
    'work.lead': 'Cinco roles y los sistemas detrás de ellos.',
    'work.intro':
      'Casi todo este trabajo es privado y pertenece a las empresas, así que lo que sigue describe lo que construí y de lo que fui responsable, sin enlazar al código. El código público que sí lo respalda está en la página de código abierto.',
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
    'os.lead': 'Lo que sí es público.',
    'os.intro':
      'Mi trabajo más fuerte está en repositorios privados de empresa. Lo público es una mezcla de backend, análisis de datos y los trabajos de física de donde salieron los métodos numéricos. Prefiero mostrarlo con honestidad antes que inflar la lista.',
    'os.group.backend': 'Backend e infraestructura',
    'os.group.data': 'Análisis de datos',
    'os.group.numerical': 'Métodos numéricos y física',
    'os.frontend.title': 'Una nota sobre los frontends',
    'os.frontend.body':
      'Algunos repositorios aquí y en otros lugares tienen interfaces web. Esas las planeé y las armé con herramientas de IA como Lovable; reflejan cómo defino y dirijo ese trabajo, no una pretensión de ser ingeniero de frontend. Mi oficio está del lado del servidor.',
    'os.coursework.title': 'Una nota sobre los trabajos de universidad',
    'os.coursework.body':
      'Los notebooks son trabajos de universidad y están marcados como tales. Siguen públicos porque las matemáticas que contienen son reales y de ahí salió el trabajo con filtros de Kalman y señales.',
    'os.viewrepo': 'Ver el repositorio',
    'os.profile': 'Todos los repositorios en GitHub',

    'about.title': 'Perfil',
    'about.lead': 'Ingeniero backend, formación en física, Bogotá.',
    'about.body.a':
      'Escribo servicios en Python y administro las máquinas donde viven. En la práctica eso ha significado diseñar un esquema, entregar la API encima, ponerla en contenedores, dejarle un proxy inverso con TLS al frente, y después ser la persona a la que llaman cuando deja de responder a una hora inoportuna.',
    'about.body.b':
      'La mayor parte de mi trabajo ha sido en empresas pequeñas donde no había un equipo de plataforma a quien pasarle la infraestructura. Por eso la hoja de vida abarca backend y DevOps en lugar de quedarse en uno solo: ese límite me tocaba a mí.',
    'about.body.c':
      'El pregrado en física no es decoración. La fusión de sensores, los filtros de Kalman extendidos y el suavizado de RSSI sobre una malla Bluetooth son el tipo de problema donde las matemáticas deciden si la funcionalidad sirve, y esa es la parte que más disfruto.',
    'about.body.d':
      'No soy ingeniero de frontend y trato de que no me describan como tal. Donde mis proyectos tienen interfaz, la planeé y la construí con herramientas de IA. Prefiero que me evalúen por la API que está debajo.',
    'about.timeline': 'Experiencia',
    'about.education': 'Educación',
    'about.certifications': 'Certificaciones',
    'about.languages': 'Idiomas',
    'about.lang.es': 'Español — nativo',
    'about.lang.en': 'Inglés — nivel profesional',
    'about.lang.ja': 'Japonés — básico',

    'contact.title': 'Contacto',
    'contact.lead': 'Abierto a trabajo de backend e infraestructura.',
    'contact.intro':
      'El correo es la forma más confiable de contactarme, y respondo en un par de días. Estoy en Bogotá, en horario de Colombia, y trabajo de forma remota sin problema.',
    'contact.services':
      'Si buscas trabajo por proyecto o clases en lugar de una vacante, la página de servicios tiene lo que ofrezco y cómo se contrata cada cosa.',
    'contact.services.link': 'Ver servicios',
    'contact.looking': 'Qué estoy buscando',
    'contact.looking.role': 'Rol',
    'contact.looking.role.v': 'Backend, infraestructura o ingeniería de plataforma. Empleo o contrato.',
    'contact.looking.where': 'Dónde',
    'contact.looking.where.v': 'Remoto, o presencial en Bogotá.',
    'contact.looking.hours': 'Cruce horario',
    'contact.looking.hours.v': 'Bogotá está en UTC-5 y Colombia no cambia de hora, así que el cruce con la jornada laboral de Estados Unidos es completo y no se mueve dos veces al año.',

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
