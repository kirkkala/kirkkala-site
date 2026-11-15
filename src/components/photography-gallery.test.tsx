import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PhotographyGallery } from "@/components/photography-gallery";
import type { Photo } from "@/data/site";

const photos: Photo[] = Array.from({ length: 15 }, (_, i) => ({
  image: { src: `/photo-${i}.jpg`, width: 800, height: 600 },
  alt: `Photo ${i}`,
}));

describe("PhotographyGallery", () => {
  it("shows six photos, loads six more per click, then hides the button", async () => {
    const user = userEvent.setup();
    render(<PhotographyGallery photos={photos} />);

    expect(screen.getAllByRole("listitem")).toHaveLength(6);
    expect(screen.getByRole("status")).toHaveTextContent("Showing 6 of 15");

    await user.click(screen.getByRole("button", { name: "Load more photos" }));
    expect(screen.getAllByRole("listitem")).toHaveLength(12);
    expect(screen.getByRole("status")).toHaveTextContent("Showing 12 of 15");

    await user.click(screen.getByRole("button", { name: "Load more photos" }));
    expect(screen.getAllByRole("listitem")).toHaveLength(15);
    expect(
      screen.queryByRole("button", { name: /Load more/ }),
    ).not.toBeInTheDocument();
  });
});
