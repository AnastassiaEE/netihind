import { Email, LocalPhone, LocationOn } from '@mui/icons-material';

const icons = {
    email: Email,
    phone: LocalPhone,
    address: LocationOn,
};

export default function ContactLink({
    contactType,
    children,
}: {
    contactType: 'email' | 'phone' | 'address';
    children: React.ReactNode;
}) {
    let href = 'javascript:void(0)';
    if (contactType === 'email') {
        href = `mailto:${children}`;
    } else if (contactType === 'phone') {
        href = `tel:${children}`;
    }
    const Icon = icons[contactType];
    return (
        <>
            <Icon className="text-primary mr-2" />
            <a
                href={href.replace(/\s/g, '')}
                className="font-semibold transition-colors hover:text-primary"
            >
                {children}
            </a>
        </>
    );
}
