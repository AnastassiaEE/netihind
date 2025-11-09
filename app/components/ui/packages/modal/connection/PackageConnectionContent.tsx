import Image from 'next/image';
import PackageModalSection from '@/components/ui/packages/modal/PackageModalSection';
import HomeIcon from '@mui/icons-material/Home';
import { useTranslations } from 'next-intl';
import PackageForm from '@/components/ui/form/forms/PackageForm';

export default function PackageConnectionContent({
  packageData,
  address,
}: {
  packageData?: { [key: string]: any };
  address: string;
}) {
  const t = useTranslations('Packages');

  const priceRowClasses = 'flex items-center justify-between mb-1';

  return (
    <div className="flex flex-col space-x-6 md:flex-row">
      <div className="max-md:order-2 md:w-7/12">
        <PackageModalSection
          title={t('modals.connection.sections.fillForm')}
          className="bg-white"
        >
          <p className="mb-4">
            <HomeIcon className="mr-1 inline align-sub text-primary" />
            {address}
          </p>
          <PackageForm
            action="connection"
            address={address}
            packageData={packageData}
          />
        </PackageModalSection>
      </div>
      <div className="space-y-6 md:w-5/12">
        <PackageModalSection
          title={t('modals.connection.sections.selectedPackage') + ':'}
          className="bg-white"
        >
          <Image
            src={
              packageData?.provider_img_url ||
              'https://rxysmdetqttpdqfmrpym.supabase.co/storage/v1/object/public/website-logos//gradientmainlogo.png'
            }
            alt={`Selected package provider logo - ${packageData?.provider_name}`}
            width={50}
            height={32}
            className="mr-3 inline"
          />
          <p className="inline align-middle">
            {packageData?.internet_package_name}
          </p>
        </PackageModalSection>
        <PackageModalSection
          title={t('modals.connection.sections.total') + ':'}
          className="bg-white"
        >
          {packageData?.discount_price ? (
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
          ) : (
            // Without Discount
            <p className={priceRowClasses}>
              <span className="font-medium">{t(`details.packagePrice`)}:</span>
              <span className="text-xl font-bold">
                {packageData?.internet_package_price} €
              </span>
            </p>
          )}
          {/* Connection */}
          <p className={priceRowClasses}>
            {/* {packageData?.installation_min_price !== null && (
              <>
                <span className="text-sm font-medium">
                  {t('details.installation')}:
                </span>
                <span className="text-sm">
                  {packageData?.installation_min_price > 0
                    ? t('installation.minPrice', {
                        price: packageData?.installation_min_price,
                      })
                    : t('installation.free')}
                </span>
              </>
            )} */}
          </p>
        </PackageModalSection>
      </div>
    </div>
  );
}
