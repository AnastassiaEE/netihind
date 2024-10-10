import type { MDXComponents } from 'mdx/types';
import Check from '@/components/ui/icons/Check';
import Image from 'next/image';
import React, { Children } from 'react';
import Pros from '@/components/ui/icons/Pros';
import Cons from '@/components/ui/icons/Cons';

const components = {
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-[calc(1.375rem+1.5vw)] md:text-4xl font-extrabold mb-10">{children}</h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-calc(1.275rem + 0.3vw) md:text-2xl font-extrabold mb-6">{children}</h2>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className=" text-muted-dark [&:not(:last-child)]:mb-6"> {children} </p>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="[&:not(:last-child)]:mb-6">{children}</ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="[&:not(:last-child)]:mb-6">{children}</ol>
  ),
  li: ({ children }: { children: React.ReactNode }) => {
    let childrenCopy = children;
    let icon = <Check size="small" />;
    const hasChildClassName = (className: string) => {
      return Children.toArray(childrenCopy).some(
        (child: any) => child.props?.className === className,
      );
    };
    const filterChildrenByClassName = (className: string) => {
      return Children.toArray(childrenCopy).filter(
        (child: any) => child.props?.className !== className,
      );
    };
    if (hasChildClassName('pros')) {
      childrenCopy = filterChildrenByClassName('pros');
      icon = <Pros size="small" />;
    } else if (hasChildClassName('cons')) {
      childrenCopy = filterChildrenByClassName('cons');
      icon = <Cons size="small" />;
    }
    return (
      <li className="text-muted-dark mb-1.5">
        {icon}
        {childrenCopy}
      </li>
    );
  },
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
  img: (props: any) => (
    <Image
      src={props.src}
      alt={props.alt}
      width={600}
      height={200}
      className="[&:not(:last-child)]:mb-6"
    />
  ),
};

export default components;

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    components,
    ...components,
  };
}
