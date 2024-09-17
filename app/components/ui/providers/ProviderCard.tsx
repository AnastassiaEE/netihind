import Image, { StaticImageData } from "next/image";
import PhoneIcon from '@mui/icons-material/Phone';
import Button from "@/components/ui/form/Button";
import classNames from "classnames";

const cardWrapperClasses = classNames(
    'w-52',
    'h-52',
    'md:w-64',
    'md:h-64',
    'bg-white',
    'shadow-lg',
    'rounded-md',
    'p-5',
    'flex',
    'flex-col',
    'justify-between'
)

export default function ProviderCard({
    name, 
    phone,
    img,
    alt,
    tariffsPath
}: {
    name: string,
    phone: string
    img: StaticImageData,
    alt: string,
    tariffsPath: string
}) {
    return (
        <div className={cardWrapperClasses}>
            <div>
                <div className="h-14 mb-4">
                    <Image src={img} alt={alt} className="h-full w-auto"/>
                </div>
                <p className="text-lg text-muted-dark">{name}</p>
            </div>
            <div className="flex justify-between gap-1">
                <a href={tariffsPath} className="flex grow">
                    <Button variant="secondary">
                        Тарифы
                    </Button>
                </a>
                <a href={`tel:${phone}`} className="flex">
                    <Button variant="success">
                        <PhoneIcon/>
                    </Button>
                </a>
            </div>
        </div>
    )
}