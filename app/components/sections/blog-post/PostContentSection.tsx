import SectionLayout from '@/layouts/SectionLayout';
import { MDXRemote } from 'next-mdx-remote/rsc';
import MdxLayout from '@/layouts/MdxLayout';
import components from '@/mdx-components';

export default function PostContentSection({ content }: { content: string }) {
  return (
    <SectionLayout className="py-24">
      <MdxLayout>
        <MDXRemote source={content} components={components as {}} />
      </MdxLayout>
    </SectionLayout>
  );
}
