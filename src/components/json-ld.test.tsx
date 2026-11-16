import { render } from "@testing-library/react";
import { JsonLd } from "@/components/json-ld";

describe("JsonLd", () => {
  it("renders a JSON-LD script that parses back to the input", () => {
    const data = { "@type": "Person", name: "Señor </script><b>" };
    const { container } = render(<JsonLd data={data} />);

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(script).not.toBeNull();
    expect(script?.innerHTML).not.toContain("</script>");
    expect(JSON.parse(script?.textContent ?? "")).toEqual(data);
  });
});
