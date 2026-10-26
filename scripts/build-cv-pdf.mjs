import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs/promises';

const ROOT = process.cwd();
const OUT_PDF = path.join(ROOT, 'public/cv/jason-arias-python-backend-engineer.pdf');

async function fontBase64(relPath) {
  const buf = await fs.readFile(path.join(ROOT, relPath));
  return buf.toString('base64');
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

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Jason Nicolás Arias Gómez — Python Backend Engineer</title>
  <style>
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
      font-size: 7.65pt;
      color: #525866;
      line-height: 1.45;
      display: flex;
      flex-wrap: wrap;
      column-gap: 5pt;
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
      grid-template-columns: 122pt 1fr;
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
  </style>
</head>
<body>

  <!-- PAGE 1 -->
  <div class="page page-1">
    <header>
      <h1>Jason Nicolás Arias Gómez</h1>
      <div class="subtitle">Python Backend Engineer — FastAPI · PostgreSQL · Docker · Linux</div>
      <div class="contact-line">
        <span class="contact-item">Bogotá, Colombia (open to remote)</span><span class="sep">·</span><span class="contact-item"><a href="mailto:jn.arias@uniandes.edu.co">jn.arias@uniandes.edu.co</a></span><span class="sep">·</span><span class="contact-item"><a href="https://jsncar.tech">jsncar.tech</a></span><span class="sep">·</span><span class="contact-item"><a href="https://github.com/JsNcAr">github.com/JsNcAr</a></span><span class="sep">·</span><span class="contact-item"><a href="https://www.linkedin.com/in/jason-nicolas-arias-gomez-50127b248">linkedin.com/in/jason-nicolas-arias-gomez-50127b248</a></span>
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

  const browser = await chromium.launch({ executablePath: '/usr/bin/chromium' });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.pdf({
    path: OUT_PDF,
    format: 'Letter',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
  });
  await browser.close();
  console.log('Generated PDF at', OUT_PDF);
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
