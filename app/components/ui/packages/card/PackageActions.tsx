import Button from '@/components/ui/form/buttons/Button';
import { PackageActionType } from '@/types/elements.types';
import { useTranslations } from 'next-intl';

export default function PackageActions({
  onActionClick,
}: {
  onActionClick: (action: PackageActionType) => void;
}) {
  const t = useTranslations('Packages');
  return (
    <div className="flex">
      <Button
        className="w-full rounded-t-none rounded-br-none"
        onClick={() => onActionClick('connection')}
      >
        {t('buttons.connect')}
      </Button>
      <Button
        variant="outlined"
        className="w-full rounded-t-none rounded-bl-none"
        onClick={() => onActionClick('consultation')}
      >
        {t('buttons.consultation')}
      </Button>
    </div>
  );
}
