import { Package } from '@/types/packages.types';
import PackageModalSection from '@/components/ui/packages/modal/PackageModalSection';
import { useTranslations } from 'next-intl';

export default function PackagePriceSection({
  packageData,
}: {
  packageData?: Package;
}) {
  const t = useTranslations('Packages');
  const priceRowClasses = 'flex items-center justify-between mb-1';
  return (
    <PackageModalSection
      title={t('modals.connection.sections.total') + ':'}
      className="bg-white"
    >
      {/* {packageData?.discount_price ? (
        // With Discount
        <>
          <p className={priceRowClasses}>
            <span className="font-medium">
              {t('discount.duration', {
                months: packageData?.discount_duration,
              })}
              :
            </span>
            <span className="text-xl font-bold">
              {packageData?.discount_price} €
            </span>
          </p>
          <p className={priceRowClasses}>
            <span className="text-sm font-medium">
              {t('discount.durationEnd', {
                months: Number(packageData?.discount_duration) + 1,
              })}
              :
            </span>
            <span className="text-sm font-bold">
              {packageData?.internet_package_price} €
            </span>
          </p>
        </>
      ) : ( */}
      {/* // Without Discount */}
      <p className={priceRowClasses}>
        <span className="font-medium">{t('details.packagePrice')}:</span>
        <span className="text-xl font-bold">{packageData?.price} €</span>
      </p>
      <p className="text-sm">+ {t('details.installation.label')}</p>
      <p className="text-sm">+ {t('details.equipment.label')}</p>
      {/* )} */}
      {/* Connection */}
      {/* <p className={priceRowClasses}>
        {}
      </p> */}
    </PackageModalSection>
  );
}
