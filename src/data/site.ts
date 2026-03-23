export const site = {
  name: "Timo Kirkkala",
  handle: "kirkkala",
  tagline:
    "Web development and tech delivery at work. Basketball, cycling, nature, photography and a dad when not at work.",
  location: "Helsinki",
  links: {
    site: "https://kirkkala.com",
    github: "https://github.com/kirkkala",
    linkedin: "https://www.linkedin.com/in/timokirkkala/",
  },
} as const;

/** HNMKY / youth basketball tooling — linked from the Basketball section */
export const basketballLinks = {
  club: "https://hnmky.fi",
  elsaProduct: "https://elsa.basket.fi",
  myclub: "https://www.myclub.fi/",
  elsaMyclub: "https://github.com/kirkkala/elsa-myclub",
  homegameOfficials: "https://github.com/kirkkala/homegame-officials",
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
    src: "/photography/new-york.jpg",
    alt: "New York City",
    caption: "New York — Medium format",
  },
];
