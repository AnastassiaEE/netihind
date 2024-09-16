'use client'

import MdxLayout from "@/layouts/MdxLayout";
import SectionLayout from "@/layouts/SectionLayout";
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";

export default function AboutSection({locale}: {locale: string}) {
    const { t } = useTranslation('about');
    const Loading = () => <p>Loading</p>;
    const AboutMdxEt = dynamic(() => import(''+'@/markdown/et/about.mdx'), {loading: () => <Loading/>}) 
    const AboutMdxRu = dynamic(() => import(''+'@/markdown/ru/about.mdx'), {loading: () => <Loading/>}) 
    return (
        <SectionLayout>
            <h1 className="text-4xl font-extrabold mb-10">{t('title')}</h1>
            <MdxLayout>
                {locale === 'et' && <AboutMdxEt/>}
                {locale === 'ru' && <AboutMdxRu/>}
            </MdxLayout>
        </SectionLayout>
    )
}