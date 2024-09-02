import SectionLayout from "../../layouts/SectionLayout";
import SliderBlogCards from "../ui/blog/SliderBlogCards";
import posts from "../../data/posts";

export default function BlogSection() {
    return (
        <SectionLayout bg="bg-neutral-light" paddings="py-24">
            <h2 className="text-4xl font-extrabold text-center mb-10"> Rhoncus est pellentesque </h2>
            <SliderBlogCards items={posts}/> 
        </SectionLayout>
    )
}