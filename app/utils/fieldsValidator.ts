export const validateField = (field: string, value: string | boolean, isRequired: boolean) => {
  let error = '';
  switch (field) {
    case 'name':
      error = isRequired && (value as string).trim() === '' ? 'errors.emptyName' : '';
      break;
    case 'email':
      if ((value as string).trim() === '') {
        error = isRequired ? 'errors.emptyEmail' : '';
      } else if (!(value as string).trim().match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
        error = 'errors.invalidEmail';
      } else {
        error = '';
      }
      break;
    case 'phone':
      if ((value as string).trim() === '') {
        error = isRequired ? 'errors.emptyPhone' : '';
      } else if (!(value as string).trim().match(/^[0-9]+$/g)) {
        error = 'errors.invalidPhone';
      } else {
        error = '';
      }
      break;
    case 'address':
      if ((value as string).trim() === '') {
        error = isRequired ? 'errors.emptyAddress' : '';
      }
      break;
    case 'message':
      error = isRequired && (value as string).trim() === '' ? 'errors.emptyMessage' : '';
      break;
    case 'policy':
      error = isRequired && value === false ? 'Согласитесь с политикой' : '';
      break;
    default:
      break;
  }
  return error;
};
