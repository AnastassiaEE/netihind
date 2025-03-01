import mainLogo from '@/public/images/gradientmainlogo.svg';
import Logo from '@/components/ui/Logo';

export default function TopHeader() {
    return (
        <div className="flex items-center justify-between border-b border-muted-light p-4">
            <Logo src={mainLogo} sizeClass="w-36" />
        </div>
    );
}
