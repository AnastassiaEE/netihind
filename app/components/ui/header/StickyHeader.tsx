'use client';

import secondaryLogo from '@/public/images/gradientsecondarylogo.svg';
import useScrollPosition from '@/hooks/useScrollPosition';
import Hamburger from '@/components/ui/header/Hamburger';
import LinkLogo from '@/components/ui/logo/LinkLogo';
import { useSidebarMenuContext } from '@/app/contexts/SidebarMenuContext';
import { useTranslations } from 'next-intl';

const TOOLBAR_SHOW_POSITION = 400;

export default function StickyHeader() {
  const y = useScrollPosition();
  const { openSidebarMenu } = useSidebarMenuContext();
  const t = useTranslations('Buttons');

  return (
    <div
      className={`sticky-header fixed inset-x-0 top-0 z-10 bg-white p-4 shadow-lg ${y > TOOLBAR_SHOW_POSITION ? 'animate-show' : 'hidden'}`}
    >
      <div className="container">
        <div className="flex flex-wrap items-center justify-between">
          <LinkLogo src={secondaryLogo} sizeClass="w-12" />
          <Hamburger
            label={t('menu.open')}
            onClick={openSidebarMenu}
          ></Hamburger>
        </div>
      </div>
    </div>
  );
}
