import { PackageAction } from '@/types/packages.types';
import Button from '@/components/ui/form/buttons/Button';
import { useTranslations } from 'next-intl';

export default function PackageActions({
  onActionClick,
  className,
}: {
  onActionClick: (action: PackageAction) => void;
  className?: string;
}) {
  const t = useTranslations('Packages.buttons');

  return (
    <div className={className}>
      <Button
        className="w-full rounded-t-none rounded-br-none"
        onClick={() => onActionClick('connection')}
      >
        {t('connect')}
      </Button>
      <Button
        variant="outlined"
        className="w-full rounded-t-none rounded-bl-none"
        onClick={() => onActionClick('details')}
      >
        {t('details')}
      </Button>
    </div>
  );
}
