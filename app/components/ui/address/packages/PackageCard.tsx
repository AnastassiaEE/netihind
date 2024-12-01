import Image from 'next/image';
import PackageFeature from './PackageFeature';
import PackageFeatureValue from './PackageFeatureValue';
import { Download, Upload } from '@mui/icons-material';
import Popover from '../../Popover';

export default function PackageCard() {
    return (
        <article className="border border-muted-light rounded-md flex shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="w-2/3 relative p-5 border-r border-muted-light cursor-pointer">
                <div className="mb-5">
                    <div className="relative w-24 h-8 mb-1">
                        <Image
                            src="https://rxysmdetqttpdqfmrpym.supabase.co/storage/v1/object/public/providers-logos/Elisa.png"
                            alt="elisa logo"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <span className="text-xs text-muted mb-1">Elisa</span>
                    <p className="text-sm font-medium">Package name</p>
                </div>
                <div>
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
            </div>
            <div className="grow p-5">price</div>
        </article>
    );
}
