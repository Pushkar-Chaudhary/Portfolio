# Pushkar Chaudhary Portfolio

The portfolio is built with Astro, React, and Tailwind CSS 4. Astro renders each route on the server; the existing interactive React experiences hydrate only on the pages that use them.

## Routes

- `/` — Minimal introduction with an immediate link to the portfolio.
- `/home` — Existing homepage and featured projects.
- `/about` — Skills, education, and development timeline.
- `/projects` — Searchable, filterable project showcase.
- `/contact` — Contact form and social links.
- `/dashboard` — WakaTime and GitHub activity.

## Development

Use Node.js 22.23.4 or later (required by Astro 7).

```bash
npm install
npm run dev
npm run build
npm run preview
npm run lint
```

The Astro development server serves `/api/wakatime` and `/api/github` through the same handlers used in production.

## Environment variables

Set server-only values in `.env.local` for local development and in Vercel Project Settings for deployment:

- `WAKATIME_API_KEY` — Optional authenticated WakaTime statistics.
- `WAKATIME_USER_ID` — Optional public WakaTime profile identifier.
- `GITHUB_USERNAME` — GitHub account used for contribution activity.
- `GITHUB_TOKEN` — Optional server-side GitHub GraphQL token.

Do not prefix these values with `PUBLIC_` or `VITE_`. The API handlers keep credentials on the server and retain their existing response formats.

## Project structure

```
src/
├── components/
│   ├── Footer.jsx
│   ├── Navbar.jsx
│   └── ...
├── layouts/
│   └── SiteLayout.astro
├── pages/
│   ├── api/
│   ├── index.astro
│   └── *.astro
├── styles/
├── views/                 # Existing React page experiences
└── assets/                # Existing project screenshots and images
api/                       # Original server-side API handlers
astro.config.mjs
```

## Deployment

The Astro Vercel adapter is configured in `astro.config.mjs`. Import the repository into Vercel, configure the server-side environment variables, and deploy; no SPA rewrite is required.

## Contact

- Email: pushkarchaudhary256@gmail.com
- GitHub: https://github.com/Pushkar-Chaudhary
- LinkedIn: https://www.linkedin.com/in/anik-chy/
- X: https://x.com/pushkar_chau07
