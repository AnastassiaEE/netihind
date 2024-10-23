import React from 'react';
import ContactCard from './ContactCard';
import { i18n } from 'i18next';

export default function ContactCards({
    contacts,
    i18n,
}: {
    contacts: {
        type: 'email' | 'phone' | 'address';
        data: { title: string; description: string; contact: string };
    }[];
    i18n: i18n;
}) {
    return (
        <>
            {contacts.map((contact) => {
                return (
                    <div key={contact.type} className="[&:not(:last-child)]:mb-3">
                        <ContactCard
                            type={i18n.t(contact.type)}
                            title={i18n.t(contact.data.title)}
                            description={i18n.t(contact.data.description)}
                            contact={i18n.t(contact.data.contact)}
                        />
                    </div>
                );
            })}
        </>
    );
}
