'use client';

import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import Button from '@/components/ui/form/buttons/Button';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

export default function ConsultationButton({ type = 'desktop' }: { type?: 'desktop' | 'mobile' }) {
    const { t } = useTranslation('form');

    const buttonClasses = classNames('!pt-0.5 !pb-1 rounded-md', {
        '!px-2': type === 'mobile',
    });

    const iconClasses = classNames({
        'mr-6': type === 'desktop',
    });

    return (
        <a href="tel:+37256979125">
            <Button size="lg" className={buttonClasses}>
                <div className="flex items-center">
                    <PhoneInTalkIcon fontSize="large" className={iconClasses} />
                    {type == 'desktop' && (
                        <div className="flex flex-col text-left">
                            <span className="text-base font-bold">+37256979125</span>
                            <span className="text-xs uppercase">{t('buttons.free-consultation')}</span>
                        </div>
                    )}
                </div>
            </Button>
        </a>
    );
}
