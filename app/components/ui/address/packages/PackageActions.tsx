import Button from '@/components/ui/form/buttons/Button';
import { useTranslations } from 'next-intl';

export default function PackageActions() {
    const t = useTranslations('Packages');
    return (
        <div className="flex">
            <Button className="rounded-t-none rounded-br-none w-full">
                {t('buttons.connect')}
            </Button>
            <Button variant="secondary" className="rounded-t-none rounded-bl-none w-full">
                {t('buttons.consultation')}
            </Button>
        </div>
    );
}
