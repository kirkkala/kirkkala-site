import { render, screen } from "@testing-library/react";
import { BasketballSection } from "@/components/sections/basketball-section";

/** Accordion panel is inert when closed; include hidden nodes for structure checks. */
const hidden = { hidden: true } as const;

describe("BasketballSection product cards", () => {
  it("renders product titles as headings and external links in the card footer", () => {
    render(<BasketballSection />);

    expect(
      screen.getByRole("heading", {
        level: 3,
        name: /eLSA → MyClub/i,
        ...hidden,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: /Home game officials/i,
        ...hidden,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Club tooling · converter", { exact: true }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Club tooling · operations", { exact: true }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", {
        name: /elsa-myclub\.hnmky\.fi \(opens in new tab\)/i,
        ...hidden,
      }),
    ).toHaveAttribute("href", "https://elsa-myclub.hnmky.fi/");

    const elsaGithub = screen.getByRole("link", {
      name: /kirkkala\/elsa-myclub \(opens in new tab\)/i,
      ...hidden,
    });
    expect(elsaGithub).toHaveAttribute(
      "href",
      "https://github.com/kirkkala/elsa-myclub",
    );
    expect(elsaGithub).toHaveAttribute("target", "_blank");
    expect(elsaGithub).toHaveAttribute("rel", "noopener");

    expect(
      screen.getByRole("link", {
        name: /kirkkala\/homegame-officials \(opens in new tab\)/i,
        ...hidden,
      }),
    ).toHaveAttribute("href", "https://github.com/kirkkala/homegame-officials");
  });

  it("includes nested links to eLSA and MyClub in the first product blurb", () => {
    render(<BasketballSection />);

    expect(
      screen.getByRole("link", {
        name: "eLSA (opens in new tab)",
        ...hidden,
      }),
    ).toHaveAttribute("href", "https://elsa.basket.fi");

    expect(
      screen.getByRole("link", {
        name: "MyClub (opens in new tab)",
        ...hidden,
      }),
    ).toHaveAttribute("href", "https://www.myclub.fi/");
  });
});
