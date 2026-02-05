import PackageDescriptionSection from '@/components/ui/packages/modal/details/PackageDescriptionSection';
import PackageInstallationSection from '@/components/ui/packages/modal/details/PackageInstallationSection';
import { Package } from '@/types/packages.types';
import PackageEquipmentSection from '@/components/ui/packages/modal/details/PackageEquipmentSection';
import { groupEquipmentByCombination } from '@/utils/packagesHelper';

export default function PackageDetailsContent({
  packageData,
}: {
  packageData?: Package;
}) {
  return (
    <div className="space-y-4">
      <PackageDescriptionSection
        speed={packageData?.speed}
        technology={packageData?.technology}
      />
      {packageData?.installation && (
        <PackageInstallationSection installation={packageData.installation} />
      )}

      <PackageEquipmentSection
        equipment={groupEquipmentByCombination(packageData?.equipment ?? [])}
      />
    </div>
  );
}
