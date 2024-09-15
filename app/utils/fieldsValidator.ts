export const validateField = (field: string, value: string | boolean) => {
    let error = '';
    switch (field) {
        case 'name':
            error = ((value as string).trim() === '') ?  'errors.empty-name' : '';
            break;
        case 'email':
            if ((value as string).trim() === '') {
                error = 'errors.empty-email';
             } else if (!(value as string).trim().match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g))  {
                error = 'errors.invalid-email';
             } else {
                error = '';
             }
             break;
        case 'phone':
            if ((value as string).trim() === '') {
                error = 'errors.empty-phone';
             } else if (!(value as string).trim().match(/^[0-9]+$/g))  {
                error = 'errors.invalid-phone';
             } else {
                error = '';
             }
            break;
        case 'message':
            error = ((value as string).trim() === '') ? 'errors.empty-message' : '';
            break;
        case 'policy':
            error = (value === false) ? 'Согласитесь с политикой': '';
            break;
        default:
            break;
    }
    return error;
}
