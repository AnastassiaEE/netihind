import { Package, PackageAction } from '@/types/packages.types';
import Dialog from '@/components/ui/overlay/Dialog';
import { useTranslations } from 'next-intl';
import { RefObject } from 'react';
import PackageConnectionContent from '@/components/ui/packages/modal/connection/PackageConnectionContent';
import PackageDetailsContent from '@/components/ui/packages/modal/details/PackageDetailsContent';

export default function PackageModal({
  action,
  isOpnened,
  onClose,
  ref,
  selectedPackage,
  address,
}: {
  action: PackageAction;
  isOpnened: boolean;
  onClose: () => void;
  ref: RefObject<HTMLDivElement | null>;
  selectedPackage?: Package;
  address: string;
}) {
  const t = useTranslations('Packages.modals');
  return (
    <Dialog
      name={action}
      title={action === 'connection' ? t(`${action}.title` as any) : undefined}
      isOpened={isOpnened}
      onClose={onClose}
      dialogRef={ref}
      className="bg-primary-light"
    >
      {action == 'connection' && (
        <PackageConnectionContent
          packageData={selectedPackage}
          address={address}
        />
      )}
      {action == 'details' && (
        <PackageDetailsContent packageData={selectedPackage} />
      )}
    </Dialog>
  );
}
