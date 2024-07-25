'use client'

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import LoopIcon from '@mui/icons-material/Loop';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
import IconInput from "./IconInput";
import Textarea from "./Textarea";
import Button from "./Button"
import Input from "./Input"

export default function ContactForm() {

    const [errors, setErrors] = useState({name: '', email: '', phone: '', message: ''});
    const [values, setValues] = useState({name: '', email: '', phone: '', message: ''});
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [response, setResponse] = useState<{type: string, message: string}>();
    
    useEffect(() => {
        const messages = [{type: 'success', message: 'Your message has been successfully sent!'}, {type: 'error', message: 'Something went wrong!'}];
        let timer = null;
        if(isLoading) {
            timer = setTimeout(() => {
                setIsLoading(false);
                const res = messages[Math.floor(Math.random() * 2)];
                if(res.type === 'success') setValues({name: '', email: '', phone: '', message: ''});
                setResponse(res);
         }, 2000)
    }
      return () => {
        timer && clearTimeout(timer);
      }
    }, [isLoading])
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>, field: string) => {
        setValues(prevState => ({...prevState, [field]: e.target.value})); 
        if(isSubmitted) validateField(field, e.target.value); 
    }

    const validateField = (field: string, value: string) => {
        let error = '';
        switch (field) {
            case 'name':
                error = (value.trim() === '') ?  'Введите имя' : '';
                break;
            case 'email':
                if (value.trim() === '') {
                    error = 'Введите почту';
                 } else if (!value.trim().match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g))  {
                    error = 'Введите корректную почту';
                 } else {
                    error = '';
                 }
                 break;
            case 'phone':
                if (value.trim() === '') {
                    error = 'Введите номер';
                 } else if (!value.trim().match(/^[0-9]+$/g))  {
                    error = 'Введите корректный номер';
                 } else {
                    error = '';
                 }
                break;
            case 'message':
                error = (value.trim() === '') ? 'Введите сообщение' : '';
                break;
            default:
                break;
        }
        setErrors(prevState => ({...prevState, [field]: error}));
        return error === '';
    }

    const isFormValid = () => {
        const {name, email, phone, message} = values;
        const isNameValid = validateField('name', name)
        const isEmailValid = validateField('email', email)
        const isPhoneValid = validateField('phone', phone);
        const isMessageValid = validateField('message', message);
        return isNameValid && isEmailValid && isPhoneValid && isMessageValid;
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitted(true);
        if (isFormValid()) {
            setIsLoading(true);
        }
        
    }

    return (
        <form action="" noValidate onSubmit={handleSubmit}>
            <div className="mb-6">
                <Input 
                    name="name"
                    label="Full Name"
                    handleChange={(e) => handleChange(e, 'name')}
                    value={values.name}
                    isValid={errors.name === ''}
                    error={errors.name}/>
            </div>
            <div className="mb-6">
                <Input
                    name="email"
                    type="email"
                    label="Email"
                    handleChange={(e) => handleChange(e, 'email')}
                    value={values.email}
                    isValid={errors.email === ''}
                    error={errors.email}/>
            </div>
            <div className="mb-6">
                <IconInput
                    name="phone"
                    type="phone"
                    label="Phone"
                    handleChange={(e) => handleChange(e, 'phone')}
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


