import * as React from 'react';

interface EmailTemplateProps {
    name: string;
    email: string,
    phone: string,
    message: string
}

export const ContactEmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    name,
    email,
    phone,
    message,
}) => (
    <div>
        <p><strong>Nimi:</strong>{name}</p>
        <p><strong>E-post:</strong>{email}</p>
        <p><strong>Telefon:</strong>{phone}</p>
        <p><strong>Sõnum:</strong>{message}</p>
    </div>
);