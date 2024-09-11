'use client'

import SectionLayout from "@/layouts/SectionLayout";
import Accordion from "@/components/ui/accordion/Accordion";
import questions from "@/data/questions";
import { useTranslation } from "react-i18next";

export default function QuestionsSection() {
    const { t } = useTranslation();
    return (
        <SectionLayout bg="bg-white" className="py-24">
            <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="md:w-4/12">
                    <h2 className="text-4xl font-extrabold mb-6"> {t('questions-section.title')} </h2>
                    <div className="text-muted-dark text-lg max-md:mb-12">
                        <p>{t('questions-section.description')}</p>
                    </div>
                </div>
                <div className="md:w-7/12">
                    <Accordion items={questions}/>
                </div>
            </div>
        </SectionLayout>
    )
}