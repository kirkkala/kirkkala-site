import { render, screen } from "@testing-library/react";
import NotFound, { metadata } from "./not-found";

describe("not-found page", () => {
  it("exports metadata for the document title", () => {
    expect(metadata.title).toBe("Page not found");
  });

  it("renders 404 messaging and a home link", () => {
    render(<NotFound />);

    expect(screen.getByText("404")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: "Nothing here" }),
    ).toBeInTheDocument();

    const code = screen.getByText("undefined", { selector: "span" });
    expect(code).toHaveAttribute("translate", "no");

    const home = screen.getByRole("link", {
      name: "Take me home, this place is weird",
    });
    expect(home).toHaveAttribute("href", "/");
  });
});
