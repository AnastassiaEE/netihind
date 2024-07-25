import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import XIcon from '@mui/icons-material/X';
import Link from "next/link";

const types: {[key:string]: {Icon: any, color: string}} = {
    'facebook': {Icon: FacebookIcon, color: 'hover:bg-facebook-logo hover:shadow-facebook-logo/40'},
    'x': {Icon: XIcon, color: 'hover:bg-twitter-logo hover:shadow-twitter-logo/40'},
    'instagram': {Icon: InstagramIcon, color: 'hover:bg-instagram-logo hover:shadow-instagram-logo-shadow/40'},
    'linkedin': {Icon: LinkedInIcon, color: 'hover:bg-linkedin-logo hover:shadow-linkedin-logo/40'},
    'youtube': {Icon: YouTubeIcon, color: 'hover:bg-youtube-logo hover:shadow-youtube-logo/40'}
}
export default function SocialLink({
    type,
    margin
}: {
    type: string,
    margin?: string
}) {
    const Icon = types[type].Icon

    return(
        <Link 
            href="#" 
            className={`flex justify-center items-center w-11 h-11 bg-white/5 rounded-md transition-colors ease-in hover:shadow-lg ${types[type].color} ${margin}`}>
            <Icon fontSize="small" className="text-white"/>
        </Link>
    )
}