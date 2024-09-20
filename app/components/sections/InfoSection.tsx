'use client';

import SectionLayout from '@/layouts/SectionLayout';
import man from '@/public/images/man.png';
import BgPhoto from '@/components/ui/BgPhoto';
import { Trans, useTranslation } from 'react-i18next';

export default function InfoSection() {
    const { t } = useTranslation();
    return (
        <SectionLayout bg="bg-white" className="pt-24">
            <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="md:w-6/12">
                    <h2 className="text-[calc(1.375rem+1.5vw)] md:text-4xl font-extrabold mb-6">
                        {t('info-section.title')}
                    </h2>
                    <div className="text-muted-dark">
                        <Trans i18nKey="info-section.content" components={{ p: <p /> }}>
                            {t('info-section.content')}
                        </Trans>
                    </div>
                </div>
                <div className="md:w-5/12">
                    <BgPhoto src={man} />
                </div>
            </div>
        </SectionLayout>
    );
}
