import React, { isValidElement } from 'react';

export default function ContactLinks({ children }: { children: React.ReactNode }) {
    return (
        <ul>
            {React.Children.map(children, (child) => {
                if (!isValidElement(child)) {
                    return child;
                } else {
                    return (
                        <li className="flex align-middle [&:not(:last-child)]:mb-3">
                            {React.cloneElement(child as React.ReactElement)}
                        </li>
                    );
                }
            })}
        </ul>
    );
}
