import { SvgIconComponent } from '@mui/icons-material';
import classNames from 'classnames';
import PackageIcon from '@/components/ui/address/packages/PackageIcon';

export default function PackageCardSection({
    Icon,
    className,
    children,
}: {
    Icon?: SvgIconComponent;
    className?: string;
    children: React.ReactNode;
}) {
    const sectionClasses = classNames(
        'border-muted-light relative py-5',
        Icon ? 'px-8' : 'px-1',
        className,
    );
    return (
        <div className={sectionClasses}>
            {Icon && <PackageIcon Icon={Icon} />}
            {children}
        </div>
    );
}
