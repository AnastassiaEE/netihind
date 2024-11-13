import React, { isValidElement } from 'react';

export default function SocialLinks({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-wrap">
            {React.Children.map(children, (child) => {
                if (isValidElement(child)) {
                    return React.cloneElement(child as React.ReactElement, { className: 'mx-2' });
                }
                return child;
            })}
        </div>
    );
}
