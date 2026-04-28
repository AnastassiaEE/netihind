import { useTranslations } from 'next-intl';
import PackageModalSection from '@/components/ui/packages/modal/PackageModalSection';
import { Package } from '@/types/packages.types';
import Image from 'next/image';

export default function PackageDescriptionSection({
  packageData,
}: {
  packageData?: Package;
}) {
  const t = useTranslations('Packages.modals.connection.sections');
  const { name, provider } = packageData || {};
  return (
    <PackageModalSection
      title={t('selectedPackage') + ':'}
      className="bg-white"
    >
      <Image
        src={
          packageData?.provider.image_url ||
          'https://rxysmdetqttpdqfmrpym.supabase.co/storage/v1/object/public/website-logos//gradientmainlogo.png'
        }
        alt={`Selected package provider logo - ${provider?.name}`}
        width={50}
        height={32}
        className="mr-3 inline"
      />
      <p className="inline align-middle">{name}</p>
    </PackageModalSection>
  );
}
