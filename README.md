# Instagram · Your daily scroll

An independent Instagram-inspired React demo by Aditya Arora. A calm feed for photography, everyday moments, travel, and art. Not affiliated with Instagram or Meta.

## Run locally

Requires Node.js 22 or newer.

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. Production: `npm run build`, then `npm run preview`. Static hosting should serve `dist/`.

## What works

- Responsive sidebar and mobile navigation; every destination is implemented.
- For-you/following feeds, searchable users/captions/places, and category-filtered Explore.
- 13 fictional profiles, 20 curated posts, stories, and a photo-story Reels view.
- Likes, saves, follows, comments, post-link sharing, and profile bio editing.
- A post composer with credited sample photos or JPG/PNG/WebP uploads up to 1.5 MB.
- Local demo conversations, activity notifications, light/dark appearance, and image credits.
- Local persistence, malformed-storage recovery, lazy images, and graceful image fallbacks.

This is a **browser-local demo**, not a production social network. There is no authentication, remote database, live messaging, real followers, or video-reel hosting. Your changes stay in the current browser. Storage can be unavailable or full; a visible warning explains when changes cannot be saved. Stock-image authors are credited independently of the fictional profile identities. Remote image and font providers receive ordinary resource requests.

## Image sources

The checked-in media catalog avoids an API request for every avatar/post on every visit. `npm run refresh:media` refreshes its metadata using two keyless public APIs:

- [Lorem Picsum](https://picsum.photos/): photographer names and original photo links; photographs under the [Unsplash License](https://unsplash.com/license). These are freely licensed photographs, not a claim that all photos are copyright-free.
- [Metropolitan Museum of Art API](https://metmuseum.github.io/): only records marked `isPublicDomain: true`, with [CC0](https://creativecommons.org/publicdomain/zero/1.0/) image rights, creator names, and artwork links.

Every post links to its source; More → Image sources & licenses includes license details. Avatars are locally rendered initials, so real people are not presented as fictional users. Uploaded photos remain the uploader's responsibility.

## Validation

```sh
npm test
npm run build
npm audit
```

Tests cover malformed/unavailable storage, interaction-state persistence, unsafe local post URLs, and media attribution integrity. Manual browser checks cover likes/saves across reloads, comments, search, post creation, local conversations, stories, navigation, and responsive layout.

## Scheduled development

The Codex chat automation is configured for five daily work windows, October 14–20, 2026, at 09:00, 12:00, 15:00, 18:00, and 21:00 Asia/Kolkata. See [development plan](docs/DEVELOPMENT_PLAN.md) and [progress log](docs/PROGRESS.md). Each run should make one meaningful, tested improvement and commit/push it. No empty or backdated commits. Execution requires the local Codex scheduler and repository to be available; blocked or missed runs do not guarantee commits. The automation is managed in Codex, not a GitHub Actions schedule.
