'use client';

import Button from '@/components/ui/form/buttons/Button';
import '@/styles/addressForm.css';
import FieldError from '@/components/ui/form/fields/FieldError';
import { useTranslations } from 'next-intl';
import useMaaAmetAddressForm from '@/hooks/UseMaaAmetAddressForm';
import AddressFormLoader from '@/components/ui/loaders/AddressFormLoader';

export default function MaaAmetAddressForm() {
    const t = useTranslations('Form');
    const { isScriptLoaded, isLoading, handleSubmit, handleKeyDown, isFormVisible, error } =
        useMaaAmetAddressForm();

    return (
        <>
            {!isScriptLoaded && isLoading && <AddressFormLoader />}
            {!isScriptLoaded && !isLoading && (
                <p className="text-lg text-error">{t('errors.formIsNotLoaded')}</p>
            )}
            <form
                onSubmit={handleSubmit}
                onKeyDown={handleKeyDown}
                className={isFormVisible() ? 'visible' : 'invisible'}
            >
                <div className="md:flex gap-1 relative">
                    <div className="grow">
                        <div id="in-address"></div>
                        {error !== '' && <FieldError size="lg">{t(error)}</FieldError>}
                    </div>
                    <Button type="submit" size="lg" className="max-md:w-full max-md:mt-6">
                        {t('buttons.findProviders')}
                    </Button>
                </div>
            </form>
        </>
    );
}
