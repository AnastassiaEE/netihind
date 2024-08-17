import { MDXRemote } from "next-mdx-remote/rsc";
import MdxLayout from "../../layouts/MdxLayout";

export default function BlogPostContentSection({content}: {content: string}) {
    return (
        <MdxLayout>
            <MDXRemote source={content} />
        </MdxLayout>
    )
}