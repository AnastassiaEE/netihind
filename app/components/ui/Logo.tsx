import Image from "next/image";
import Link from "next/link";

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