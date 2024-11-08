import { H1 } from '@/components/ui/headings/RestPageHeadings';
import SectionLayout from '@/layouts/SectionLayout';

export default function AddressTitleSection({ address }: { address: string }) {
    return (
        <SectionLayout>
            <H1>
                {'title'} <span className="text-primary">{address}</span>
            </H1>
        </SectionLayout>
    );
}
