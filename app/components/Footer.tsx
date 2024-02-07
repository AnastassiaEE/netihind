import { Call } from "@mui/icons-material"

export default function Footer() {
    return(
        <footer className="bg-gray-900 py-24">
            <div className="container">
                <div className="flex justify-between">
                    <div className="w-1/3">
                        <h1 className="text-white mb-6">Logo</h1>
                        <p className="text-white/80 text-sm">
                            Proin ipsum pharetra, senectus eget scelerisque varius pretium platea velit. Lacus, eget eu vitae nullam proin turpis etiam mi sit. Non feugiat feugiat egestas nulla nec. Arcu tempus, eget elementum dolor ullamcorper sodales ultrices eros.
                        </p>
                    </div>
                    <div className="w-1/5">
                        <ul className="mb-5">
                            <li className="pb-4">
                                <a href="#" className="text-white/80 text-base font-semibold transition-colors hover:text-indigo-500">Home</a>
                            </li>
                            <li className="pb-4">
                                <a href="#" className="text-white/80 text-base font-semibold transition-colors hover:text-indigo-500">Home</a>
                            </li>
                            <li className="pb-4">
                                <a href="#" className="text-white/80 text-base font-semibold transition-colors hover:text-indigo-500">Home</a>
                            </li>
                            <li className="pb-4">
                                <a href="#" className="text-white/80 text-base font-semibold transition-colors hover:text-indigo-500">Home</a>
                            </li>
                        </ul>
                        <ul>
                            <li className="mb-4"><a href="#" className="text-white/80 text-base font-semibold transition-colors hover:text-indigo-500">Terms & Conditions</a></li>
                            <li className="mb-4"><a href="#" className="text-white/80 text-base font-semibold transition-colors hover:text-indigo-500">Privacy Policy</a></li>
                        </ul>
                    </div>
                    <div className="w-1/3">
                        <h6 className="text-white font-semibold mb-6">Contact Us</h6>
                        <ul>
                            <li className="pb-4">
                                <a href="tel:+37256979125" className="text-white/80 font-semibold transition-colors hover:text-indigo-500">+37256979125</a></li>
                            <li className="pb-4"><a href="mailto:martsenkoanastassia@gmail.com" className="text-white/80 font-semibold transition-colors hover:text-indigo-500">martsenkoanastassia@gmail.com</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}