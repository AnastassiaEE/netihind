import { Package } from '@/types/packages.types';
import PackageFormSection from '@/components/ui/packages/modal/connection/PackageFormSection';
import PackageDescriptionSection from '@/components/ui/packages/modal/connection/PackageDescriptionSection';
import PackagePriceSection from '@/components/ui/packages/modal/connection/PackagePriceSection';

export default function PackageConnectionContent({
  packageData,
  address,
}: {
  packageData?: Package;
  address: string;
}) {
  return (
    <div className="flex flex-col md:flex-row md:space-x-6">
      <div className="max-md:order-2 max-md:mt-6 md:w-7/12">
        <PackageFormSection address={address} packageData={packageData} />
      </div>
      <div className="space-y-6 md:w-5/12">
        <PackageDescriptionSection packageData={packageData} />
        <PackagePriceSection packageData={packageData} />
      </div>
    </div>
  );
}
