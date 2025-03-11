import React, { isValidElement } from 'react';
import classNames from 'classnames';

export default function Navigation({
    type = 'horizontal',
    className = 'text-muted-dark',
    children,
}: {
    type?: 'horizontal' | 'vertical';
    className?: string;
    children: React.ReactNode;
}) {
    const listClasses = classNames('font-semibold', className);
    const itemClasses = classNames('py-2', type === 'horizontal' && 'inline-block px-4');
    return (
        <nav>
            <ul className={listClasses}>
                {React.Children.map(children, (child) =>
                    isValidElement(child) ? (
                        <li className={itemClasses}>{React.cloneElement(child)}</li>
                    ) : (
                        <li className={itemClasses}>{child}</li>
                    ),
                )}
            </ul>
        </nav>
    );
}
