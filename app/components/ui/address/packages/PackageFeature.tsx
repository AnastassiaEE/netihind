import { Language, Tv } from '@mui/icons-material';
import React from 'react';

export default function PackageFeature({
    type,
    children,
}: {
    type: 'internet' | 'tv';
    children: React.ReactNode;
}) {
    const iconStroke = {
        stroke: 'white',
        strokeWidth: 1,
    };

    return (
        <div className="flex items-center gap-2">
            {type === 'internet' && <Language fontSize="large" sx={iconStroke} />}
            {type === 'tv' && <Tv fontSize="large" sx={iconStroke} />}
            <div>
                {children}
            </div>
        </div>
    );
}
