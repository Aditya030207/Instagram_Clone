import media from "./media.json";
import avatars from "./avatars.json";
import profilePhoto from "../../assets/profile.png";
export const users = [
  ["adiarora860", "Aditya Arora", "", profilePhoto],
  ["riya.s_", "Riya", "", avatars[0].image],
  ["arjun_19", "Arjun", "pune", avatars[1].image],
  ["sid.jpg", "Siddharth", "", media[2].image],
  ["tanvi.k", "Tanvi", "", avatars[2].image],
  ["manav_07", "Manav", "", avatars[3].image],
  ["ishaa.x", "Isha", "", avatars[4].image],
  ["kabir.png", "Kabir", "", media[5].image],
  ["ananya.r", "Ananya", "", avatars[5].image],
  ["rohan.exe", "Rohan", "", media[9].image],
  ["neha__", "Neha", "", null],
  [
    "art.archive",
    "Art archive",
    "Art from open-access collections.",
    media[17].image,
  ],
  ["dhruv.jpeg", "Dhruv", "", media[12].image],
].map(([handle, name, bio, avatar], id) => ({
  id,
  handle,
  name,
  bio,
  avatar,
  color: "#31353b",
  initials: name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join(""),
}));
const captions = [
  ["worth the climb", "", "Travel"],
  ["from the camera roll", "", "Travel"],
  ["bro has no idea what rent is 😭", "", "Everyday"],
  ["a few from the weekend", "", "Travel"],
  ["still thinking about this view", "", "Nature"],
  ["coffee first", "", "Everyday"],
  ["these were gone in 5 mins", "", "Food"],
  ["sound on. actually never mind it’s a photo", "", "Nature"],
  ["need another trip soon", "", "Travel"],
  ["look who showed up", "", "Nature"],
  ["took the wrong turn. not complaining", "", "Nature"],
  ["last one from this trip i promise", "", "Travel"],
  ["no caption today", "", "Photography"],
  ["17 missed calls for this shot", "", "Photography"],
  ["sunday", "", "Everyday"],
  ["posting this before i forget again", "", "Travel"],
];
const times = [
  "13h",
  "2h",
  "38m",
  "5h",
  "1d",
  "7h",
  "2d",
  "19h",
  "4h",
  "1d",
  "3d",
  "9h",
  "2d",
  "6h",
  "1d",
  "12h",
  "3d",
  "1d",
  "8h",
  "2d",
];
const likes = [
  846, 219, 1284, 76, 412, 53, 308, 94, 1720, 61, 528, 187, 39, 260, 115, 704,
  938, 2104, 328, 573,
];
const order = [
  2, 5, 0, 3, 6, 1, 8, 17, 7, 4, 9, 13, 10, 18, 14, 12, 15, 16, 11, 19,
];
export const initialPosts = order.map((i) => {
  const asset = media[i];
  return {
    ...asset,
    id: asset.id,
    userId: asset.id.startsWith("art-") ? 11 : 1 + (i % 12),
    caption: captions[i]?.[0] || asset.title,
    location: captions[i]?.[1] || "",
    category: captions[i]?.[2] || "Art",
    alt: asset.title || `Photo by ${asset.author}`,
    likes: likes[i],
    time: times[i],
    image: asset.id.startsWith("photo-")
      ? asset.image.replace(
          "/900/900",
          `/900/${[1125, 675, 1125, 900, 675][i % 5]}`,
        )
      : asset.image,
  };
});
export { avatars };
