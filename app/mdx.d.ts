interface Frontmatter {
  title: string;
}

interface Content {}

declare module '*.mdx' {
  const MDXComponent: (props: any) => JSX.Element;
  export default MDXComponent;

  export const frontmatter: Frontmatter;
}
