import { site } from "@/data/site";

export function HeroSection() {
  return (
    <section className="hero-block">
      <p className="eyebrow">Hello world!</p>
      <h1 className="title-hero m-0">{site.name}</h1>
      <p className="text-ink/80 text-sm mt-0">From Helsinki, Finland.</p>
      <p className="prose-muted-lg">
        Web development and tech delivery at work. Basketball, cycling, nature
        and a dad when not at work.
      </p>
    </section>
  );
}
