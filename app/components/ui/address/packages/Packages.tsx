'use client';

import PackagesLoader from '@/components/ui/loaders/PackagesLoader';
import usePackages from '@/hooks/usePackages';
import { useTranslations } from 'next-intl';
import PackageCard from '@/components/ui/address/packages/PackageCard';
import PackagesError from '@/components/ui/errors/PackagesError';
import { Link } from '@/i18n/routing';
import Modal from '@/components/ui/modal/Modal';
import useOverlay from '@/hooks/useOverlay';
import { useState } from 'react';
import Image from 'next/image';

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

    const { packages, error, isLoading } = usePackages(
        oid,
        initialPackages,
        sortOption,
        providers,
        technologies,
    );

    const {
        isOverlayVisible: isModalOpened,
        openOverlay: openModal,
        closeOverlay: closeModal,
        overlayRef: modalRef,
    } = useOverlay();

    const [selectedPackage, setSelectedPackage] = useState<{ [key: string]: any } | null>(null);

    const handlePackageButtonClick = (packageData: { [key: string]: any }) => {
        setSelectedPackage(packageData);
        openModal();
    };

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
                        handleButtonClick={() => handlePackageButtonClick(data)}
                    />
                ))}
            </div>
            <Modal title="Подключение" isOpened={isModalOpened} handleClose={closeModal} ref={modalRef}>
                <div className="md:flex md:justify-between">
                    <div className="w-full md:w-5/12 md:order-2">
                        <div className="bg-white rounded-lg p-4 mb-6">
                            <p className="text-black text-lg font-bold mb-4">Выбранный пакет:</p>
                            <Image
                                src={selectedPackage?.provider_img_url}
                                alt={`Selected package provider logo - ${selectedPackage?.provider_name}`}
                                width={50}
                                height={32}
                                className="inline mr-3"
                            />
                            <p className="inline align-middle">{selectedPackage?.internet_package_name}</p>
                        </div>
                        <div className="bg-white rounded-lg p-4 mb-6">
                            <p className="text-black text-lg font-bold mb-4">Стоимость:</p>
                            <p className="text-black flex justify-between items-center">
                                <span className="font-medium">Оплата в месяц:</span>{' '}
                                <span className="text-2xl font-bold">
                                    {selectedPackage?.internet_package_price} €
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="w-full md:w-6/12 md:order-1">
                        <div className="bg-white rounded-lg shadow-md p-4">form</div>
                    </div>
                </div>
            </Modal>
        </>
    );
}
