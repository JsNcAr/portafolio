#!/usr/bin/env bash
#
# Pull main and rebuild, without ever serving a half-built site.
#
# Astro clears its output directory at the start of a build. Building straight
# into the directory Caddy serves would mean every deploy has a window where the
# site is empty, and a failed build would leave it that way. This builds beside
# the live directory and swaps with two renames, which is effectively atomic and
# leaves the previous build in dist.prev for rollback.
#
# On the server:
#     /opt/jsncar-page/portafolio/deploy/pull-deploy.sh
#
# Caddy does not need reloading: it reads from disk per request and the root
# path never changes. Reload only after editing deploy/Caddyfile itself.
#
# Note that `npm run gate` cannot run here -- it calls ../../scripts/*.py from
# the design-system kit, which is not part of this repository. Gate locally
# before you push; this script only builds.

set -euo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO"

# Canonical URLs, hreflang and the sitemap are baked in at build time.
export SITE_URL="${SITE_URL:-https://jsncar.tech}"

# The clone is owned by app-runner and may be updated by any member of that
# group. Git refuses to operate on a repo it sees as another user's until the
# path is marked safe.
if ! git config --global --get-all safe.directory 2>/dev/null | grep -qxF "$REPO"; then
    git config --global --add safe.directory "$REPO"
fi

# Fail before touching anything if the remote is unreachable. The clone uses a
# per-repo ssh alias (github.com-jsncar-website) that only exists in the ssh
# config of the account that created it, so running this as a different user
# fails with an opaque "Could not resolve hostname". Node also has to be the
# account that owns nvm. Whoever deploys needs both.
if ! git ls-remote --exit-code origin main >/dev/null 2>&1; then
    echo "pull-deploy: cannot reach origin as $(id -un)." >&2
    echo "  remote: $(git remote get-url origin)" >&2
    echo "  If that is an ssh alias, this account's ~/.ssh/config must define it" >&2
    echo "  and hold the matching deploy key. Run as the account that cloned the" >&2
    echo "  repo, or add the Host block to this one." >&2
    exit 1
fi

# .nvmrc pins Node 22. The system default on this host is Node 20, which Astro 7
# refuses to run on, so an unsourced nvm is a hard failure rather than a warning.
export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
if [ ! -s "$NVM_DIR/nvm.sh" ]; then
    echo "pull-deploy: nvm not found at $NVM_DIR. Node 22 is required." >&2
    exit 1
fi
# shellcheck disable=SC1091
. "$NVM_DIR/nvm.sh"
nvm use

lock_before="$(sha256sum package-lock.json | cut -d' ' -f1)"

git pull --ff-only origin main

# npm ci deletes node_modules and takes minutes. Only pay for it when the
# lockfile actually moved, or when there is nothing installed yet.
lock_after="$(sha256sum package-lock.json | cut -d' ' -f1)"
if [ ! -d node_modules ] || [ "$lock_before" != "$lock_after" ]; then
    echo "pull-deploy: lockfile changed or node_modules missing, running npm ci"
    npm ci
fi

rm -rf dist.new
npm run build -- --outDir dist.new

# Sanity-check the build before it goes live. An empty or partial dist would
# otherwise swap in cleanly and the site would 404 with no error anywhere.
for required in dist.new/index.html dist.new/es/index.html dist.new/404.html; do
    if [ ! -s "$required" ]; then
        echo "pull-deploy: build produced no $required, refusing to swap." >&2
        rm -rf dist.new
        exit 1
    fi
done

rm -rf dist.prev
[ -d dist ] && mv dist dist.prev
mv dist.new dist

echo
echo "pull-deploy: live. Previous build kept at dist.prev"
echo "  rollback:  mv dist dist.bad && mv dist.prev dist"
