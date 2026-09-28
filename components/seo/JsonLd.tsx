/**
 * Renders a pre-generated JSON-LD `schema_markup` value (from our own
 * backend — operator/agent authored structured data, not user input) as a
 * `<script type="application/ld+json">` tag.
 *
 * Guards with JSON.parse so malformed JSON-LD stored in the DB can never
 * break the page: on a parse failure it logs a warning and renders nothing.
 */
export default function JsonLd({ data }: { data?: string | null }) {
  if (!data) return null;

  let parsed: unknown;
  try {
    parsed = JSON.parse(data);
  } catch (error) {
    console.warn("JsonLd: skipping invalid schema_markup JSON", error);
    return null;
  }

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(parsed) }}
    />
  );
}
