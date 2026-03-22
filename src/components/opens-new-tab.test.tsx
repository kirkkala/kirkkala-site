import { render, screen } from "@testing-library/react";
import { OpensInNewTab } from "@/components/opens-new-tab";

describe("OpensInNewTab", () => {
  it("renders a screen-reader-only new-tab hint", () => {
    render(<OpensInNewTab />);
    expect(
      screen.getByText("(opens in new tab)", { exact: false }),
    ).toBeInTheDocument();
  });
});
