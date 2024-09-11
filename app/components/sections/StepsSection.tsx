'use client'

import SectionLayout from "@/layouts/SectionLayout";
import Steps from "@/components/ui/steps/Steps";
import Step from "@/components/ui/steps/Step";
import steps from "@/data/steps"
import { useTranslation } from "react-i18next";

export default function StepsSection() {
    const { t } = useTranslation();
    return (
        <SectionLayout bg="white" className="pt-24">
            <h2 className="text-4xl font-extrabold text-center mb-6"> {t('steps-section.title')} </h2>
            <p className="text-muted-dark text-lg text-center mb-12">{t('steps-section.description')}</p>
            <Steps>
                {steps.map((_, index) => {
                    return (
                        <Step key={index} index={index + 1}> 
                            <>{t(steps[index].title)}</>
                            <>{t(steps[index].description)}</>
                        </Step>
                    )
                })}
            </Steps>
        </SectionLayout>
    )
}