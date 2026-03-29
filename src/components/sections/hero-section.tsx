import { site } from "@/data/site";

export function HeroSection() {
  return (
    <section className="hero-block">
      <h1 className="title-hero m-0 flex flex-col gap-1">
        <span className="eyebrow block font-sans">Hello world, I am</span>
        <span className="block">{site.name}</span>
      </h1>
      <p className="text-ink/80 text-sm mt-0">From Helsinki, Finland.</p>
      <p className="prose-muted-lg">
        Web development and tech delivery at work. Basketball, cycling,
        photography and a dad when not at work.
      </p>
    </section>
  );
}
