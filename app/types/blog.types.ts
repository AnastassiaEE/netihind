export type BlogPost = {
  title: string | null;
  slug: string;
  date: string;
  excerpt: string | null;
  content: string | null;
  featuredImage: {
    node: {
      altText: string;
      sourceUrl: string;
    };
  } | null;
};
