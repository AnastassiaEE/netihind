import LanguageSwitcher from '../language-switcher/LanguageSwitcher';
import Navbar from '../navigation/Navbar';

export default function BottomHeader() {
    return (
        <div className="p-2 flex justify-between">
            <Navbar/>
            <LanguageSwitcher/>
        </div>
    )
}