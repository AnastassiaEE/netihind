import { SchemaOrgGraph } from '@/types/schema.types';

export default function JsonLd({ data }: { data: SchemaOrgGraph }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
