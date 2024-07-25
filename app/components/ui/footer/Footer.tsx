import whitelogo from "../../../../public/images/whitelogo.svg"
import NavigationItem from "../navigation/NavigationItem";
import SocialLinks from "../social-links/SocialLinks";
import SocialLink from "../social-links/SocialLink";
import Navigation from "../navigation/Navigation";
import Logo from "../Logo";

export default function Footer() {
    return(
        <footer className="bg-gray-900 pt-12 pb-6">
            <div className="container">
                <div className="flex justify-center mb-2">
                    <Logo src={whitelogo}/>
                </div>
                <div className="flex justify-center pt-4 pb-6">
                    <Navigation linkColor="white opacity-80">
                        <NavigationItem link="#" padding="px-1 px-4">Home</NavigationItem>
                        <NavigationItem link="#">Link</NavigationItem>
                        <NavigationItem link="#">Link</NavigationItem>
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
                <div className="flex justify-center pt-12 text-sm text-white/60">
                    <p> © All rights reserved. Made by <span className="text-white/80 font-semibold"><NavigationItem link="#">Lorem Ipsum</NavigationItem></span></p>
                </div>
            </div>
        </footer>
    )
}