import BottomHeader from './BottomHeader';
import StickyHeader from './StickyHeader';
import TopHeader from './TopHeader';

export default function DesktopHeader() {
    return (
        <div className="container max-md:hidden">
            <TopHeader />
            <BottomHeader />
            <StickyHeader />
        </div>
    );
}
