import PackageModalSection from '@/components/ui/packages/modal/PackageModalSection';
import PackageDescriptionSection from '@/components/ui/packages/modal/details/PackageDescriptionSection';
import { Package } from '@/types/packages.types';
import { useTranslations } from 'next-intl';

export default function PackageDetailsContent({
  packageData,
}: {
  packageData: Package | null;
}) {
  return (
    <div className="space-y-4">
      <PackageDescriptionSection
        downloadSpeed={packageData?.download_speed}
        uploadSpeed={packageData?.upload_speed}
      />
      <PackageModalSection title={'Установка'} className="bg-white">
        <div></div>
      </PackageModalSection>
      <PackageModalSection title={'Устройства'} className="bg-white">
        <div></div>
      </PackageModalSection>
    </div>
  );
}
