#!/usr/bin/env node
/**
 * Runs every render-based gate over the harness pages (and, once it exists, dist/).
 *
 * The point of this wrapper is honesty: DS_REQUIRE_BROWSER=1 is set for every child,
 * so a missing browser FAILS instead of printing SKIPPED and exiting 0. All-or-nothing.
 *
 *   node scripts/run-render-gates.mjs [glob-or-dir ...]     (default: harness)
 */
import { execFileSync } from 'node:child_process';
import { readdirSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';

const KIT = resolve('../../scripts');
const targets = process.argv.slice(2);
// .gate-site is dist/ with file://-resolvable asset paths (see prepare-gate-site.mjs).
const roots = targets.length ? targets : ['harness', ...(existsSync('.gate-site') ? ['.gate-site'] : [])];

const pages = [];
for (const r of roots) {
  if (!existsSync(r)) continue;
  const walk = (d) => {
    for (const e of readdirSync(d, { withFileTypes: true })) {
      const p = join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name.endsWith('.html')) pages.push(p);
    }
  };
  walk(r);
}
if (!pages.length) { console.error('run-render-gates: no .html found in ' + roots.join(', ')); process.exit(1); }

/**
 * [script, extra args, run in dark too?, accepts many files?]
 *
 * Five of these gates read only the FIRST non-flag argument
 * (`argv.find(a => !a.startsWith('--'))`), so handing them a list silently tests
 * one page and reports a pass for all of them. Their directory walk is also
 * non-recursive, so pointing them at a directory misses every nested route.
 * Those are invoked once per page instead. Verified against each script's
 * argument parsing; re-check when the kit updates.
 */
const MANY = true;
const ONE = false;
const GATES = [
  ['measure_render.mjs', [], true, MANY],
  ['verify_states.mjs', [], true, ONE],
  ['axe_audit.mjs', [], true, ONE],
  ['verify_responsive.mjs', [], false, ONE],
  ['verify_target_size.mjs', [], true, MANY],
  ['verify_keyboard.mjs', [], false, MANY],
  ['verify_reduced_motion.mjs', [], false, MANY],
  ['verify_overflow.mjs', [], false, MANY],
  ['verify_interactive.mjs', [], false, ONE],
  ['verify_rtl.mjs', [], false, ONE],
  ['lint_intent.mjs', [], false, MANY],
  ['slop_tells.mjs', ['--strict'], true, MANY],
];

function run(script, args) {
  execFileSync('node', [join(KIT, script), ...args], {
    stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env, DS_REQUIRE_BROWSER: '1' },
  });
}

let failed = 0;
for (const [script, extra, dark, many] of GATES) {
  for (const mode of dark ? [[], ['--dark']] : [[]]) {
    const label = `${script.replace('.mjs', '')}${mode.length ? ' [dark]' : ''}`;
    const batches = many ? [pages] : pages.map((p) => [p]);
    const problems = [];

    for (const batch of batches) {
      try {
        run(script, [...extra, ...mode, ...batch]);
      } catch (e) {
        problems.push(`${e.stdout || ''}${e.stderr || ''}`.trim());
      }
    }

    if (problems.length === 0) {
      console.log(`  PASS  ${label}  (${pages.length} page${pages.length === 1 ? '' : 's'})`);
    } else {
      failed++;
      console.log(`  FAIL  ${label}  (${problems.length}/${batches.length} failing)`);
      for (const out of problems) {
        console.log(out.split('\n').map((l) => `        ${l}`).join('\n'));
      }
    }
  }
}
console.log(failed ? `\n${failed} render gate(s) FAILED over ${pages.length} page(s).` : `\nOK: all render gates pass over ${pages.length} page(s).`);
process.exit(failed ? 1 : 0);
