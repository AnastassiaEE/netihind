import type { MDXComponents } from 'mdx/types';
import Check from '@/components/ui/icons/Check';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    li: ({ children }) => <li><Check size="small" />{children}</li>,
    ...components,
  };
}
