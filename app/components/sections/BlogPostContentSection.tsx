import SectionLayout from "../../layouts/SectionLayout";
import { MDXRemote } from "next-mdx-remote/rsc";
import MdxLayout from "../../layouts/MdxLayout";

export default function BlogPostContentSection({content}: {content: string}) {
    return (
        <SectionLayout bg={""} paddings={"py-24"}>
            <MdxLayout>
                <MDXRemote source={content} />
            </MdxLayout>
        </SectionLayout>
    )
}