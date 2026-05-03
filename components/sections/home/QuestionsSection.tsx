import SectionLayout from '@/layouts/SectionLayout';
import questions from '@/data/questions';
import { Button } from '@/components/ui/buttons/Button';
import { Link } from '@/i18n/routing';
import { H2 } from '@/components/ui/headings/HomePageHeadings';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import Check from '@/components/ui/icons/Check';
import React from 'react';
import { FaqAccordion } from '@/components/ui/accordions/FaqAccordion';

export default function QuestionsSection() {
  const t = useTranslations('HomePage.questionsSection');
  const translatedQuestions = useMemo(() => {
    return (
      questions?.map(({ question, answer }) => ({
        question: t(question),
        answer: t.rich(answer, {
          i: () => <Check size="small" />,
          br: () => <br />,
        }),
      })) ?? []
    );
  }, [t]);
  return (
    <SectionLayout className="py-24">
      <div className="md:flex md:items-center md:justify-between">
        <div className="max-md:mb-12 md:w-4/12">
          <H2>{t('title')}</H2>
          <p className="mb-12 text-lg md:mb-8">{t('description')}</p>
          <Button size="lg" className="w-max" asChild>
            <Link href="/contacts">{t('contactButton')}</Link>
          </Button>
        </div>
        <div className="md:w-7/12">
          <FaqAccordion items={translatedQuestions} />
        </div>
      </div>
    </SectionLayout>
  );
}
