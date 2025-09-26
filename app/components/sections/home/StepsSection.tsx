import SectionLayout from '@/layouts/SectionLayout';
import Steps from '@/components/ui/steps/Steps';
import steps from '@/data/steps';
import { H2 } from '@/components/ui/headings/HomePageHeadings';
import { useTranslations } from 'next-intl';

export default function StepsSection() {
  const t = useTranslations('HomePage');
  const translatedSteps = steps.map((step) => ({
    title: t(step.title),
    description: t(step.description),
  }));
  return (
    <SectionLayout className="pt-24">
      <H2 className="text-center">{t('stepsSection.title')}</H2>
      <p className="mb-12 text-center text-lg">
        {t('stepsSection.description')}
      </p>
      <Steps data={translatedSteps} />
    </SectionLayout>
  );
}
