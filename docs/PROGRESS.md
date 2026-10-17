# Progress

## October 14, 2026 — initial redesign

- Replaced the inert prototype with a responsive, olive-and-cream interface and mobile navigation.
- Added 13 fictional profiles and 20 deterministic, credited images from Lorem Picsum/Unsplash and the Metropolitan Museum of Art public-domain collection.
- Implemented feed filtering, search, Explore categories, stories, photo reels, profiles, follow/unfollow, notifications, saved posts, comments, sharing, local messages, creation/deletion of local posts, profile bio edits, and dark appearance.
- Added a custom SVG favicon, metadata, semantic controls, focusable dialogs, lazy images, image fallbacks, and storage corruption handling.
- Removed unused prototype components, icon-CDN dependency, animation dependency, and Tailwind. Updated compatible dependencies; npm audit reports zero vulnerabilities.
- Checks: Node tests for storage resilience/persistence and media integrity; production build; browser interaction checks and desktop/mobile QA.

Future scheduled runs must append the actual date, work completed, checks run, and commit outcome. Do not claim work or validation that did not happen.

## October 14 — image-host verification fix

The Art Institute image host returned HTTP 403 during final verification. Switched the four public-domain art images to The Met Open Access API, keeping per-image attribution and CC0 links. The Met image host returned HTTP 200.

## October 14 — original Instagram appearance restored

User requested visual fidelity to their Instagram screenshots. Removed custom headings, feed tabs, discovery promotions, topic chips, and the olive palette. Restored a dark background, original sidebar ordering, gradient photo stories, plain feed, compact suggestions, floating Messages button, and dense search grid. Updated the development plan to prevent future scheduled runs from adding unrelated UI. Fixed an undefined heading ID in empty states discovered during this change.

## October 14 — demo content cleanup

Replaced formulaic handles, motivational captions, repeated landscape avatars, uniform square crops, and all-user verification badges. Added credited stock profile photos, varied post proportions, casual captions, and ordinary UI labels. All profiles and interactions remain clearly identified as demonstrations in About.

## October 14 — scheduled fix: remember appearance preference

- Fixed application startup overriding every saved appearance with dark mode. New visits and missing/invalid preferences still default to dark, while an explicit light or dark choice now survives reloads.
- Added regression coverage for both saved choices, first visits, and invalid theme values.
- Validation: `npm test` passed all six tests; `npm run build` passed. Live browser validation was attempted but blocked by the browser URL security policy; no alternate browser route was attempted.
- Prepared as one focused scheduled-work commit for main. No layout or README changes.

## October 14 — scheduled fix: isolate image failure state

- Found that `Photo` retained its failed state when Stories or Reels changed the image prop, so one failed request left later images stuck on the fallback.
- Keyed the stateful image component by its URL. Each new image now starts a fresh loading/error lifecycle; rerenders of the same failed image still retain its fallback.
- Validation: all six existing tests pass, production build passes, and `git diff --check` passes. Reviewed both Story and Reel call sites. These tests do not simulate browser image-error events. Live browser regression verification remains unavailable following the prior browser URL-policy denial; no workaround was attempted.
- One focused scheduled-work change for main; no styling, README, or image-credit changes.

## October 15 — scheduled fix: consistent search matching

- Fixed padded or whitespace-only queries producing inconsistent people and post results. Both now share trimmed, case-insensitive matching; posts also match their author's display name, as people results already did.
- Missing metadata no longer becomes searchable as the literal word `undefined`.
- Validation: all nine tests pass, including three search regression tests; production build and `git diff --check` pass. Live browser verification remains unavailable following the earlier browser URL-policy denial; no workaround was attempted.
- One focused scheduled-work change for main. Appearance, photo credits, and README are unchanged.

## October 15 — scheduled fix: remove deleted posts' comments

- Found that deleting an uploaded post removed the photo, likes, and saved entry but left all of its comments in persistent local storage.
- The existing delete action now removes those comments too, preserving other posts and activity. No appearance changes.
- Validation: all ten tests pass, including deletion, storage round-trip, preservation of unrelated activity, and repeated deletion; production build and `git diff --check` pass. Reviewed the existing own-post-only delete action. Live browser verification remains unavailable following the earlier browser URL-policy denial; no workaround was attempted.

## October 15 — dialog dismissal fix

- Found that the shared dialog treated clicks on its own interior padding as backdrop clicks, closing the composer or other dialogs unexpectedly.
- Dismissal now checks that the click is outside the dialog's bounds. Interior blank space stays safe; the close button and native Escape handler remain available. No visual changes.
- Validation: all ten existing tests pass, production build and `git diff --check` pass. Reviewed the shared dialog handler; these tests do not exercise browser click geometry. Live browser verification remains unavailable following the earlier browser URL-policy denial; no workaround was attempted.

## October 15 — scheduled fix: accessible follow controls

- Follow buttons in user lists and profiles previously exposed only generic Follow/Following labels, without identifying their account or conveying a toggle state.
- Both controls now expose a stable account-specific accessible name and `aria-pressed` from the same following state used by their click handlers. Visible labels and layout are unchanged.
- Validation: all ten existing tests, production build, and `git diff --check` pass. Reviewed both follow-control call sites. These tests do not verify screen-reader announcements; live browser verification remains unavailable following the earlier browser URL-policy denial, and no workaround was attempted.

## October 15 — scheduled fix: prevent competing photo selections

- Found that the composer allowed choosing another upload or stock photo while FileReader was still reading the first upload. Its later callback could overwrite the newer selection, leaving the wrong photo ready to share.
- Temporarily disabled both photo-selection controls while reading, with a matching guard in the upload handler. Existing success/error handlers re-enable selection, and Share remains disabled during reading. No layout or content changes.
- Validation: all ten existing tests, production build, and `git diff --check` pass. Reviewed both selection paths and reader completion/error handlers. Existing tests do not simulate asynchronous file selection; live browser verification remains unavailable following the earlier browser URL-policy denial, with no workaround attempted.

## October 16 — scheduled fix: keep message drafts with their conversation

- Found that the uncontrolled message field retained the same draft when switching contacts, allowing text intended for one conversation to be submitted in another.
- Bound the field to per-contact draft state. Switching contacts now shows that contact's draft; submitting clears only the active draft. Drafts remain in memory for the current page session, and messaging remains local-only.
- Validation: all ten existing tests, production build, and `git diff --check` pass. Reviewed contact switching and submission against the same chat ID. The existing tests do not exercise React input switching; live browser verification remains unavailable following the earlier browser URL-policy denial, with no workaround attempted. Layout and photo credits are unchanged.

## October 16 — scheduled fix: consistent likes in photo grids

- Found that liking a post updated its feed/dialog count but Search, Explore, and profile grid overlays continued to show the original count.
- Grid overlays now include the current user's like and fill the heart from the same persisted state used by the post controls. Unliking returns the original count. Layout and photo credits are preserved.
- Validation: all ten existing tests, production build, and `git diff --check` pass. Compared grid and post count expressions and their shared state; existing tests do not exercise rendered grid updates. Live browser verification remains unavailable following the earlier browser URL-policy denial; no workaround was attempted.

## October 16 — scheduled fix: open shared links in an existing tab

- Found that shared post URLs were read only at startup. Opening a different post link in an already-loaded tab changes the URL fragment without reloading, so the linked post did not open.
- Added a hash-change listener that resolves the current post catalog, including local uploads, and opens valid linked posts. Unknown IDs are ignored. Listener cleanup prevents duplicate subscriptions; existing startup handling is preserved.
- Validation: all ten existing tests, production build, and `git diff --check` pass. Reviewed startup handling, event cleanup, and current-upload dependencies. Existing tests do not simulate browser hash navigation; live browser verification remains unavailable following the earlier browser URL-policy denial, with no workaround attempted. No visual changes.

## October 16 — scheduled fix: preserve shared photo license metadata

- Found that restoring locally created posts discarded title, license, and license URL from catalog photos selected in the composer, although author/source credits survived.
- State validation now retains those text fields and HTTPS license links. Uploaded photos without license metadata remain supported.
- Validation: all eleven tests pass, including a storage round-trip across all twenty catalog photos checking author, provider, source, title, license, and license URL. Production build and `git diff --check` pass. Live browser verification remains unavailable following the earlier browser URL-policy denial; no workaround was attempted. No visual changes.

## October 16 — scheduled fix: isolate post dialogs by post identity

- Found that switching shared links while a post dialog was open reused its uncontrolled comment input for the next post. A draft intended for the earlier post could then be submitted to the newly opened post.
- Keyed detailed posts by post ID so switching posts starts a fresh comment field. Also restricted the post's DOM anchor ID to its feed instance, avoiding duplicate IDs when the same post is open in a dialog.
- Validation: all eleven existing tests, production build, and `git diff --check` pass. Reviewed feed and dialog call sites and hash-based switching. Existing tests do not simulate dialog draft switching; live browser verification remains unavailable following the earlier browser URL-policy denial, with no workaround attempted. No visual changes.

## October 17 — scheduled fix: recover avatars when switching accounts

- Found that the avatar error handler hides a failed image with an inline style. React reused that hidden image when a shared profile/conversation header switched to another user's avatar, leaving even a working photo invisible.
- Keyed avatar images by their URL so a different photo gets a fresh element without the previous failure's hidden style. Initials remain the fallback for failed requests.
- Validation: all eleven existing tests, production build, and `git diff --check` pass. Reviewed shared avatar use in profile and conversation headers. Existing tests do not simulate image errors or React DOM reuse; live browser verification remains unavailable following the earlier browser URL-policy denial, with no workaround attempted. Layout and photo credits are unchanged.

## October 17 — scheduled fix: honor reduced motion during navigation

- Found that navigation explicitly requested smooth JavaScript scrolling even when the user requested reduced motion. The existing CSS reduced-motion rule did not change that explicit API argument.
- Navigation now reads the current system preference and scrolls instantly when reduced motion is enabled, retaining smooth scrolling otherwise. Reading at navigation time also respects preference changes during the session.
- Validation: all eleven existing tests, production build, and `git diff --check` pass. Reviewed the navigation path and existing CSS preference rule. Existing tests do not exercise browser scrolling or system preferences; live browser verification remains unavailable following the earlier browser URL-policy denial, with no workaround attempted. Layout and content are unchanged.

## October 17 — scheduled fix: remove leftover olive input focus color

- Found that focused search, comment, message, and composer fields still used a hardcoded olive outline from the superseded redesign.
- Input and textarea focus outlines now use the same theme accent as keyboard-focused buttons and links, matching the restored Instagram palette in both appearances while retaining a visible focus indicator.
- Validation: all eleven existing tests, production build, and `git diff --check` pass. Reviewed the focus selector and final dark/light accent definitions. Live visual verification remains unavailable following the earlier browser URL-policy denial; no workaround was attempted. Layout and content are unchanged.

## October 17 — scheduled fix: focus search when entering from Explore

- Found that Search and Explore reuse the same input element. Changing its `autoFocus` prop did not focus an already-mounted field when entering Search from Explore, leaving keyboard input on the navigation control.
- Search now focuses its field through a ref when the view changes to Search. The effect does not run while typing, so ordinary input and focus movement remain available.
- Validation: all eleven existing tests, production build, and `git diff --check` pass. Reviewed the shared Search/Explore branch and view-transition effect. Existing tests do not verify browser focus; live browser verification remains unavailable following the earlier browser URL-policy denial, with no workaround attempted. Layout and content are unchanged.

## October 17 — scheduled fix: find handles with an @ prefix

- Found that searching a recognizable handle such as `@riya.s_` returned no matching person or authored posts because stored handles omit the @ prefix.
- Shared matching now accepts an optional leading @ while preserving literal caption matches and existing case/whitespace handling. A lone @ is not treated as an empty query.
- Validation: all twelve tests pass, including prefixed handle searches for people/posts, unmatched handles, a lone @, and literal mentions. Production build and `git diff --check` pass. Live browser verification remains unavailable following the earlier browser URL-policy denial; no workaround was attempted. Layout and content are unchanged.
