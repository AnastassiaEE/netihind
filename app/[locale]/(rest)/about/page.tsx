import AboutSection from "@/components/sections/AboutSection";

export default function About({
    params: { locale } 
}: {
    params: { locale: string }
}) { 
    return <AboutSection locale={locale}/>
}