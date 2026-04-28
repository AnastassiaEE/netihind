'use client';

import secondaryLogo from '@/public/images/gradientsecondarylogo.svg';
import Hamburger from '@/components/ui/header/Hamburger';
import LinkLogo from '@/components/ui/logo/LinkLogo';
import { useSidebarMenuContext } from '@/contexts/SidebarMenuContext';
import { useTranslations } from 'next-intl';

export default function MobileHeader() {
  const { openSidebarMenu } = useSidebarMenuContext();
  const t = useTranslations('Buttons');
  return (
    <div className="container md:hidden">
      <div className="flex flex-wrap items-center justify-between p-4">
        <LinkLogo src={secondaryLogo} sizeClass="w-12" />
        <Hamburger label={t('menu.open')} onClick={openSidebarMenu}></Hamburger>
      </div>
    </div>
  );
}
