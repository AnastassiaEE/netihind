import SectionLayout from '@/layouts/SectionLayout';
import classNames from 'classnames';
import { Trans } from 'react-i18next/TransWithoutContext';
import GoogleAddressForm from '@/components/ui/form/GoogleAddressForm';
import providerLogos from '@/data/providerLogos';
import LogoCards from '@/components/ui/logo/LogoCards';
import { H1 } from '@/components/ui/headings/HomePageHeadings';
import { TFunction } from 'i18next';
import GradientMesh from '@/components/ui/mesh/GradientMesh';

const sectionClasses = classNames(
    'h-[calc(100dvh)]',
    'min-h-[500px]',
    'md:h-screen',
    'md:min-h-[720px]',
    'pt-[80px]',
    'md:pt-[140px]',
    'flex',
    'flex-col',
    'justify-center',
    'relative',
);

const bgClasses = classNames(
    'bg-gradient-to-t',
    'from-primary/20 from-0%',
    'via-secondary/10 via-40%',
    'via-accent/10 to-80%',
);

export default function TopSection({ t }: { t: Function & TFunction<'translation', undefined> }) {
    return (
        <SectionLayout className={sectionClasses} bg={bgClasses}>
            <div className="absolute right-0 max-md:top-[80px] bottom-[50px] w-[230px] md:w-[500px] h-auto -z-10">
                <GradientMesh />
            </div>
            <div className="relative md:-translate-y-16">
                <H1>
                    <Trans
                        i18nKey="top-section.title"
                        t={t}
                        components={{
                            span: (
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent" />
                            ),
                        }}
                    />
                </H1>
                <p className="text-lg mb-4">{t('top-section.description')}</p>
                <GoogleAddressForm />
            </div>
            <div className="absolute bottom-0 left-0 py-3 md:p-9 w-full bg-primary/10">
                <div className="md:container">
                    <LogoCards logos={providerLogos} />
                </div>
            </div>
        </SectionLayout>
    );
}
