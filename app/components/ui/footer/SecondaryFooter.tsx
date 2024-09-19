import Copyright from '@/components/ui/Copyright';
import SectionLayout from '@/layouts/SectionLayout';

export default function SecondaryFooter() {
    return (
        <footer className="py-12 border border-b-muted-light">
            <SectionLayout>
                <Copyright />
            </SectionLayout>
        </footer>
    );
}
