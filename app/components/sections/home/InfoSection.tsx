import SectionLayout from '@/layouts/SectionLayout';
import man from '@/public/images/man.png';
import BgPhoto from '@/components/ui/BgPhoto';

import { H2 } from '@/components/ui/headings/HomePageHeadings';

export default function InfoSection() {
    return (
        <SectionLayout className="pt-24">
            <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="md:w-6/12">
                    <H2>{('info-section.title')}</H2>
                    {/* <Trans i18nKey="info-section.content" t={i18n.t} components={{ p: <p /> }}>
                        {i18n.t('info-section.content')}
                    </Trans> */}
                </div>
                <div className="md:w-5/12">
                    <BgPhoto src={man} />
                </div>
            </div>
        </SectionLayout>
    );
}
