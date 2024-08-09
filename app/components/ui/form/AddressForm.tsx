'use client'

import useAddressForm from '../../../hooks/useAddressForm';
import CloseIcon from '@mui/icons-material/Close';
import Searchbar from "./Searchbar";
import Button from "./Button";

export default function AddressForm() { 

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

    return (    
        <form action="" onSubmit={handleSubmit} className="flex flex-wrap items-center gap-x-1.5">
            <Searchbar
                className={"grow basis-auto"}
                data={addresses}
                size="lg"
                name="address"
                placeholder="Адрес"
                handleChange={handleAddressInputChange} 
                handleItemClick={handleAddressClick}
                value={values.address}
                isValid={errors.address === ''}
                error={errors.address}
                icon={{Icon: CloseIcon, isVisible: values.address !== '', handleClick: removeAddress}}/>
            {allAddressApartments.length > 0 &&
                <Searchbar
                    className="basis-3/12 md:basis-2/12"
                    data={apartments}
                    size="lg"
                    name="apartment"
                    placeholder="Номер квартиры"
                    handleChange={handleApartmentInputChange}
                    handleItemClick={handleApartmentClick}
                    value={values.apartment}
                    isValid={errors.apartment === ''}
                    error={errors.apartment}/>
            }
            <div className={`basis-full ${errors.apartment !== '' ? 'mt-12': 'mt-7'} sm:basis-auto sm:mt-0`}>
                <Button type="submit" size="lg"> Найти провайдеров </Button>
            </div>    
        </form>
    )
}
    