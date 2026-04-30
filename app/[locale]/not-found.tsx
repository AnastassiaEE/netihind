import Header from '@/components/ui/header/Header';
import SectionLayout from '@/layouts/SectionLayout';
import { Link } from '@/i18n/routing';
import { Home } from 'lucide-react';
import SecondaryFooter from '@/components/ui/footer/SecondaryFooter';
import { Button } from '@/components/ui/buttons/Button';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('NotFoundPage');
  return (
    <>
      <Header variant="primary" />
      <div className="flex h-dvh min-h-125 flex-col pt-20 md:h-screen md:min-h-180 md:pt-35">
        <SectionLayout className="flex grow">
          <div className="flex h-full flex-col items-center justify-center">
            <h1 className="text-primary mb-6 text-9xl font-extrabold">404</h1>
            <h2 className="mb-8 text-5xl font-extrabold">{t('title')}</h2>
            <p className="mb-12 text-center text-xl">
              {t.rich('description', {
                br: () => <br />,
              })}
            </p>
            <Button size="lg" asChild>
              <Link href="/">
                <Home />
                {t('buttons.returnHome')}
              </Link>
            </Button>
          </div>
        </SectionLayout>
        <SecondaryFooter />
      </div>
    </>
  );
}
