import test from "node:test";
import assert from "node:assert/strict";
import { matchesSearch } from "../src/search.js";

test("pasted searches ignore surrounding whitespace and case", () => {
  assert.equal(matchesSearch("  RIYA.S_ \n", "riya.s_", "Riya Sharma"), true);
  assert.equal(matchesSearch("  Riya Sharma ", "a quiet morning", "riya.s_", "Riya Sharma"), true);
  assert.equal(matchesSearch("arjun", "riya.s_", "Riya Sharma"), false);
});

test("blank searches keep all posts, including single-word captions", () => {
  for (const query of ["", " ", "\t\n "]) {
    assert.equal(matchesSearch(query, "hello"), true);
    assert.equal(matchesSearch(query, undefined, ""), true);
  }
});

test("missing metadata is not searchable as literal undefined", () => {
  assert.equal(matchesSearch("undefined", "morning", undefined), false);
  assert.equal(matchesSearch("mountains", "Morning in the mountains", undefined), true);
});
