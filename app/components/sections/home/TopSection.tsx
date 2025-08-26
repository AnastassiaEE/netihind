import SectionLayout from '@/layouts/SectionLayout';
import providerLogos from '@/data/providerLogos';
import LogoCards from '@/components/ui/logo/LogoCards';
import { H1 } from '@/components/ui/headings/HomePageHeadings';
import GradientMesh from '@/components/ui/mesh/GradientMesh';
import MaaAmetAddressForm from '@/components/ui/form/forms/MaaAmetAddressForm';
import { useTranslations } from 'next-intl';

export default function TopSection() {
  const t = useTranslations('HomePage');
  return (
    <SectionLayout
      className="relative flex h-screen min-h-[650px] flex-col justify-center pt-[80px] md:min-h-[720px] md:pt-[140px]"
      bg="bg-gradient-to-t from-primary/20 from-0% via-accent/10 via-secondary/10 via-40% to-80%"
    >
      <div className="absolute bottom-[50px] right-0 -z-10 h-auto w-[230px] max-md:top-[80px] md:w-[500px]">
        <GradientMesh />
      </div>
      <div className="relative md:-translate-y-16">
        <H1>
          {t.rich('topSection.title', {
            span: (chunks) => (
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                {chunks}
              </span>
            ),
          })}
        </H1>
        <p className="mb-4 md:text-lg">{t('topSection.description')}</p>
        <MaaAmetAddressForm />
      </div>
      <div className="absolute inset-x-0 bottom-0 -z-10 bg-primary/10 py-3 md:p-9">
        <div className="md:container">
          <LogoCards logos={providerLogos} />
        </div>
      </div>
    </SectionLayout>
  );
}
