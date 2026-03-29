import { render, screen } from "@testing-library/react";
import { LinkExternal } from "@/components/link-external";

describe("LinkExternal", () => {
  it("renders a screen-reader-only new-tab hint", () => {
    render(<LinkExternal href="https://example.com">Example</LinkExternal>);
    expect(
      screen.getByText("(opens in new tab)", { exact: false }),
    ).toBeInTheDocument();
  });
});
