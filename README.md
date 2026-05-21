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

1. Install Docker, Docker Compose, and Quarto on the Ubuntu instance.
2. Render the site with `quarto render` so the static output lands in `_site/`.
3. Point DNS for `realgoodresearch.com` and `www.realgoodresearch.com` to the Lightsail instance.
4. Request the initial certificate with Certbot, then start the stack:

   ```bash
   docker compose up -d --build
   ```

5. Keep `docs.realgoodresearch.com` and `data.realgoodresearch.com` in their own repos, but align their navbars and theme with this repo for a seamless user experience.
