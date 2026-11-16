/**
 * Renders a JSON-LD data block. `<` is escaped so string values can't close the
 * script tag early. Data blocks aren't executed, so CSP `script-src` doesn't apply.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: serialized JSON with `<` escaped
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
