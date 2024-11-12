import {
    AllInclusive,
    ArrowCircleDown,
    ArrowCircleUp,
    ContactSupport,
    InfoOutlined,
} from '@mui/icons-material';
import PackagesTableCell from '@/components/ui/packages/PackagesTableCell';
import PackageFeature from '@/components/ui/packages/PackageFeature';
import PackageFeatureValue from '@/components/ui/packages/PackageFeatureValue';
import Button from '@/components/ui/form/buttons/Button';
import Popover from '@/components/ui/Popover';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React from 'react';
import classNames from 'classnames';

export default function PackagesTable({
    packages,
    filter,
}: {
    packages: { [key: string]: any }[];
    filter: string;
}) {
    const t = useTranslations('AddressPage');

    const tableClasses = classNames('text-muted-dark', 'grid', 'w-full', 'max-md:hidden', {
        'grid-cols-packages-4': filter === 'internet',
        'grid-cols-packages-5': filter !== 'internet',
    });
    let columns =
        filter === 'internet'
            ? ['package', 'technology', 'speed', 'price']
            : ['package', 'technology', 'speed', 'channels', 'price'];
    return (
        <div className={tableClasses}>
            {columns.map((column) => (
                <PackagesTableCell key={column} className="font-extrabold rounded-l-md">
                    {t(`columns.${column}`)}
                </PackagesTableCell>
            ))}
            {packages.map((pack, index) => (
                <React.Fragment key={pack['package_id']}>
                    <PackagesTableCell index={index} className="rounded-l-md">
                        <PackageFeature>
                            <div className="relative h-10 w-14 self-center">
                                <Image
                                    src={pack['provider_img']}
                                    alt={`${pack['provider_name']} paketi logo`}
                                    fill
                                    className="object-contain mb-2"
                                />
                            </div>
                            <span className="font-medium">{pack['internet_package_name']}</span>
                            <span className="text-xs text-muted">{pack['provider_name']}</span>
                        </PackageFeature>
                    </PackagesTableCell>
                    <PackagesTableCell index={index}>
                        <PackageFeature>
                            <div>
                                <PackageFeatureValue className="mr-2">
                                    {pack['technology_abbr']}
                                </PackageFeatureValue>
                                <Popover IconToInteract={InfoOutlined} content={pack['technology_description']} />
                            </div>
                        </PackageFeature>
                    </PackagesTableCell>
                    <PackagesTableCell index={index}>
                        <PackageFeature unit={t('measurementUnits.speed')}>
                            <div>
                                <PackageFeatureValue className="mr-2">
                                    <ArrowCircleDown fontSize="small" className="align-sub mr-1 text-success-dark" />
                                    {pack['download_speed'].trim().toLowerCase() === 'piiramatu' ? (
                                        <AllInclusive />
                                    ) : (
                                        pack['download_speed']
                                    )}
                                </PackageFeatureValue>
                                <PackageFeatureValue>
                                    <ArrowCircleUp fontSize="small" className="align-sub mr-1 text-error" />
                                    {pack['upload_speed'].trim().toLowerCase() === 'piiramatu' ? (
                                        <AllInclusive />
                                    ) : (
                                        pack['upload_speed']
                                    )}
                                </PackageFeatureValue>
                            </div>
                        </PackageFeature>
                    </PackagesTableCell>
                    {columns.includes('channels') && (
                        <PackagesTableCell index={index}>
                            <PackageFeature unit={t('measurementUnits.channels')}>
                                <PackageFeatureValue>{pack['channels_amount']}</PackageFeatureValue>
                            </PackageFeature>
                        </PackagesTableCell>
                    )}
                    <PackagesTableCell index={index} className="rounded-r-md">
                        <div className="flex flex-col items-center">
                            <PackageFeature unit={`€ / ${t('measurementUnits.month')}`}>
                                <PackageFeatureValue className="!text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
                                    {pack['package_price']}
                                </PackageFeatureValue>
                            </PackageFeature>
                            <div className="flex mt-3">
                                <Button variant="secondary" className="!rounded-r-none">
                                    <ContactSupport />
                                </Button>
                                <Button className="!rounded-l-none">{t('buttons.connect')}</Button>
                            </div>
                        </div>
                    </PackagesTableCell>
                </React.Fragment>
            ))}
        </div>
    );
}
