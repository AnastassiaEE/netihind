import BottomHeader from './BottomHeader';
import StickyHeader from './StickyHeader';
import TopHeader from './TopHeader';

export default function DesktopHeader() {
    return (
        <div className="container">
            <TopHeader />
            <BottomHeader />
            <StickyHeader />
        </div>
    );
}
