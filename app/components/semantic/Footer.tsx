import Image from "next/image"
import whitelogo from "../../../public/images/whitelogo.svg";

export default function Footer() {
    return(
        <footer className="bg-gray-900 pt-12 pb-6">
            <div className="container">
                <div className="flex justify-center mb-2">
                    <Image
                        src={whitelogo}
                        alt="footer logo"
                        width={130}
                        height={0}
                    />
                </div>
                <div>
                    
                </div>
                <div></div>
                <div></div>
            </div>
        </footer>
    )
}