import { SvgIconComponent } from '@mui/icons-material';
import Link from 'next/link';
import classNames from 'classnames';

const iconClasses = classNames('text-primary', 'hover:text-primary-dark', 'transition-colors');

const numberClasses = classNames(
    'absolute',
    'top-0',
    'right-[-6px]',
    'flex',
    'justify-center',
    'items-center',
    'w-4',
    'h-4',
    'rounded-full',
    'bg-white',
    'border',
    'border-primary',
    'text-muted-dark',
    'text-xs',
    'font-bold',
);

export default function HeaderItem({ href, Icon }: { href: string; Icon: SvgIconComponent }) {
    return (
        <Link href={href} className="block relative">
            <Icon fontSize="large" strokeWidth={1} stroke="white" className={iconClasses} />
            <span className={numberClasses}>1</span>
        </Link>
    );
}
