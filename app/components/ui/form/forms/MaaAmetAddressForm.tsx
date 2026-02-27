'use client';

import Button from '@/components/ui/form/buttons/Button';
import '@/styles/addressForm.css';
import FieldError from '@/components/ui/form/fields/FieldError';
import { useTranslations } from 'next-intl';
import useMaaAmetAddressForm from '@/hooks/useMaaAmetAddressForm';
import AddressFormLoader from '@/components/ui/loaders/AddressFormLoader';
import { useNonceContext } from '@/context/NonceContext';

export default function MaaAmetAddressForm() {
  const t = useTranslations('Form');
  const nonce = useNonceContext();
  const {
    isScriptLoaded,
    isLoading,
    handleSubmit,
    handleKeyDown,
    isFormVisible,
    error,
  } = useMaaAmetAddressForm(nonce);

  return (
    <>
      {!isScriptLoaded && isLoading && <AddressFormLoader />}
      {!isScriptLoaded && !isLoading && (
        <p className="text-error text-lg">{t('errors.formIsNotLoaded')}</p>
      )}
      <form
        onSubmit={handleSubmit}
        onKeyDown={handleKeyDown}
        className={isFormVisible() ? 'visible' : 'invisible'}
      >
        <div className="relative gap-1 md:flex">
          <div className="grow">
            <div id="in-address"></div>
            {error === '' ? (
              <span className="text-muted-dark absolute text-sm font-medium">
                {t('messages.addressExample')}
              </span>
            ) : (
              <FieldError size="lg">{t(error as any)}</FieldError>
            )}
          </div>
          <Button
            type="submit"
            size="lg"
            className="max-md:mt-6 max-md:w-full"
            data-gtm="find-providers"
          >
            {t('buttons.findProviders')}
          </Button>
        </div>
      </form>
    </>
  );
}
