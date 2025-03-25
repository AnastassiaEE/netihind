import Button from '@/components/ui/form/buttons/Button';
import { useTranslations } from 'next-intl';

export default function PackageActions({
    handleActionClick,
}: {
    handleActionClick: (action: 'connection' | 'consultation') => void;
}) {
    const t = useTranslations('Packages');
    return (
        <div className="flex">
            <Button
                className="w-full rounded-t-none rounded-br-none"
                handleClick={() => handleActionClick('connection')}
            >
                {t('buttons.connect')}
            </Button>
            <Button
                variant="outlined"
                className="w-full rounded-t-none rounded-bl-none"
                handleClick={() => handleActionClick('consultation')}
            >
                {t('buttons.consultation')}
            </Button>
        </div>
    );
}
