import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { defaultState, readState, validateState } from "../src/state.js";
test("unavailable or corrupted storage starts safely", () => {
  assert.deepEqual(readState(null), defaultState);
  assert.deepEqual(
    readState({
      getItem() {
        throw Error("denied");
      },
    }),
    defaultState,
  );
  assert.deepEqual(readState({ getItem: () => "{broken" }), defaultState);
});
test("user interactions survive a storage round trip", () => {
  const saved = {
    ...defaultState,
    liked: ["photo-1015"],
    saved: ["photo-1016"],
    following: [1, 4],
    comments: { "photo-1015": ["A beautiful view!"] },
    messages: { 1: ["Hello"] },
    bio: "Making things",
    theme: "dark",
  };
  assert.deepEqual(readState({ getItem: () => JSON.stringify(saved) }), saved);
});
test("old or malformed data cannot poison arrays or object collections", () => {
  const s = validateState({
    liked: [null, 1, "valid"],
    following: [999, -1, 2],
    comments: { x: null, y: ["ok", {}] },
    messages: { 1: "oops" },
    posts: [{ id: "bad", image: "javascript:alert(1)", caption: "bad" }],
  });
  assert.deepEqual(s.liked, ["valid"]);
  assert.deepEqual(s.following, [2]);
  assert.deepEqual(s.comments, { y: ["ok"] });
  assert.deepEqual(s.messages, {});
  assert.deepEqual(s.posts, []);
});
test("catalog contains distinct images, source credits and two providers", () => {
  const media = JSON.parse(
    readFileSync(new URL("../src/data/media.json", import.meta.url)),
  );
  assert.equal(media.length, 20);
  assert.equal(new Set(media.map((p) => p.id)).size, 20);
  assert.equal(new Set(media.map((p) => p.provider)).size, 2);
  for (const asset of media) {
    assert.match(asset.image, /^https:\/\//);
    assert.match(asset.source, /^https:\/\//);
    assert.match(asset.licenseUrl, /^https:\/\//);
    assert.ok(asset.author);
    if (asset.id.startsWith("art-"))
      assert.match(asset.license, /Public domain/);
  }
});

test("malformed post fields are normalized before rendering", () => {
  const { posts } = validateState({
    posts: [
      {
        id: "local-test",
        caption: "hello",
        image: "https://example.com/image.jpg",
        location: { bad: true },
        likes: null,
        source: "javascript:alert(1)",
      },
    ],
  });
  assert.equal(posts[0].location, "A moment of your own");
  assert.equal(posts[0].likes, 0);
  assert.equal(posts[0].source, "#");
});

// Missing/invalid preferences keep the requested dark default; an explicit
// choice must survive the same storage read used during application startup.
test("appearance defaults to dark and preserves either saved choice", () => {
  assert.equal(readState({ getItem: () => null }).theme, "dark");
  for (const theme of [undefined, null, "sepia", 0, {}]) {
    assert.equal(readState({ getItem: () => JSON.stringify({ theme }) }).theme, "dark");
  }
  for (const theme of ["light", "dark"]) {
    const saved = { ...defaultState, theme };
    assert.equal(readState({ getItem: () => JSON.stringify(saved) }).theme, theme);
  }
});
