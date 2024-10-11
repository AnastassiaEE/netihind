'use client';

import SectionLayout from '@/layouts/SectionLayout';
import Mesh from '@/components/ui/mesh/Mesh';
import classNames from 'classnames';
import RequestForm from '@/components/ui/form/RequestForm';
import { Trans, useTranslation } from 'react-i18next';

const sectionClasses = classNames(
    'h-full',
    'md:h-screen',
    'md:min-h-[720px]',
    'pt-[80px]',
    'md:pt-[140px]',
    'flex',
    'flex-col',
    'justify-center',
);

const bgClasses = classNames(
    'bg-gradient-to-t',
    'from-primary/20 from-0%',
    'via-secondary/10 via-40%',
    'via-accent/10 to-80%',
);

export default function TopSection() {
    const { t } = useTranslation();
    return (
        <SectionLayout className={sectionClasses} bg={bgClasses}>
            <div className="absolute right-0 max-md:top-[80px] bottom-[50px] -z-10 w-[230px] md:w-[500px] h-auto">
                <Mesh />
            </div>
            <div className="max-lg:py-24 lg:flex justify-between items-center">
                <div className="max-lg:mb-10 lg:w-7/12">
                    <h1 className="text-[calc(1.475rem+2.7vw)] md:text-5xl !leading-snug font-extrabold mb-4">
                        <Trans
                            i18nKey="top-section.title"
                            components={{
                                span: (
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent" />
                                ),
                            }}
                        />
                    </h1>
                    <p className="text-lg text-muted-dark mb-4">{t('top-section.description')}</p>
                </div>
                <div className="lg:w-4/12">
                    <div className="bg-white rounded-lg p-6 shadow-lg">
                        <RequestForm />
                    </div>
                </div>
            </div>
        </SectionLayout>
    );
}
