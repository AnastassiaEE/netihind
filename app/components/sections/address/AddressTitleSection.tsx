import { H1 } from '@/components/ui/headings/RestPageHeadings';
import SectionLayout from '@/layouts/SectionLayout';
import { useTranslations } from 'next-intl';

export default function AddressTitleSection({ address }: { address: string }) {
    const t = useTranslations('AddressPage');
    return (
        <SectionLayout>
            <H1>
                {t('providersSection.title')} <span className="text-primary">{address}</span>
            </H1>
        </SectionLayout>
    );
}
