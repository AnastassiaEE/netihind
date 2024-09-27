'use client';

import SectionLayout from '@/layouts/SectionLayout';
import MeshSvg from '@/components/ui/MeshSvg';
import classNames from 'classnames';
import { Trans, useTranslation } from 'react-i18next';
import GoogleAddressForm from '@/components/ui/form/GoogleAddressForm';

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
                <MeshSvg>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#a5b4fc">
                            <animate
                                attributeName="stop-color"
                                values="#a5b4fc; #ddd6fe; #f5d0fe; #a5b4fc"
                                dur="4s"
                                repeatCount="indefinite"
                            ></animate>
                        </stop>
                        <stop offset="50%" stopColor="#ddd6fe">
                            <animate
                                attributeName="stop-color"
                                values="#ddd6fe; #f5d0fe; #a5b4fc; #ddd6fe"
                                dur="4s"
                                repeatCount="indefinite"
                            ></animate>
                        </stop>
                        <stop offset="100%" stopColor="#f5d0fe">
                            <animate
                                attributeName="stop-color"
                                values="#f5d0fe; #a5b4fc; #ddd6fe; #f5d0fe"
                                dur="4s"
                                repeatCount="indefinite"
                            ></animate>
                        </stop>
                    </linearGradient>
                </MeshSvg>
            </div>
            <div className="md:-translate-y-16">
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
                <GoogleAddressForm />
            </div>
        </SectionLayout>
    );
}
