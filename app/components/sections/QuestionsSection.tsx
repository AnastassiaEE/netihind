import SectionLayout from "../../layouts/SectionLayout";
import Accordion from "../Accordion";

const questions = [
    {title: 'Turpis egestas pretium aenean pharetra1?', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate. Nulla malesuada pellentesque elit eget gravida cum. Vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi. Donec pretium vulputate sapien nec.'},
    {title: 'Turpis egestas pretium aenean pharetra2?', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate. Nulla malesuada pellentesque elit eget gravida cum. Vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi. Donec pretium vulputate sapien nec.'},
    {title: 'Turpis egestas pretium aenean pharetra3?', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate. Nulla malesuada pellentesque elit eget gravida cum. Vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi. Donec pretium vulputate sapien nec.'},
    {title: 'Turpis egestas pretium aenean pharetra4?', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate. Nulla malesuada pellentesque elit eget gravida cum. Vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi. Donec pretium vulputate sapien nec.'},
]

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
                    <Accordion data={questions}></Accordion>
                </div>
            </div>
        </SectionLayout>
    )
}