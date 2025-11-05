import PackagePrice from '@/components/ui/packages/card/PackagePrice';
import PackageHeader from '@/components/ui/packages/card/PackageHeader';
import classNames from 'classnames';
import { useLocale, useTranslations } from 'next-intl';
import { Router, Engineering, Wifi } from '@mui/icons-material';
import PackageCardSection from '@/components/ui/packages/card/PackageCardSection';
import dynamic from 'next/dynamic';
import InternetSpeedFeature from '@/components/ui/packages/card/InternetSpeedFeature';
import { PackageAction } from '@/types/elements.types';
import useAccordion from '@/hooks/useAccordion';
import Button from '@/components/ui/form/buttons/Button';
import Arrow from '@/components/ui/icons/Arrow';
import PackageDetail from '@/components/ui/packages/card/PackageDetail';
import CircleArrow from '@/components/ui/icons/CircleArrow';
import { useTranslationsContext } from '@/context/TranslationsContext';

const Tooltip = dynamic(() => import('@/components/ui/overlay/Tooltip'));

export default function PackageCard({
  data: {
    id,
    name,
    description,
    download_speed,
    upload_speed,
    data,
    technology,
    provider_name,
    provider_image_url,
    infrastructure_provider_name,
    is_infrastructure_provider_partner,
    price,
  },
  onActionClick,
  className,
}: {
  data: {
    id: number;
    name: string;
    description: string | null;
    download_speed: number;
    upload_speed: number;
    data: number;
    technology: string;
    provider_name: string;
    provider_image_url: string | null;
    infrastructure_provider_name: string | null;
    is_infrastructure_provider_partner: boolean | null;
    price: number;
  };
  onActionClick: (action: PackageAction) => void;
  className?: string;
}) {
  const t = useTranslations('Packages');
  const translations = useTranslationsContext();
  const currentLocale = useLocale();

  const cardClasses = classNames(
    'rounded-md border border-muted-light bg-white shadow-md',
    className,
  );

  const {
    isVisible,
    collapsibleRef,
    getArrowProps,
    getButtonProps,
    getPanelProps,
  } = useAccordion();

  return (
    <article data-id={id} className={cardClasses}>
      <div className="flex flex-wrap">
        <PackageCardSection
          Icon={Wifi}
          className="w-full max-lg:border-b lg:w-3/5 lg:border-r"
        >
          <PackageHeader
            providerLogoSrc={provider_image_url}
            providerName={provider_name}
            packageName={name}
            className="mb-3"
          />
          <div className="mb-2 flex flex-wrap items-center gap-2 font-medium uppercase text-muted-dark">
            <InternetSpeedFeature
              type="download"
              speed={download_speed}
              units={t('units.speed')}
            />
            <InternetSpeedFeature
              type="upload"
              speed={upload_speed}
              units={t('units.speed')}
            />
            <Tooltip
              elementToInteract={
                <span className="rounded-md border border-primary px-1 py-0.5 font-semibold text-primary">
                  {is_infrastructure_provider_partner
                    ? infrastructure_provider_name
                    : technology}
                </span>
              }
              content={''}
            />
          </div>
          {/* {installation_min_price !== null && (
            <p className="text-sm">
              {t('details.installation')}:{' '}
              {installation_min_price > 0
                ? t('installation.minPrice', { price: installation_min_price })
                : t('installation.free')}
            </p>
          )} */}
        </PackageCardSection>
        <PackageCardSection className="flex w-full flex-col items-center justify-center gap-1 lg:w-2/5">
          <PackagePrice
            price={price}
            discount={{
              discount_price: null,
              discount_duration: null,
            }}
          />
          <button
            {...getButtonProps()}
            className="absolute right-4 top-1/2 -translate-y-1/2 lg:hidden"
          >
            <CircleArrow {...getArrowProps()} className="bg-primary-light" />
          </button>
          <Button
            variant="text"
            {...getButtonProps()}
            className="!pb-0 max-lg:hidden"
          >
            {t('buttons.showDetails')} <Arrow {...getArrowProps()} />
          </Button>
        </PackageCardSection>
      </div>
      {isVisible && (
        <div {...getPanelProps()}>
          <div
            ref={collapsibleRef}
            className="flex flex-wrap gap-5 border-t p-6"
          >
            {/* {installation_description && (
              <PackageDetail
                Icon={Engineering}
                title={t('details.installation')}
              >
                <>
                  {translations[installation_description]?.[currentLocale] ??
                    installation_description}
                </>
              </PackageDetail>
            )} */}

            {/* <PackageDetail Icon={Router} title={t('details.equipment')}>
              <>test 1</>
              <>test 2</>
            </PackageDetail> */}
          </div>
        </div>
      )}
      <Button
        className="w-full rounded-t-none"
        onClick={() => onActionClick('connection')}
      >
        {t('buttons.connect')}
      </Button>
    </article>
  );
}
