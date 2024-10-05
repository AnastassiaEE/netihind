import SectionLayout from '@/layouts/SectionLayout';
import { MDXRemote } from 'next-mdx-remote/rsc';
import components from '@/mdx-components';
import remarkGfm from 'remark-gfm';

export default function PolicySection({ data }: { data: string }) {
    const options = {
        mdxOptions: {
            remarkPlugins: [remarkGfm],
        },
    };

    return (
        <SectionLayout>
            <MDXRemote source={data} components={components as {}} options={options} />
        </SectionLayout>
    );
}
