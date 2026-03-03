export type SchemaOrgGraph = {
  '@context': 'https://schema.org';
  '@graph': Record<string, unknown>[];
};

export type Image = {
  url: string;
  width: number;
  height: number;
  alt: string;
};