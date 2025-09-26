import { Email, LocalPhone, LocationOn } from '@mui/icons-material';

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
      <Icon className="mr-2 inline align-middle text-primary" />
      <a
        href={href}
        className="font-semibold transition-colors hover:text-primary"
      >
        {contact}
      </a>
    </>
  );
}
