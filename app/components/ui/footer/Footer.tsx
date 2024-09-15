'use client'

import whitelogo from "@/public/images/whitelogo.svg"
import NavigationItem from "@/components/ui/navigation/NavigationItem";
import SocialLinks from "@/components/ui/social-links/SocialLinks";
import SocialLink from "@/components/ui/social-links/SocialLink";
import Logo from "@/components/ui/Logo";
import Navigation from "@/components/ui/navigation/Navigation";
import { useTranslation } from "react-i18next";

export default function Footer() {
    const { t } = useTranslation('navigation');

    return(
        <footer className="bg-gray-900 pt-12 pb-6">
            <div className="container">
                <div className="flex justify-center mb-2">
                    <Logo src={whitelogo} sizeClass="w-36"/>
                </div>
                <div className="flex justify-center pt-4 pb-6">
                    <Navigation linkColor="white opacity-80">
                        <NavigationItem href="/">{t('home')}</NavigationItem>
                        <NavigationItem href="/blog">{t('blog')}</NavigationItem>
                        <NavigationItem href="/about">{t('about-us')}</NavigationItem>
                        <NavigationItem href="/privacy-policy">{t('privacy-policy')}</NavigationItem>
                        <NavigationItem href="/contacts">{t('contacts')}</NavigationItem>
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
                    <p> © All rights reserved. Made by <span className="text-white/80 font-semibold"><NavigationItem href="#">Lorem Ipsum</NavigationItem></span></p>
                </div>
            </div>
        </footer>
    )
}