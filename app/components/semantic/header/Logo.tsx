import Link from "next/link";
import Image from "next/image";

export default function Logo({src}: {src: any}) {
    return (
        <Link href="/home">
            <Image
                className="w-36"
                src={src}
                alt="logo"
                width={0}
                height={0}/>
        </Link>   
    )
}