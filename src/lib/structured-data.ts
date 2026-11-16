import { site, skills } from "@/data/site";

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
    description: site.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location.locality,
      addressCountry: site.location.countryCode,
    },
    knowsAbout: [...skills, "Basketball", "Film photography"],
    memberOf: {
      "@type": "SportsOrganization",
      name: site.club.name,
      url: site.club.url,
      sport: "Basketball",
    },
    sameAs: [site.links.github, site.links.linkedin],
  };
}
