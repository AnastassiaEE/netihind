import { LocalPhone, Email, LocationOn } from '@mui/icons-material';
import ContactCircle from '@/components/ui/icons/ContactCircle';
import { H2 } from '@/components/ui/headings/RestPageHeadings';
import classNames from 'classnames';

const icons = {
    email: Email,
    phone: LocalPhone,
    address: LocationOn,
};

export default function ContactCard({
    type,
    title,
    description,
    contact,
    className,
}: {
    type: 'email' | 'phone' | 'address';
    title: string;
    description: string;
    contact: string;
    className?: string;
}) {
    const cardClasses = classNames(
        'flex p-6 rounded-md border border-muted-light hover:shadow-lg hover:-translate-y-1 transition-all duration-300',
        {
            [className as string]: className !== undefined,
        },
    );
    let href = 'javascript:void(0)';
    if (type === 'email') {
        href = `mailto:${contact}`;
    } else if (type === 'phone') {
        href = `tel:${contact}`;
    }
    return (
        <div className={cardClasses}>
            <div>
                <ContactCircle Icon={icons[type]} />
            </div>
            <div className="pl-6">
                <H2 className="!mb-3">{title}</H2>
                <p className="mb-3">{description}</p>
                <a
                    href={href.replace(/\s/g, '')}
                    className="text-primary hover:text-primary-dark block font-semibold py-3"
                >
                    {contact}
                </a>
            </div>
        </div>
    );
}
