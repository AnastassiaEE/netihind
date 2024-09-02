import { MDXRemote } from "next-mdx-remote/rsc";
import MdxLayout from "../../layouts/MdxLayout";
import SectionLayout from "../../layouts/SectionLayout";

export default function BlogPostContentSection({content}: {content: string}) {
    return (
        <SectionLayout bg={""} paddings={"pt-12 pb-12"}>
            <MdxLayout>
                <MDXRemote source={content} />
            </MdxLayout>
        </SectionLayout>
    )
}