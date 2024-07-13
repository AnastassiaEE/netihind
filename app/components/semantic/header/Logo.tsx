import mainLogo from '../../../../public/images/gradientmainlogo.svg';
import Link from "next/link";
import Image from "next/image";

export default function Logo() {
    return (
        <Link href="/home">
            <Image
                className="w-36"
                src={mainLogo}
                alt="logo"
                width={0}
                height={0}/>
        </Link>   
    )
}