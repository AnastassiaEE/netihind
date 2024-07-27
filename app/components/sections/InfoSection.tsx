import SectionLayout from "../../layouts/SectionLayout"
import man from "../../../public/images/man.png"
import BgPhoto from "../ui/BgPhoto"

export default function InfoSection() {
    return (
        <SectionLayout bg="bg-white" paddings="pt-24"> 
            <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="md:w-6/12">
                    <h2 className="text-4xl font-extrabold mb-6"> Rhoncus est pellentesque </h2>
                    <div className="text-muted-dark text-base">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <p>Faucibus turpis in eu mi bibendum neque egestas. Integer quis auctor elit sed vulputate. Varius vel pharetra vel turpis nunc eget lorem dolor sed. Habitant morbi tristique senectus et. Sed risus pretium quam vulputate dignissim suspendisse.</p>
                        <p>Ut faucibus pulvinar elementum integer enim. Euismod lacinia at quis risus sed vulputate.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent semper feugiat nibh sed pulvinar proin gravida. </p>
                    </div>
                </div>
                <div className="md:w-5/12">
                    <BgPhoto src={man}/>
                </div>
            </div>
        </SectionLayout>
    )
}