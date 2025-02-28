import PackageFeature from '@/components/ui/address/packages/PackageFeature';
import { Download, Upload, AllInclusive } from '@mui/icons-material';
import PackagePrice from '@/components/ui/address/packages/PackagePrice';
import PackageHeader from '@/components/ui/address/packages/PackageHeader';
import PackageActions from '@/components/ui/address/packages/PackageActions';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import { Wifi, Tv } from '@mui/icons-material';
import PackageCardSection from '@/components/ui/address/packages/PackageCardSection';
import dynamic from 'next/dynamic';

const Popover = dynamic(() => import('@/components/ui/Popover'));

export default function PackageCard({
    data: {
        internet_package_id,
        internet_package_name,
        provider_name,
        provider_img_url,
        internet_technology_abbr,
        internet_technology_description,
        internet_download_speed,
        internet_upload_speed,
        internet_package_price,
    },
    className,
}: {
    data: { [key: string]: any };
    className: string;
}) {
    const t = useTranslations('Packages');

    const cardClasses = classNames(
        'bg-white border border-muted-light rounded-md shadow-md',
        className,
    );

    return (
        <article data-id={internet_package_id} className={cardClasses}>
            <div className="flex flex-wrap">
                <PackageCardSection Icon={Wifi} className="w-full lg:w-3/5 border-r border-b">
                    <PackageHeader
                        logo_url={provider_img_url}
                        provider={provider_name}
                        name={internet_package_name}
                    />
                    <PackageFeature>
                        <span>
                            <Download className="text-green-700" />
                            {internet_download_speed ?? <AllInclusive />} {t('units.speed')}
                        </span>
                        <span>
                            <Upload className="text-red-700" />
                            {internet_upload_speed ?? <AllInclusive />} {t('units.speed')}
                        </span>
                        <Popover
                            elementToInteract={
                                <span className="border border-primary rounded-md text-primary font-semibold ml-2 px-1 py-0.5">
                                    {internet_technology_abbr}
                                </span>
                            }
                            content={internet_technology_description}
                        />
                    </PackageFeature>
                </PackageCardSection>
                <PackageCardSection className="w-full lg:w-2/5 flex justify-center items-center">
                    <PackagePrice originalPrice={internet_package_price} />
                </PackageCardSection>
            </div>
            <PackageActions />
        </article>
    );
}
