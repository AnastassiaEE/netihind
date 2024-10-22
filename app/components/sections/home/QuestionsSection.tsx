import SectionLayout from '@/layouts/SectionLayout';
import Accordion from '@/components/ui/accordion/Accordion';
import questions from '@/data/questions';
import Button from '@/components/ui/form/buttons/Button';
import Link from 'next/link';
import { H2 } from '@/components/ui/headings/HomePageHeadings';
import { i18n } from 'i18next';

export default function QuestionsSection({ i18n }: { i18n: i18n }) {
    return (
        <SectionLayout className="py-24">
            <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="md:w-4/12 max-md:mb-12">
                    <H2>{i18n.t('questions-section.title')}</H2>
                    <p className="text-lg mb-12 md:mb-8">{i18n.t('questions-section.description')}</p>
                    <Link href="/kontaktid" className="md:inline-block">
                        <Button size="lg" className="w-full">{i18n.t('questions-section.contact-button')}</Button>
                    </Link>
                </div>
                <div className="md:w-7/12">
                    <Accordion items={questions} i18n={i18n} />
                </div>
            </div>
        </SectionLayout>
    );
}
