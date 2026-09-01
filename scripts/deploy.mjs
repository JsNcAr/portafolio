/**
 * One command, from this repo, to put the current commit online.
 *
 *   npm run deploy
 *
 * The deploy target is a clone on this same machine, so there is no ssh hop:
 * this gates, pushes, then runs the target's own deploy/pull-deploy.sh, which
 * pulls, reinstalls only if the lockfile moved, builds beside the live
 * directory and swaps.
 *
 * Gating happens HERE and never on the target: npm run gate calls
 * ../../scripts/*.py from the design-system kit, which sits above this repo and
 * is not cloned with it. On the target those paths do not exist.
 *
 * Flags:
 *   --no-gate   skip the gates (documentation-only changes; says so loudly)
 *   --no-push   deploy what is already on origin, without pushing
 */
import { execFileSync, spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

const DEPLOY_DIR = process.env.DEPLOY_DIR ?? '/opt/jsncar-page/portafolio';
const args = process.argv.slice(2);
const skipGate = args.includes('--no-gate');
const skipPush = args.includes('--no-push');

const sh = (cmd, cmdArgs, opts = {}) =>
  execFileSync(cmd, cmdArgs, { encoding: 'utf8', ...opts }).trim();

const step = (n, msg) => console.log(`\n[${n}/4] ${msg}`);
const die = (msg) => { console.error(`deploy: ${msg}`); process.exit(1); };

// --- preflight ---------------------------------------------------------------
const branch = sh('git', ['rev-parse', '--abbrev-ref', 'HEAD']);
if (branch !== 'main') die(`on branch ${branch}, not main. Deploy from main.`);

if (sh('git', ['status', '--porcelain'])) {
  die('working tree is dirty. Commit or stash first -- a deploy should be a commit you can point at.');
}

if (!existsSync(join(DEPLOY_DIR, 'deploy/pull-deploy.sh'))) {
  die(`no deploy/pull-deploy.sh in ${DEPLOY_DIR}. Is that the right clone?`);
}

// --- 1. gate -----------------------------------------------------------------
if (skipGate) {
  console.log('\n[1/4] SKIPPING GATES (--no-gate). Nothing has checked this build.');
} else {
  step(1, 'gating locally (the only place the gates can run)');
  const gate = spawnSync('npm', ['run', 'gate'], { stdio: 'inherit' });
  if (gate.status !== 0) die('gates failed. Not deploying.');
}

// --- 2. push -----------------------------------------------------------------
if (skipPush) {
  console.log('\n[2/4] skipping push (--no-push); deploying whatever is on origin/main.');
} else {
  step(2, 'pushing to origin/main');
  const push = spawnSync('git', ['push', 'origin', 'main'], { stdio: 'inherit' });
  if (push.status !== 0) die('push failed.');
}

// --- 3. pull and build on the target ----------------------------------------
step(3, `deploying in ${DEPLOY_DIR}`);
const deploy = spawnSync(join(DEPLOY_DIR, 'deploy/pull-deploy.sh'), [], {
  stdio: 'inherit',
  cwd: DEPLOY_DIR,
});
if (deploy.status !== 0) die('pull-deploy.sh failed. The previous build is still live.');

// --- 4. prove it is actually serving -----------------------------------------
// Through the real Caddy, resolved to this host so it works without leaving the
// box and still presents the right SNI for the certificate.
step(4, 'checking the live site');
const check = spawnSync('curl', [
  '-s', '-o', '/dev/null', '-w', '%{http_code}',
  '--resolve', 'jsncar.tech:443:127.0.0.1',
  'https://jsncar.tech/',
], { encoding: 'utf8' });

const code = (check.stdout ?? '').trim();
if (code === '200') {
  console.log(`\ndeploy: live, HTTP ${code}. https://jsncar.tech`);
} else {
  console.log(`\ndeploy: files are swapped in, but the live check returned "${code}" instead of 200.`);
  console.log('  Content is served from disk, so this is usually Caddy or DNS, not the build.');
  console.log('  sudo journalctl -u caddy -n 50 --no-pager');
}
