import { SvgIconComponent } from '@mui/icons-material';
import classNames from 'classnames';

export default function SocialLink({
    Icon,
    href,
    color,
    className,
}: {
    Icon: SvgIconComponent;
    href: string;
    color: string;
    className?: string;
}) {
    const socialLinkClasses = classNames(
        'flex',
        'justify-center',
        'items-center',
        'w-11',
        'h-11',
        'bg-white/5',
        'rounded-md',
        'transition-colors',
        'ease-in',
        'hover:shadow-lg',
        color,
        {
            [className as string]: className,
        },
    );

    return (
        <a href={href} target="_blank" className={socialLinkClasses}>
            <Icon fontSize="small" className="text-white" />
        </a>
    );
}
