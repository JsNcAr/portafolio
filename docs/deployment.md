# Deployment

The build output is plain static files. There is no runtime on the server, no
container, and no Node installed there.

---

## Testing on localhost

Three options, in increasing fidelity. Prefer the third before any real deploy.

### 1. Dev server — while writing code

```bash
nvm use
npm run dev            # http://localhost:4321
```

Hot reload. Not a real build: assets are unbundled and unhashed.

### 2. Astro preview — the built output

```bash
npm run build
npm run preview        # http://localhost:4321
```

Serves the actual `dist/`, so you see real bundling and hashed assets. It uses
Astro's own server, so it does **not** exercise any Caddy rule.

### 3. Real Caddy — what will actually be deployed

```bash
npm run serve:build    # build, then serve through deploy/Caddyfile
```

or, if `dist/` is already current:

```bash
npm run serve
npm run serve -- --port=8080     # pin a port
```

`scripts/serve-local.mjs` reads the production `deploy/Caddyfile` and rewrites
only what cannot work locally: the site address becomes `http://localhost:<port>`,
the document root becomes your `dist/`, HSTS is dropped (it is meaningless without
HTTPS) and the log block is removed. Every other rule is the real one.

It sets `admin off`, so it will not collide with a Caddy already running on this
machine, and it probes the port by binding it rather than trusting a list. If
`caddy` is not on `PATH` it says so and points you at `npm run preview`.

**What to check while it is running:**

```bash
curl -s -o /dev/null -w '%{http_code}\n'  http://localhost:4321/work
curl -s -o /dev/null -w '%{http_code}\n'  http://localhost:4321/nope        # 404
curl -sI http://localhost:4321/es/ | grep -i location                        # 308 -> /es
curl -sI http://localhost:4321/ | grep -i cache-control                      # must-revalidate
```

Verified working on this machine: all ten content routes return 200 in both
locales, `/nope` returns a styled 404 **with a 404 status**, `/es/work` returns
the Spanish 404, `/es/` redirects 308 to `/es`, and the CV PDF serves as
`application/pdf`.

> **A port that answers is not necessarily yours.** During testing, port 8084
> turned out to be this server's qBittorrent WebUI, and the requests silently
> returned its pages. `serve-local.mjs` binds the port itself for exactly this
> reason. If you pick a port by hand, confirm the page you get is the one you
> expect.

---

## Deploying to the server

### 1. Build

```bash
nvm use
npm ci
SITE_URL=https://jasonarias.dev npm run build
```

`SITE_URL` sets the origin used for canonical URLs, `hreflang` alternates and the
sitemap. It defaults to `https://jasonarias.dev`. Set it to whatever origin the
deploy is actually reachable at, or those tags will point somewhere the page is
not.

Run `npm run gate` before shipping. It is all-or-nothing and takes about a minute.

### 2. Publish

```bash
sudo mkdir -p /opt/jasonarias
sudo rsync -a --delete dist/ /opt/jasonarias/dist/
sudo chown -R caddy:caddy /opt/jasonarias
```

`--delete` is what removes files from a previous build. Without it, a renamed page
keeps answering at its old URL indefinitely.

### 3. Serve

Copy `deploy/Caddyfile` into place, or import it from the main Caddyfile:

```
import /opt/jasonarias/deploy/Caddyfile
```

Then:

```bash
sudo caddy validate --config /etc/caddy/Caddyfile
sudo systemctl reload caddy
```

**DNS must already resolve to this host**, or Caddy's ACME challenge fails and the
site never comes up. Point the `A`/`AAAA` records first.

---

## What the Caddyfile does

| Rule | Why |
|---|---|
| `try_files {path} {path}/index.html {path}.html` | `build.format: 'directory'` puts `/work` at `work/index.html` |
| 308 redirect off trailing slashes | canonical URLs carry none, so `/work/` must not answer as a duplicate |
| `/_astro/*` cached one year, immutable | filenames are content-hashed |
| HTML `max-age=0, must-revalidate` | otherwise a deploy is invisible to anyone who has visited |
| `handle_errors` with a per-locale rewrite | Spanish visitors get the Spanish 404 |
| CSP with no third-party origins | nothing is loaded off-origin, so the policy can be strict |
| `-Server` | no need to advertise |

### Two Caddy syntax traps, both hit while writing this

1. **`rewrite /404.html` is wrong.** A single argument parses as a *matcher* with
   a missing target. It must be `rewrite * /404.html`.
2. **A regexp matcher needs an explicit name.** Captures are `{re.<name>.N}`.
   Writing `@trail path_regexp ^(.+)/$` and then `{re.1}` expands to nothing, and
   the redirect loops the URL back onto itself with an empty `Location` header.

Both are caught by actually requesting a page. Neither is caught by
`caddy validate`, which only checks that the file parses.

---

## Rollback

Keep the previous build:

```bash
sudo mv /opt/jasonarias/dist /opt/jasonarias/dist.prev
sudo rsync -a --delete dist/ /opt/jasonarias/dist/
```

Rolling back is then a `mv` back and `systemctl reload caddy`. No migrations
exist, so there is nothing else to undo.
