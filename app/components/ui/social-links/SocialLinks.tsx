import { SvgIconComponent } from '@mui/icons-material';
import React from 'react';
import SocialLink from '@/components/ui/social-links/SocialLink';

export default function SocialLinks({
    data,
}: {
    data: { [key: string]: any }[];
}) {
    return (
        <div className="flex flex-wrap gap-2">
            {data.map(({ Icon, href, color }, index) => (
                <SocialLink key={index} Icon={Icon} href={href} color={color} />
            ))}
        </div>
    );
}
