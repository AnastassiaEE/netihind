import { SvgIconComponent } from '@mui/icons-material';
import classNames from 'classnames';

export default function SocialLink({
    Icon,
    href,
    label,
    className,
}: {
    Icon: SvgIconComponent;
    href: string;
    label: string
    className?: string;
}) {
    return (
        <a
            href={href}
            target="_blank"
            aria-label={label}
            className={classNames(
                'flex size-11 items-center justify-center rounded-md bg-white/5 transition-colors ease-in hover:shadow-lg',
                className,
            )}
        >
            <Icon fontSize="small" className="text-white" />
        </a>
    );
}
