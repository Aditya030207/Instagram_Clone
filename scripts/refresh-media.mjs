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
const { data } = await json(
  "https://api.artic.edu/api/v1/artworks?ids=27992,28560,16571,20684&fields=id,title,artist_display,image_id,is_public_domain",
);
for (const item of data) {
  if (!item.is_public_domain || !item.image_id) continue;
  media.push({
    id: `art-${item.id}`,
    image: `https://www.artic.edu/iiif/2/${item.image_id}/full/843,/0/default.jpg`,
    author: item.artist_display,
    title: item.title,
    source: `https://www.artic.edu/artworks/${item.id}`,
    provider: "Art Institute of Chicago",
    license: "CC0 · Public domain",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
  });
}
await writeFile(
  new URL("../src/data/media.json", import.meta.url),
  JSON.stringify(media, null, 2) + "\n",
);
console.log(`Saved ${media.length} credited images from two APIs.`);
