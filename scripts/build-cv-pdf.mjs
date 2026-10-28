import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs/promises';

const ROOT = process.cwd();
const OUT_PDF_EN = path.join(ROOT, 'public/cv/jason-arias-python-backend-engineer.pdf');
const OUT_PDF_ES = path.join(ROOT, 'public/cv/jason-arias-ingeniero-backend-python.pdf');

async function fontBase64(relPath) {
  const buf = await fs.readFile(path.join(ROOT, relPath));
  return buf.toString('base64');
}

function buildStyles({
  plexSansLatin,
  plexSansLatinExt,
  plexSansItalicLatin,
  plexMonoRegularLatin,
  plexMonoMediumLatin,
}) {
  return `
    @font-face {
      font-family: 'IBM Plex Sans';
      src: url('data:font/woff2;base64,${plexSansLatinExt}') format('woff2');
      font-weight: 100 700;
      font-style: normal;
      unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
    }
    @font-face {
      font-family: 'IBM Plex Sans';
      src: url('data:font/woff2;base64,${plexSansLatin}') format('woff2');
      font-weight: 100 700;
      font-style: normal;
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }
    @font-face {
      font-family: 'IBM Plex Sans';
      src: url('data:font/woff2;base64,${plexSansItalicLatin}') format('woff2');
      font-weight: 100 700;
      font-style: italic;
    }
    @font-face {
      font-family: 'IBM Plex Mono';
      src: url('data:font/woff2;base64,${plexMonoRegularLatin}') format('woff2');
      font-weight: 400;
      font-style: normal;
    }
    @font-face {
      font-family: 'IBM Plex Mono';
      src: url('data:font/woff2;base64,${plexMonoMediumLatin}') format('woff2');
      font-weight: 500 600;
      font-style: normal;
    }

    @page {
      size: letter;
      margin: 0;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      /* Disable ligatures so ATS text extractors never split 'fi' or 'fl' */
      font-variant-ligatures: none;
      font-feature-settings: "liga" 0, "clig" 0;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    body {
      font-family: 'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #16181d;
      background: #ffffff;
      font-size: 9.5pt;
      line-height: 1.44;
    }

    .page {
      width: 8.5in;
      height: 11in;
      padding: 0.5in 0.56in 0.46in 0.56in;
      display: flex;
      flex-direction: column;
    }

    .page-2 {
      break-before: page;
      page-break-before: always;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    /* Header */
    header {
      border-bottom: 1pt solid #d4d7dd;
      padding-bottom: 9.5pt;
      margin-bottom: 12pt;
    }

    h1 {
      font-family: 'IBM Plex Sans', sans-serif;
      font-size: 20pt;
      font-weight: 600;
      letter-spacing: -0.015em;
      color: #111317;
      line-height: 1.15;
      margin-bottom: 2.5pt;
    }

    .subtitle {
      font-size: 10.2pt;
      font-weight: 400;
      color: #3f4450;
      margin-bottom: 6pt;
    }

    .contact-line {
      font-family: 'IBM Plex Mono', monospace;
      font-size: 7.3pt;
      color: #525866;
      line-height: 1.4;
      display: flex;
      flex-wrap: wrap;
      column-gap: 4pt;
      row-gap: 1pt;
    }

    .contact-item {
      white-space: nowrap;
    }

    .contact-line span.sep {
      color: #8c92a0;
    }

    /* Running header on Page 2 */
    .running-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      border-bottom: 0.75pt solid #d4d7dd;
      padding-bottom: 4pt;
      margin-bottom: 12pt;
      font-family: 'IBM Plex Mono', monospace;
      font-size: 7.6pt;
      color: #687082;
    }

    /* Sections */
    section {
      margin-bottom: 12pt;
    }

    h2 {
      font-family: 'IBM Plex Mono', monospace;
      font-size: 7.8pt;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #b45309;
      margin-bottom: 6.5pt;
    }

    .summary-text {
      font-size: 9.4pt;
      line-height: 1.46;
      color: #1f232b;
    }

    /* Skills Table-like Grid */
    .skills-grid {
      display: grid;
      grid-template-columns: 128pt 1fr;
      row-gap: 4pt;
      column-gap: 10pt;
      font-size: 9.15pt;
      line-height: 1.38;
    }

    .skill-cat {
      font-weight: 600;
      color: #111317;
    }

    .skill-items {
      color: #262a33;
    }

    /* Experience Entries */
    .role {
      margin-bottom: 10.5pt;
    }

    .role:last-child {
      margin-bottom: 0;
    }

    .role-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 8pt;
      margin-bottom: 2pt;
    }

    .role-title {
      font-size: 10pt;
      font-weight: 600;
      color: #111317;
    }

    .role-company {
      font-weight: 400;
      color: #4a505e;
    }

    .role-meta {
      font-family: 'IBM Plex Mono', monospace;
      font-size: 7.8pt;
      color: #525866;
      white-space: nowrap;
      flex-shrink: 0;
    }

    .role-summary {
      font-size: 9.05pt;
      color: #3f4450;
      margin-bottom: 4pt;
      line-height: 1.4;
    }

    ul.bullets {
      list-style: disc;
      padding-left: 13pt;
    }

    ul.bullets li {
      margin-bottom: 2.8pt;
      font-size: 9.15pt;
      line-height: 1.41;
      color: #1f232b;
    }

    ul.bullets li::marker {
      color: #687082;
    }

    ul.bullets li:last-child {
      margin-bottom: 0;
    }

    /* Public Code & Shipped Systems */
    .project {
      margin-bottom: 9pt;
    }

    .project:last-child {
      margin-bottom: 0;
    }

    .project-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 8pt;
      margin-bottom: 1.5pt;
    }

    .project-title {
      font-size: 9.65pt;
      font-weight: 600;
      color: #111317;
    }

    .project-links {
      font-family: 'IBM Plex Mono', monospace;
      font-size: 7.55pt;
      font-weight: 400;
      color: #525866;
      white-space: nowrap;
      flex-shrink: 0;
    }

    .project-stack {
      font-family: 'IBM Plex Mono', monospace;
      font-size: 7.5pt;
      color: #b45309;
      margin-bottom: 2pt;
    }

    .project-body {
      font-size: 9.05pt;
      line-height: 1.4;
      color: #1f232b;
    }

    /* Education & Certifications */
    .edu-block {
      margin-bottom: 7pt;
    }

    .edu-inst {
      font-size: 9.1pt;
      font-weight: 500;
      color: #3f4450;
      margin-bottom: 2.5pt;
    }

    .edu-note {
      font-size: 9pt;
      color: #3f4450;
      line-height: 1.4;
    }

    .certs-line {
      font-size: 9pt;
      color: #1f232b;
      line-height: 1.4;
      padding-top: 5.5pt;
      border-top: 0.5pt solid #e5e7eb;
    }

    .certs-line strong {
      font-weight: 600;
      color: #111317;
    }
  `;
}

function buildEnglishHtml(css) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Jason Nicolás Arias Gómez — Python Backend Engineer</title>
  <style>${css}</style>
</head>
<body>

  <!-- PAGE 1 -->
  <div class="page page-1">
    <header>
      <h1>Jason Nicolás Arias Gómez</h1>
      <div class="subtitle">Python Backend Engineer — FastAPI · PostgreSQL · Docker · Linux</div>
      <div class="contact-line">
        <span class="contact-item">Bogotá, Colombia (open to remote)</span><span class="sep">·</span><span class="contact-item"><a href="mailto:jn.arias@uniandes.edu.co">jn.arias@uniandes.edu.co</a></span><span class="sep">·</span><span class="contact-item"><a href="https://jsncar.tech">jsncar.tech</a></span><span class="sep">·</span><span class="contact-item"><a href="https://github.com/JsNcAr">github.com/JsNcAr</a></span><span class="sep">·</span><span class="contact-item"><a href="https://www.linkedin.com/in/jason-nicolas-arias-gomez">www.linkedin.com/in/jason-nicolas-arias-gomez</a></span>
      </div>
    </header>

    <section>
      <h2>Summary</h2>
      <p class="summary-text">
        Python Backend Engineer with 2+ years of production experience designing asynchronous REST APIs (FastAPI, SQLModel, SQLAlchemy, PostgreSQL), multi-layered authentication (OAuth2, JWT, API keys, bcrypt), and the Debian/Docker infrastructure they run on. Proven track record owning backend architecture end-to-end — from relational schema migrations (Alembic) and automated test suites (pytest, CI/CD) to reverse proxies (Caddy) and high-volume data pipelines. Strong analytical foundation in Physics (Universidad de los Andes) applied to real-time sensor fusion, Extended Kalman Filters, and algorithmic verification.
      </p>
    </section>

    <section>
      <h2>Technical Skills</h2>
      <div class="skills-grid">
        <div class="skill-cat">Languages</div>
        <div class="skill-items">Python (async/await, type hints), SQL, Bash, TypeScript</div>

        <div class="skill-cat">Backend</div>
        <div class="skill-items">FastAPI, SQLModel, SQLAlchemy, Alembic, Pydantic, asyncpg, pytest, REST API design, OAuth2 / JWT / bcrypt</div>

        <div class="skill-cat">Infrastructure &amp; DevOps</div>
        <div class="skill-items">Docker, Docker Compose, Linux (Debian), Caddy, Nginx, GitLab CI/CD, GitHub Actions, systemd, Hetzner Cloud, GCP</div>

        <div class="skill-cat">Data &amp; AI</div>
        <div class="skill-items">PostgreSQL, SQLite, Pandas, NumPy, SciPy, Selenium, OpenAI API, Extended Kalman Filters</div>

        <div class="skill-cat">Languages spoken</div>
        <div class="skill-items">Spanish (native) · English (professional working proficiency, B2+)</div>
      </div>
    </section>

    <section style="margin-bottom: 0;">
      <h2>Experience</h2>

      <div class="role">
        <div class="role-header">
          <div class="role-title">Backend &amp; DevOps Engineer <span class="role-company">— Apollyon S.A.S</span></div>
          <div class="role-meta">Oct 2024 – Present · Bogotá</div>
        </div>
        <div class="role-summary">
          Sole backend and infrastructure engineer for Korvy, an offline-first proximity tracking and event communication platform co-founded with two colleagues (full-time focus between contracts; maintained on weekends during full-time engagements).
        </div>
        <ul class="bullets">
          <li>Architected and shipped Korvy's asynchronous REST API from scratch using Python, FastAPI, SQLModel, and PostgreSQL, engineered to ingest bursty buffered telemetry from offline field devices with explicit error contracts for firmware retry logic.</li>
          <li>Built multi-layered authentication across user and IoT device endpoints using OAuth2, signed JWTs, and narrowly scoped per-unit API keys, with passwords hashed via bcrypt (12 rounds).</li>
          <li>Provisioned and hardened company-owned Debian servers running Dockerized workloads under systemd, with Caddy at the edge handling reverse-proxy routing and automated TLS certificate lifecycles.</li>
          <li>Deployed a self-hosted GitLab instance and authored CI/CD pipelines running automated pytest suites before deploying backend updates to production on merge, alongside branching rules and developer docs on GitLab Pages.</li>
          <li>Implemented spatial positioning algorithms over a Bluetooth Low Energy (BLE) mesh using Extended Kalman Filters and RSSI smoothing to translate noisy radio signal strength into stable field trajectories.</li>
        </ul>
      </div>

      <div class="role">
        <div class="role-header">
          <div class="role-title">Backend &amp; Data Engineer <span class="role-company">— Personally AI</span></div>
          <div class="role-meta">Jul 2025 – Feb 2026 · Bogotá</div>
        </div>
        <div class="role-summary">
          Rehired after an initial 2024 contract to standardize backend architecture, lead client API delivery, and mentor the engineering team as it grew from one developer to five while remaining hands-on in the codebase.
        </div>
        <ul class="bullets">
          <li>Designed and shipped production REST APIs with FastAPI, Pydantic, SQLAlchemy, and Alembic schema migrations, standardizing JWT and API-key authentication across all client-facing services.</li>
          <li>Automated marketing performance extraction and analysis across 60+ client accounts using Selenium and Pandas, replacing manual assembly and cutting reporting effort by ~80%.</li>
          <li>Engineered a high-volume CRM and lead-generation backend processing thousands of records per run via the Apollo API, utilizing asynchronous background task state, retry policies, and indexed SQL queries.</li>
          <li>Managed hybrid infrastructure across Hetzner Cloud and on-premise Debian servers with Docker and Linux daemons, and reviewed architecture for an LLM lead-scoring chatbot integrated with HubSpot.</li>
        </ul>
      </div>
    </section>
  </div>

  <!-- PAGE 2 -->
  <div class="page page-2">
    <div class="running-header">
      <span>Jason Nicolás Arias Gómez — Python Backend Engineer</span>
      <span>page 2</span>
    </div>

    <section>
      <h2>Experience (Continued)</h2>

      <div class="role">
        <div class="role-header">
          <div class="role-title">Backend Engineer <span class="role-company">— Atonga</span></div>
          <div class="role-meta">Oct 2024 – Jun 2025 · Bogotá</div>
        </div>
        <div class="role-summary">
          Co-designed the backend architecture for an AI-driven multichannel e-commerce platform built for small entrepreneurs, owning the core API, database schema, and cloud infrastructure.
        </div>
        <ul class="bullets">
          <li>Built the core backend in Python and FastAPI over PostgreSQL, serving real-time requests from web and chat clients over a single unified domain layer for validation and permissions.</li>
          <li>Integrated LLM-powered conversational assistants bounded strictly to the backend API contract so natural-language catalogue, cart, and order operations followed the exact same validation rules as the web UI.</li>
          <li>Containerized services with Docker and deployed to Google Cloud Platform behind Nginx, configuring automated backup schedules and environment isolation for production reliability.</li>
        </ul>
      </div>

      <div class="role">
        <div class="role-header">
          <div class="role-title">Python Developer <span class="role-company">— Personally AI</span></div>
          <div class="role-meta">May 2024 – Oct 2024 · Bogotá</div>
        </div>
        <div class="role-summary">
          First contract at the studio, focused on automated document extraction and end-to-end data pipelines for enterprise clients.
        </div>
        <ul class="bullets">
          <li>Built OCR and web-extraction pipelines in Python using Selenium and Google Cloud Document AI to turn unstructured PDFs and web portals into validated relational datasets.</li>
          <li>Owned data cleaning, normalization, and validation stages in Pandas before handing structured outputs to downstream client databases and analytics workflows.</li>
        </ul>
      </div>
    </section>

    <section>
      <h2>Public Code &amp; Shipped Systems</h2>

      <div class="project">
        <div class="project-header">
          <div class="project-title">Champions MetaDesk Studio</div>
          <div class="project-links"><a href="https://github.com/JsNcAr/champions-metadesk-studio">github.com/JsNcAr/champions-metadesk-studio</a></div>
        </div>
        <div class="project-stack">Python · Flet · SQLModel · SQLite · pytest · GitHub Actions · PyInstaller</div>
        <p class="project-body">
          Desktop and web competitive workbench over a local relational catalog. Features a pure-Python port of Smogon's damage engine verified against ~1,000 golden scenarios in CI, plus automated multiplatform builds (Linux AppImage, Windows EXE).
        </p>
      </div>

      <div class="project">
        <div class="project-header">
          <div class="project-title">Bastardpedia Data &amp; Search Pipeline</div>
          <div class="project-links"><a href="https://bastardpedia.ramsus.site">bastardpedia.ramsus.site</a> · <a href="https://github.com/JsNcAr/bastardpedia">github.com/JsNcAr/bastardpedia</a></div>
        </div>
        <div class="project-stack">Python/AI Ingestion · Taxonomy Validation · TypeScript · MiniSearch · IndexedDB</div>
        <p class="project-body">
          Automated data-extraction and normalization pipeline that parses unstructured transcripts across 600+ podcast episodes, enforces strict historical taxonomy schemas, and compiles a client-side full-text search index cached in IndexedDB.
        </p>
      </div>

      <div class="project">
        <div class="project-header">
          <div class="project-title">Production FastAPI Auth Blueprint (basic_api)</div>
          <div class="project-links"><a href="https://github.com/JsNcAr/basic_api">github.com/JsNcAr/basic_api</a></div>
        </div>
        <div class="project-stack">Python · FastAPI · OAuth2 · JWT · SQLModel · asyncpg · PostgreSQL</div>
        <p class="project-body">
          Reusable asynchronous FastAPI service template implementing OAuth2 password-flow authentication, signed JWTs, multi-identifier login (username or email), and non-blocking PostgreSQL persistence via SQLModel and asyncpg.
        </p>
      </div>
    </section>

    <section style="margin-bottom: 0;">
      <h2>Education &amp; Certifications</h2>
      <div class="edu-block">
        <div class="role-header">
          <div class="role-title">BSc in Physics (80% Completed)</div>
          <div class="role-meta">Flexible Evening Track · Bogotá</div>
        </div>
        <div class="edu-inst">Universidad de los Andes &amp; Universidad Nacional de Colombia</div>
        <div class="edu-note">
          8 of 10 semesters completed at Universidad de los Andes ("Ser Pilo Paga" national merit scholarship); completing remaining credits on a flexible, non-blocking schedule at Universidad Nacional de Colombia. Coursework in numerical methods, differential equations, linear algebra, and statistical mechanics.
        </div>
      </div>
      <div class="certs-line">
        <strong>Certifications (Platzi):</strong> FastAPI: Databases, Modularization &amp; Production Deployment · Python Professional &amp; Exploratory Data Analysis · Computer Networks &amp; Internet Infrastructure.
      </div>
    </section>
  </div>

</body>
</html>`;
}

function buildSpanishHtml(css) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Jason Nicolás Arias Gómez — Ingeniero de Backend Python</title>
  <style>${css}</style>
</head>
<body>

  <!-- PAGE 1 -->
  <div class="page page-1">
    <header>
      <h1>Jason Nicolás Arias Gómez</h1>
      <div class="subtitle">Ingeniero de Backend Python — FastAPI · PostgreSQL · Docker · Linux</div>
      <div class="contact-line">
        <span class="contact-item">Bogotá, Colombia (abierto a remoto)</span><span class="sep">·</span><span class="contact-item"><a href="mailto:jn.arias@uniandes.edu.co">jn.arias@uniandes.edu.co</a></span><span class="sep">·</span><span class="contact-item"><a href="https://jsncar.tech/es">jsncar.tech/es</a></span><span class="sep">·</span><span class="contact-item"><a href="https://github.com/JsNcAr">github.com/JsNcAr</a></span><span class="sep">·</span><span class="contact-item"><a href="https://www.linkedin.com/in/jason-nicolas-arias-gomez">www.linkedin.com/in/jason-nicolas-arias-gomez</a></span>
      </div>
    </header>

    <section>
      <h2>Perfil Profesional</h2>
      <p class="summary-text">
        Ingeniero de Backend Python con más de 2 años de experiencia en producción diseñando APIs REST asíncronas (FastAPI, SQLModel, SQLAlchemy, PostgreSQL), autenticación multicapa (OAuth2, JWT, llaves de API, bcrypt) y la infraestructura en Debian y Docker donde operan. Trayectoria comprobada a cargo de la arquitectura backend de principio a fin: desde migraciones de esquemas relacionales (Alembic) y suites de pruebas automatizadas (pytest, CI/CD) hasta proxies inversos (Caddy) y pipelines de datos de alto volumen. Sólida base analítica en Física (Universidad de los Andes) aplicada a fusión de sensores en tiempo real, filtros de Kalman extendidos y verificación algorítmica.
      </p>
    </section>

    <section>
      <h2>Habilidades Técnicas</h2>
      <div class="skills-grid">
        <div class="skill-cat">Lenguajes</div>
        <div class="skill-items">Python (async/await, tipado estático), SQL, Bash, TypeScript</div>

        <div class="skill-cat">Backend</div>
        <div class="skill-items">FastAPI, SQLModel, SQLAlchemy, Alembic, Pydantic, asyncpg, pytest, diseño de APIs REST, OAuth2 / JWT / bcrypt</div>

        <div class="skill-cat">Infraestructura y DevOps</div>
        <div class="skill-items">Docker, Docker Compose, Linux (Debian), Caddy, Nginx, GitLab CI/CD, GitHub Actions, systemd, Hetzner Cloud, GCP</div>

        <div class="skill-cat">Datos e IA</div>
        <div class="skill-items">PostgreSQL, SQLite, Pandas, NumPy, SciPy, Selenium, OpenAI API, Filtros de Kalman Extendidos</div>

        <div class="skill-cat">Idiomas</div>
        <div class="skill-items">Español (nativo) · Inglés (competencia profesional completa, B2+)</div>
      </div>
    </section>

    <section style="margin-bottom: 0;">
      <h2>Experiencia Profesional</h2>

      <div class="role">
        <div class="role-header">
          <div class="role-title">Ingeniero de Backend y DevOps <span class="role-company">— Apollyon S.A.S</span></div>
          <div class="role-meta">Oct 2024 – Actualidad · Bogotá</div>
        </div>
        <div class="role-summary">
          Único ingeniero de backend e infraestructura para Korvy, una plataforma offline-first de rastreo de proximidad y comunicación para eventos cofundada con dos colegas (dedicación completa entre contratos; mantenimiento en fines de semana durante roles de tiempo completo).
        </div>
        <ul class="bullets">
          <li>Diseñé y construí desde cero la API REST asíncrona de Korvy con Python, FastAPI, SQLModel y PostgreSQL, preparada para ingerir ráfagas de telemetría acumulada por dispositivos en campo sin conexión mediante contratos de error explícitos para la lógica de reintentos del firmware.</li>
          <li>Implementé autenticación multicapa en los endpoints de usuarios y dispositivos IoT utilizando OAuth2, JWT firmados y llaves de API de alcance restringido revocables por unidad, con contraseñas protegidas mediante bcrypt (12 rondas).</li>
          <li>Aprovisioné y aseguré servidores Debian propios de la empresa ejecutando servicios en contenedores Docker bajo systemd, con Caddy en el borde gestionando el enrutamiento inverso y la renovación automática de certificados TLS.</li>
          <li>Desplegué una instancia autoalojada de GitLab y configuré pipelines de CI/CD que ejecutan suites automatizadas de pytest antes de desplegar cambios a producción al hacer merge, junto con reglas de ramas y documentación técnica en GitLab Pages.</li>
          <li>Implementé algoritmos de posicionamiento espacial sobre una malla Bluetooth Low Energy (BLE) mediante filtros de Kalman extendidos y suavizado de RSSI para transformar señales de radio ruidosas en trayectorias estables en campo.</li>
        </ul>
      </div>

      <div class="role">
        <div class="role-header">
          <div class="role-title">Ingeniero de Backend y Datos <span class="role-company">— Personally AI</span></div>
          <div class="role-meta">Jul 2025 – Feb 2026 · Bogotá</div>
        </div>
        <div class="role-summary">
          Recontratado tras un primer contrato en 2024 para estandarizar la arquitectura backend, liderar la entrega de APIs para clientes y guiar el crecimiento del equipo de ingeniería de uno a cinco desarrolladores manteniendo un rol activo en el código.
        </div>
        <ul class="bullets">
          <li>Diseñé y entregué APIs REST en producción con FastAPI, Pydantic, SQLAlchemy y migraciones de esquema en Alembic, estandarizando la autenticación mediante JWT y llaves de API en todos los servicios orientados a clientes.</li>
          <li>Automaticé la extracción y el análisis de rendimiento de marketing para más de 60 cuentas de clientes con Selenium y Pandas, reemplazando la elaboración manual de reportes y reduciendo el esfuerzo operativo en ~80%.</li>
          <li>Construí un backend de CRM y generación de leads de alto volumen que procesa miles de registros por ejecución vía la API de Apollo, utilizando gestión de estado en tareas asíncronas en segundo plano, políticas de reintento y consultas SQL indexadas.</li>
          <li>Administré infraestructura híbrida entre Hetzner Cloud y servidores Debian on-premise con Docker y daemons de Linux, y revisé la arquitectura de un chatbot de calificación de leads con LLM integrado con HubSpot.</li>
        </ul>
      </div>
    </section>
  </div>

  <!-- PAGE 2 -->
  <div class="page page-2">
    <div class="running-header">
      <span>Jason Nicolás Arias Gómez — Ingeniero de Backend Python</span>
      <span>página 2</span>
    </div>

    <section>
      <h2>Experiencia Profesional (Continuación)</h2>

      <div class="role">
        <div class="role-header">
          <div class="role-title">Ingeniero de Backend <span class="role-company">— Atonga</span></div>
          <div class="role-meta">Oct 2024 – Jun 2025 · Bogotá</div>
        </div>
        <div class="role-summary">
          Codiseñé la arquitectura backend de una plataforma de comercio electrónico multicanal impulsada por IA para pequeños emprendedores, a cargo de la API principal, el esquema de base de datos y la infraestructura en la nube.
        </div>
        <ul class="bullets">
          <li>Construí el backend central en Python y FastAPI sobre PostgreSQL, atendiendo peticiones en tiempo real desde clientes web y de chat sobre una única capa de dominio unificada para validaciones y permisos.</li>
          <li>Integré asistentes conversacionales basados en LLMs acotados estrictamente al contrato de la API, garantizando que las operaciones de catálogo, carrito y pedidos en lenguaje natural cumplieran las mismas reglas de validación que la interfaz web.</li>
          <li>Contenericé los servicios con Docker y los desplegué en Google Cloud Platform detrás de Nginx, configurando respaldos automatizados y aislamiento de entornos para asegurar la confiabilidad en producción.</li>
        </ul>
      </div>

      <div class="role">
        <div class="role-header">
          <div class="role-title">Desarrollador Python <span class="role-company">— Personally AI</span></div>
          <div class="role-meta">May 2024 – Oct 2024 · Bogotá</div>
        </div>
        <div class="role-summary">
          Primer contrato en el estudio, enfocado en extracción automatizada de documentos y pipelines de datos de punta a punta para clientes corporativos.
        </div>
        <ul class="bullets">
          <li>Desarrollé pipelines de OCR y extracción web en Python utilizando Selenium y Google Cloud Document AI para transformar PDFs no estructurados y portales web en conjuntos de datos relacionales validados.</li>
          <li>Estuve a cargo de las etapas de limpieza, normalización y validación de datos con Pandas antes de entregar salidas estructuradas hacia las bases de datos y flujos analíticos de los clientes.</li>
        </ul>
      </div>
    </section>

    <section>
      <h2>Código Público y Sistemas Desplegados</h2>

      <div class="project">
        <div class="project-header">
          <div class="project-title">Champions MetaDesk Studio</div>
          <div class="project-links"><a href="https://github.com/JsNcAr/champions-metadesk-studio">github.com/JsNcAr/champions-metadesk-studio</a></div>
        </div>
        <div class="project-stack">Python · Flet · SQLModel · SQLite · pytest · GitHub Actions · PyInstaller</div>
        <p class="project-body">
          Entorno de análisis competitivo para escritorio y web sobre un catálogo relacional local. Incluye un port en Python puro del motor de cálculo de daño de Smogon verificado contra ~1.000 escenarios de referencia en CI, con compilación multiplataforma automatizada (Linux AppImage, Windows EXE).
        </p>
      </div>

      <div class="project">
        <div class="project-header">
          <div class="project-title">Bastardpedia — Pipeline de Datos y Búsqueda</div>
          <div class="project-links"><a href="https://bastardpedia.ramsus.site">bastardpedia.ramsus.site</a> · <a href="https://github.com/JsNcAr/bastardpedia">github.com/JsNcAr/bastardpedia</a></div>
        </div>
        <div class="project-stack">Ingesta Python/IA · Validación de Taxonomía · TypeScript · MiniSearch · IndexedDB</div>
        <p class="project-body">
          Pipeline automatizado de extracción y normalización que procesa transcripciones no estructuradas de más de 600 episodios de pódcast, valida esquemas estrictos de taxonomía histórica y compila un índice de búsqueda de texto completo en el cliente almacenado en IndexedDB.
        </p>
      </div>

      <div class="project">
        <div class="project-header">
          <div class="project-title">Plantilla de Autenticación en Producción con FastAPI (basic_api)</div>
          <div class="project-links"><a href="https://github.com/JsNcAr/basic_api">github.com/JsNcAr/basic_api</a></div>
        </div>
        <div class="project-stack">Python · FastAPI · OAuth2 · JWT · SQLModel · asyncpg · PostgreSQL</div>
        <p class="project-body">
          Plantilla reutilizable de servicio asíncrono en FastAPI que implementa flujo de autenticación OAuth2, JWT firmados, inicio de sesión multi-identificador (usuario o correo) y persistencia no bloqueante en PostgreSQL mediante SQLModel y asyncpg.
        </p>
      </div>
    </section>

    <section style="margin-bottom: 0;">
      <h2>Educación y Certificaciones</h2>
      <div class="edu-block">
        <div class="role-header">
          <div class="role-title">Pregrado en Física (80% Completado)</div>
          <div class="role-meta">Horario Nocturno Flexible · Bogotá</div>
        </div>
        <div class="edu-inst">Universidad de los Andes y Universidad Nacional de Colombia</div>
        <div class="edu-note">
          8 de 10 semestres completados en la Universidad de los Andes (beca nacional de excelencia "Ser Pilo Paga"); culminando los créditos restantes en horario flexible en la Universidad Nacional de Colombia. Formación en métodos numéricos, ecuaciones diferenciales, álgebra lineal y mecánica estadística.
        </div>
      </div>
      <div class="certs-line">
        <strong>Certificaciones (Platzi):</strong> FastAPI: Bases de Datos, Modularización y Despliegue a Producción · Curso Profesional de Python y Análisis Exploratorio de Datos · Redes de Computadores e Infraestructura de Internet.
      </div>
    </section>
  </div>

</body>
</html>`;
}

async function build() {
  const [
    plexSansLatin,
    plexSansLatinExt,
    plexSansItalicLatin,
    plexMonoRegularLatin,
    plexMonoMediumLatin,
  ] = await Promise.all([
    fontBase64('node_modules/@fontsource-variable/ibm-plex-sans/files/ibm-plex-sans-latin-wght-normal.woff2'),
    fontBase64('node_modules/@fontsource-variable/ibm-plex-sans/files/ibm-plex-sans-latin-ext-wght-normal.woff2'),
    fontBase64('node_modules/@fontsource-variable/ibm-plex-sans/files/ibm-plex-sans-latin-wght-italic.woff2'),
    fontBase64('node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2'),
    fontBase64('node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff2'),
  ]);

  const css = buildStyles({
    plexSansLatin,
    plexSansLatinExt,
    plexSansItalicLatin,
    plexMonoRegularLatin,
    plexMonoMediumLatin,
  });

  const browser = await chromium.launch({ executablePath: '/usr/bin/chromium' });

  // English PDF
  const pageEn = await browser.newPage();
  await pageEn.setContent(buildEnglishHtml(css), { waitUntil: 'networkidle' });
  await pageEn.pdf({
    path: OUT_PDF_EN,
    format: 'Letter',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
  });
  console.log('Generated English PDF at', OUT_PDF_EN);

  // Spanish PDF
  const pageEs = await browser.newPage();
  await pageEs.setContent(buildSpanishHtml(css), { waitUntil: 'networkidle' });
  await pageEs.pdf({
    path: OUT_PDF_ES,
    format: 'Letter',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
  });
  console.log('Generated Spanish PDF at', OUT_PDF_ES);

  await browser.close();
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
