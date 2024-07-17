import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import XIcon from '@mui/icons-material/X';
import Link from "next/link";

const types: {[key:string]: {Icon: any, color: string}} = {
    'facebook': {Icon: FacebookIcon, color: 'hover:bg-[#0866FF] hover:shadow-[#0866FF]'},
    'x': {Icon: XIcon, color: ''},
    'instagram': {Icon: InstagramIcon, color: ''},
    'linkedin': {Icon: LinkedInIcon, color: ''},
    'youtube': {Icon: YouTubeIcon, color: ''}
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
            className={`flex justify-center items-center w-11 h-11 bg-white/5 rounded-md transition-colors duration-300 hover:shadow-md ${types[type].color} ${margin}`}>
            <Icon fontSize="small" className="text-white"/>
        </Link>
    )
}