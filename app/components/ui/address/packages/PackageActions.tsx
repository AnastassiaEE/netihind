import Button from '@/components/ui/form/buttons/Button';
import { useTranslations } from 'next-intl';

export default function PackageActions({ handleButtonClick }: { handleButtonClick: () => void }) {
    const t = useTranslations('Packages');
    return (
        <div className="flex">
            <Button className="w-full rounded-t-none rounded-br-none" handleClick={handleButtonClick}>
                {t('buttons.connect')}
            </Button>
            <Button variant="secondary" className="w-full rounded-t-none rounded-bl-none" handleClick={handleButtonClick}>
                {t('buttons.consultation')}
            </Button>
        </div>
    );
}
