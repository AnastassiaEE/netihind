import { useEffect, useRef, useState } from 'react';
import { validateField } from '@/utils/fieldsValidator';

export default function useForm(fields: {
  [key: string]: { initialValue: string | boolean; isRequired: boolean };
}) {
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

  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<{ type: string; message: string } | null>(null);

  const resetValues = () => {
    setValues(initialValues);
  };

  useEffect(() => {
    const messages = [
      { type: 'success', message: 'success.sent-successfully' },
      { type: 'error', message: 'errors.something-went-wrong' },
    ];
    let timer = null;
    if (isLoading) {
      timer = setTimeout(() => {
        setIsLoading(false);
        const res = messages[Math.floor(Math.random() * 2)];
        if (res.type === 'success') resetValues();
        setResponse(res);
      }, 2000);
    }
    return () => {
      timer && clearTimeout(timer);
    };
  }, [isLoading]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResponse(null);
    if (isFormValid()) {
      setIsLoading(true);
    }
  };

  return {
    errors,
    values,
    isLoading,
    response,
    bluredFields,
    handleChange,
    handleCheck,
    handleBlur,
    handleSubmit,
  };
}
