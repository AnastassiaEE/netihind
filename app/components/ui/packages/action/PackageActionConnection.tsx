import Image from 'next/image';
import PackageActionSection from '@/components/ui/packages/action/PackageActionSection';
import HomeIcon from '@mui/icons-material/Home';
import { useTranslations } from 'next-intl';
import PackageActionForm from '@/components/ui/form/forms/PackageActionForm';

export default function PackageConnection({
  data,
  address,
}: {
  data: { [key: string]: any } | null;
  address: string;
}) {
  const t = useTranslations('Packages');

  const priceRowClasses = 'flex items-center justify-between mb-1';

  return (
    <div className="flex flex-col gap-6 md:flex-row">
      <div className="max-md:order-2 md:w-7/12">
        <PackageActionSection title={t('actions.connection.sections.fillForm')}>
          <p className="mb-4">
            <HomeIcon className="mr-1 inline align-sub text-primary" />
            {address}
          </p>
          <PackageActionForm
            action="connection"
            address={address}
            packageData={data}
          />
        </PackageActionSection>
      </div>
      <div className="md:w-5/12">
        <PackageActionSection
          title={t('actions.connection.sections.selectedPackage') + ':'}
          className="mb-6"
        >
          <Image
            src={
              data?.provider_img_url ||
              'https://rxysmdetqttpdqfmrpym.supabase.co/storage/v1/object/public/website-logos//gradientmainlogo.png'
            }
            alt={`Selected package provider logo - ${data?.provider_name}`}
            width={50}
            height={32}
            className="mr-3 inline"
          />
          <p className="inline align-middle">{data?.internet_package_name}</p>
        </PackageActionSection>
        <PackageActionSection
          title={t('actions.connection.sections.total') + ':'}
        >
          {data?.discount_price ? (
            // With Discount
            <>
              <p className={priceRowClasses}>
                <span className="font-medium">
                  {t('discount.duration', {
                    months: data?.discount_duration,
                  })}
                  :
                </span>
                <span className="text-xl font-bold">
                  {data?.discount_price} €
                </span>
              </p>
              <p className={priceRowClasses}>
                <span className="text-sm font-medium">
                  {t('discount.durationEnd', {
                    months: Number(data?.discount_duration) + 1,
                  })}
                  :
                </span>
                <span className="text-sm font-bold">
                  {data?.internet_package_price} €
                </span>
              </p>
            </>
          ) : (
            // Without Discount
            <p className={priceRowClasses}>
              <span className="font-medium">{t(`details.packagePrice`)}:</span>
              <span className="text-xl font-bold">
                {data?.internet_package_price} €
              </span>
            </p>
          )}
          {/* Connection */}
          <p className={priceRowClasses}>
            {data?.installation_min_price !== null && (
              <>
                <span className="text-sm font-medium">
                  {t('details.installation')}:
                </span>
                <span className="text-sm">
                  {data?.installation_min_price > 0
                    ? t('installation.minPrice', {
                        price: data?.installation_min_price,
                      })
                    : t('installation.free')}
                </span>
              </>
            )}
          </p>
        </PackageActionSection>
      </div>
    </div>
  );
}
