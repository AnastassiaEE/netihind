import SectionLayout from "../../layouts/SectionLayout";
import Accordion from "../ui/accordion/Accordion";
import questions from "../../data/questions";

export default function QuestionsSection() {
    return (
        <SectionLayout bg="bg-white" paddings="py-24">
            <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="md:w-4/12">
                    <h2 className="text-4xl font-extrabold mb-6"> Rhoncus est pellentesque </h2>
                    <div className="text-muted-dark text-lg max-md:mb-12">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                </div>
                <div className="md:w-7/12">
                    <Accordion items={questions}/>
                </div>
            </div>
        </SectionLayout>
    )
}