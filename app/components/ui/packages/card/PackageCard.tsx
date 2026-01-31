import classNames from 'classnames';
import { PackageAction } from '@/types/packages.types';
import { Package } from '@/types/packages.types';
import PackageCardHeaderSection from '@/components/ui/packages/card/sections/PackageCardHeaderSection';
import PackageCardDetailsSection from '@/components/ui/packages/card/sections/PackageCardDetailsSection';
import PackageCardPriceSection from '@/components/ui/packages/card/sections/PackageCardPriceSection';
import PackageCardActions from '@/components/ui/packages/card/PackageCardActions';
import { useTranslations } from 'next-intl';
import PackageCardCampaignSection from '@/components/ui/packages/card/sections/PackageCardCampaignSection';

export default function PackageCard({
  data,
  onActionClick,
  className,
}: {
  data: Package;
  onActionClick: (action: PackageAction) => void;
  className?: string;
}) {
  const t = useTranslations('Packages.details');
  const cardClasses = classNames(
    'rounded-md border border-muted-light bg-white shadow-md relative',
    className,
  );

  const {
    id,
    name,
    provider,
    speed,
    infrastructure,
    technology,
    installation,
    equipment,
    price,
    discount,
    discount_campaigns,
  } = data;

  const hasDiscountCampaigns =
    discount_campaigns && discount_campaigns.length > 0;

  return (
    <article data-id={id} className={cardClasses}>
      {(discount || hasDiscountCampaigns) && (
        <span className="absolute -top-3 right-5 rounded-md bg-yellow-400 px-3 py-1 text-sm font-medium">
          {t('discount.campaign')}
        </span>
      )}

      <div className="grid gap-0 lg:grid-cols-3">
        <PackageCardHeaderSection
          name={name}
          technology={technology}
          provider={provider}
          speed={speed}
          infrastructure={infrastructure}
          className="border-b border-b-muted-light px-8 py-5 lg:col-span-2 lg:row-start-1 lg:border-r lg:border-r-muted-light"
        />
        {hasDiscountCampaigns && (
          <PackageCardCampaignSection discount_campaigns={discount_campaigns} />
        )}
        <PackageCardDetailsSection
          installation={installation}
          equipment={equipment}
          className="px-8 py-3 max-lg:border-b max-lg:border-b-muted-light lg:col-span-2 lg:row-start-2 lg:border-r lg:border-r-muted-light"
        />
        <PackageCardPriceSection
          price={price}
          discount={discount}
          className="flex flex-col items-center justify-center gap-1 p-4 lg:row-span-2"
        />
      </div>
      <PackageCardActions onActionClick={onActionClick} className="flex" />
    </article>
  );
}
