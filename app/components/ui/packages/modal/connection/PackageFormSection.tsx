import PackageForm from '@/components/ui/form/forms/PackageForm';
import PackageModalSection from '@/components/ui/packages/modal/PackageModalSection';
import { Package } from '@/types/packages.types';
import HomeIcon from '@mui/icons-material/Home';
import { useTranslations } from 'next-intl';

export default function PackageFormSection({
  address,
  packageData,
}: {
  address: string;
  packageData?: Package;
}) {
  const t = useTranslations('Packages.modals.connection.sections');
  return (
    <PackageModalSection title={t('fillForm')} className="bg-white">
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
  );
}
