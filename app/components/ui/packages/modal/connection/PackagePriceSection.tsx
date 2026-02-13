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
  const { price, discount } = packageData || {};

  return (
    <PackageModalSection
      title={t('modals.connection.sections.total') + ':'}
      className="bg-white"
    >
      {/* { With a discount } */}
      {discount && (
        <>
          <p className="flex items-center justify-between">
            <span className="font-medium">
              {`${t('details.price.label')}:`}
            </span>
            <span className="bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-xl font-extrabold text-transparent">
              {`${formatMoney(discount.price)} €`}
            </span>
          </p>
          <p className="mb-1 text-right">
            <span aria-hidden="true" className="text-sm font-bold line-through">
              {formatMoney(price)} €
            </span>
            <span className="sr-only">
              {t('details.price.regularPrice', { price: formatMoney(price) })}
            </span>
          </p>
        </>
      )}

      <p className="text-sm">{`+ ${t('details.installation.label')}`}</p>
      <p className="text-sm">{`+ ${t('details.equipment.label')}`}</p>
    </PackageModalSection>
  );
}
