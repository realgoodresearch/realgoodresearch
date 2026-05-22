# Real Good Research

Prototype Quarto replacement for the WordPress homepage at `https://realgoodresearch.com`.

## Site structure

- `index.qmd`: homepage with core sections and recent-news carousel
- `research.qmd`, `about.qmd`, `contact.qmd`: main site pages
- `news/posts/*.qmd`: individual posts
- `news/index.qmd`: News listing page
- `nginx/` and `docker-compose.yml`: Dockerised nginx deployment for Lightsail

## Local authoring

1. Render the site:

   ```bash
   quarto render
   ```

2. Preview locally if needed:

   ```bash
   quarto preview
   ```

3. Create a new post:

   ```bash
   scripts/new-post.sh "My New Post"
   ```

## Deploy on Lightsail

1. Point DNS `A` records for `realgoodresearch.com` and `www.realgoodresearch.com` to the Lightsail instance public IP.
2. Clone this repo to the instance, then install host dependencies:

   ```bash
   sudo ./scripts/install-ubuntu-dependencies.sh --configure-firewall
   ```

3. Create `.env` from the template and set the certificate email address:

   ```bash
   cp .env.example .env
   ```

   Set `LETSENCRYPT_EMAIL` in `.env` to a real inbox.

4. Render the site so static output lands in `_site/`:

   ```bash
   quarto render
   ```

5. Start Nginx first (it will create a temporary self-signed cert if needed):

   ```bash
   docker compose up -d --build nginx
   ```

6. Request the initial Let's Encrypt certificate:

   ```bash
   ./scripts/request-certificate.sh realgoodresearch.com www.realgoodresearch.com
   ```

7. Start the full stack:

   ```bash
   docker compose up -d --build
   ```

8. Reload Nginx so it picks up the newly-issued certificate:

   ```bash
   docker compose exec nginx nginx -s reload
   ```

The `certbot` service then renews certificates automatically every 12 hours and only renews when due.

Keep `docs.realgoodresearch.com` and `data.realgoodresearch.com` in their own repos, but align their navbars and theme with this repo for a seamless user experience.
