# Instagram · Your daily scroll

An independent Instagram-inspired React demo by Aditya Arora. A dark, screenshot-matched feed for photography, everyday moments, travel, and art. Not affiliated with Instagram or Meta.

## Run locally

Requires Node.js 22 or newer.

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. Production: `npm run build`, then `npm run preview`. Static hosting should serve `dist/`.

## What works

- Responsive sidebar and mobile navigation; every destination is implemented.
- A photo feed, searchable users/captions/places, and a dense discovery grid.
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

Every post links to its source; More → Image sources & licenses includes license details. Avatars use credited stock photos, existing project assets, or initials. Profile names are fictional; pictured people are not the account holders. Uploaded photos remain the uploader's responsibility.

## Validation

```sh
npm test
npm run build
npm audit
```

Tests cover malformed/unavailable storage, interaction-state persistence, unsafe local post URLs, and media attribution integrity. Manual browser checks cover likes/saves across reloads, comments, search, post creation, local conversations, stories, navigation, and responsive layout.
