import PackagePrice from '@/components/ui/packages/card/PackagePrice';
import PackageHeader from '@/components/ui/packages/card/PackageHeader';
import classNames from 'classnames';
import { useLocale, useTranslations } from 'next-intl';
import { Router, Engineering, Wifi } from '@mui/icons-material';
import PackageCardSection from '@/components/ui/packages/card/PackageCardSection';
import dynamic from 'next/dynamic';
import InternetSpeedFeature from '@/components/ui/packages/card/InternetSpeedFeature';
import { PackageAction } from '@/types/packages.types';
import Button from '@/components/ui/form/buttons/Button';
import PackageDetail from '@/components/ui/packages/card/PackageDetail';
import { useTranslationsContext } from '@/context/TranslationsContext';
import { Package } from '@/types/packages.types';

const Tooltip = dynamic(() => import('@/components/ui/overlay/Tooltip'));

export default function PackageCard({
  data: {
    id,
    name,
    provider,
    speed,
    infrustructure,
    technology,
    installation,
    price,
  },
  onActionClick,
  className,
}: {
  data: Package;
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

  return (
    <article data-id={id} className={cardClasses}>
      <div className="grid gap-0 lg:grid-cols-3">
        <PackageCardSection
          Icon={Wifi}
          className="border-b border-b-muted-light px-8 py-5 lg:col-span-2 lg:row-start-1 lg:border-r lg:border-r-muted-light"
        >
          <PackageHeader
            providerLogoSrc={provider.image_url}
            providerName={provider.name}
            packageName={name}
            className="mb-3"
          />
          <div className="mb-2 flex flex-wrap items-center gap-2 font-medium uppercase text-muted-dark">
            <InternetSpeedFeature
              type="download"
              speed={speed.download}
              units={t('units.speed')}
            />
            <InternetSpeedFeature
              type="upload"
              speed={speed.upload}
              units={t('units.speed')}
            />
            <Tooltip
              elementToInteract={
                <span className="rounded-md border border-primary px-1 py-0.5 font-semibold text-primary">
                  {infrustructure?.is_partner
                    ? infrustructure?.name
                    : technology}
                </span>
              }
              content={''}
            />
          </div>
        </PackageCardSection>
        <PackageCardSection className="px-8 py-3 max-lg:border-b max-lg:border-b-muted-light lg:col-span-2 lg:row-start-2 lg:border-r lg:border-r-muted-light">
          <div className="flex flex-wrap gap-3">
            <PackageDetail Icon={Engineering}>
              <>
                {installation.visit_fee > 0
                  ? t('details.installation.minPrice', {
                      visit_fee: installation.visit_fee,
                    })
                  : t('details.installation.free')}
              </>
            </PackageDetail>
            <PackageDetail Icon={Router}>
              <>rent</>
            </PackageDetail>
          </div>
        </PackageCardSection>
        <PackageCardSection className="flex flex-col items-center justify-center gap-1 p-4 lg:row-span-2">
          <PackagePrice
            price={price}
            discount={{
              discount_price: null,
              discount_duration: null,
            }}
          />
        </PackageCardSection>
      </div>
      <div className="flex">
        <Button
          className="w-full rounded-t-none rounded-br-none"
          onClick={() => onActionClick('connection')}
        >
          {t('buttons.connect')}
        </Button>
        <Button
          variant="outlined"
          className="w-full rounded-t-none rounded-bl-none"
          onClick={() => onActionClick('details')}
        >
          {t('buttons.details')}
        </Button>
      </div>
    </article>
  );
}
