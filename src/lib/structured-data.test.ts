import { site } from "@/data/site";
import { personJsonLd } from "@/lib/structured-data";

describe("personJsonLd", () => {
  it("describes the site owner as a schema.org Person", () => {
    const data = personJsonLd();

    expect(data["@context"]).toBe("https://schema.org");
    expect(data["@type"]).toBe("Person");
    expect(data.name).toBe(site.name);
    expect(data.url).toBe(site.links.site);
    expect(data.jobTitle).toBe(site.jobTitle);
    expect(data.image).toBe("https://kirkkala.com/timo-kirkkala.webp");
  });

  it("links to GitHub and LinkedIn via sameAs", () => {
    expect(personJsonLd().sameAs).toEqual([
      site.links.github,
      site.links.linkedin,
    ]);
  });
});
