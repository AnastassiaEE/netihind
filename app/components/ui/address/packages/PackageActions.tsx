import Button from '@/components/ui/form/buttons/Button';
import { useTranslations } from 'next-intl';

export default function PackageActions({
    handleButtonClick,
}: {
    handleButtonClick: (action: 'connection' | 'consultation') => void;
}) {
    const t = useTranslations('Packages');
    return (
        <div className="flex">
            <Button
                name="connect"
                className="w-full rounded-t-none rounded-br-none"
                handleClick={() => handleButtonClick('connection')}
            >
                {t('buttons.connect')}
            </Button>
            <Button
                name="consultation"
                variant="secondary"
                className="w-full rounded-t-none rounded-bl-none"
                handleClick={() => handleButtonClick('consultation')}
            >
                {t('buttons.consultation')}
            </Button>
        </div>
    );
}
