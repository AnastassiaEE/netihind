import Image from 'next/image';
import PackageActionSection from '@/components/ui/packages/action/PackageActionSection';
import HomeIcon from '@mui/icons-material/Home';
import { useTranslations } from 'next-intl';
import PackageActionForm from '@/components/ui/form/forms/PackageActionForm';
import { PackageAction } from '@/types/elements.types';

export default function PackageActionContent({
  action,
  data,
  address,
}: {
  action: PackageAction;
  data: { [key: string]: any } | null;
  address: string;
}) {
  const t = useTranslations('Packages');
  const getSectionTitle = (section: string) =>
    t(`actions.${action}.sections.${section}`);

  const formSection = (
    <PackageActionSection title={getSectionTitle('fillForm')}>
      <p className="mb-4">
        <HomeIcon className="mr-1 inline align-sub text-primary" />
        {address}
      </p>
      <PackageActionForm action={action} address={address} packageData={data} />
    </PackageActionSection>
  );

  const packadeDetailsSection = (
    <PackageActionSection
      title={getSectionTitle('selectedPackage') + ':'}
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
  );

  const priceRowClasses = 'flex items-center justify-between mb-1';

  if (action === 'connection')
    return (
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="max-md:order-2 md:w-7/12">{formSection}</div>
        <div className="md:w-5/12">
          {packadeDetailsSection}
          <PackageActionSection title={getSectionTitle('total') + ':'}>
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
                <span className="font-medium">
                  {t(`details.packagePrice`)}:
                </span>
                <span className="text-xl font-bold">
                  {data?.internet_package_price} €
                </span>
              </p>
            )}
            {/* Connection */}
            <p className={priceRowClasses}>
              {data?.connection_min_price !== null && (
                <>
                  <span className="text-sm font-medium">
                    {t('details.connection')}:
                  </span>
                  <span className="text-sm">
                    {data?.connection_min_price > 0
                      ? t('connection.minPrice', {
                          price: data?.connection_min_price,
                        })
                      : t('connection.free')}
                  </span>
                </>
              )}
            </p>
          </PackageActionSection>
        </div>
      </div>
    );
  if (action === 'consultation') {
    return (
      <>
        {packadeDetailsSection}
        {formSection}
      </>
    );
  }
}
