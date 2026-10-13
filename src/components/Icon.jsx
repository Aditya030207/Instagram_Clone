import React from "react";
const paths = {
  Instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  Home: (
    <>
      <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z" />
    </>
  ),
  Search: (
    <>
      <circle cx="10.5" cy="10.5" r="7.5" />
      <path d="m16 16 5 5" />
    </>
  ),
  Explore: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m16 8-2 6-6 2 2-6Z" />
    </>
  ),
  Reels: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="M3 9h18M8 3l4 6m3-6 4 6m-9 3 5 3-5 3Z" />
    </>
  ),
  Messages: (
    <>
      <path d="m21 3-7 18-4-7-7-4Z M10 14 21 3" />
    </>
  ),
  Notifications: (
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0l-1 1-1-1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
  ),
  Create: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <path d="M12 7v10m-5-5h10" />
    </>
  ),
  Saved: <path d="M5 3h14v18l-7-5-7 5Z" />,
  Profile: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21v-2a8 8 0 0 1 16 0v2" />
    </>
  ),
  More: <path d="M4 6h16M4 12h16M4 18h16" />,
  Comment: <path d="M21 11.5a9 9 0 1 0-5 8L21 21l-1.5-5a9 9 0 0 0 1.5-4.5Z" />,
  Close: <path d="m6 6 12 12M6 18 18 6" />,
  Arrow: <path d="m9 5 7 7-7 7" />,
  Plus: <path d="M12 5v14M5 12h14" />,
  Grid: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </>
  ),
  Check: <path d="m5 12 4 4L19 6" />,
  Sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1 1m12 12 1 1M5 19l1-1M18 6l1-1" />
    </>
  ),
};
export default function Icon({ name, size = 23, filled = false }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] || paths.Grid}
    </svg>
  );
}
