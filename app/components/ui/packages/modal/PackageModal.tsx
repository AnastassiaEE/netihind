import { Package, PackageAction } from '@/types/packages.types';
import Dialog from '@/components/ui/overlay/Dialog';
import { useTranslations } from 'next-intl';
import { RefObject } from 'react';
import PackageConnectionContent from '@/components/ui/packages/modal/connection/PackageConnectionContent';
import PackageDetailsContent from '@/components/ui/packages/modal/details/PackageDetailsContent';
import { translateKey } from '@/utils/translationHelper';

export default function PackageModal({
  action,
  isMounted,
  isVisible,
  onClose,
  ref,
  selectedPackage,
  address,
}: {
  action: PackageAction;
  isMounted: boolean;
  isVisible: boolean;
  onClose: () => void;
  ref: RefObject<HTMLDivElement | null>;
  selectedPackage?: Package;
  address: string;
}) {
  const t = useTranslations('Packages.modals');
  return (
    <Dialog
      name={action}
      title={
        action === 'connection' ? translateKey(t, `${action}.title`) : undefined
      }
      isMounted={isMounted}
      isVisible={isVisible}
      onClose={onClose}
      dialogRef={ref}
      className="bg-primary-light xl:w-[calc(100vw-35%)]"
    >
      {action === 'connection' && (
        <PackageConnectionContent
          packageData={selectedPackage}
          address={address}
        />
      )}
      {action === 'details' && (
        <PackageDetailsContent packageData={selectedPackage} />
      )}
    </Dialog>
  );
}
