import { useRef, useState } from 'react';
import { validateField } from '@/utils/fieldsValidator';

const responses = {
  success: { message: 'messages.sentSuccessfully' },
  error: { message: 'messages.somethingWentWrong' },
};

export default function useForm(
  fields: {
    [key: string]: { initialValue: string | boolean; isRequired: boolean };
  },
  type: 'contact' | 'connection' | 'consultation',
  additionalData?: { [key: string]: any },
) {
  const initialValues = Object.fromEntries(
    Object.entries(fields).map(([field, { initialValue }]) => [field, initialValue]),
  );
  const initialErrors = Object.fromEntries(Object.keys(fields).map((field) => [field, '']));
  const initialBluredFields = Object.fromEntries(
    Object.keys(fields).map((field) => [field, false]),
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string,
  ) => {
    const value =
      e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setValues((prev) => ({ ...prev, [field]: value }));

    if (bluredFields.current[field]) {
      const error = validateField(field, value, fields[field].isRequired);
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
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
    const err = Object.fromEntries(
      Object.entries(values).map(([field, value]) => [
        field,
        validateField(field, value, fields[field].isRequired),
      ]),
    );
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
          body: JSON.stringify({ ...values, ...additionalData, type: type }),
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
    handleSelectChange,
    handleBlur,
    handleSubmit,
  };
}
