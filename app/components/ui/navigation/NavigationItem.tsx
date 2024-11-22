import { Link } from '@/i18n/routing';
import classNames from 'classnames';

export default function NavigationItem({
    href,
    className,
    isActive = false,
    handleClick,
    children,
}: {
    href: any;
    className?: string;
    isActive?: boolean;
    handleClick?: React.MouseEventHandler<HTMLAnchorElement>;
    children: React.ReactNode;
}) {
    const navigationItemClasses = classNames('hover:text-primary transition-colors', className, {
        'text-primary font-extrabold': isActive,
    });
    return (
        <Link href={href} className={navigationItemClasses} onClick={handleClick}>
            {children}
        </Link>
    );
}
