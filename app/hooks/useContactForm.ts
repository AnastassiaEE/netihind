import { useEffect, useRef, useState } from "react";
import { validateField } from "../utils/fieldsValidator";

export default function useContactForm() {

    const [errors, setErrors] = useState({name: '', email: '', phone: '', message: '', policy: ''});
    const [values, setValues] = useState<{[key: string]: string | boolean}>({name: '', email: '', phone: '', message: '', policy: false});
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState<{type: string, message: string} | null>(null);
    const bluredFields = useRef<{[key: string]: boolean}>({name: false, email: false, phone: false, message: false});

    const resetValues = () => {
        setValues({name: '', email: '', phone: '', message: '', policy: false});
    }

    useEffect(() => {
        const messages = [{type: 'success', message: 'Your message has been successfully sent!'}, {type: 'error', message: 'Something went wrong!'}];
        let timer = null;
        if(isLoading) {
            timer = setTimeout(() => {
                setIsLoading(false);
                const res = messages[Math.floor(Math.random() * 2)];
                if(res.type === 'success') resetValues();
                setResponse(res);
         }, 2000)
    }
      return () => {
        timer && clearTimeout(timer);
      }
    }, [isLoading])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>, field: string) => {
        setValues(prevState => ({...prevState, [field]: e.target.value})); 
        if(bluredFields.current[field] === true) {
            const error = validateField(field, e.target.value); 
            setErrors(prevState => ({...prevState, [field]: error}))
        }
    }

    const handleCheck = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>, field: string) => {
        setValues(prevState => ({...prevState, [field]: !prevState[field]}))
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement|HTMLTextAreaElement>, field: string) => {
        if (bluredFields.current[field] === false && (values[field] as string).length > 0) {
            const error = validateField(field, e.target.value); 
            setErrors(prevState => ({...prevState, [field]: error}))
            bluredFields.current[field] = true;
        }
    }

    const isFormValid = () => {
        const {name, email, phone, message, policy} = values;
        const err = {
            name: validateField('name', name),
            email: validateField('email', email),
            phone: validateField('phone', phone),
            message: validateField('message', message),
            policy: validateField('policy', policy)
        }
        setErrors(err)
        return !Object.values(err).some(Boolean);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setResponse(null)
        if (isFormValid()) {
            setIsLoading(true);
        }
    }

    return {
        errors, 
        values,
        isLoading,
        response,
        bluredFields,
        handleChange,
        handleCheck,
        handleBlur,
        handleSubmit
    }
}