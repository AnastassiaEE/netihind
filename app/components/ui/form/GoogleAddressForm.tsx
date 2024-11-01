'use client';

import Button from './buttons/Button';
import IconInput from './fields/IconInput';
import CloseIcon from '@mui/icons-material/Close';
import UseGoogleAddressForm from '@/hooks/useGoogleAddressForm';

export default function GoogleAddressForm() {
    const { formRef, inputRef, error, handleChange, handleDelete, handleSubmit } =
        UseGoogleAddressForm();
    return (
        <form onSubmit={handleSubmit} ref={formRef} className="flex flex-wrap items-center gap-x-1.5">
            <div className="grow basis-auto">
                <IconInput
                    size="lg"
                    name="address"
                    isValid={error === ''}
                    error={error}
                    ref={inputRef}
                    placeholder={'address.placeholders.address'}
                    handleChange={handleChange}
                    icon={{
                        Icon: CloseIcon,
                        isVisible: inputRef.current?.value !== '',
                        handleClick: handleDelete,
                    }}
                />
            </div>
            <Button type="submit" size="lg" className="basis-full sm:basis-auto hover:cursor-pointer">
                {'address.buttons.find'}
            </Button>
        </form>
    );
}
