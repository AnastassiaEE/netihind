import React, { isValidElement } from 'react';
import classNames from 'classnames';

export default function Navigation({
    type = 'horizontal',
    itemColorClass = 'text-muted-dark',
    children,
}: {
    type?: 'horizontal' | 'vertical';
    itemColorClass?: string;
    children: React.ReactNode;
}) {
    const navigationListClasses = classNames(itemColorClass, 'font-semibold', {
        'flex flex-wrap': type === 'horizontal',
    });

    const navigationItemClasses = classNames('block py-2', {
        'px-4': type === 'horizontal',
    });

    return (
        <nav>
            <ul className={navigationListClasses}>
                {React.Children.map(children, (child) =>
                    isValidElement(child)
                        ? React.cloneElement(child as React.ReactElement, { className: navigationItemClasses })
                        : child,
                )}
            </ul>
        </nav>
    );
}
