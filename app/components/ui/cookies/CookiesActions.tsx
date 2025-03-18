import Button from '@/components/ui/form/buttons/Button';
import classNames from 'classnames';

export default function CookiesActions({
  className,
  managePreferences,
}: {
  className?: string;
  managePreferences: (action: string) => void;
}) {
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
        handleClick={() => managePreferences('disable-all')}
      >
        Keeldu
      </Button>
      <Button
        variant="outlined"
        size="lg"
        className="w-full"
        handleClick={() => managePreferences('enable-selected')}
      >
        Luba valik
      </Button>
      <Button
        size="lg"
        className="w-full"
        handleClick={() => managePreferences('enable-all')}
      >
        Luba kõik
      </Button>
    </div>
  );
}
