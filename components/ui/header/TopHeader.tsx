import mainLogo from '@/public/images/gradientmainlogo.svg';
import LinkLogo from '@/components/ui/logo/LinkLogo';

export default function TopHeader() {
    return (
        <div className="flex items-center justify-between border-b border-muted-light p-4">
            <LinkLogo src={mainLogo} sizeClass="w-36" />
        </div>
    );
}
