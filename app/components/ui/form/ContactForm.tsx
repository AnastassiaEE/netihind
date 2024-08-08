'use client'

import useContactForm from '../../../hooks/useContactForm';
import FormResponse from './FormResponse';
import LoopIcon from '@mui/icons-material/Loop';
import AddIcon from '@mui/icons-material/Add';
import IconInput from "./IconInput";
import Checkbox from './Checkbox';
import Textarea from "./Textarea";
import Button from "./Button"
import Input from "./Input"
import Link from 'next/link';


export default function ContactForm() {

    const {
        errors,
        values,
        isLoading,
        response,
        handleChange,
        handleCheck,
        handleBlur,
        handleSubmit
    } = useContactForm()

    return (
        <form action="" noValidate onSubmit={handleSubmit}>
            <div className="mb-6">
                <Input 
                    name="name"
                    label="Full Name"
                    handleChange={(e) => handleChange(e, 'name')}
                    handleBlur={(e) => handleBlur(e, 'name')}
                    value={values.name as string}
                    isValid={errors.name === ''}
                    error={errors.name}/>
            </div>
            <div className="mb-6">
                <Input
                    name="email"
                    type="email"
                    inputmode="email"
                    label="Email"
                    handleChange={(e) => handleChange(e, 'email')}
                    handleBlur={(e) => handleBlur(e, 'email')}
                    value={values.email as string}
                    isValid={errors.email === ''}
                    error={errors.email}/>
            </div>
            <div className="mb-6">
                <IconInput
                    name="phone"
                    type="tel"
                    inputmode="tel"
                    label="Phone"
                    handleChange={(e) => handleChange(e, 'phone')}
                    handleBlur={(e) => handleBlur(e, 'phone')}
                    value={values.phone as string}
                    isValid={errors.phone === ''}
                    error={errors.phone}
                    icon={{Icon: AddIcon, isVisible: true}}/>
            </div>
            <div className="mb-6">
                <Textarea
                    name="message"
                    label="Message"
                    handleChange={(e) => handleChange(e, 'message')}
                    handleBlur={(e) => handleBlur(e, 'message')}
                    value={values.message as string}
                    isValid={errors.message === ''}
                    error={errors.message}/> 
            </div>
            <div className="mb-6">
                <Checkbox 
                    name="policy"
                    handleCheck={(e) => handleCheck(e, 'policy')}
                    isChecked={values.policy as boolean}
                    isValid={errors.policy === ''}> 
                    Согласен с политикой <Link href="#" className="transition-colors hover:text-primary font-semibold">конфиденциальности</Link>
                </Checkbox>
            </div>
            <Button type="submit" size="lg" disabled={isLoading}>
                {isLoading ? <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><LoopIcon/></svg>: <>Send</>}
            </Button>
            
            {!isLoading && <FormResponse type={response?.type}> {response?.message} </FormResponse>}
        </form>
    )   
}


