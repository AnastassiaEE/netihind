import Image from 'next/image'
import mainLogo from '../../public/images/gradientmainlogo.svg';
import Link from 'next/link';


export default function Navbar() {
    return (
        <header className="py-2"> 
            <div className="container px-4">
                <div className="flex">
                    <Link href="/" className="">
                        <Image
                            className="w-40"
                            src={mainLogo}
                            width={500}
                            height={500}
                            alt="navbar logo"/>
                    </Link>   
                    <div>
                        <ul className="flex">
                            <li>Link 1</li>
                            <li>Link 2</li>
                            <li>Link 3</li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    )
}