import Link from 'next/link';
import classNames from 'classnames';

export default function NavigationItem({
    href,
    padding,
    className,
    handleClick,
    children,
}: {
    href: string;
    padding?: string;
    className?: string;
    handleClick?: React.MouseEventHandler<HTMLAnchorElement>;
    children: React.ReactNode;
}) {
    const navigationItemClasses = classNames('hover:text-primary transition-colors', {
        [padding as string]: padding !== undefined,
        [className as string]: className !== undefined,
    });
    return (
        <Link href={href} className={navigationItemClasses} onClick={handleClick}>
            {children}
        </Link>
    );
}
