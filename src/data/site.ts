export const site = {
  name: "Timo Kirkkala",
  handle: "kirkkala",
  tagline: "Kirkkala is a nice guy and software engineer.",
  location: "Helsinki",
  links: {
    site: "https://kirkkala.com",
    github: "https://github.com/kirkkala",
    linkedin: "https://www.linkedin.com/in/timokirkkala/",
  },
} as const;

export const skills = [
  "Drupal",
  "PHP",
  "TypeScript",
  "React",
  "Next.js",
  "Docker",
  "Git",
  "Node.js",
  "Elasticsearch",
  "APIs & integrations",
  "Delivery & mentoring",
  "Agile",
  "SCRUM master",
] as const;

/** Add images to `public/photography/` and list them here. */
export const photography: readonly {
  src: string;
  alt: string;
  caption?: string;
}[] = [
  {
    src: "/photography/nuuksio-upside-down.jpg",
    alt: "Nuuksio upside down",
    caption: "Nuuksio — 35mm",
  },
  {
    src: "/photography/ireland-tower.jpg",
    alt: "O'Brien's Tower, Ireland",
    caption: "O'Brien's Tower, Ireland — Medium format film",
  },
  {
    src: "/photography/iceland-mount.jpg",
    alt: "Iceland Mount",
    caption: "Iceland — Medium format film",
  },
  {
    src: "/photography/iceland-skogafoss.jpg",
    alt: "Skógafoss, Iceland",
    caption: "Skógafoss, Iceland — Medium format film",
  },
  {
    src: "/photography/new-york.jpg",
    alt: "New York City",
    caption: "New York — Medium format film",
  },
  {
    src: "/photography/america-mittens-color.jpg",
    alt: "Mittens, Monument Valley America. Picture in color.",
    caption: "Monument Valley, Utah — Medium format film",
  },
  {
    src: "/photography/america-mittens.jpg",
    alt: "Mittens, Monument Valley America. Picture in black and white.",
    caption: "Monument Valley, Utah — Medium format film",
  },
  {
    src: "/photography/death-valley-tree.jpg",
    alt: "Tree in Death Valley America",
    caption: "Death Valley, California — Medium format film",
  },
  {
    src: "/photography/murica.jpg",
    alt: "Murica",
    caption: "'Murica — Medium format film",
  },
  {
    src: "/photography/sf-hawkhill.jpg",
    alt: "San Francisco Hawkhill",
    caption:
      "Golden Gate from Hawk Hill, San Francisco, California — Medium format film",
  },
  {
    src: "/photography/yosemite.jpg",
    alt: "Yosemite National Park",
    caption: "Yosemite National Park, California — Medium format film",
  },
  {
    src: "/photography/panama-basketball.jpg",
    alt: "Basketball court in Panama",
    caption: "Isla Bastimentos, Panama — Medium format film",
  },
  {
    src: "/photography/pinhole-hasselblad.jpg",
    alt: "Pinhole camera",
    caption:
      "My Hasselblad and a cardboard pinhole camera replica I made myself.",
  },
  {
    src: "/photography/pinhole-greenwich.jpg",
    alt: "Greenwich Observatory",
    caption: "Greenwich Observatory, London — Pinhole photography",
  },
  {
    src: "/photography/pinhole-mylllyjarvi.jpg",
    alt: "Mylllyjärvi",
    caption: "Mylllyjärvi, Finland — Pinhole photography",
  },
] as const;
