'use client';

import LocationOn from '@mui/icons-material/LocationOnOutlined';
import Mail from '@mui/icons-material/MailOutlineOutlined';
import SectionLayout from '@/layouts/SectionLayout';
import Phone from '@mui/icons-material/PhoneOutlined';
import ContactForm from '@/components/ui/form/ContactForm';
import { useTranslation } from 'react-i18next';

export default function ContactsSection() {
    const { t } = useTranslation();
    return (
        <SectionLayout bg="bg-white" className="py-24">
            <div className="md:flex md:justify-between md:items-center">
                <div className="md:w-1/2 max-md:mb-12">
                    <div className="mb-20">
                        <h2 className="text-[calc(1.375rem+1.5vw)] md:text-4xl font-extrabold mb-6">
                            {t('contacts-section.title')}
                        </h2>
                        <p className="text-muted-dark">{t('contacts-section.description')}</p>
                    </div>
                    <div>
                        <h3 className="text-[calc(1.325rem+0.9vw)] md:text-3xl font-extrabold mb-6">
                            {t('contacts-section.subtitle')}
                        </h3>
                        <ul>
                            <li className="flex items-center mb-5">
                                <Phone className="text-primary" />
                                <a
                                    href="tel:+37256979125"
                                    className="font-semibold transition-colors pl-2 hover:text-primary"
                                >
                                    +372 56 979 125
                                </a>
                            </li>
                            <li className="flex items-center mb-5">
                                <Mail className="text-primary" />
                                <a
                                    href="mailto:martsenkoanastassia56@gmail.com"
                                    className="font-semibold transition-colors pl-2 hover:text-primary"
                                >
                                    martsenkoanastassia56@gmail.com
                                </a>
                            </li>
                            <li className="flex items-center">
                                <LocationOn className="text-primary" />
                                <a
                                    href="#"
                                    className="font-semibold transition-colors pl-2 hover:text-primary"
                                >
                                    Akadeemia tee 14-42
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="md:w-1/3">
                    <div className="shadow-md rounded-lg p-6">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </SectionLayout>
    );
}
