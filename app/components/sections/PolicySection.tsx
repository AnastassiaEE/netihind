import MdxLayout from '@/layouts/MdxLayout';
import SectionLayout from '@/layouts/SectionLayout';
import { notFound } from 'next/navigation';
import { MDXProps } from 'mdx/types';

export default async function PolicySection({ locale }: { locale: string }) {
    let Content: (props: MDXProps) => JSX.Element = () => <></>;
    let frontmatter: Frontmatter = { title: '' };

    if (locale === 'et') {
        await import('@/markdown/et/policy.mdx')
            .then((module) => {
                Content = module.default;
                frontmatter = module.frontmatter;
            })
            .catch(() => notFound());
    } else if (locale === 'ru') {
        await import('@/markdown/ru/policy.mdx')
            .then((module) => {
                Content = module.default;
                frontmatter = module.frontmatter;
            })
            .catch(() => notFound());
    }

    return (
        <SectionLayout>
            <h1 className="text-[calc(1.375rem+1.5vw)] md:text-4xl font-extrabold mb-10">
                {frontmatter.title}
            </h1>
            <MdxLayout>
                <Content />
            </MdxLayout>
        </SectionLayout>
    );
}
