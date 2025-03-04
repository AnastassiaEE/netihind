import Image from 'next/image';
import PackageRequestSection from '@/components/ui/address/packages/PackageRequestSection';
import HomeIcon from '@mui/icons-material/Home';
import RequestForm from '@/components/ui/form/forms/RequestForm';
import { useTranslations } from 'next-intl';

export default function PackageRequestContent({
    requestType,
    data,
    address,
}: {
    requestType: 'connection' | 'consultation';
    data: { [key: string]: any } | null;
    address: string;
}) {
    const t = useTranslations('Packages');
    const getSectionTitle = (section: string) => t(`request.${requestType}.sections.${section}`);

    if (requestType === 'connection')
        return (
            <div className="flex flex-col gap-8 md:flex-row">
                <div className="md:w-7/12 max-md:order-2">
                    <PackageRequestSection title={getSectionTitle('fillForm')}>
                        <p className="mb-4">
                            <HomeIcon className="mr-1 inline align-sub text-primary" />
                            {address}
                        </p>
                        <RequestForm type={requestType} address={address} packageData={data} />
                    </PackageRequestSection>
                </div>
                <div className="md:w-5/12">
                    <PackageRequestSection title={getSectionTitle('selectedPackage') + ':'} className="mb-8">
                        <Image
                            src={
                                data?.provider_img_url ||
                                'https://rxysmdetqttpdqfmrpym.supabase.co/storage/v1/object/public/website-logos//gradientmainlogo.png'
                            }
                            alt={`Selected package provider logo - ${data?.provider_name}`}
                            width={50}
                            height={32}
                            className="inline mr-3"
                        />
                        <p className="inline align-middle">{data?.internet_package_name}</p>
                    </PackageRequestSection>
                    <PackageRequestSection title={getSectionTitle('total') + ':'}>
                        <p className="flex justify-between items-center">
                            <span className="font-medium">
                                {t(`request.${requestType}.details.packagePrice`)}:
                            </span>
                            <span className="text-2xl font-bold">{data?.internet_package_price} €</span>
                        </p>
                    </PackageRequestSection>
                </div>
            </div>
        );
    if (requestType === 'consultation') {
        return <div>form</div>;
    }
}
