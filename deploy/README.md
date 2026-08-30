# Deploying

The build output is plain static files. There is no runtime, no Node on the server,
no container required.

## Build

Node 22 is required (`.nvmrc` pins it; the machine default is still system Node 20):

    nvm use
    npm ci
    SITE_URL=https://jasonarias.dev npm run build

`SITE_URL` only affects canonical URLs, hreflang and the sitemap. Set it to whatever
origin the deploy will actually be reachable at, or those tags will point somewhere
the page is not.

## Publish

    sudo mkdir -p /opt/jasonarias
    sudo rsync -a --delete dist/ /opt/jasonarias/dist/
    sudo chown -R caddy:caddy /opt/jasonarias

`--delete` is what removes files from a previous build. Without it, renamed pages
linger and keep answering.

## Serve

Copy `deploy/Caddyfile` into place (or `import` it), then:

    sudo caddy validate --config /etc/caddy/Caddyfile
    sudo systemctl reload caddy

DNS must already point at this host, otherwise the ACME challenge fails.

## Trying it locally first, no DNS and no root

    npm run preview          # Astro's own preview server on :4321

or serve the built directory the way Caddy will:

    caddy file-server --root dist --listen :8080 --browse

Note that `caddy file-server` does not apply the try_files rule, so extensionless
paths behave slightly differently than in production.
