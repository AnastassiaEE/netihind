import ContactCard from '@/components/ui/contacts/ContactCard';
import ContactCards from '@/components/ui/contacts/ContactCards';
import SectionLayout from '@/layouts/SectionLayout';
import { email, phone } from '@/data/contacts';

const contacts: {
    contactType: 'email' | 'phone' | 'address';
    data: { title: string; description: string; contact: string };
}[] = [
        {
            contactType: 'email',
            data: {
                title: 'Email us',
                description: 'Please feel free to drop us a line. We will respond as soon as possible.',
                contact: email,
            },
        },
        {
            contactType: 'phone',
            data: {
                title: 'Call any time',
                description: 'If you need immediate assistance feel free to call us any time.',
                contact: phone,
            },
        },
    ];

export default function ContactsSection() {
    return (
        <SectionLayout>
            <div className="flex">
                <div className="md:w-1/2">
                    <ContactCards>
                        {contacts.map((contact) => {
                            return (
                                <ContactCard
                                    key={contact.contactType}
                                    contactType={contact.contactType}
                                    data={contact.data}
                                />
                            );
                        })}
                    </ContactCards>
                </div>
                <div className="md:w-1/2"></div>
            </div>
        </SectionLayout>
    );
}
