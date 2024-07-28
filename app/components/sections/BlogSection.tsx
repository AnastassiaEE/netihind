import SectionLayout from "../../layouts/SectionLayout";
import Slider from "../ui/blog/Slider";
import posts from "../../data/posts";

export default function BlogSection() {
    return (
        <SectionLayout bg="bg-neutral-light" paddings="py-24">
            <h2 className="text-4xl font-extrabold text-center mb-10"> Rhoncus est pellentesque </h2>
            <Slider items={posts}/> 
        </SectionLayout>
    )
}