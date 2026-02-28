import { Email, LocalPhone, LocationOn } from '@mui/icons-material';

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

export default function ContactLink({
  contactType,
  contact,
}: {
  contactType: 'email' | 'phone' | 'address';
  contact: string;
}) {
  const Icon = iconMap[contactType];
  const href = hrefMap[contactType](contact);
  return (
    <>
      <Icon className="text-primary mr-2 inline align-middle" />
      <a
        href={href}
        className="hover:text-primary font-semibold transition-colors"
      >
        {contact}
      </a>
    </>
  );
}
