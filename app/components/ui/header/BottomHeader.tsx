import LanguageSwitcher from '@/components/ui/language-switcher/LanguageSwitcher';
import Navbar from '@/components/ui/navigation/Navbar';

export default function BottomHeader() {
    return (
        <div className="p-2 flex justify-between">
            <Navbar/>
            <LanguageSwitcher/>
        </div>
    )
}