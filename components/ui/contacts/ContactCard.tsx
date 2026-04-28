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
  address: () => `#`,
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
    'border-muted-light flex rounded-md border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg',
    className,
  );

  const Icon = iconMap[contactType];
  const href = hrefMap[contactType](contact);

  return (
    <div className={cardClasses}>
      <ContactCircle Icon={Icon} />

      <div className="pl-6">
        <H2 className="mb-3!">{title}</H2>
        <p className="mb-3">{description}</p>
        <a
          href={href}
          className="text-primary hover:text-primary-dark block py-3 font-semibold"
        >
          {contact}
        </a>
      </div>
    </div>
  );
}
