'use client';

import { useState } from 'react';
import { SvgIconComponent } from '@mui/icons-material';

export default function Popover({
    IconToInteract,
    content,
}: {
    IconToInteract: SvgIconComponent;
    content: string;
}) {
    const [isVisible, setIsVisible] = useState(false);

    const handleMouseEnter = () => {
        setIsVisible(true);
    };

    const handleMouseLeave = () => {
        setIsVisible(false);
    };

    return (
        <span className="relative align-text-bottom">
            <IconToInteract
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="text-primary cursor-pointer"
                fontSize="small"
            />
            {isVisible && (
                <span className="bg-white text-sm rounded-lg shadow-md absolute bottom-full left-6 w-64 p-3">
                    {content}
                </span>
            )}
        </span>
    );
}
