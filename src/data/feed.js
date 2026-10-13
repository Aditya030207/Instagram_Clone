import media from "./media.json";
export const users = [
  [
    "aditya.arora",
    "Aditya Arora",
    "Making things. Collecting moments.",
    "#d2dfce",
  ],
  ["maya.explores", "Maya Chen", "Taking the scenic route, always.", "#e5c4ad"],
  [
    "arjun.frames",
    "Arjun Kapoor",
    "A little light. A different perspective.",
    "#b4c9d3",
  ],
  [
    "olive.and.oak",
    "Olivia Brooks",
    "Slow mornings & everyday adventures.",
    "#cfcca2",
  ],
  [
    "noah.outside",
    "Noah Rivera",
    "Less screen time, more green time.",
    "#b1c8ba",
  ],
  [
    "studio.luna",
    "Luna Park",
    "Art, texture, and things that inspire.",
    "#d3bfdf",
  ],
  ["kai.wanders", "Kai Tanaka", "Postcards from everywhere.", "#b1c5dd"],
  ["ella.eats", "Ella Wilson", "Good food, better company.", "#e9c398"],
  [
    "leo.in.focus",
    "Leo Martins",
    "Finding stories in the ordinary.",
    "#c3b9ac",
  ],
  ["nia.creates", "Nia Williams", "Creating a little every day.", "#ddb7aa"],
  ["sam.sundays", "Sam Patel", "A weekend state of mind.", "#c0c6e0"],
  [
    "the.art.room",
    "The Art Room",
    "A daily pause for a little culture.",
    "#d6d3b6",
  ],
  ["zoe.fieldnotes", "Zoe Laurent", "Notes from the long way home.", "#b9d0c7"],
].map(([handle, name, bio, color], id) => ({
  id,
  handle,
  name,
  bio,
  color,
  initials: name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join(""),
}));
const captions = [
  [
    "Some places make you forget to check your phone. This is one of them. 🌿",
    "The great outdoors",
    "Nature",
  ],
  [
    "A little perspective, courtesy of the mountains. Taking the long way home.",
    "Off the beaten path",
    "Travel",
  ],
  [
    "No plans. Just a very good companion and a whole afternoon ahead. 🐾",
    "A perfect afternoon",
    "Everyday",
  ],
  [
    "Collecting places that feel like a deep breath.",
    "Weekend wanderings",
    "Travel",
  ],
  [
    "The best kind of blue. Saving this view for a rainy day.",
    "Somewhere peaceful",
    "Nature",
  ],
  [
    "Permission to slow down. Your next big idea can wait until after coffee. ☕",
    "The morning ritual",
    "Everyday",
  ],
  [
    "A small reminder that the simplest things are often the best.",
    "At the table",
    "Food",
  ],
  [
    "Following the sound of water, finding a little peace.",
    "Into the wild",
    "Nature",
  ],
  ["Out here, the only deadline is sunset.", "Chasing daylight", "Travel"],
  [
    "A small encounter that made the whole day better.",
    "Field notes",
    "Nature",
  ],
  [
    "Fresh air, an open trail, and absolutely no rush.",
    "The scenic route",
    "Nature",
  ],
  [
    "A postcard to my future self: make more time for this.",
    "A world to discover",
    "Travel",
  ],
  [
    "Look up. There is always something worth noticing.",
    "Between destinations",
    "Photography",
  ],
  ["Ordinary moments, extraordinary light.", "Through my lens", "Photography"],
  [
    "A moment of stillness in a world that never stops.",
    "A quiet corner",
    "Everyday",
  ],
  [
    "The kind of view that stays with you long after you leave.",
    "Little escapes",
    "Travel",
  ],
];
export const initialPosts = media.map((asset, i) => ({
  id: asset.id,
  userId: asset.id.startsWith("art-") ? 11 : 1 + (i % 12),
  caption:
    captions[i]?.[0] ||
    `Today's inspiration: ${asset.title}. A little time with art is always time well spent. 🎨`,
  location: captions[i]?.[1] || "Metropolitan Museum of Art",
  category: captions[i]?.[2] || "Art",
  alt: asset.title || `${captions[i]?.[1]} — photograph by ${asset.author}`,
  likes: 128 + ((i * 379) % 2400),
  time: `${i + 1}h`,
  ...asset,
}));
export const categories = [
  "All",
  "Nature",
  "Travel",
  "Photography",
  "Art",
  "Food",
  "Everyday",
];
