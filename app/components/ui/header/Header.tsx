import { tv } from 'tailwind-variants';
import { SidebarMenuProvider } from '@/app/contexts/SidebarMenuContext';
import DesktopHeader from '@/components/ui/header/DesktopHeader';
import MobileHeader from '@/components/ui/header/MobileHeader';
import SidebarMenu from '@/components/ui/header/SidebarMenu';
import StickyHeader from '@/components/ui/header/StickyHeader';
import { HeaderVariant } from '@/types/ui.types';

const headerClasses = tv({
  base: 'bg-white',
  variants: {
    variant: {
      primary: 'absolute inset-x-0 top-0 z-10',
      secondary: 'shadow-lg',
    },
  },
  defaultVariants: {
    variant: 'secondary',
  },
});

export default function Header({
  variant = 'secondary',
  isSticky = true,
}: {
  variant?: HeaderVariant;
  isSticky?: boolean;
}) {
  return (
    <SidebarMenuProvider>
      <SidebarMenu />
      <header className={headerClasses({ variant })}>
        <DesktopHeader />
        <MobileHeader />
      </header>
      {isSticky && <StickyHeader />}
    </SidebarMenuProvider>
  );
}
