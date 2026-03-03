import { Engineering, Router } from '@mui/icons-material';
import PackageCardDetail from '@/components/ui/packages/card/PackageCardDetail';
import { Package } from '@/types/packages.types';
import { useTranslations } from 'next-intl';
import { getEquipmentMinPricesByPayment } from '@/utils/packagesHelper';
import { formatMoney } from '@/utils/numberFormatter';
import { translateKey } from '@/utils/translationHelper';

interface PackageCardDetailsSectionProps extends Pick<
  Package,
  'installation' | 'equipment'
> {
  className?: string;
}

export default function PackageCardDetailsSection({
  installation,
  equipment,
  className,
}: PackageCardDetailsSectionProps) {
  const t = useTranslations('Packages.details');

  const equipmentMinPrices = getEquipmentMinPricesByPayment(equipment);
  const firstPaymentType = Object.keys(equipmentMinPrices)[0];
  const firstPrice = formatMoney(equipmentMinPrices[firstPaymentType]);

  return (
    <div className={className}>
      <div className="flex flex-wrap gap-x-3 gap-y-1">
        {installation && (
          <PackageCardDetail Icon={Engineering}>
            <>
              {installation.visit_fee > 0
                ? t('installation.minPrice', {
                    visit_fee: installation.visit_fee,
                  })
                : t('installation.free')}
            </>
          </PackageCardDetail>
        )}
        {equipment.length > 0 && (
          <PackageCardDetail Icon={Router}>
            {translateKey(t, `equipment.${firstPaymentType}MinPrice`, {
              [`${firstPaymentType}_fee`]: firstPrice,
            })}
          </PackageCardDetail>
        )}
      </div>
    </div>
  );
}
