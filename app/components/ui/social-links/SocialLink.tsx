import { SvgIconComponent } from '@mui/icons-material';

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
    return (
        <a
            href={href}
            target="_blank"
            className={`flex size-11 items-center justify-center rounded-md bg-white/5 transition-colors ease-in hover:shadow-lg ${color} ${className}`}
        >
            <Icon fontSize="small" className="text-white" />
        </a>
    );
}
