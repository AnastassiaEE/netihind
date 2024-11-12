import React from 'react';
import ContactCard from '@/components/ui/contacts/ContactCard';

export default function ContactCards({
    contacts,
}: {
    contacts: {
        type: 'email' | 'phone' | 'address';
        data: { title: string; description: string; contact: string };
    }[];
}) {
    return (
        <>
            {contacts.map((contact) => {
                return (
                    <div key={contact.type} className="[&:not(:last-child)]:mb-3">
                        <ContactCard
                            type={contact.type}
                            title={contact.data.title}
                            description={contact.data.description}
                            contact={contact.data.contact}
                        />
                    </div>
                );
            })}
        </>
    );
}
