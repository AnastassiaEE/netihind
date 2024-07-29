export const validateField = (field: string, value: string) => {
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
    return error;
}
