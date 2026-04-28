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
  const t = useTranslations('Cookies.buttons');
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
        onClick={() => managePreferences('decline-all')}
      >
        {t('declineAll')}
      </Button>
      <Button
        variant="outlined"
        size="lg"
        className="w-full"
        onClick={() => managePreferences('accept-selected')}
      >
        {t('acceptSelected')}
      </Button>
      <Button
        size="lg"
        className="w-full"
        onClick={() => managePreferences('accept-all')}
      >
        {t('acceptAll')}
      </Button>
    </div>
  );
}
