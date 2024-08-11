import Image, { StaticImageData } from "next/image";
import PhoneIcon from '@mui/icons-material/Phone';
import Button from "../form/Button";

export default function ProviderCard({
    phone,
    img,
    alt,
    tariffsPath
}: {
    phone: string
    img: StaticImageData,
    alt: string,
    tariffsPath: string
}) {
    return (
        <div className="w-48 h-48 bg-white shadow-md rounded-md p-5 flex flex-col justify-between">
            <div className="h-12">
                <Image src={img} alt={alt} className="h-full w-auto"/>
            </div>
            <div className="flex justify-between gap-1">
                <a href={tariffsPath} className="flex grow">
                    <Button variant="secondary">
                        Тарифы
                    </Button>
                </a>
                <a href={`tel:${+37256979125}`} className="flex">
                    <Button variant="success">
                        <PhoneIcon/>
                    </Button>
                </a>
            </div>
        </div>
    )
}