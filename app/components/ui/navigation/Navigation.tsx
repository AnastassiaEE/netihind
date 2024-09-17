import React, { isValidElement } from 'react';
import classNames from 'classnames';

export default function Navigation({
    type = 'horizontal',
    linkColor = 'muted-dark',
    children,
}: {
    type?: 'horizontal' | 'vertical';
    linkColor?: string;
    children: React.ReactNode;
}) {
    const navigationListClasses = classNames('text-base', `text-${linkColor}`, 'font-semibold', {
        'flex flex-wrap justify-center': type === 'horizontal',
    });

    const navigationItemClasses = classNames('py-2 block', {
        'px-4': type === 'horizontal',
    });

    return (
        <nav>
            <ul className={navigationListClasses}>
                {React.Children.map(children, (child) => {
                    if (!isValidElement(child)) {
                        return child;
                    } else {
                        return (
                            <li>
                                {React.cloneElement(child as React.ReactElement, {
                                    padding: navigationItemClasses,
                                })}
                            </li>
                        );
                    }
                })}
            </ul>
        </nav>
    );
}
