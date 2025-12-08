import PackageHeader from '@/components/ui/packages/card/PackageCardHeader';
import PackageCardSpeed from '@/components/ui/packages/card/PackageCardSpeed';
import { useTranslationsContext } from '@/context/TranslationsContext';
import { Package } from '@/types/packages.types';
import { useLocale } from 'next-intl';
import dynamic from 'next/dynamic';

interface PackageHeaderSectionProps
  extends Pick<
    Package,
    'name' | 'technology' | 'provider' | 'speed' | 'infrastructure'
  > {
  className?: string;
}

const Tooltip = dynamic(() => import('@/components/ui/overlay/Tooltip'));

export default function PackageCardHeaderSection({
  name,
  technology,
  provider,
  speed,
  infrastructure,
  className,
}: PackageHeaderSectionProps) {
  const translations = useTranslationsContext();
  const currentLocale = useLocale();

  return (
    <div className={className}>
      <PackageHeader
        providerLogoSrc={provider.image_url}
        providerName={provider.name}
        packageName={name}
        className="mb-3"
      />
      <div className="mb-2 flex flex-wrap items-center gap-2 font-medium uppercase text-muted-dark">
        <PackageCardSpeed type="download" speed={speed.download} />
        <PackageCardSpeed type="upload" speed={speed.upload} />
        <Tooltip
          elementToInteract={
            <span className="rounded-md border border-primary px-1 py-0.5 text-xs font-semibold text-primary">
              {infrastructure.is_partner
                ? infrastructure.name
                : technology.name}
            </span>
          }
          content={
            translations[technology.description]?.[currentLocale] ??
            technology.description
          }
        />
      </div>
    </div>
  );
}
