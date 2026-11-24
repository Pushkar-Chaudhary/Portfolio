# Pushkar Chaudhary Portfolio

The site is a React single-page app built with Vite. Vercel serves the static frontend and the API functions in `api/`. Animations respect the user's reduced-motion preference.

## Routes

- `/` — Minimal introduction
- `/home` — Homepage and featured projects
- `/about` — Skills, education, and development timeline
- `/projects` — Searchable, filterable project list
- `/contact` — Contact form and social links
- `/dashboard` — WakaTime and GitHub activity
- `/guestbook` — Public messages posted by Google- or GitHub-authenticated visitors

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

Vite loads `.env` automatically during local development. Set secrets there and configure them as environment variables in Vercel for deployment. The Supabase URL and anon key below are public client settings; never expose private credentials with a `VITE_` prefix.

- `GITHUB_USERNAME` — Account used for contribution activity.
- `GITHUB_TOKEN` — Optional token for GitHub GraphQL requests.
- `WAKATIME_USER_ID` — Optional public WakaTime profile identifier.
- `WAKATIME_OAUTH_ACCESS_TOKEN` — Optional token with the WakaTime `read_stats` scope for private statistics.
- `WAKATIME_CLIENT_ID` and `WAKATIME_CLIENT_SECRET` — Local OAuth setup credentials; not needed in production after obtaining an access token.
- `SPOTIFY_CLIENT_ID` and `SPOTIFY_REFRESH_TOKEN` — Used by the current-playback endpoint.
- `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` — Public Supabase project settings used by Guestbook. The anon key is designed for browser use; never put a Supabase `service_role` key in a `VITE_` variable.

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

### Guestbook setup

The Guestbook stores messages in Supabase Postgres and uses Supabase Auth for Google and GitHub OAuth. To enable it:

1. Create a Supabase project and run [`supabase/migrations/20261123000000_guestbook.sql`](supabase/migrations/20261123000000_guestbook.sql) in the SQL Editor.
2. In Supabase Authentication, enable Google and GitHub providers and enter each provider's OAuth client ID and secret. Use `https://<project-ref>.supabase.co/auth/v1/callback` as the provider callback URL.
3. Set the Supabase Site URL to your deployed site and add both `http://localhost:5173/guestbook` and `https://pushkarchaudhary.com.np/guestbook` to the allowed redirect URLs. Add any Vercel Preview URL patterns you use as well.
4. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env` from the Supabase project settings. Add the same two public settings to Vercel for the Production and Preview environments, then redeploy.

Row-level security makes messages publicly readable and only allows an authenticated user to post under their own account. A database trigger limits each account to five posts per hour. The browser only uses Supabase's public anon key; never expose a service-role key.

## Project data

Edit `src/data/projects.js` to update project descriptions, links, screenshots, and technologies. The homepage showcase and Projects page use this shared file.

## Deployment

Vercel serves the Vite build from `dist/`, routes the API functions in `api/`, and rewrites the site routes to `index.html`. Add the repository to Vercel, configure the required environment variables, and deploy.

## Contact

- Email: pushkarchaudhary256@gmail.com
- GitHub: https://github.com/Pushkar-Chaudhary
- LinkedIn: https://www.linkedin.com/in/anik-chy/
- X: https://x.com/pushkar_chau07
