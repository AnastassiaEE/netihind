import LocationOn  from '@mui/icons-material/LocationOnOutlined'; 
import Mail from '@mui/icons-material/MailOutlineOutlined'; 
import SectionLayout from "../../layouts/SectionLayout";
import Phone  from '@mui/icons-material/PhoneOutlined'; 
import ContactForm from "../ui/form/ContactForm";

export default function ContactsSection() {
    return (
        <SectionLayout bg="bg-white" paddings="py-24">
            <div className="md:flex md:justify-between md:items-center">
                <div className="md:w-1/2 max-md:mb-12">
                    <div className="mb-20">
                        <h2 className="text-4xl font-extrabold mb-6"> Get in Touch </h2>
                        <p className="text-muted-dark text-base">Proin ipsum pharetra, senectus eget scelerisque varius pretium platea velit. Lacus, eget eu vitae nullam proin turpis etiam mi sit. Non feugiat feugiat egestas nulla nec. Arcu tempus, eget elementum dolor ullamcorper sodales ultrices eros.</p>
                    </div>
                    <div>
                        <h3 className="text-3xl font-extrabold mb-6">Contact Info</h3>
                        <ul>
                            <li className="flex items-center mb-5">
                                <Phone className="text-primary"/>
                                <a href="tel:+37256979125" className="text-base font-semibold transition-colors pl-2 hover:text-primary">+372 56 979 125</a>
                            </li>
                            <li className="flex items-center mb-5">
                                <Mail className="text-primary"/>
                                <a href="mailto:martsenkoanastassia56@gmail.com" className="text-base font-semibold transition-colors pl-2 hover:text-primary">martsenkoanastassia56@gmail.com</a>
                            </li>
                            <li className="flex items-center">
                                <LocationOn className="text-primary"/>
                                <a href="#" className="text-base font-semibold transition-colors pl-2 hover:text-primary">Akadeemia tee 14-42</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="md:w-1/3">
                    <div className="shadow-md rounded-lg p-6">
                        <ContactForm/>
                    </div>
                </div>
                
            </div>
        </SectionLayout>
    )
}