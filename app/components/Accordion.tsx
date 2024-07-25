import { isValidElement } from "react"
import React from "react";

export default function Accordion({children}: {children: React.ReactNode}) {
    
    return (
        <div>
            {React.Children.map(children, (child) => {
                    if (!isValidElement(child)) {
                        return child;
                    } else {
                        return React.cloneElement(child as React.ReactElement)
                    }
                })
            } 
        </div>
    )
}