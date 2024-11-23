import {
    AllInclusive,
    ArrowCircleDown,
    ArrowCircleUp,
    InfoOutlined,
    ContactSupport,
} from '@mui/icons-material';
import PackageFeature from '@/components/ui/address/packages/PackageFeature';
import PackageFeatureValue from '@/components/ui/address/packages/PackageFeatureValue';
import PackageCardRow from '@/components/ui/address/packages/PackageCardRow';
import Button from '@/components/ui/form/buttons/Button';
import Popover from '@/components/ui/Popover';
import { useLocale, useTranslations } from 'next-intl';
import classNames from 'classnames';
import Image from 'next/image';

export default function PackageCard({
    pack,
    className,
}: {
    pack: { [key: string]: any };
    className?: string;
}) {
    const t = useTranslations('AddressPage');
    const locale = useLocale();
    const cardClasses = classNames(
        'bg-white',
        'text-muted-dark',
        'shadow-md',
        'rounded-md',
        'border border-muted-light',
        'relative',
        className,
    );
    const {
        provider_img,
        provider_name,
        internet_package_name,
        technology_abbr,
        technology_description,
        download_speed,
        upload_speed,
        tv_package_id,
        channels_amount,
        package_price,
    } = pack;
    return (
        <div className={cardClasses}>
            <div className="absolute right-0 m-3 h-10 w-14">
                <Image
                    src={provider_img}
                    alt={`${provider_name} paketi logo`}
                    fill
                    className="object-contain"
                />
            </div>
            <div className="p-6">
                <PackageCardRow>
                    <PackageFeature>
                        <span className="font-medium">{internet_package_name}</span>
                        <span className="text-xs text-muted">{provider_name}</span>
                    </PackageFeature>
                </PackageCardRow>
                <PackageCardRow>
                    <PackageFeature>
                        <div>
                            <PackageFeatureValue className="mr-2">{technology_abbr}</PackageFeatureValue>
                            <Popover
                                IconToInteract={InfoOutlined}
                                content={technology_description[locale]}
                            />
                        </div>
                    </PackageFeature>
                    <PackageFeature unit={t('measurementUnits.speed')}>
                        <div>
                            <PackageFeatureValue className="mr-2">
                                <ArrowCircleDown fontSize="small" className="align-sub mr-1 text-success-dark" />
                                {download_speed === null ? <AllInclusive /> : download_speed}
                            </PackageFeatureValue>
                            <PackageFeatureValue>
                                <ArrowCircleUp fontSize="small" className="align-sub mr-1 text-error" />
                                {upload_speed === null ? <AllInclusive /> : upload_speed}
                            </PackageFeatureValue>
                        </div>
                    </PackageFeature>
                    {tv_package_id && (
                        <PackageFeature unit={t('measurementUnits.channels')}>
                            <PackageFeatureValue>{channels_amount}</PackageFeatureValue>
                        </PackageFeature>
                    )}
                </PackageCardRow>
                <PackageCardRow>
                    <PackageFeature unit={`€ / ${t('measurementUnits.month')}`}>
                        <PackageFeatureValue className="!text-2xl text-white rounded-md bg-gradient-to-r from-primary via-secondary to-accent">
                            {package_price}
                        </PackageFeatureValue>
                    </PackageFeature>
                </PackageCardRow>
            </div>
            <div className="flex">
                <Button variant="secondary" className="!rounded-tl-none !rounded-r-none grow">
                    <ContactSupport />
                </Button>
                <Button className="!rounded-tr-none !rounded-l-none grow">{t('buttons.connect')}</Button>
            </div>
        </div>
    );
}
