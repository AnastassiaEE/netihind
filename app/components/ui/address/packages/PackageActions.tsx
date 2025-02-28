import Button from '@/components/ui/form/buttons/Button';
import { useTranslations } from 'next-intl';

export default function PackageActions() {
    const t = useTranslations('Packages');
    return (
        <div className="flex">
            <Button className="w-full rounded-t-none rounded-br-none">
                {t('buttons.connect')}
            </Button>
            <Button variant="secondary" className="w-full rounded-t-none rounded-bl-none">
                {t('buttons.consultation')}
            </Button>
        </div>
    );
}
