import SectionLayout from "../../layouts/SectionLayout";
import Steps from "../Steps";
import Step from "../Step";

const text: {title: string, description: string}[] = [
    {title: 'Accumsan', description: 'Sed turpis tincidunt id aliquet risus feugiat in ante.'}, 
    {title: 'Consectetur', description: 'Maecenas ultricies mi eget mauris pharetra et ultrices neque.'}, 
    {title: 'Neque', description: 'Turpis egestas pretium aenean pharetra magna ac placerat vestibulum.'}, 
    {title: 'Faucibus', description: 'Vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae.'}
]
export default function StepsSection() {
    return (
        <SectionLayout bg="white" paddings="pt-24">
            <h2 className="text-4xl font-extrabold text-center mb-6"> Rhoncus est pellentesque </h2>
            <p className="text-muted-dark text-lg text-center mb-12">Ut faucibus pulvinar elementum integer enim. Euismod lacinia at quis risus sed vulputate.</p>
            <Steps>
                {text.map((_, index) => {
                    return (
                        <Step key={index}> 
                            <>{text[index].title}</>
                            <>{text[index].description}</>
                        </Step>
                    )
                })}
            </Steps>
        </SectionLayout>
    )
}