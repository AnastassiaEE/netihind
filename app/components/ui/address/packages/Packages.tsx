'use client';

import PackagesLoader from '@/components/ui/loaders/PackagesLoader';
import usePackages from '@/hooks/usePackages';
import { useTranslations } from 'next-intl';
import PackageCard from '@/components/ui/address/packages/PackageCard';
import PackagesError from '@/components/ui/errors/PackagesError';
import { Link } from '@/i18n/routing';
import Modal from '@/components/ui/modal/Modal';
import useOverlay from '@/hooks/useOverlay';
import PackageRequestContent from './PackageRequestContent';

export default function Packages({
    oid,
    initialPackages,
    initialError,
    sortOption,
    providers,
    technologies,
}: {
    oid: string;
    initialPackages: { [key: string]: any }[];
    initialError: string | null;
    sortOption: string;
    providers: string[];
    technologies: string[];
}) {
    const t = useTranslations('AddressPage');

    const { packages, error, isLoading, selectedPackage, request, handlePackageButtonClick } =
        usePackages(oid, initialPackages, sortOption, providers, technologies);

    const {
        isOverlayVisible: isModalOpened,
        openOverlay: openModal,
        closeOverlay: closeModal,
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
    if (initialError) return errorContent(initialError);
    if (error) return errorContent(error);

    return (
        <>
            <div>
                {packages.map((data: { [key: string]: any }) => (
                    <PackageCard
                        key={data.internet_package_id}
                        data={data}
                        className="mb-5"
                        handleButtonClick={(action) => handlePackageButtonClick(data, action, openModal)}
                    />
                ))}
            </div>
            <Modal title={request} isOpened={isModalOpened} handleClose={closeModal} ref={modalRef}>
                <PackageRequestContent type={request} packageData={selectedPackage} />
            </Modal>
        </>
    );
}
