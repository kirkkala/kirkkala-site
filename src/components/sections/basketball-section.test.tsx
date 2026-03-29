import { render, screen } from "@testing-library/react";
import { BasketballSection } from "@/components/sections/basketball-section";
import { basketballLinks } from "@/data/site";

describe("BasketballSection product cards", () => {
  it("renders two product titles as external links with repo-style content cards", () => {
    render(<BasketballSection />);

    const elsa = screen.getByRole("link", { name: /eLSA → MyClub/i });
    expect(elsa).toHaveAttribute("href", basketballLinks.elsaMyclub);
    expect(elsa).toHaveAttribute("target", "_blank");
    expect(elsa).toHaveAttribute("rel", "noopener noreferrer");

    const officials = screen.getByRole("link", {
      name: /Home game officials/i,
    });
    expect(officials).toHaveAttribute(
      "href",
      basketballLinks.homegameOfficials,
    );

    expect(
      screen.getByText("Club tooling · converter", { exact: true }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Club tooling · operations", { exact: true }),
    ).toBeInTheDocument();
  });

  it("includes nested links to eLSA and MyClub in the first product blurb", () => {
    render(<BasketballSection />);

    expect(
      screen.getByRole("link", { name: "eLSA (opens in new tab)" }),
    ).toHaveAttribute("href", basketballLinks.elsaProduct);

    expect(
      screen.getByRole("link", { name: "MyClub (opens in new tab)" }),
    ).toHaveAttribute("href", basketballLinks.myclub);
  });
});
