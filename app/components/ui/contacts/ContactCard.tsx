import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CircleContactIcon from '../icons/CircleContactIcon';

const icons = {
    email: EmailIcon,
    phone: LocalPhoneIcon,
    address: LocationOnIcon,
};

export default function ContactCard({
    contactType,
    data,
}: {
    contactType: 'email' | 'phone' | 'address';
    data: { title: string; description: string; contact: string };
}) {
    let href = 'javascript:void(0)';
    if (contactType === 'email') {
        href = `mailto:${data.contact}`;
    } else if (contactType === 'phone') {
        href = `tel:${data.contact}`;
    }
    return (
        <div className="flex p-6 rounded-md border border-muted-light hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div>
                <CircleContactIcon Icon={icons[contactType]} />
            </div>
            <div className="pl-6">
                <h4 className="text-calc(1.275rem + 0.3vw) md:text-2xl font-extrabold mb-3">
                    {data.title}
                </h4>
                <p className="text-muted-dark mb-3">{data.description}</p>
                <a
                    href={href.replace(/\s/g, '')}
                    className="text-primary hover:text-primary-dark block font-semibold py-3"
                >
                    {data.contact}
                </a>
            </div>
        </div>
    );
}
