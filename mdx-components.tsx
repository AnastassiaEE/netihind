import type { MDXComponents } from 'mdx/types';
import Check from '@/components/ui/icons/Check';

const components = {
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-[calc(1.375rem+1.5vw)] md:text-4xl font-extrabold mb-10">{children}</h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-2xl font-extrabold mb-4 mt-0">{children}</h2>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className=" text-muted-dark [&:not(:last-child)]:mb-6 mt-0"> {children} </p>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="list-none [&:not(:last-child)]:mb-6">{children}</ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="list-none [&:not(:last-child)]:mb-6"> {children}</ol>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="text-muted-dark mb-1">
      <Check size="small" />
      {children}
    </li>
  ),
  table: ({ children }: { children: React.ReactNode }) => (
    <table className="table-auto border border-collapse border-muted-light text-muted-dark [&:not(:last-child)]:mb-6">
      {children}
    </table>
  ),
  th: ({ children }: { children: React.ReactNode }) => (
    <th className="border border-muted-light p-20" style={{ padding: '10px' }}>
      {children}
    </th>
  ),
  td: ({ children }: { children: React.ReactNode }) => (
    <td className="border border-muted-light" style={{ padding: '10px' }}>
      {children}
    </td>
  ),
  a: ({ children }: { children: React.ReactNode }) => (
    <a href={`mailto:${children}`} className="hover:text-primary transition-colors font-semibold">
      {children}
    </a>
  ),
  strong: ({ children }: { children: React.ReactNode }) => (
    <strong className="text-black font-bold">{children}</strong>
  ),
};

export default components;

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    components,
    ...components,
  };
}
