import React, { isValidElement } from 'react';
import classNames from 'classnames';
import { NavigationType } from '@/types/ui.types';

export default function Navigation({
  type = 'horizontal',
  className = 'text-muted-dark',
  children,
}: {
  type?: NavigationType;
  className?: string;
  children: React.ReactNode;
}) {
  const listClasses = classNames('font-semibold', className);
  const itemClasses = classNames(
    'py-2',
    type === 'horizontal' && 'inline-block px-4',
  );
  return (
    <nav>
      <ul className={listClasses}>
        {React.Children.map(children, (child) => {
          if (isValidElement(child))
            return <li className={itemClasses}>{React.cloneElement(child)}</li>;
          return child;
        })}
      </ul>
    </nav>
  );
}
