export const validateField = (field: string, value: string | boolean) => {
    let error = '';
    switch (field) {
        case 'name':
            error = ((value as string).trim() === '') ?  'Введите имя' : '';
            break;
        case 'email':
            if ((value as string).trim() === '') {
                error = 'Введите почту';
             } else if (!(value as string).trim().match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g))  {
                error = 'Введите корректную почту';
             } else {
                error = '';
             }
             break;
        case 'phone':
            if ((value as string).trim() === '') {
                error = 'Введите номер';
             } else if (!(value as string).trim().match(/^[0-9]+$/g))  {
                error = 'Введите корректный номер';
             } else {
                error = '';
             }
            break;
        case 'message':
            error = ((value as string).trim() === '') ? 'Введите сообщение' : '';
            break;
        case 'policy':
            error = (value === false) ? 'Согласитесь с политикой': '';
            break;
        default:
            break;
    }
    return error;
}
