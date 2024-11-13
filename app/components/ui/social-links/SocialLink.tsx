import { Instagram, Facebook, LinkedIn, YouTube, X, SvgIconComponent } from '@mui/icons-material';
import classNames from 'classnames';

const types: { [key: string]: { Icon: SvgIconComponent; color: string } } = {
    facebook: { Icon: Facebook, color: 'hover:bg-facebook-logo hover:shadow-facebook-logo/40' },
    x: { Icon: X, color: 'hover:bg-twitter-logo hover:shadow-twitter-logo/40' },
    instagram: {
        Icon: Instagram,
        color: 'hover:bg-instagram-logo hover:shadow-instagram-logo-shadow/40',
    },
    linkedin: { Icon: LinkedIn, color: 'hover:bg-linkedin-logo hover:shadow-linkedin-logo/40' },
    youtube: { Icon: YouTube, color: 'hover:bg-youtube-logo hover:shadow-youtube-logo/40' },
};
export default function SocialLink({
    type,
    href,
    className,
}: {
    type: 'facebook' | 'x' | 'instagram' | 'linkedin' | 'youtube';
    href: string;
    className?: string;
}) {
    const Icon = types[type].Icon;

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
        types[type].color,
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
