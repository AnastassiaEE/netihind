'use client'

import useAddressForm from '@/hooks/useAddressForm';
import CloseIcon from '@mui/icons-material/Close';
import Searchbar from "./Searchbar";
import Button from "./Button";
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

export default function AddressForm() { 

    const { t } = useTranslation(['form'])

    const {
        addresses, 
        allAddressApartments,
        apartments,
        values,
        errors,
        handleAddressInputChange,
        handleApartmentInputChange,
        handleAddressClick, 
        handleApartmentClick,
        removeAddress,
        handleSubmit
    } = useAddressForm();

    const buttonBlockClasses = classNames('basis-full sm:basis-auto', {
        'max-sm:mt-12': errors.apartment !== '',
        'max-sm:mt-7': errors.apartment === ''
    })
    return (    
        <form action="" onSubmit={handleSubmit} className="flex flex-wrap items-center gap-x-1.5">
            <div className="grow basis-auto">
                <Searchbar
                    data={addresses}
                    size="lg"
                    name="address"
                    placeholder={t('address.placeholders.address')}
                    handleChange={handleAddressInputChange} 
                    handleItemClick={handleAddressClick}
                    value={values.address}
                    isValid={errors.address === ''}
                    error={t(errors.address)}
                    icon={{Icon: CloseIcon, isVisible: values.address !== '', handleClick: removeAddress}}/>
            </div>
            {allAddressApartments.length > 0 &&
                <div className="basis-3/12 md:basis-2/12">
                    <Searchbar
                        data={apartments}
                        size="lg"
                        name="apartment"
                        placeholder={t('address.placeholders.apartment')}
                        handleChange={handleApartmentInputChange}
                        handleItemClick={handleApartmentClick}
                        value={values.apartment}
                        isValid={errors.apartment === ''}
                        error={t(errors.apartment)}/>
                </div>
            }
            <div className={buttonBlockClasses}>
                <Button type="submit" size="lg"> {t('address.buttons.find')} </Button>
            </div>    
        </form>
    )
}
    