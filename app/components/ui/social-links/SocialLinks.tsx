import React from 'react';
import SocialLink from '@/components/ui/social-links/SocialLink';

export default function SocialLinks({ data }: { data: { [key: string]: any }[] }) {
    return (
        <div className="flex flex-wrap gap-2">
            {data.map(({ Icon, href, label, color }) => (
                <SocialLink key={href} Icon={Icon} href={href} label={label} className={color} />
            ))}
        </div>
    );
}
