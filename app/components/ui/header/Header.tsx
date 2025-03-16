import { tv, VariantProps } from 'tailwind-variants';
import { SidebarMenuProvider } from '@/app/contexts/SidebarMenuContext';
import DesktopHeader from '@/components/ui/header/DesktopHeader';
import MobileHeader from '@/components/ui/header/MobileHeader';
import SidebarMenu from '@/components/ui/header/SidebarMenu';
import StickyHeader from '@/components/ui/header/StickyHeader';

const headerClasses = tv({
  base: 'bg-white',
  variants: {
    variant: {
      primary: 'absolute top-0 inset-x-0 z-10',
      secondary: 'shadow-lg',
    },
  },
  defaultVariants: {
    variant: 'secondary',
  },
});

type HeaderVariant = VariantProps<typeof headerClasses>['variant'];

export default function Header({
  variant = 'secondary',
}: {
  variant?: HeaderVariant;
}) {
  return (
    <SidebarMenuProvider>
      <SidebarMenu />
      <header className={headerClasses({ variant })}>
        <DesktopHeader />
        <MobileHeader />
      </header>
      <StickyHeader />
    </SidebarMenuProvider>
  );
}
