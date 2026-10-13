// Refresh a small, attributed media catalog from two public, keyless APIs.
import { writeFile } from "node:fs/promises";
const ids = [
  1015, 1016, 1025, 1040, 1036, 1060, 1080, 1039, 1050, 1024, 1018, 1043, 1056,
  1067, 1074, 1084,
];
const media = [];
async function json(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(15000) });
  if (!response.ok) throw new Error(`${response.status}: ${url}`);
  return response.json();
}
for (const id of ids) {
  const item = await json(`https://picsum.photos/id/${id}/info`);
  media.push({
    id: `photo-${id}`,
    image: `https://picsum.photos/id/${id}/900/900`,
    author: item.author,
    source: item.url,
    provider: "Unsplash via Lorem Picsum",
    license: "Unsplash License",
    licenseUrl: "https://unsplash.com/license",
  });
}
for (const id of [436535, 436528, 436121, 437853]) {
  const item = await json(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`,
  );
  if (!item.isPublicDomain || !item.primaryImageSmall)
    throw new Error(`Artwork ${id} is unavailable or not public domain`);
  media.push({
    id: `art-${item.objectID}`,
    image: item.primaryImageSmall,
    author: item.artistDisplayName || "Unknown artist",
    title: item.title,
    source: item.objectURL,
    provider: "The Metropolitan Museum of Art",
    license: "CC0 · Public domain",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
  });
}
await writeFile(
  new URL("../src/data/media.json", import.meta.url),
  JSON.stringify(media, null, 2) + "\n",
);
console.log(`Saved ${media.length} credited images from two APIs.`);
