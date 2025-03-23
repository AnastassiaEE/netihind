import Button from '@/components/ui/form/buttons/Button';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';

export default function CookiesActions({
  className,
  managePreferences,
}: {
  className?: string;
  managePreferences: (action: string) => void;
}) {
  const t = useTranslations('Cookies');
  return (
    <div
      className={classNames(
        'flex w-full justify-center gap-3 max-sm:flex-wrap',
        className,
      )}
    >
      <Button
        variant="outlined"
        size="lg"
        className="w-full"
        handleClick={() => managePreferences('decline-all')}
      >
        {t('buttons.declineAll')}
      </Button>
      <Button
        variant="outlined"
        size="lg"
        className="w-full"
        handleClick={() => managePreferences('accept-selected')}
      >
        {t('buttons.acceptSelected')}
      </Button>
      <Button
        size="lg"
        className="w-full"
        handleClick={() => managePreferences('accept-all')}
      >
        {t('buttons.acceptAll')}
      </Button>
    </div>
  );
}
