import PostDate from '@/components/ui/blog/PostDate';
import SectionLayout from '@/layouts/SectionLayout';
import { H1 } from '@/components/ui/headings/RestPageHeadings';

export default function PostHeaderSection({
  title,
  date,
}: {
  title: string;
  date: string;
}) {
  return (
    <SectionLayout className="pb-4">
      <H1>{title}</H1>
      <div className="mb-4">
        <PostDate date={date} />
      </div>
    </SectionLayout>
  );
}
