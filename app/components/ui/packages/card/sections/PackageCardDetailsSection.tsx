import { Engineering, Router } from '@mui/icons-material';
import PackageDetail from '@/components/ui/packages/card/PackageCardDetail';
import { Package } from '@/types/packages.types';
import { useTranslations } from 'next-intl';

interface PackageDetailsSectionProps extends Pick<Package, 'installation'> {
  className?: string;
}

export default function PackageCardDetailsSection({
  installation,
  className,
}: PackageDetailsSectionProps) {
  const t = useTranslations('Packages.details');

  return (
    <div className={className}>
      <div className="flex flex-wrap gap-3">
        {installation && (
          <PackageDetail Icon={Engineering}>
            <>
              {installation.visit_fee > 0
                ? t('installation.minPrice', {
                    visit_fee: installation.visit_fee,
                  })
                : t('installation.free')}
            </>
          </PackageDetail>
        )}
        <PackageDetail Icon={Router}>
          <>rent</>
        </PackageDetail>
      </div>
    </div>
  );
}
