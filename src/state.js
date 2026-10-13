export const storageKey = "instagram-demo-v2";
export const defaultState = {
  liked: [],
  saved: [],
  following: [1, 2, 4],
  comments: {},
  posts: [],
  messages: {},
  theme: "light",
  bio: "",
  read: false,
};
export function validateState(value) {
  if (!value || typeof value !== "object") return { ...defaultState };
  return {
    liked: Array.isArray(value.liked)
      ? value.liked.filter((x) => typeof x === "string")
      : [],
    saved: Array.isArray(value.saved)
      ? value.saved.filter((x) => typeof x === "string")
      : [],
    following: Array.isArray(value.following)
      ? value.following.filter((x) => Number.isInteger(x) && x > 0 && x < 13)
      : [1, 2, 4],
    comments:
      value.comments && typeof value.comments === "object"
        ? Object.fromEntries(
            Object.entries(value.comments)
              .filter(([, v]) => Array.isArray(v))
              .map(([k, v]) => [k, v.filter((x) => typeof x === "string")]),
          )
        : {},
    posts: Array.isArray(value.posts)
      ? value.posts
          .filter(
            (p) =>
              p &&
              typeof p.id === "string" &&
              typeof p.caption === "string" &&
              typeof p.image === "string" &&
              (/^https:\/\//.test(p.image) ||
                /^data:image\/(png|jpeg|webp);base64,/.test(p.image)),
          )
          .map((p) => ({
            id: p.id,
            caption: p.caption,
            image: p.image,
            userId: 0,
            likes: Number.isFinite(p.likes) && p.likes >= 0 ? p.likes : 0,
            alt: typeof p.alt === "string" ? p.alt : "Your shared photo",
            location:
              typeof p.location === "string"
                ? p.location
                : "A moment of your own",
            category: typeof p.category === "string" ? p.category : "Everyday",
            time: typeof p.time === "string" ? p.time : "recently",
            author: typeof p.author === "string" ? p.author : "You",
            provider:
              typeof p.provider === "string" ? p.provider : "Your upload",
            source:
              typeof p.source === "string" && p.source.startsWith("https://")
                ? p.source
                : "#",
          }))
      : [],
    messages:
      value.messages && typeof value.messages === "object"
        ? Object.fromEntries(
            Object.entries(value.messages)
              .filter(([, v]) => Array.isArray(v))
              .map(([k, v]) => [k, v.filter((x) => typeof x === "string")]),
          )
        : {},
    theme: value.theme === "dark" ? "dark" : "light",
    bio: typeof value.bio === "string" ? value.bio : "",
    read: value.read === true,
  };
}
export function readState(storage) {
  try {
    return validateState(JSON.parse(storage.getItem(storageKey)));
  } catch {
    return { ...defaultState };
  }
}
