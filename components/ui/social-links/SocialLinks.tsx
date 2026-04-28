import React from 'react';
import SocialLink from '@/components/ui/social-links/SocialLink';
import { SocialLinkItem } from '@/types/social.types';

export default function SocialLinks({ links }: { links: SocialLinkItem[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {links.map(({ Icon, href, label, color }) => (
        <SocialLink
          key={href}
          Icon={Icon}
          href={href}
          label={label}
          className={color}
        />
      ))}
    </div>
  );
}
