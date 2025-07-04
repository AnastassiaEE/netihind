'use client';

import PackagesLoader from '@/components/ui/loaders/PackagesLoader';
import usePackages from '@/hooks/usePackages';
import { useTranslations } from 'next-intl';
import PackageCard from '@/components/ui/packages/PackageCard';
import PackagesError from '@/components/ui/errors/PackagesError';
import { Link } from '@/i18n/routing';
import Dialog from '@/components/ui/overlay/Dialog';
import useOverlay from '@/hooks/useOverlay';
import PackageRequestContent from '@/components/ui/packages/PackageRequestContent';

export default function Packages({
  oid,
  address,
  sortOption,
  providers,
  technologies,
}: {
  oid: string;
  address: string;
  sortOption: string;
  providers: string[];
  technologies: string[];
}) {
  const t = useTranslations('Packages');

  const {
    packages,
    error,
    isLoading,
    selectedPackage,
    requestType,
    handleActionClick,
  } = usePackages(oid, sortOption, providers, technologies);

  const {
    isOpened: isModalOpened,
    open: openModal,
    close: closeModal,
    overlayRef: modalRef,
  } = useOverlay();

  const errorContent = (error: string) => (
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

  if (isLoading) return <PackagesLoader />;
  if (error) return errorContent(error.message);

  return (
    <>
      <div>
        {packages.map((data: { [key: string]: any }) => (
          <PackageCard
            key={data.internet_package_id}
            data={data}
            className="mb-5 last:mb-0"
            handleActionClick={(action) =>
              handleActionClick(data, action, openModal)
            }
          />
        ))}
      </div>
      <Dialog
        name={requestType}
        title={t(`request.${requestType}.title`)}
        description={t(`request.${requestType}.description`)}
        isOpened={isModalOpened}
        handleClose={closeModal}
        dialogRef={modalRef}
        className="bg-primary-light"
      >
        <PackageRequestContent
          requestType={requestType}
          data={selectedPackage}
          address={address}
        />
      </Dialog>
    </>
  );
}
