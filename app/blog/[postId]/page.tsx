import RelatedBlogPostsSection from "../../components/sections/RelatedBlogPostsSection";
import BlogPostContentSection from "../../components/sections/BlogPostContentSection";
import BlogPostHeaderSection from "../../components/sections/BlogPostHeaderSection";
import ParallaxBg from "../../components/ui/ParallaxBg";
import PageLayout from "../../layouts/PageLayout";
import { StaticImageData } from "next/image";
import posts from "../../data/posts"

export const dynamicParams = false

export default function Post({ params }: {params: {postId: string}}) {
    const { postId } = params;
    const post = getPost(postId);
    return (
        <PageLayout>
            <BlogPostHeaderSection 
                title={post?.title as string} 
                date={post?.date as string}/>
                <ParallaxBg img={post?.image as StaticImageData}/>
            <BlogPostContentSection content={post?.content as string}/>
            <RelatedBlogPostsSection/>
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


