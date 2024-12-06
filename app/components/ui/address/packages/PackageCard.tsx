import PackageFeature from '@/components/ui/address/packages/PackageFeature';
import { Download, Upload } from '@mui/icons-material';
import Popover from '@/components/ui/Popover';
import PackagePrice from '@/components/ui/address/packages/PackagePrice';
import PackageHeader from '@/components/ui/address/packages/PackageHeader';
import PackageActions from '@/components/ui/address/packages/PackageActions';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import { Wifi, Tv } from '@mui/icons-material';
import PackageCardSection from '@/components/ui/address/packages/PackageCardSection';

export default function PackageCard({
    originalPrice,
    promoPrice,
    className,
}: {
    originalPrice: number;
    promoPrice: number | null;
    className: string;
}) {
    const t = useTranslations('Packages');
    return (
        <article
            className={`bg-white border border-muted-light rounded-md shadow-md ${classNames(className)}`}
        >
            <div className="flex flex-wrap">
                <PackageCardSection Icon={Wifi} className="w-3/6 lg:w-2/5 border-r border-b">
                    <PackageHeader
                        logo="https://rxysmdetqttpdqfmrpym.supabase.co/storage/v1/object/public/providers-logos/Elisa.png"
                        provider="Elisa"
                        name="Package name"
                    />
                    <PackageFeature>
                        <div className="flex items-center">
                            <div>
                                <p>
                                    <Download className="text-green-700" />
                                    100 {t('units.speed')}
                                </p>
                                <p>
                                    <Upload className="text-red-700" />
                                    50 {t('units.speed')}
                                </p>
                            </div>
                            <Popover
                                elementToInteract={
                                    <span className="border border-primary rounded-md text-primary font-semibold ml-2 px-1">
                                        PON
                                    </span>
                                }
                                content={'description description description'}
                            />
                        </div>
                    </PackageFeature>
                </PackageCardSection>
                <PackageCardSection Icon={Tv} className="w-3/6 lg:w-2/5 lg:border-r border-b">
                    <PackageHeader
                        logo="https://rxysmdetqttpdqfmrpym.supabase.co/storage/v1/object/public/providers-logos/Elisa.png"
                        provider="Elisa"
                        name="Package name"
                    />
                    <PackageFeature>200 {t('units.channels')}</PackageFeature>
                </PackageCardSection>
                <PackageCardSection className="w-full lg:w-1/5 flex justify-center items-center">
                    <div>
                        <PackagePrice originalPrice={originalPrice} promoPrice={promoPrice} />
                    </div>
                </PackageCardSection>
            </div>
            <PackageActions />
        </article>
    );
}
