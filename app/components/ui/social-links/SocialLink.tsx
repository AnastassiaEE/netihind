import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import XIcon from '@mui/icons-material/X';
import classNames from 'classnames';
import { SvgIconComponent } from '@mui/icons-material';

const types: { [key: string]: { Icon: SvgIconComponent; color: string } } = {
    facebook: { Icon: FacebookIcon, color: 'hover:bg-facebook-logo hover:shadow-facebook-logo/40' },
    x: { Icon: XIcon, color: 'hover:bg-twitter-logo hover:shadow-twitter-logo/40' },
    instagram: {
        Icon: InstagramIcon,
        color: 'hover:bg-instagram-logo hover:shadow-instagram-logo-shadow/40',
    },
    linkedin: { Icon: LinkedInIcon, color: 'hover:bg-linkedin-logo hover:shadow-linkedin-logo/40' },
    youtube: { Icon: YouTubeIcon, color: 'hover:bg-youtube-logo hover:shadow-youtube-logo/40' },
};
export default function SocialLink({
    type,
    href,
    className,
}: {
    type: string;
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
