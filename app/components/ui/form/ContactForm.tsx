'use client'

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import LoopIcon from '@mui/icons-material/Loop';
import AddIcon from '@mui/icons-material/Add';
import IconInput from "./IconInput";
import Textarea from "./Textarea";
import Button from "./Button"
import Input from "./Input"
import useContactForm from '../../../hooks/useContactForm';

export default function ContactForm() {

    const {
        errors,
        values,
        isLoading,
        response,
        handleChange,
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
                    value={values.name}
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
                    value={values.email}
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
                    value={values.phone}
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
                    value={values.message}
                    isValid={errors.message === ''}
                    error={errors.message}/> 
            </div>
            <Button variant="primary" size="lg" disabled={isLoading}>
                {isLoading ? <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><LoopIcon/></svg>: <>Send</>}
            </Button>
            
            {!isLoading && 
                <div className={`text-sm mt-4 ${response?.type === 'success' ? 'text-green-600' : undefined} ${response?.type === 'error' ? 'text-yellow-600' : undefined}`}> 
                    {response?.type === 'success' && <CheckCircleIcon className="mr-2"/>}
                    {response?.type === 'error' && <ErrorIcon className="mr-2"/>}
                    {response?.message}
                </div>
            }
        </form>
    )   
}


