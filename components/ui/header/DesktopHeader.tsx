import BottomHeader from '@/components/ui/header/BottomHeader';
import TopHeader from '@/components/ui/header/TopHeader';

export default function DesktopHeader() {
    return (
        <div className='container max-md:hidden'>
            <TopHeader />
            <BottomHeader />
        </div>
    );
}
