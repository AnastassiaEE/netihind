import Copyright from '@/components/ui/Copyright';
import SectionLayout from '@/layouts/SectionLayout';

export default function SecondaryFooter() {
    return (
        <footer className="border border-b-muted-light py-12">
            <SectionLayout>
                <Copyright />
            </SectionLayout>
        </footer>
    );
}
