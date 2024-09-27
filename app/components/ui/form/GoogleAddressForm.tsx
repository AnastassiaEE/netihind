'use client';

import Button from './buttons/Button';
import IconInput from './fields/IconInput';
import CloseIcon from '@mui/icons-material/Close';
import UseGoogleAddressForm from '@/hooks/useGoogleAddressForm';
import { useTranslation } from 'react-i18next';

export default function GoogleAddressForm() {
    const { formRef, inputRef, error, handleChange, handleDelete, handleSubmit } =
        UseGoogleAddressForm();
    const { t } = useTranslation('form');
    return (
        <form onSubmit={handleSubmit} ref={formRef} className="flex flex-wrap items-center gap-x-1.5">
            <div className="grow basis-auto">
                <IconInput
                    size="lg"
                    name="address"
                    isValid={error === ''}
                    error={t(error)}
                    ref={inputRef}
                    placeholder={t('address.placeholders.address')}
                    handleChange={handleChange}
                    icon={{
                        Icon: CloseIcon,
                        isVisible: inputRef.current?.value !== '',
                        handleClick: handleDelete,
                    }}
                />
            </div>
            <Button type="submit" size="lg" className="basis-full sm:basis-auto hover:cursor-pointer">
                {t('address.buttons.find')}
            </Button>
        </form>
    );
}
