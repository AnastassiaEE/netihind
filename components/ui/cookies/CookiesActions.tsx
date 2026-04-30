import { Button } from '@/components/ui/buttons/Button';
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
        variant="outline"
        size="lg"
        className="flex-1"
        onClick={() => managePreferences('decline-all')}
      >
        {t('declineAll')}
      </Button>
      <Button
        variant="outline"
        size="lg"
        className="flex-1"
        onClick={() => managePreferences('accept-selected')}
      >
        {t('acceptSelected')}
      </Button>
      <Button
        size="lg"
        className="flex-1"
        onClick={() => managePreferences('accept-all')}
      >
        {t('acceptAll')}
      </Button>
    </div>
  );
}
