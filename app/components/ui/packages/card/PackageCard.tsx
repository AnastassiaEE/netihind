import PackagePrice from '@/components/ui/packages/card/PackagePrice';
import PackageHeader from '@/components/ui/packages/card/PackageHeader';
import PackageActions from '@/components/ui/packages/card/PackageActions';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import { Wifi } from '@mui/icons-material';
import PackageCardSection from '@/components/ui/packages/card/PackageCardSection';
import dynamic from 'next/dynamic';
import InternetSpeedFeature from '@/components/ui/packages/card/InternetSpeedFeature';
import { PackageAction } from '@/types/elements.types';

const Tooltip = dynamic(() => import('@/components/ui/overlay/Tooltip'));

export default function PackageCard({
  data: {
    internet_package_id,
    internet_package_name,
    provider_name,
    provider_img_url,
    internet_technology_abbr,
    internet_technology_description,
    internet_download_speed,
    internet_upload_speed,
    internet_package_price,
    discount_price,
    discount_duration,
    connection_min_price,
    connection_price_description,
  },
  onActionClick,
  className,
}: {
  data: { [key: string]: any };
  onActionClick: (action: PackageAction) => void;
  className?: string;
}) {
  const t = useTranslations('Packages');

  const cardClasses = classNames(
    'rounded-lg border border-muted-light bg-white shadow-md',
    className,
  );

  return (
    <article data-id={internet_package_id} className={cardClasses}>
      <div className="flex flex-wrap">
        <PackageCardSection
          Icon={Wifi}
          className="w-full border-b border-r lg:w-3/5"
        >
          <PackageHeader
            providerLogoSrc={provider_img_url}
            providerName={provider_name}
            packageName={internet_package_name}
            className="mb-3"
          />
          <div className="mb-2 flex flex-wrap items-center font-medium uppercase text-muted-dark">
            <InternetSpeedFeature
              type="download"
              speed={internet_download_speed}
              units={t('units.speed')}
            />
            <InternetSpeedFeature
              type="upload"
              speed={internet_upload_speed}
              units={t('units.speed')}
            />
            <Tooltip
              elementToInteract={
                <span className="ml-2 block rounded-md border border-primary px-1 py-0.5 font-semibold text-primary">
                  {internet_technology_abbr}
                </span>
              }
              content={internet_technology_description}
            />
          </div>
          {connection_min_price !== null && (
            <p className="text-sm">
              {connection_min_price > 0
                ? t('connection.minPrice', { price: connection_min_price })
                : t('connection.free')}
            </p>
          )}
        </PackageCardSection>
        <PackageCardSection className="flex w-full items-center justify-center lg:w-2/5">
          <PackagePrice
            price={internet_package_price}
            discount={{
              discount_price,
              discount_duration,
            }}
          />
        </PackageCardSection>
      </div>
      <PackageActions onActionClick={onActionClick} />
    </article>
  );
}
