import React from 'react';
import ContactCard from '@/components/ui/contacts/ContactCard';

export default function ContactCards({
  contacts,
}: {
  contacts: {
    contactType: 'email' | 'phone' | 'address';
    title: string;
    description: string;
    contact: string;
  }[];
}) {
  return (
    <>
      {contacts.map(({ contactType, title, description, contact }) => (
        <ContactCard
          key={contactType}
          contactType={contactType}
          title={title}
          description={description}
          contact={contact}
        />
      ))}
    </>
  );
}
