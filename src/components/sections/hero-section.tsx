import { site } from "@/data/site";

export function HeroSection() {
  return (
    <section className="hero-block">
      <p className="eyebrow">Hello world</p>
      <h1 className="title-hero">{site.name}</h1>
      <p className="prose-muted-lg">
        {site.tagline} <span className="text-ink/80">{site.location}.</span>
      </p>
    </section>
  );
}
