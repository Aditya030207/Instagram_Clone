# Seven-day improvement plan

Window: October 14–20, 2026, Asia/Kolkata. Five daily work windows: 09:00, 12:00, 15:00, 18:00, 21:00 IST.

At each window, deliver one small, genuine improvement with a descriptive commit, passing checks, and an ordinary push. Use actual timestamps. Never make empty commits, split an already finished change just to fill the schedule, or overwrite somebody else's work. If a task is complete, take the next useful item. If a run is blocked, report it; a schedule cannot guarantee a commit. Stop after October 20.

The initial redesign already implements the requested feed, all navigation destinations, search, saved posts, follows, profiles, local comments, a composer, stories, photo reels, local demo messages, appearance settings, image credits, and favicon. Keep this foundation working throughout the week.

## October 14 — navigation and accessibility

1. Add URL-backed navigation and browser back/forward support.
2. Add dedicated accessible names to repeated follow and comment controls.
3. Improve post-dialog focus restoration when opened from a grid.
4. Add keyboard previous/next navigation to story viewing.
5. Add automated component interaction checks for navigation.

## October 15 — richer discovery

1. Add a local recent-search history with individual removal.
2. Add creator bios to search results and searchable interests.
3. Add sort options for Explore (most liked / newest seed order).
4. Add a follow toggle to creator cards in discovery.
5. Add useful curated topic collections using existing licensed assets.

## October 16 — personal collections

1. Add named bookmark collections stored in the browser.
2. Add a move-to-collection dialog.
3. Add collection rename/delete with undo.
4. Add an inline edit flow for the user's own captions.
5. Add reversible deletion of local posts.

## October 17 — composer quality

1. Downscale uploaded photos before local storage.
2. Add a clear storage usage indicator and quota guidance.
3. Persist unfinished post drafts.
4. Add a post preview before sharing.
5. Add meaningful uploaded-image and draft regression tests.

## October 18 — feed refinements

1. Add a persistent hide-post action with undo.
2. Add a favorites-only creator feed.
3. Add expandable captions for long local posts.
4. Add local timestamps and correct relative-time formatting for new posts.
5. Add feed filtering regression coverage.

## October 19 — resilience and privacy

1. Add a retry action to failed images.
2. Make saved demo state exportable as a local JSON download.
3. Add validated import of an exported demo state.
4. Add cross-tab state synchronization with a conflict-safe update strategy.
5. Add schema versioning and migration tests for persisted state.

## October 20 — release polish

1. Add local data reset with a clear confirmation and recovery option.
2. Improve empty states based on search filters and following state.
3. Audit and fix contrast and keyboard focus across light/dark themes.
4. Audit mobile overflow and touch targets; fix observed defects.
5. Run final build/test/browser checks, update release documentation, and stop the automation.

Do not add a real backend, accounts, tracking, paid image APIs, or a deployment without a separate user request. Current profiles and message delivery are intentionally local demonstrations. Preserve image attribution. Original stock-photo creators are not the fictional profile owners.
