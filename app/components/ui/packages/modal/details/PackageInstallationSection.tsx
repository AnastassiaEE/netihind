import PackageModalSection from '@/components/ui/packages/modal/PackageModalSection';
import { Package } from '@/types/packages.types';
import { useTranslations } from 'next-intl';

export default function PackageInstallationSection({
  installationData,
}: {
  installationData?: Package['installation'];
}) {
  const t = useTranslations('Packages');

  const {
    visit_fee = 0,
    additional_time = null,
    additional_time_fee = null,
  } = installationData ?? {};

  const richStrong = (chunks: React.ReactNode) => (
    <span className="font-bold">{chunks}</span>
  );

  return (
    <PackageModalSection
      title={t('modals.details.sections.installation')}
      className="bg-white"
    >
      <p>
        {visit_fee > 0
          ? t.rich('details.installation.paidVisit', {
              strong: richStrong,
              visit_fee,
            })
          : t.rich('details.installation.freeVisit', {
              strong: richStrong,
              visit_fee,
            })}
        {additional_time &&
          additional_time_fee &&
          t('details.installation.additionalTime', {
            additional_time,
            additional_time_fee,
          })}{' '}
        {t('details.installation.materials')}
      </p>
    </PackageModalSection>
  );
}
