import { useRef, useState } from 'react';
import { validateField } from '@/utils/fieldsValidator';

const responses = {
  success: { message: 'success.sent-successfully' },
  error: { message: 'errors.something-went-wrong' },
};

export default function useForm(
  fields: {
    [key: string]: { initialValue: string | boolean; isRequired: boolean };
  },
  type: 'contact' | 'request',
) {
  const initialErrors: { [key: string]: string } = Object.keys(fields).reduce((result, field) => {
    return {
      ...result,
      [field]: '',
    };
  }, {});

  const initialValues: { [key: string]: string | boolean } = Object.keys(fields).reduce(
    (result, field) => {
      return {
        ...result,
        [field]: fields[field].initialValue,
      };
    },
    {},
  );

  const initialBluredFields: { [key: string]: boolean } = Object.keys(initialErrors).reduce(
    (result, field) => {
      return {
        ...result,
        [field]: false,
      };
    },
    {},
  );

  const [errors, setErrors] = useState(initialErrors);
  const [values, setValues] = useState(initialValues);
  const bluredFields = useRef(initialBluredFields);

  const [isSending, setIsSending] = useState(false);
  const [response, setResponse] = useState<{ type: string; message: string } | null>(null);

  const resetValues = () => {
    setValues(initialValues);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    field: string,
  ) => {
    setValues((prevState) => ({ ...prevState, [field]: e.target.value }));
    if (bluredFields.current[field] === true) {
      const error = validateField(field, e.target.value, fields[field].isRequired);
      setErrors((prevState) => ({ ...prevState, [field]: error }));
    }
  };

  const handleCheck = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string,
  ) => {
    setValues((prevState) => ({ ...prevState, [field]: !prevState[field] }));
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string,
  ) => {
    if (bluredFields.current[field] === false && (values[field] as string).length > 0) {
      const error = validateField(field, e.target.value, fields[field].isRequired);
      setErrors((prevState) => ({ ...prevState, [field]: error }));
      bluredFields.current[field] = true;
    }
  };

  const isFormValid = () => {
    const err = Object.keys(values).reduce((result, field) => {
      return {
        ...result,
        [field]: validateField(field as string, values[field], fields[field].isRequired),
      };
    }, {});
    setErrors(err);
    return !Object.values(err).some(Boolean);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResponse(null);
    if (isFormValid()) {
      try {
        setIsSending(true);
        const response = await fetch('/api/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...values, type: type }),
        });
        // handle success
        if (response.ok) {
          setResponse({ type: 'success', message: responses.success.message });
          resetValues();
        } else {
          setResponse({ type: 'error', message: responses.error.message });
        }
      } catch (error) {
        setResponse({ type: 'error', message: responses.error.message });
      } finally {
        setIsSending(false);
      }
    }
  };

  return {
    errors,
    values,
    isSending,
    response,
    bluredFields,
    handleChange,
    handleCheck,
    handleBlur,
    handleSubmit,
  };
}
