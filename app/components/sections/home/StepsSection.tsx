import SectionLayout from '@/layouts/SectionLayout';
import Steps from '@/components/ui/steps/Steps';
import Step from '@/components/ui/steps/Step';
import steps from '@/data/steps';
import { H2 } from '@/components/ui/headings/HomePageHeadings';
import { i18n } from 'i18next';

export default function StepsSection({ i18n }: { i18n: i18n }) {
    return (
        <SectionLayout className="pt-24">
            <H2 className="text-center">{i18n.t('steps-section.title')}</H2>
            <p className="text-lg text-center mb-12">{i18n.t('steps-section.description')}</p>
            <Steps>
                {steps.map((_, index) => {
                    return (
                        <Step
                            key={index}
                            index={index + 1}
                            title={i18n.t(steps[index].title)}
                            description={i18n.t(steps[index].description)}
                        />
                    );
                })}
            </Steps>
        </SectionLayout>
    );
}
