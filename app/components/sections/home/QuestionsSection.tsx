import SectionLayout from '@/layouts/SectionLayout';
import Accordion from '@/components/ui/accordion/Accordion';
import questions from '@/data/questions';
import Button from '@/components/ui/form/buttons/Button';
import Link from 'next/link';
import { H2 } from '@/components/ui/headings/HomePageHeadings';
import { useTranslations } from 'next-intl';

export default function QuestionsSection() {
    const t = useTranslations('HomePage');
    return (
        <SectionLayout className="py-24">
            <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="md:w-4/12 max-md:mb-12">
                    <H2>{t('questionsSection.title')}</H2>
                    <p className="text-lg mb-12 md:mb-8">{t('questionsSection.description')}</p>
                    <Link href="/kontaktid" className="md:inline-block">
                        <Button size="lg" className="w-full">
                            {t('questionsSection.contactButton')}
                        </Button>
                    </Link>
                </div>
                <div className="md:w-7/12">
                    <Accordion items={questions} t={t} />
                </div>
            </div>
        </SectionLayout>
    );
}
