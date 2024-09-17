'use client'

import MdxLayout from "@/layouts/MdxLayout";
import SectionLayout from "@/layouts/SectionLayout";
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";
import PingLoader from "../loaders/PingLoader";

export default function AboutSection({locale}: {locale: string}) {
    const { t } = useTranslation('about');
    const AboutMdxEt = dynamic(() => import(''+'@/markdown/et/about.mdx'), {loading: () => <PingLoader/>}) 
    const AboutMdxRu = dynamic(() => import(''+'@/markdown/ru/about.mdx'), {loading: () => <PingLoader/>}) 
    return (
        <SectionLayout>
            <h1 className="text-[calc(1.375rem+1.5vw)] md:text-4xl font-extrabold mb-10">{t('title')}</h1>
            <MdxLayout>
                {locale === 'et' && <AboutMdxEt/>}
                {locale === 'ru' && <AboutMdxRu/>}
            </MdxLayout>
        </SectionLayout>
    )
}