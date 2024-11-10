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

    const navigationItemClasses = classNames('py-2 block', {
        'px-4': type === 'horizontal',
    });

    return (
        <nav>
            <ul className={navigationListClasses}>
                {React.Children.map(children, (child) => {
                    if (isValidElement(child)) {
                        return (
                            <li>
                                {React.cloneElement(child as React.ReactElement, {
                                    padding: navigationItemClasses,
                                })}
                            </li>
                        );
                    }
                    return child;
                })}
            </ul>
        </nav>
    );
}
