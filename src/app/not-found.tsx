import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="content-shell main-column">
        <div className="hero-block max-w-2xl py-8 sm:py-12">
          <p className="eyebrow">404</p>
          <h1 className="title-hero m-0">Nothing here</h1>
          <p className="prose-muted-lg mt-4">
            This URL resolved to{" "}
            <span className="inline-code" translate="no">
              undefined
            </span>
            . Could be a typo, a dead bookmark, or the page eloped with a
            redirect—hard to say without logs.
          </p>
          <p className="prose-muted-constrained mt-4">
            If you were testing my error handling: congratulations, it works.
          </p>
          <p className="mt-10">
            <Link href="/" className="link-accent">
              Take me home, this place is weird
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
