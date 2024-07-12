import BlogSection from "../sections/BlogSection";
import ContactsSection from "../sections/ContactsSection";
import InfoSection from "../sections/InfoSection";
import QuestionsSection from "../sections/QuestionsSection";
import StepsSection from "../sections/StepsSection";
import TopSection from "../sections/TopSection";

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