import SectionLayout from '@/layouts/SectionLayout';
import { MDXRemote } from 'next-mdx-remote/rsc';
import components from '@/mdx-components';

export default async function AboutSection({ data }: { data: string }) {
    return (
        <SectionLayout>
            <MDXRemote source={data} components={components as {}} />
        </SectionLayout>
    );
}
