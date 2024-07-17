import whitelogo from "../../../public/images/whitelogo.svg";
import NavigationItem from "./navigation/NavigationItem";
import Navigation from "./navigation/Navigation";
import SocialLink from "../SocialLink";
import Logo from "./header/Logo";
import Image from "next/image"
import SocialLinks from "../SocialLinks";

export default function Footer() {
    return(
        <footer className="bg-gray-900 pt-12 pb-6">
            <div className="container">
                <div className="flex justify-center mb-2">
                    <Logo src={whitelogo}/>
                </div>
                <div className="flex justify-center pt-4 pb-6">
                    <Navigation linkColor="white">
                        <NavigationItem name="Home" link="#" padding="px-1 px-4"/>
                        <NavigationItem name="Link" link="#"/>
                        <NavigationItem name="Link" link="#"/>
                    </Navigation>
                </div>
                <div className="flex justify-center pt-6">
                    <SocialLinks>
                        <SocialLink type="facebook"/>
                        <SocialLink type="instagram"/>
                        <SocialLink type="x"/>
                        <SocialLink type="linkedin"/>
                        <SocialLink type="youtube"/>
                    </SocialLinks>
                </div>
                <div></div>
            </div>
        </footer>
    )
}