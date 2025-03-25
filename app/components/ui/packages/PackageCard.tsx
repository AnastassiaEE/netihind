import PackageFeature from '@/components/ui/packages/PackageFeature';
import PackagePrice from '@/components/ui/packages/PackagePrice';
import PackageHeader from '@/components/ui/packages/PackageHeader';
import PackageActions from '@/components/ui/packages/PackageActions';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import { Wifi } from '@mui/icons-material';
import PackageCardSection from '@/components/ui/packages/PackageCardSection';
import dynamic from 'next/dynamic';
import InternetSpeedFeature from '@/components/ui/packages/InternetSpeedFeature';

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
  },
  handleActionClick,
  className,
}: {
  data: { [key: string]: any };
  handleActionClick: (action: 'connection' | 'consultation') => void;
  className: string;
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
            logo_url={provider_img_url}
            provider={provider_name}
            name={internet_package_name}
          />
          <PackageFeature>
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
          </PackageFeature>
        </PackageCardSection>
        <PackageCardSection className="flex w-full items-center justify-center lg:w-2/5">
          <PackagePrice originalPrice={internet_package_price} />
        </PackageCardSection>
      </div>
      <PackageActions handleActionClick={handleActionClick} />
    </article>
  );
}
