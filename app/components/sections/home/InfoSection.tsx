import SectionLayout from '@/layouts/SectionLayout';
import man from '@/public/images/man.png';
import BgPhoto from '@/components/ui/BgPhoto';
import { Trans } from 'react-i18next/TransWithoutContext';
import { TFunction } from 'i18next';
import { H2 } from '@/components/ui/headings/HomePageHeadings';

export default function InfoSection({ t }: { t: Function & TFunction<'translation', undefined> }) {
    return (
        <SectionLayout bg="bg-white" className="pt-24">
            <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="md:w-6/12">
                    <H2>{t('info-section.title')}</H2>
                    <div className="text-muted-dark">
                        <Trans i18nKey="info-section.content" t={t} components={{ p: <p /> }}>
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
