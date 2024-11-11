import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import Button from '../form/buttons/Button';
import Image from 'next/image';
import PackageFeature from './PackageFeature';
import PackageFeatureValue from './PackageFeatureValue';
import Popover from '../Popover';
import { AllInclusive, ArrowCircleDown, ArrowCircleUp, InfoOutlined } from '@mui/icons-material';
import { useTranslations } from 'next-intl';
import classNames from 'classnames';
import PackageCardRow from './PackageCardRow';

export default function PackageCard({
    pack,
    className,
}: {
    pack: { [key: string]: any };
    className?: string;
}) {
    const t = useTranslations('AddressPage');
    const cardClasses = classNames(
        'bg-white',
        'text-muted-dark',
        'shadow-md',
        'rounded-md',
        'border border-muted-light',
        'relative',
        {
            [className as string]: className !== undefined,
        },
    );
    return (
        <div className={cardClasses}>
            <div className="absolute right-0 m-3 h-10 w-14">
                <Image
                    src={pack['provider_img']}
                    alt={`${pack['provider_name']} paketi logo`}
                    fill
                    className="object-contain"
                />
            </div>
            <div className="p-6">
                <PackageCardRow>
                    <PackageFeature>
                        <span className="font-medium">{pack['internet_package_name']}</span>
                        <span className="text-xs text-muted">{pack['provider_name']}</span>
                    </PackageFeature>
                </PackageCardRow>

                <PackageCardRow>
                    <PackageFeature>
                        <div>
                            <PackageFeatureValue className="mr-2">{pack['technology_abbr']}</PackageFeatureValue>
                            <Popover IconToInteract={InfoOutlined} content={pack['technology_description']} />
                        </div>
                    </PackageFeature>
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
                                    pack['download_speed']
                                )}
                            </PackageFeatureValue>
                        </div>
                    </PackageFeature>
                    {pack['tv_package_id'] && (
                        <PackageFeature unit={t('measurementUnits.channels')}>
                            <PackageFeatureValue>{pack['channels_amount']}</PackageFeatureValue>
                        </PackageFeature>
                    )}
                </PackageCardRow>
                <PackageCardRow>
                    <PackageFeature unit={`€ / ${t('measurementUnits.month')}`}>
                        <PackageFeatureValue className="!text-2xl text-white rounded-md bg-gradient-to-r from-primary via-secondary to-accent">
                            {pack['package_price']}
                        </PackageFeatureValue>
                    </PackageFeature>
                </PackageCardRow>
            </div>
            <div className="flex">
                <Button variant="secondary" className="!rounded-tl-none !rounded-r-none grow">
                    <ContactSupportIcon />
                </Button>
                <Button className="!rounded-tr-none !rounded-l-none grow">
                    {t('buttons.connect')}
                </Button>
            </div>
        </div>
    );
}
