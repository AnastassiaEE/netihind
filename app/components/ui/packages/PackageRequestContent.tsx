import Image from 'next/image';
import PackageRequestSection from '@/components/ui/packages/PackageRequestSection';
import HomeIcon from '@mui/icons-material/Home';
import RequestForm from '@/components/ui/form/forms/RequestForm';
import { useTranslations } from 'next-intl';

export default function PackageRequestContent({
  requestType,
  data,
  address,
}: {
  requestType: 'connection' | 'consultation';
  data: { [key: string]: any } | null;
  address: string;
}) {
  const t = useTranslations('Packages');
  const getSectionTitle = (section: string) =>
    t(`request.${requestType}.sections.${section}`);

  const formSection = (
    <PackageRequestSection title={getSectionTitle('fillForm')}>
      <p className="mb-4">
        <HomeIcon className="mr-1 inline align-sub text-primary" />
        {address}
      </p>
      <RequestForm type={requestType} address={address} packageData={data} />
    </PackageRequestSection>
  );

  const packadeDetailsSection = (
    <PackageRequestSection
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
    </PackageRequestSection>
  );

  if (requestType === 'connection')
    return (
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="max-md:order-2 md:w-7/12">{formSection}</div>
        <div className="md:w-5/12">
          {packadeDetailsSection}
          <PackageRequestSection title={getSectionTitle('total') + ':'}>
            {data?.discount_price ? (
              <>
                <p className="mb-2 flex items-center justify-between">
                  <span className="font-medium">
                    {t('discount.duration', {
                      months: data?.discount_duration,
                    })}
                    :
                  </span>
                  <span className="text-2xl font-bold">
                    {data?.discount_price} €
                  </span>
                </p>
                <p className="flex items-center justify-between">
                  <span className="font-medium">
                    {t('discount.durationEnd', {
                      months: Number(data?.discount_duration) + 1,
                    })}
                    :
                  </span>
                  <span className="text-xl font-medium">
                    {data?.internet_package_price} €
                  </span>
                </p>
              </>
            ) : (
              <p className="flex items-center justify-between">
                <span className="font-medium">
                  {t(`request.${requestType}.details.packagePrice`)}:
                </span>
                <span className="text-2xl font-bold">
                  {data?.internet_package_price} €
                </span>
              </p>
            )}
          </PackageRequestSection>
        </div>
      </div>
    );
  if (requestType === 'consultation') {
    return (
      <>
        {packadeDetailsSection}
        {formSection}
      </>
    );
  }
}
