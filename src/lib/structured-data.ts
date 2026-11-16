import { site } from "@/data/site";

/** schema.org Person for the homepage — links the site to the owner's profiles. */
export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${site.links.site}/#person`,
    name: site.name,
    url: site.links.site,
    image: new URL(site.image, site.links.site).href,
    jobTitle: site.jobTitle,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location.locality,
      addressCountry: site.location.countryCode,
    },
    sameAs: [site.links.github, site.links.linkedin],
  };
}
