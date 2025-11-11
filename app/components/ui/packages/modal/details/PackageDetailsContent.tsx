import PackageModalSection from '@/components/ui/packages/modal/PackageModalSection';
import PackageDescriptionSection from '@/components/ui/packages/modal/details/PackageDescriptionSection';
import PackageInstallationSection from '@/components/ui/packages/modal/details/PackageInstallationSection';
import { Package } from '@/types/packages.types';

export default function PackageDetailsContent({
  packageData,
}: {
  packageData?: Package;
}) {
  return (
    <div className="space-y-4">
      <PackageDescriptionSection speed={packageData?.speed} />
      <PackageInstallationSection installation={packageData?.installation} />
      <PackageModalSection title={'Устройства'} className="bg-white">
        <div></div>
      </PackageModalSection>
    </div>
  );
}
