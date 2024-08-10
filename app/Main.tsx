import BlogSection from "./components/sections/BlogSection";
import ContactsSection from "./components/sections/ContactsSection";
import InfoSection from "./components/sections/InfoSection";
import QuestionsSection from "./components/sections/QuestionsSection";
import StepsSection from "./components/sections/StepsSection";
import TopSection from "./components/sections/TopSection";

export default function Main() {
    return (
        <>
            <TopSection/>
            <InfoSection/>
            <StepsSection/>
            <QuestionsSection/>
            <BlogSection/>
            <ContactsSection/>
        </>
    )
}