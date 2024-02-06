'use client'

import { useEffect, useRef, useState } from "react"
import Button from "./Button"
import Input from "./Input"

export default function ContactForm() {

    const [errors, setErrors] = useState({name: '', email: '', message: ''});
    const [values, setValues] = useState({name: '', email: '', message: ''});
    const isSubmitted = useRef(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>, field) => {
        setValues({...values, [field]: e.target.value}); 
    }

    useEffect(() => {
      if (isSubmitted.current) validateForm();
    }, [values])
    

    const validateForm = () => {
        const {name, email, message} = values;
        let err = errors;
        err.name = (name.trim() === '') ?  'Введите имя' : '';
        if (email.trim() === '') {
           err.email = 'Введите почту';
        } else if (!email.trim().match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g))  {
            err.email = 'Почта неверного формата';
        } else {
            err.email = '';
        }
        err.message = (message.trim() === '') ? 'Введите сообщение' : '';
        setErrors(prevState => ({...prevState, err}));
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        isSubmitted.current = true;
        validateForm();
    }

    return (
        <form action="" noValidate onSubmit={handleSubmit}>
            <div className="mb-6">
                <Input 
                    size="sm"
                    name="name"
                    label="Full Name"
                    handleChange={(e) => handleChange(e, 'name')}
                    value={values.name}
                    isInvalid={errors.name !== ''}
                    error={errors.name}/>
            </div>
            <div className="mb-6">
                <Input
                    size="sm"
                    name="email"
                    type="email"
                    label="Email"
                    handleChange={(e) => handleChange(e, 'email')}
                    value={values.email}
                    isInvalid={errors.email !== ''}
                    error={errors.email}/>
            </div>
            <Button variant="primary" size="lg">Send</Button>
        </form>
    )   
}