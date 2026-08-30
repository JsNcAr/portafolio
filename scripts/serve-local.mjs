#!/usr/bin/env node
/**
 * Serve dist/ locally through the REAL deploy/Caddyfile.
 *
 * `astro preview` uses its own server, so it cannot tell you whether the rules
 * you will actually deploy behind -- try_files, the trailing-slash redirect, the
 * per-locale 404, the cache and security headers -- are correct. This runs the
 * production config with only the parts that cannot work locally rewritten:
 * the site address, the document root, HSTS (needs HTTPS) and the log file.
 *
 *   node scripts/serve-local.mjs [--port=N]
 *
 * Safety: `admin off` so it never collides with a Caddy already running on this
 * machine, and the port is probed before binding.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { spawn, execFileSync } from 'node:child_process';
import { createServer } from 'node:net';
import { resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const args = process.argv.slice(2);
const wanted = Number(args.find((a) => a.startsWith('--port='))?.split('=')[1] ?? 0);

if (!existsSync('dist')) {
  console.error('serve-local: dist/ does not exist. Run `npm run build` first.');
  process.exit(1);
}
if (!existsSync('deploy/Caddyfile')) {
  console.error('serve-local: deploy/Caddyfile is missing.');
  process.exit(1);
}

try {
  execFileSync('caddy', ['version'], { stdio: 'ignore' });
} catch {
  console.error('serve-local: caddy is not on PATH.');
  console.error('  Install it, or fall back to `npm run preview` (Astro\'s own server,');
  console.error('  which does NOT exercise the Caddyfile rules).');
  process.exit(1);
}

/** A port is only free if we can actually bind it -- checking a list is a race. */
function freePort(port) {
  return new Promise((res) => {
    const s = createServer();
    s.once('error', () => res(false));
    s.once('listening', () => s.close(() => res(true)));
    s.listen(port, '127.0.0.1');
  });
}

let port = wanted;
if (port) {
  if (!(await freePort(port))) {
    console.error(`serve-local: port ${port} is already in use.`);
    process.exit(1);
  }
} else {
  for (const candidate of [4321, 8080, 8081, 8090, 8195, 8196, 8197]) {
    if (await freePort(candidate)) { port = candidate; break; }
  }
  if (!port) { console.error('serve-local: no free port found.'); process.exit(1); }
}

const source = readFileSync('deploy/Caddyfile', 'utf8');
const local = [
  '{',
  '\tadmin off',       // never fight a Caddy already running on this host
  '\tauto_https off',  // no ACME for localhost
  '}',
  '',
  source
    .replace(/^jasonarias\.dev, www\.jasonarias\.dev \{/m, `http://localhost:${port} {`)
    .replace(/root \* \/opt\/jasonarias\/dist/, `root * ${resolve('dist')}`)
    .replace(/^\s*Strict-Transport-Security.*$/m, '') // HTTPS-only, meaningless here
    .replace(/\n\tlog \{[\s\S]*?\n\t\}/, ''),         // no /var/log/caddy locally
].join('\n');

const configPath = join(tmpdir(), `caddy-local-${process.pid}.Caddyfile`);
writeFileSync(configPath, local);
// Stripping the HTTPS-only directives leaves blank lines Caddy warns about.
try { execFileSync('caddy', ['fmt', '--overwrite', configPath], { stdio: 'ignore' }); } catch { /* cosmetic */ }

console.log(`serving ${resolve('dist')} through deploy/Caddyfile`);
console.log(`  http://localhost:${port}`);
console.log('  Ctrl-C to stop\n');

const child = spawn('caddy', ['run', '--config', configPath, '--adapter', 'caddyfile'], {
  stdio: 'inherit',
});
const stop = () => { child.kill('SIGINT'); };
process.on('SIGINT', stop);
process.on('SIGTERM', stop);
child.on('exit', (code) => process.exit(code ?? 0));
