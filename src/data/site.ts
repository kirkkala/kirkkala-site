import type { StaticImageData } from "next/image";
import americaMittens from "@/assets/photography/america-mittens.jpg";
import americaMittensColor from "@/assets/photography/america-mittens-color.jpg";
import deathValleyTree from "@/assets/photography/death-valley-tree.jpg";
import icelandMount from "@/assets/photography/iceland-mount.jpg";
import icelandSkogafoss from "@/assets/photography/iceland-skogafoss.jpg";
import irelandTower from "@/assets/photography/ireland-tower.jpg";
import murica from "@/assets/photography/murica.jpg";
import newYork from "@/assets/photography/new-york.jpg";
import nuuksioUpsideDown from "@/assets/photography/nuuksio-upside-down.jpg";
import panamaBasketball from "@/assets/photography/panama-basketball.jpg";
import pinholeGreenwich from "@/assets/photography/pinhole-greenwich.jpg";
import pinholeHasselblad from "@/assets/photography/pinhole-hasselblad.jpg";
import pinholeMylllyjarvi from "@/assets/photography/pinhole-mylllyjarvi.jpg";
import sfHawkhill from "@/assets/photography/sf-hawkhill.jpg";
import yosemite from "@/assets/photography/yosemite.jpg";

export const site = {
  name: "Timo Kirkkala",
  handle: "kirkkala",
  /** Search-result title; keep short. */
  title: "Timo Kirkkala – Developer, delivery lead & basketballer",
  /** Meta description / search snippet; keep around 140–155 characters. */
  description:
    "Helsinki-based software developer and technical delivery lead (Drupal, Next.js, web). Basketballer, HNMKY team manager, goofy nice guy.",
  jobTitle: "Señor developer, Technical delivery lead",
  image: "/timo-kirkkala.jpg",
  location: { locality: "Helsinki", countryCode: "FI" },
  club: { name: "HNMKY", url: "https://hnmky.fi" },
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

export type Photo = {
  image: StaticImageData;
  alt: string;
  caption?: string;
};

/** Add images to `src/assets/photography/`, import them above and list them here. */
export const photography: readonly Photo[] = (
  [
    {
      image: nuuksioUpsideDown,
      alt: "Nuuksio upside down",
      caption: "Nuuksio — 35mm",
    },
    {
      image: irelandTower,
      alt: "O'Brien's Tower, Ireland",
      caption: "O'Brien's Tower, Ireland — Medium format film",
    },
    {
      image: icelandMount,
      alt: "Iceland Mount",
      caption: "Iceland — Medium format film",
    },
    {
      image: icelandSkogafoss,
      alt: "Skógafoss, Iceland",
      caption: "Skógafoss, Iceland — Medium format film",
    },
    {
      image: newYork,
      alt: "New York City",
      caption: "New York — Medium format film",
    },
    {
      image: americaMittensColor,
      alt: "Mittens, Monument Valley America. Picture in color.",
      caption: "Monument Valley, Utah — Medium format film",
    },
    {
      image: americaMittens,
      alt: "Mittens, Monument Valley America. Picture in black and white.",
      caption: "Monument Valley, Utah — Medium format film",
    },
    {
      image: deathValleyTree,
      alt: "Tree in Death Valley America",
      caption: "Death Valley, California — Medium format film",
    },
    {
      image: murica,
      alt: "Murica",
      caption: "'Murica — Medium format film",
    },
    {
      image: sfHawkhill,
      alt: "San Francisco Hawkhill",
      caption:
        "Golden Gate from Hawk Hill, San Francisco, California — Medium format film",
    },
    {
      image: yosemite,
      alt: "Yosemite National Park",
      caption: "Yosemite National Park, California — Medium format film",
    },
    {
      image: panamaBasketball,
      alt: "Basketball court in Panama",
      caption: "Isla Bastimentos, Panama — Medium format film",
    },
    {
      image: pinholeHasselblad,
      alt: "Pinhole camera",
      caption:
        "My Hasselblad and a cardboard pinhole camera replica I made myself.",
    },
    {
      image: pinholeGreenwich,
      alt: "Greenwich Observatory",
      caption: "Greenwich Observatory, London — Pinhole photography",
    },
    {
      image: pinholeMylllyjarvi,
      alt: "Mylllyjärvi",
      caption: "Mylllyjärvi, Finland — Pinhole photography",
    },
  ] satisfies Photo[]
).map(({ image: { src, width, height }, ...photo }) => ({
  ...photo,
  // Static imports also carry a base64 `blurDataURL` (~1 KB each) that the gallery
  // doesn't use; drop it so it isn't serialized into the page for the client gallery.
  image: { src, width, height },
}));
