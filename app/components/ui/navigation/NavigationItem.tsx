import Link from 'next/link';
import classNames from 'classnames';

export default function NavigationItem({
    href,
    padding,
    className,
    children,
}: {
    href: string;
    padding?: string;
    className?: string;
    children: React.ReactNode;
}) {
    const navigationItemClasses = classNames('hover:text-primary transition-colors', {
        [padding as string]: padding !== undefined,
        [className as string]: className !== undefined,
    });
    return (
        <Link href={href} className={navigationItemClasses}>
            {children}
        </Link>
    );
}
