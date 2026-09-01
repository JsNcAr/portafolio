# Deployment

The build output is plain static files -- no runtime, no container, nothing to
keep alive. Node is present on the server only because the site is built there:
the repository is cloned to `/opt/jsncar-page/portafolio` and `git pull` plus a
rebuild is the whole deploy. That matches the two sites already on this host
(`apollyon-page/apollyon-base-ui`, `gsalud-page/pagina-gsalud-odontologia`).

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

### 0. DNS

The domain is `jsncar.tech`, registered at get.tech. Its DNS is hosted on Namecheap
so it follows the same dynamic-IP path as every other domain on this host:
`/opt/ddns/update_dns.sh` updates one record, `@.ramsus.site`, and everything else
aliases to it.

| Host | Type | Value |
|---|---|---|
| `@` | ALIAS | `ramsus.site` |
| `www` | CNAME | `ramsus.site` |

**ALIAS, not CNAME.** A CNAME at the apex is forbidden by RFC 1034 -- it cannot
coexist with the SOA and NS records the apex must carry. get.tech's own DNS panel
permits it anyway, and the result is that every query type follows the alias and
inherits the *target's* zone: `jsncar.tech MX` answered with ramsus.site's mail
servers and `jsncar.tech TXT` with ramsus.site's SPF record. Namecheap's ALIAS
resolves the target server-side and returns a plain `A`, so the apex keeps its own
SOA, MX, TXT and CAA. That is what `apollyon.lat` and `gsalud.co` already do.

To move DNS hosting (the registration stays at get.tech):

1. get.tech control panel -> nameservers -> `dns1.registrar-servers.com`,
   `dns2.registrar-servers.com`.
2. Namecheap -> Domain List -> add `jsncar.tech` under **FreeDNS**.
3. Delete any apex CNAME first. ALIAS conflicts with CNAME, A, AAAA and URL
   Redirect on the same host.
4. Add the two records above.

Verify before touching Caddy, because the ACME challenge depends on it:

```bash
dig +short jsncar.tech A          # 186.28.154.118, and no CNAME line
dig +short www.jsncar.tech        # must resolve, or the www cert fails
dig +short jsncar.tech SOA        # must be jsncar.tech's own, not ramsus.site's
```

### 1. Gate locally, then push

```bash
nvm use
npm run gate          # all-or-nothing, about a minute
git push origin main
```

**The gates cannot run on the server.** `npm run gate` calls
`../../scripts/*.py` from the design-system kit, which lives above this
repository and is not cloned with it. On the server those paths resolve to
`/opt/scripts/` and do not exist. Local is the only place quality is checked, so
a push is the point of no return -- gate before it, not after.

### 2. First-time server setup

One clone, using a GitHub **deploy key** so the server needs no account
credentials. `~/.ssh/config` on the server maps a per-repo alias to that key:

```
Host github.com-jsncar-website
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_jsncar_deploy
    IdentitiesOnly yes
```

`IdentitiesOnly yes` matters: without it ssh offers every key it has and GitHub
authenticates as whichever one it accepts first, which may not be the deploy key
and may not have access to this repository.

```bash
sudo mkdir -p /opt/jsncar-page
sudo chown app-runner:app-runner /opt/jsncar-page
sudo chmod 2775 /opt/jsncar-page
cd /opt/jsncar-page
git clone git@github.com-jsncar-website:JsNcAr/portafolio.git
```

The `2775` sets the setgid bit, so everything created underneath inherits group
`app-runner` and stays group-writable. With `umask 002` that yields `664` files
and `775` directories -- world-readable, which is the only thing Caddy needs.

> **Do not `chown` the tree to `caddy`.** Caddy only ever reads these files, and
> it reads them through the world-read bit. Handing ownership to `caddy` breaks
> the next `git pull` and rebuild, which run as a human account.

### 3. Every deploy after that

```bash
/opt/jsncar-page/portafolio/deploy/pull-deploy.sh
```

That script pulls, runs `npm ci` only when the lockfile moved, builds into
`dist.new`, checks the build actually produced pages, and swaps it into place
with two renames.

The swap is the point. Astro **clears its output directory at the start of a
build**, so building straight into the directory Caddy serves gives every deploy
a window where the site is empty -- and a failed build leaves it empty until
someone notices. Building beside the live directory and renaming avoids both.

Caddy needs no reload for a content deploy: it reads from disk per request and
the root path never changes. Reload only when `deploy/Caddyfile` itself changed.

`SITE_URL` is baked in at build time -- it sets canonical URLs, `hreflang`
alternates and the sitemap. The script defaults it to `https://jsncar.tech`.
Override it (`SITE_URL=https://staging.example deploy/pull-deploy.sh`) only if
the build will be reachable somewhere else, or those tags point at a page that
is not there.

### 4. Serve

Import the repo's Caddyfile from the main one, so the config stays versioned
with the site:

```
import /opt/jsncar-page/portafolio/deploy/Caddyfile
```

Then:

```bash
sudo caddy validate --config /etc/caddy/Caddyfile
sudo systemctl reload caddy
```

**Step 0 must already be done.** Caddy requests certificates for `jsncar.tech` and
`www.jsncar.tech` on reload; if either name does not resolve to this host the ACME
challenge fails and the site never comes up. Watch it happen:

```bash
sudo journalctl -u caddy -f | grep -i -E 'certificate|acme|error'
```

---

## What the Caddyfile does

| Rule | Why |
|---|---|
| `root * /opt/jsncar-page/portafolio/dist` | the repo is cloned and built on the server, so `dist/` sits inside the working tree |
| `www.jsncar.tech` 308s to the apex | every page declares a canonical URL at the apex; serving both would contradict it |
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

`pull-deploy.sh` leaves the previous build in place, so rolling back is two
renames and takes effect immediately:

```bash
cd /opt/jsncar-page/portafolio
mv dist dist.bad && mv dist.prev dist
```

No Caddy reload, no migrations, nothing else to undo. Only one generation is
kept -- a second deploy overwrites `dist.prev`, so roll back before redeploying.

To go back further, roll the code back instead and rebuild:

```bash
git log --oneline -10
git checkout <commit>
deploy/pull-deploy.sh          # pull --ff-only will fail on a detached HEAD
```

That last step needs the pull removed or the branch reset; for a real revert
prefer `git revert` on your machine, gate it, and push.
