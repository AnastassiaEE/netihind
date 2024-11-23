import { LocalPhone, Email, LocationOn } from '@mui/icons-material';
import ContactCircle from '@/components/ui/icons/ContactCircle';
import { H2 } from '@/components/ui/headings/RestPageHeadings';
import classNames from 'classnames';

const iconMap = {
    email: Email,
    phone: LocalPhone,
    address: LocationOn,
};

const hrefMap = {
    email: (contact: string) => `mailto:${contact}`,
    phone: (contact: string) => `tel:${contact}`,
    address: (contact: string) => `#`,
};

export default function ContactCard({
    contactType,
    title,
    description,
    contact,
    className,
}: {
    contactType: 'email' | 'phone' | 'address';
    title: string;
    description: string;
    contact: string;
    className?: string;
}) {
    const cardClasses = classNames(
        'flex p-6 rounded-md border border-muted-light hover:shadow-lg hover:-translate-y-1 transition-all duration-300',
        className,
    );

    const Icon = iconMap[contactType];
    const href = hrefMap[contactType](contact);

    return (
        <div className={cardClasses}>
            <div>
                <ContactCircle Icon={Icon} />
            </div>
            <div className="pl-6">
                <H2 className="!mb-3">{title}</H2>
                <p className="mb-3">{description}</p>
                <a href={href} className="text-primary hover:text-primary-dark block font-semibold py-3">
                    {contact}
                </a>
            </div>
        </div>
    );
}
