'use client';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import Button from '@/components/ui/form/buttons/Button';
import classNames from 'classnames';
import { contacts } from '@/data/contacts';
import { useTranslations } from 'next-intl';

export default function ConsultationButton({ type = 'desktop' }: { type?: 'desktop' | 'mobile' }) {
    const t = useTranslations('Navigation');
    const buttonClasses = classNames('!pt-0.5 !pb-1 rounded-md', {
        '!px-2': type === 'mobile',
    });
    const { phone } = contacts;
    return (
        <a href={`tel:${phone}`}>
            <Button name="call" size="lg" className={buttonClasses}>
                <div className="flex items-center">
                    <PhoneInTalkIcon fontSize="large" className={type === 'desktop' ? 'mr-6' : ''} />
                    {type === 'desktop' && (
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
