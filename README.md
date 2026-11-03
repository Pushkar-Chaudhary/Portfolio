# Pushkar Chaudhary Portfolio

The site uses Astro for its routes and server rendering, with React components for interactive sections. Animations respect the user's reduced-motion preference.

## Routes

- `/` — Minimal introduction
- `/home` — Homepage and featured projects
- `/about` — Skills, education, and development timeline
- `/projects` — Searchable, filterable project list
- `/contact` — Contact form and social links
- `/dashboard` — WakaTime and GitHub activity

## Development

Use Node.js 22.23.4 or later.

```bash
npm install
npm run dev
npm run build
npm run preview
npm run lint
```

## Environment variables

Keep local values in `.env.local` and add deployment values as server-side environment variables in Vercel. Do not use `PUBLIC_` or `VITE_` prefixes for credentials.

- `GITHUB_USERNAME` — Account used for contribution activity.
- `GITHUB_TOKEN` — Optional token for GitHub GraphQL requests.
- `WAKATIME_USER_ID` — Optional public WakaTime profile identifier.
- `WAKATIME_OAUTH_ACCESS_TOKEN` — Optional token with the WakaTime `read_stats` scope for private statistics.
- `WAKATIME_CLIENT_ID` and `WAKATIME_CLIENT_SECRET` — Local OAuth setup credentials; not needed in production after obtaining an access token.
- `SPOTIFY_CLIENT_ID` and `SPOTIFY_REFRESH_TOKEN` — Used by the current-playback endpoint.

The WakaTime and Spotify authorization helpers save tokens to `.env.local`; never commit or share the file.

### WakaTime authorization

Create a WakaTime OAuth app with `https://wakatime.com/oauth/test` as its authorized redirect URL. Add its client ID and secret to `.env.local`, then run:

```bash
npm run wakatime:authorize
```

Authorize the app, paste the redirected URL into the terminal, and restart the dev server. For deployment, set `WAKATIME_OAUTH_ACCESS_TOKEN` in Vercel.

### Spotify authorization

Add `http://127.0.0.1:8888/callback` as a redirect URI in the Spotify app settings and set `SPOTIFY_CLIENT_ID` in `.env.local`. Then run:

```bash
npm run spotify:authorize
```

Open the printed URL and approve access. The helper writes the refresh token to `.env.local`. Set both Spotify variables in Vercel to enable `/api/spotify`.

The About page's favorite-song embed is a separate, manually selected track.

## Project data

Edit `src/data/projects.js` to update project descriptions, links, screenshots, and technologies. The homepage showcase and Projects page use this shared file.

## Deployment

The Astro Vercel adapter is configured in `astro.config.mjs`. Add the repository to Vercel, configure the required environment variables, and deploy; no SPA rewrite is needed.

## Contact

- Email: pushkarchaudhary256@gmail.com
- GitHub: https://github.com/Pushkar-Chaudhary
- LinkedIn: https://www.linkedin.com/in/anik-chy/
- X: https://x.com/pushkar_chau07
