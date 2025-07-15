'use client';

import secondaryLogo from '@/public/images/gradientsecondarylogo.svg';
import Hamburger from '@/components/ui/header/Hamburger';
import LinkLogo from '@/components/ui/logo/LinkLogo';
import { useSidebarMenuContext } from '@/app/contexts/SidebarMenuContext';
import { useTranslations } from 'next-intl';

export default function MobileHeader() {
  const { openSidebarMenu } = useSidebarMenuContext();
  const t = useTranslations('Buttons');
  return (
    <div className="container md:hidden">
      <div className="flex flex-wrap justify-between p-4">
        <div>
          <LinkLogo src={secondaryLogo} sizeClass="w-12" />
        </div>
        <div className="flex flex-wrap items-center gap-6">
          <Hamburger
            label={t('menu.open')}
            onClick={openSidebarMenu}
          ></Hamburger>
        </div>
      </div>
    </div>
  );
}
