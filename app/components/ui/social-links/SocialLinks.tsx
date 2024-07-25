import React, { isValidElement } from "react";

export default function SocialLinks({children}: {children: React.ReactNode}) {
    return(
        <div className="flex justify-center flex-wrap">
            {React.Children.map(children, child => {
                    if (!isValidElement(child)) {
                        return child;
                    } else {
                        return React.cloneElement(
                        child as React.ReactElement,
                        {margin: 'mx-2'})
                    }
                })
            }
        </div>
    )
}