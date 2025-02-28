'use client';

import usePopover from '@/hooks/usePopover';
import React from 'react';

export default function Popover({
    elementToInteract,
    content,
}: {
    elementToInteract: React.ReactElement;
    content: string;
}) {
    const { isVisible, show, hide } = usePopover();

    return (
        <span className="relative">
            {React.cloneElement(elementToInteract, {
                onMouseEnter: show,
                onMouseLeave: hide,
                onFocus: show,
                onBlur: hide,
                className: `${elementToInteract.props.className || ''} cursor-pointer text-xs`,
            })}
            {isVisible && (
                <span className="bg-white text-sm lowercase text-center rounded-lg shadow-md absolute bottom-full -left-full w-max max-w-xs p-3">
                    {content}
                </span>
            )}
        </span>
    );
}
