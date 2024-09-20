import type { MDXComponents } from 'mdx/types';
import Check from '@/components/ui/icons/Check';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-[calc(1.375rem+1.5vw)] md:text-4xl font-extrabold mb-10">{children}</h1>
    ),
    h2: ({ children }) => <h2 className="text-2xl font-extrabold mb-4 mt-0">{children}</h2>,
    p: ({ children }) => (
      <p className=" text-muted-dark [&:not(:last-child)]:mb-6 mt-0"> {children} </p>
    ),
    ul: ({ children }) => <ul className="list-none [&:not(:last-child)]:mb-6">{children}</ul>,
    ol: ({ children }) => <ol className="list-none [&:not(:last-child)]:mb-6"> {children}</ol>,
    li: ({ children }) => (
      <li className="text-muted-dark mb-1">
        <Check size="small" />
        {children}
      </li>
    ),
    table: ({ children }) => (
      <table className="table-auto border border-collapse border-muted-light text-muted-dark [&:not(:last-child)]:mb-6">
        {children}
      </table>
    ),
    th: ({ children }) => (
      <th className="border border-muted-light p-20" style={{ padding: '10px' }}>
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border border-muted-light" style={{ padding: '10px' }}>
        {children}
      </td>
    ),
    a: ({ children }) => (
      <a href={`mailto:${children}`} className="hover:text-primary transition-colors font-semibold">
        {children}
      </a>
    ),
    strong: ({ children }) => <strong className="text-black font-bold">{children}</strong>,
    ...components,
  };
}
