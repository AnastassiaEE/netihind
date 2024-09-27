import Image, { StaticImageData } from 'next/image';
import PhoneIcon from '@mui/icons-material/Phone';
import Button from '@/components/ui/form/buttons/Button';
import classNames from 'classnames';

const cardWrapperClasses = classNames(
    'bg-white',
    'shadow-md',
    'rounded-md',
    'border',
    'border-muted-light',
    'p-5',
);

export default function ProviderCard({
    name,
    phone,
    img,
    alt,
    tariffsPath,
}: {
    name: string;
    phone: string;
    img: StaticImageData;
    alt: string;
    tariffsPath: string;
}) {
    return (
        <div className={cardWrapperClasses}>
            <div className="flex flex-col items-center">
                <div className="h-14 mb-4">
                    <Image src={img} alt={alt} className="h-full w-auto object-contain" />
                </div>
                <p className="text-lg text-muted-dark">{name}</p>
            </div>
            {/* <div className="flex justify-between gap-1">
                <a href={tariffsPath} className="flex grow">
                    <Button variant="secondary">Тарифы</Button>
                </a>
                <a href={`tel:${phone}`} className="flex">
                    <Button variant="success">
                        <PhoneIcon />
                    </Button>
                </a>
            </div> */}
        </div>
    );
}
