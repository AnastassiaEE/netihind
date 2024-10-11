import SectionLayout from '@/layouts/SectionLayout';
import Steps from '@/components/ui/steps/Steps';
import Step from '@/components/ui/steps/Step';
import steps from '@/data/steps';
import { H2 } from '@/components/ui/headings/HomePageHeadings';
import { TFunction } from 'i18next';

export default function StepsSection({ t }: { t: Function & TFunction<'translation', undefined> }) {
    return (
        <SectionLayout bg="white" className="pt-24">
            <H2 className="text-center">{t('steps-section.title')}</H2>
            <p className="text-muted-dark text-lg text-center mb-12">{t('steps-section.description')}</p>
            <Steps>
                {steps.map((_, index) => {
                    return (
                        <Step key={index} index={index + 1}>
                            <>{t(steps[index].title)}</>
                            <>{t(steps[index].description)}</>
                        </Step>
                    );
                })}
            </Steps>
        </SectionLayout>
    );
}
