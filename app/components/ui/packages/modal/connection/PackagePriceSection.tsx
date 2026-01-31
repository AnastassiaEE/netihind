import { Package } from '@/types/packages.types';
import PackageModalSection from '@/components/ui/packages/modal/PackageModalSection';
import { useTranslations } from 'next-intl';
import { formatMoney } from '@/utils/numberFormatter';

export default function PackagePriceSection({
  packageData,
}: {
  packageData?: Package;
}) {
  const t = useTranslations('Packages');
  const priceRowClasses = 'flex items-center justify-between mb-1';
  const { price, discount } = packageData || {};

  return (
    <PackageModalSection
      title={t('modals.connection.sections.total') + ':'}
      className="bg-white"
    >
      {/* { With a discount } */}
      {discount && (
        <>
          <p className={priceRowClasses}>
            <span className="font-medium">{t('details.price.label')}:</span>
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-xl font-extrabold text-transparent">
              {formatMoney(discount.price)} €
            </span>
          </p>
          <p className={priceRowClasses}>
            <span className="text-sm font-bold line-through">
              {formatMoney(price)} €
            </span>
          </p>
        </>
      )}

      <p className="text-sm">+ {t('details.installation.label')}</p>
      <p className="text-sm">+ {t('details.equipment.label')}</p>
    </PackageModalSection>
  );
}
