'use client';

import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import Button from '@/components/ui/form/buttons/Button';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { phone } from '@/data/contacts';

export default function ConsultationButton({ type = 'desktop' }: { type?: 'desktop' | 'mobile' }) {
    const { t } = useTranslation('navigation');

    const buttonClasses = classNames('!pt-0.5 !pb-1 rounded-md', {
        '!px-2': type === 'mobile',
    });

    const iconClasses = classNames({
        'mr-6': type === 'desktop',
    });

    return (
        <a href={`tel:${phone}`}>
            <Button name="call" size="lg" className={buttonClasses}>
                <div className="flex items-center">
                    <PhoneInTalkIcon fontSize="large" className={iconClasses} />
                    {type == 'desktop' && (
                        <div className="flex flex-col text-left">
                            <span className="font-bold">{phone}</span>
                            <span className="text-xs uppercase">{t('buttons.consultation')}</span>
                        </div>
                    )}
                </div>
            </Button>
        </a>
    );
}
