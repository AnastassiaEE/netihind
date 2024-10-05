import { getPosts } from '@/app/lib/wpPosts';
import SliderBlogCards from './SliderBlogCards';
import { Suspense } from 'react';
import PingLoader from '../loaders/PingLoader';
import NothingToPreview from '../NothingToPreview';

export const revalidate = 3600;

export default async function sliderBlogCardsWrapper({ locale }: { locale: string }) {
    const posts = await getPosts(locale.toUpperCase());
    const notPosts = posts === undefined || posts?.length === 0;
    return (
        <Suspense fallback={<PingLoader />}>
            {notPosts ? (
                <NothingToPreview message="posts-not-found" />
            ) : (
                <SliderBlogCards posts={posts} />
            )}
        </Suspense>
    );
}
