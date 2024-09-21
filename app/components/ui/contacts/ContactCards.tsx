import React from 'react';
import { isValidElement } from 'react';

export default function ContactCards({ children }: { children: React.ReactNode }) {
    return (
        <div>
            {React.Children.map(children, (child) => {
                if (!isValidElement(child)) {
                    return child;
                } else {
                    return (
                        <div className="[&:not(:last-child)]:mb-3">
                            {React.cloneElement(child as React.ReactElement)}
                        </div>
                    );
                }
            })}
        </div>
    );
}
