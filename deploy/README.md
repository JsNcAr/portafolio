# Deploying

The build output is plain static files. The repository is cloned on the server at
`/opt/jsncar-page/portafolio` and built there, so a deploy is `git pull` plus a
rebuild -- the same shape as the other sites on this host.

Full detail, including DNS, is in `docs/deployment.md`.

## Before you push

    nvm use
    npm run gate

The gates call `../../scripts/*.py` from the design-system kit, which is not part
of this repository and does not exist on the server. Local is the only place they
run, so gate before pushing rather than after.

## On the server

    /opt/jsncar-page/portafolio/deploy/pull-deploy.sh

Pulls, reinstalls only if the lockfile moved, builds into `dist.new`, verifies the
build produced pages, then swaps it in with two renames. Astro clears its output
directory when a build starts, so building directly into the directory Caddy
serves would blank the site for the length of the build and leave it blank if the
build failed.

No Caddy reload is needed for a content deploy. The previous build stays in
`dist.prev`; rollback is `mv dist dist.bad && mv dist.prev dist`.

## Permissions

Files stay owned by the account that builds them, group `app-runner`, mode 664 /
775 under `umask 002`. Caddy reads them through the world-read bit.

**Do not `chown` the tree to `caddy`** -- it only ever reads these files, and
taking ownership away from the build account breaks the next pull.

## Serve

Import the Caddyfile from the main one so the config stays versioned with the site:

    import /opt/jsncar-page/portafolio/deploy/Caddyfile

then:

    sudo caddy validate --config /etc/caddy/Caddyfile
    sudo systemctl reload caddy

Reload only when `deploy/Caddyfile` itself changed.

DNS must already point at this host or the ACME challenge fails. Both
`jsncar.tech` (ALIAS -> `ramsus.site`) and `www.jsncar.tech` (CNAME -> `ramsus.site`)
must resolve; Caddy requests a certificate for each. Use Namecheap's ALIAS record
at the apex, never a CNAME -- see `docs/deployment.md` step 0 for why.

## Trying it locally first, no DNS and no root

    npm run serve:build      # build, then serve dist/ through deploy/Caddyfile

`scripts/serve-local.mjs` rewrites only what cannot work locally (address, root,
HSTS, logging) and refuses to start if the production root survives the rewrite.
