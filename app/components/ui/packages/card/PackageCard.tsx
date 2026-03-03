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
    'border-muted-light relative rounded-md border bg-white shadow-md',
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
          className="border-muted-light px-8 py-5 lg:col-span-2 lg:row-start-1 lg:border-r"
        />
        {hasDiscountCampaigns && (
          <PackageCardCampaignSection
            discount_campaigns={discount_campaigns}
            className="border-muted-light px-8 pb-3 lg:col-span-2 lg:row-start-2 lg:border-r"
          />
        )}
        <PackageCardDetailsSection
          installation={installation}
          equipment={equipment}
          className="muted-light border-r-muted-light border-t px-8 py-3 lg:col-span-2 lg:row-start-3 lg:border-r"
        />
        <PackageCardPriceSection
          price={price}
          discount={discount}
          className="border-muted-light flex flex-col items-center justify-center gap-1 p-4 max-lg:border-t lg:row-span-3"
        />
      </div>
      <PackageCardActions onActionClick={onActionClick} className="flex" />
    </article>
  );
}
