import SectionLayout from '@/layouts/SectionLayout';
import Accordion from '@/components/ui/accordion/Accordion';
import questions from '@/data/questions';
import Button from '@/components/ui/form/buttons/Button';
import { Link } from '@/i18n/routing';
import { H2 } from '@/components/ui/headings/HomePageHeadings';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import Check from '@/components/ui/icons/Check';
import AccordionItem from '@/components/ui/accordion/AccordionItem';
import AccordionItemHeader from '@/components/ui/accordion/AccordionItemHeader';
import AccordionItemBody from '@/components/ui/accordion/AccordionItemBody';
import React from 'react';

export default function QuestionsSection() {
  const t = useTranslations('HomePage');
  const translatedQuestions = useMemo(() => {
    return (
      questions?.map(({ header, body }: { header: string; body: string }) => ({
        header: t(header),
        body: t.rich(body, {
          ul: (chunks: React.ReactNode) => <ul>{chunks}</ul>,
          li: (chunks: React.ReactNode) => <li className="mb-2">{chunks}</li>,
          i: () => <Check size="small" />,
        }),
      })) ?? []
    );
  }, [t]);
  return (
    <SectionLayout className="py-24">
      <div className="md:flex md:items-center md:justify-between">
        <div className="max-md:mb-12 md:w-4/12">
          <H2>{t('questionsSection.title')}</H2>
          <p className="mb-12 text-lg md:mb-8">
            {t('questionsSection.description')}
          </p>
          <Link href="/contacts" className="md:inline-block">
            <Button size="lg" className="w-full">
              {t('questionsSection.contactButton')}
            </Button>
          </Link>
        </div>
        <div className="md:w-7/12">
          <Accordion border="full" size="lg" arrowStyle="circle">
            {translatedQuestions.map((question) => (
              <AccordionItem key={question.header}>
                <AccordionItemHeader>
                  <span className="font-semibold">{question.header}</span>
                </AccordionItemHeader>
                <AccordionItemBody>
                  <p className="text-sm">{question.body}</p>
                </AccordionItemBody>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </SectionLayout>
  );
}
