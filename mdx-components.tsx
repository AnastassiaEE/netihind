import Check from '@/components/ui/icons/Check';
import Image from 'next/image';
import React, { Children } from 'react';
import Pros from '@/components/ui/icons/Pros';
import Cons from '@/components/ui/icons/Cons';
import { H1, H2 } from '@/components/ui/headings/RestPageHeadings';

type ChildWithClassNameProps = { className?: string };
type MdxImgProps = { src: string; alt: string };

const isElementWithClassName = (child: React.ReactNode) =>
  React.isValidElement<ChildWithClassNameProps>(child);

const components = {
  h1: ({ children }: { children: React.ReactNode }) => <H1>{children}</H1>,
  h2: ({ children }: { children: React.ReactNode }) => <H2>{children}</H2>,
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="not-last:mb-6"> {children} </p>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="not-last:mb-6">{children}</ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="not-last:mb-6">{children}</ol>
  ),
  li: ({ children }: { children: React.ReactNode }) => {
    let childrenCopy = children;
    let icon = <Check size="small" className="align-sub" />;
    const hasChildClassName = (className: string) => {
      return Children.toArray(childrenCopy).some(
        (child) =>
          isElementWithClassName(child) && child.props.className === className,
      );
    };
    const filterChildrenByClassName = (className: string) => {
      return Children.toArray(childrenCopy).filter(
        (child) =>
          !isElementWithClassName(child) || child.props.className !== className,
      );
    };
    if (hasChildClassName('pros')) {
      childrenCopy = filterChildrenByClassName('pros');
      icon = <Pros size="small" className="align-sub" />;
    } else if (hasChildClassName('cons')) {
      childrenCopy = filterChildrenByClassName('cons');
      icon = <Cons size="small" className="align-sub" />;
    }
    return (
      <li className="text-muted-dark not-last:mb-1.5">
        {icon}
        {childrenCopy}
      </li>
    );
  },
  table: ({ children }: { children: React.ReactNode }) => (
    <table className="border-muted-light text-muted-dark table-auto border-collapse border not-last:mb-6">
      {children}
    </table>
  ),
  th: ({ children }: { children: React.ReactNode }) => (
    <th className="border-muted-light border" style={{ padding: '10px' }}>
      {children}
    </th>
  ),
  td: ({ children }: { children: React.ReactNode }) => (
    <td className="border-muted-light border" style={{ padding: '10px' }}>
      {children}
    </td>
  ),
  a: ({ children }: { children: React.ReactNode }) => (
    <a
      href={`mailto:${children}`}
      className="hover:text-primary font-semibold transition-colors"
    >
      {children}
    </a>
  ),
  strong: ({ children }: { children: React.ReactNode }) => (
    <strong className="font-bold text-black">{children}</strong>
  ),
  img: (props: MdxImgProps) => (
    <Image
      src={props.src}
      alt={props.alt}
      width={600}
      height={200}
      className="not-last:mb-6"
    />
  ),
};

export default components;
