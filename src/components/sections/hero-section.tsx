import { site } from "@/data/site";

export function HeroSection() {
  return (
    <section className="hero-block">
      <p className="eyebrow">Hello world</p>
      <h1 className="title-hero">{site.name}</h1>
      <p className="prose-muted-lg">
        {site.tagline}
        <br />
        <span className="text-ink/80 text-sm">From Helsinki, Finland.</span>
      </p>
    </section>
  );
}
