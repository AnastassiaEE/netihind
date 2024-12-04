import PackageFeature from '@/components/ui/address/packages/PackageFeature';
import PackageFeatureValue from '@/components/ui/address/packages/PackageFeatureValue';
import { Download, Upload } from '@mui/icons-material';
import Popover from '@/components/ui/Popover';
import { useMediaQuery } from '@mui/material';
import { breakpoints } from '@/tailwind.config';
import PackagePrice from '@/components/ui/address/packages/PackagePrice';
import PackageHeader from '@/components/ui/address/packages/PackageHeader';
import PackageActions from '@/components/ui/address/packages/PackageActions';

export default function PackageCard() {
    const isSmallScreen = useMediaQuery(breakpoints.md);
    return (
        <article className="bg-white border border-muted-light rounded-md md:flex shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="md:w-3/5 p-5 border-r border-muted-light cursor-pointer">
                <PackageHeader
                    logo="https://rxysmdetqttpdqfmrpym.supabase.co/storage/v1/object/public/providers-logos/Elisa.png"
                    provider="Elisa"
                    name="Package name"
                />
                <PackageFeature type="internet">
                    <PackageFeatureValue>
                        <span>
                            <Download className="text-green-700" />
                            100 mbit/s
                        </span>
                        <span>
                            <Upload className="text-red-700" />
                            50 mbit/s
                        </span>
                        <Popover
                            elementToInteract={
                                <span className="border border-primary rounded-md text-primary font-semibold ml-2 px-1">
                                    PON
                                </span>
                            }
                            content={'description description description'}
                        />
                    </PackageFeatureValue>
                </PackageFeature>
                <PackageFeature type="tv">
                    <PackageFeatureValue>200 channels</PackageFeatureValue>
                </PackageFeature>
            </div>
            <div className="md:w-2/5 md:p-5 flex flex-col justify-end items-center gap-4">
                <PackagePrice value="25.99" />
                <PackageActions isSmallScreen={isSmallScreen} />
            </div>
        </article>
    );
}
