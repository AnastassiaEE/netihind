'use client';

import { tv } from 'tailwind-variants';

export default function PackageFeature({
  direction = 'row',
  children,
}: {
  direction?: 'row' | 'col';
  children: React.ReactNode;
}) {
  const featureClasses = tv({
    base: 'flex flex-wrap items-center font-medium uppercase text-muted-dark',
    variants: {
      direction: {
        row: 'flex-row gap-2',
        col: 'flex-col',
      },
    },
    defaultVariants: {
      direction: 'row',
    },
  });
  return <div className={featureClasses({ direction })}>{children}</div>;
}
