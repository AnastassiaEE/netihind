import Image from 'next/image';
import PackageRequestSection from '@/components/ui/address/packages/PackageRequestSection';
import HomeIcon from '@mui/icons-material/Home';
import RequestForm from '@/components/ui/form/forms/RequestForm';

export default function PackageRequestContent({
    type,
    packageData,
    address,
}: {
    type: 'connect' | 'consultation';
    packageData: { [key: string]: any } | null;
    address: string
}) {
    if (type === 'connect')
        return (
            <div className="grid md:grid-rows-2 md:grid-cols-2 gap-5">
                <div className="md:row-span-2 max-md:order-3">
                    <PackageRequestSection title="Проверьте адрес и заполните форму">
                        <p><HomeIcon className="mr-1 inline align-sub text-primary" />{address}</p>
                        <RequestForm />
                    </PackageRequestSection>
                </div>
                <div>
                    <PackageRequestSection title="Выбранный пакет:">
                        <Image
                            src={packageData?.provider_img_url}
                            alt={`Selected package provider logo - ${packageData?.provider_name}`}
                            width={50}
                            height={32}
                            className="inline mr-3"
                        />
                        <p className="inline align-middle">{packageData?.internet_package_name}</p>
                    </PackageRequestSection>
                </div>
                <div>
                    <PackageRequestSection title={'Итого:'}>
                        <p className="flex justify-between items-center">
                            <span className="font-medium">Оплата в месяц:</span>
                            <span className="text-2xl font-bold">{packageData?.internet_package_price} €</span>
                        </p>
                    </PackageRequestSection>
                </div>
            </div>
        );
    if (type === 'consultation') {
        return <div>form</div>;
    }
}
