import RelatedBlogPostsSection from '@/components/sections/blog/RelatedBlogPostsSection';
import BlogPostContentSection from '@/components/sections/blog-post/BlogPostContentSection';
import BlogPostHeaderSection from '@/components/sections/blog-post/BlogPostHeaderSection';
import ParallaxBg from '@/components/ui/ParallaxBg';
import { StaticImageData } from 'next/image';
import posts from '@/data/posts';

export const dynamicParams = false;

export default function Post({ params }: { params: { postId: string } }) {
    const { postId } = params;
    const post = getPost(postId);
    return (
        <>
            <BlogPostHeaderSection title={post?.title as string} date={post?.date as string} />
            <ParallaxBg img={post?.image as StaticImageData} />
            <BlogPostContentSection content={post?.content as string} />
            <RelatedBlogPostsSection />
        </>
    );
}

export async function generateStaticParams() {
    const arr = posts.map((post) => ({ postId: post.id }));
    return arr;
}

function getPost(postId: string) {
    for (let post of posts) {
        if (postId === post.id) {
            return post;
        }
    }
    return null;
}
