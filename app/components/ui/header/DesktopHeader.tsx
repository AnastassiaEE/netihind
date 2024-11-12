import BottomHeader from '@/components/ui/header/BottomHeader';
import StickyHeader from '@/components/ui/header/StickyHeader';
import TopHeader from '@/components/ui/header/TopHeader';

export default function DesktopHeader() {
    return (
        <div className="container max-md:hidden">
            <TopHeader />
            <BottomHeader />
            <StickyHeader />
        </div>
    );
}
