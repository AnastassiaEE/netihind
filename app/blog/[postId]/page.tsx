import { StaticImageData } from "next/image";
import ParallaxBg from "../../components/ui/ParallaxBg";
import posts from "../../data/posts"
import PageLayout from "../../layouts/PageLayout";
import { MDXRemote } from 'next-mdx-remote/rsc'
import MdxLayout from "../../layouts/MdxLayout";
import BlogPostHeaderSection from "../../components/sections/BlogPostHeaderSection";
import BlogPostContentSection from "../../components/sections/BlogPostContentSection";

export const dynamicParams = false

export default function Post({ params }: {params: {postId: string}}) {
    const { postId } = params;
    const post = getPost(postId);
    return (
        <PageLayout>
            <BlogPostHeaderSection 
                title={post?.title as string} 
                date={post?.date as string}/>
            <ParallaxBg img={post?.image as StaticImageData}></ParallaxBg>
            <BlogPostContentSection content={post?.content as string}/>
        </PageLayout>
    )
}

export async function generateStaticParams() {
    const arr = posts.map((post) => (
        {postId: post.id}
    ))
    return arr;
}

function getPost(postId: string) {
    for (let post of posts)  {
        if (postId === post.id) {
            return post;
        } 
    };
    return null;
}


