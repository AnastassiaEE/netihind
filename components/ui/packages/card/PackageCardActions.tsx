import { PackageAction } from '@/types/packages.types';
import { Button } from '@/components/ui/buttons/Button';
import { useTranslations } from 'next-intl';

export default function PackageCardActions({
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
        size="lg"
        className="flex-1 rounded-t-none rounded-br-none"
        onClick={() => onActionClick('connection')}
      >
        {t('connect')}
      </Button>
      <Button
        variant="outline"
        size="lg"
        className="flex-1 rounded-t-none rounded-bl-none"
        onClick={() => onActionClick('details')}
      >
        {t('details')}
      </Button>
    </div>
  );
}
