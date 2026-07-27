/**
 * Renders a JSON-LD structured-data block. Server-only (no hooks, no browser
 * APIs), so it never participates in hydration and can be rendered from any
 * Server Component. `<` is escaped to `\\u003c` so a string value containing
 * `</script>` can never break out of the script tag; this doesn't change the
 * parsed JSON in any way. Produces no visible output.
 */
export function JsonLd({ data }: { data: unknown }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
