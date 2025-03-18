import Button from '@/components/ui/form/buttons/Button';
import classNames from 'classnames';

export default function CookiesActions({ className }: { className?: string }) {
  return (
    <div
      className={classNames(
        'flex w-full justify-center gap-3 max-sm:flex-wrap',
        className,
      )}
    >
      <Button variant="outlined" size="lg" className="w-full">
        Keeldu
      </Button>
      <Button variant="outlined" size="lg" className="w-full">
        Luba valik
      </Button>
      <Button size="lg" className="w-full">
        Luba kõik
      </Button>
    </div>
  );
}
