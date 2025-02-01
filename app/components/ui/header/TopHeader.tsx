import mainLogo from '@/public/images/gradientmainlogo.svg';
import Logo from '@/components/ui/Logo';

export default function TopHeader() {
    return (
        <div className="flex items-center justify-between p-4 border-b border-muted-light">
            <Logo src={mainLogo} sizeClass="w-36" />
        </div>
    );
}
