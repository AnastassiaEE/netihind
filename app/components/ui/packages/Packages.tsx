'use client';

import PackagesLoader from '@/components/ui/loaders/PackagesLoader';
import usePackages from '@/hooks/packages/usePackages';
import { useTranslations } from 'next-intl';
import PackageCard from '@/components/ui/packages/card/PackageCard';
import PackagesError from '@/components/ui/errors/PackagesError';
import { Link } from '@/i18n/routing';
import useOverlay from '@/hooks/useOverlay';
import { Package } from '@/types/packages.types';
import PackageModal from '@/components/ui/packages/modal/PackageModal';

export default function Packages({
  oid,
  address,
  sortOption,
  providers,
  technologies,
  onLoaded,
}: {
  oid: string;
  address: string;
  sortOption: string;
  providers: string[];
  technologies: string[];
  onLoaded?: () => void;
}) {
  const t = useTranslations('Packages');

  const {
    packages,
    error,
    isLoading,
    selectedPackage,
    selectedAction,
    handleActionClick,
  } = usePackages(oid, sortOption, providers, technologies, onLoaded);

  const {
    isMounted: isModalMounted,
    isVisible: isModalVisible,
    open: openModal,
    close: closeModal,
    overlayRef: modalRef,
  } = useOverlay();

  const errorContent = (error: Parameters<typeof t.rich>[0]) => (
    <PackagesError>
      {t.rich(error, {
        a: (chunks) => (
          <Link href="/contacts" className="font-extrabold underline">
            {chunks}
          </Link>
        ),
      })}
    </PackagesError>
  );

  if (error) return errorContent(error.message);

  return (
    <>
      {isLoading ? (
        <PackagesLoader />
      ) : (
        <div>
          {packages.map((data: Package) => (
            <PackageCard
              key={data.id}
              data={data}
              className="mb-5 last:mb-0"
              onActionClick={(action) =>
                handleActionClick(data, action, openModal)
              }
            />
          ))}
        </div>
      )}
      <PackageModal
        action={selectedAction}
        isMounted={isModalMounted}
        isVisible={isModalVisible}
        onClose={closeModal}
        ref={modalRef}
        selectedPackage={selectedPackage}
        address={address}
      />
    </>
  );
}
