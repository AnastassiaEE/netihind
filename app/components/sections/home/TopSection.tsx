import SectionLayout from '@/layouts/SectionLayout';
import providerLogos from '@/data/providerLogos';
import LogoCards from '@/components/ui/logo/LogoCards';
import { H1 } from '@/components/ui/headings/HomePageHeadings';
import GradientMesh from '@/components/ui/mesh/GradientMesh';
import MaaAmetAddressForm from '@/components/ui/form/forms/MaaAmetAddressForm';
import { useTranslations } from 'next-intl';

export default function TopSection() {
  const t = useTranslations('HomePage.topSection');
  return (
    <SectionLayout
      className="relative flex h-screen min-h-162.5 flex-col justify-center pt-20 md:min-h-180 md:pt-35"
      bg="bg-linear-to-t from-primary/20 from-0% via-accent/20 via-secondary/20 via-40% to-80%"
    >
      <div className="absolute right-0 bottom-12.5 -z-10 h-auto w-57.5 max-md:top-20 md:w-125">
        <GradientMesh />
      </div>
      <div className="relative md:-translate-y-16">
        <H1>
          {t.rich('title', {
            span: (chunks) => (
              <span className="from-primary via-secondary to-accent bg-linear-to-r bg-clip-text text-transparent">
                {chunks}
              </span>
            ),
          })}
        </H1>
        <p className="mb-4 md:text-lg">{t('description')}</p>
        <MaaAmetAddressForm />
      </div>
      <div className="bg-primary/10 absolute inset-x-0 bottom-0 -z-10 py-3 md:p-9">
        <div className="md:container">
          <LogoCards logos={providerLogos} />
        </div>
      </div>
    </SectionLayout>
  );
}
