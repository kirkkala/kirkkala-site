export const site = {
  name: "Timo Kirkkala",
  handle: "kirkkala",
  tagline: "I'm baby butcher taxidermy hexagon.",
  intro:
    "I'm baby butcher wolf air plant portland chillwave beard freegan. Man braid food truck everyday carry, venmo mustache intelligentsia af normcore hexagon succulents fixie",
  location: "Helsinki",
  links: {
    site: "https://kirkkala.com",
    github: "https://github.com/kirkkala",
    employer: "https://github.com/digitalist-se",
  },
} as const;

export const skills = [
  "TypeScript",
  "React",
  "Next.js",
  "Drupal",
  "PHP",
  "Docker",
  "Git",
  "Node.js",
  "APIs & integrations",
  "Delivery & mentoring",
] as const;

/** Add scans to `public/photography/` and list them here. Empty = placeholder frames. */
export const photography: readonly {
  src: string;
  alt: string;
  caption?: string;
}[] = [
  // {
  //   src: "/photography/photo.jpg",
  //   alt: "Alt",
  //   caption: "Caption",
  // },
];
