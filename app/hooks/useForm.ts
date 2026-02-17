import { useRef, useState } from 'react';
import { validateField } from '@/utils/fieldsValidator';
import { FormType } from '@/types/form.types';

const responses = {
  success: { message: 'messages.sentSuccessfully' },
  error: { message: 'messages.somethingWentWrong' },
};

/**
 * Generic form management hook with validation and submit handling.
 *
 * This hook:
 * - Manages form values and validation errors
 * - Tracks blurred fields to avoid premature validation
 * - Handles form submission with async request
 * - Returns response and loading state for UI feedback
 *
 * Designed to be reusable across different form types.
 *
 * @param fields - Form field configuration (initial value & required flag)
 * @param type - Form type identifier used on submit
 * @param additionalData - Optional extra payload data sent with the form
 *
 * @returns An object containing form state, validation errors,
 * submission status, response info, and event handlers.
 */
export default function useForm(
  fields: {
    [key: string]: { initialValue: string | boolean; isRequired: boolean };
  },
  type: FormType,
  additionalData?: { [key: string]: any },
) {

  /**
   * Initialize form values, errors and blur state based on field config.
   */
  const initialValues = Object.fromEntries(
    Object.entries(fields).map(([field, { initialValue }]) => [
      field,
      initialValue,
    ]),
  );
  const initialErrors = Object.fromEntries(
    Object.keys(fields).map((field) => [field, '']),
  );
  const initialBluredFields = Object.fromEntries(
    Object.keys(fields).map((field) => [field, false]),
  );

  const [errors, setErrors] = useState(initialErrors);
  const [values, setValues] = useState(initialValues);

  /**
   * Tracks whether a field has been blurred at least once.
   * Used to avoid showing validation errors too early.
   */
  const bluredFields = useRef(initialBluredFields);

  const [isSending, setIsSending] = useState(false);
  const [response, setResponse] = useState<{
    type: string;
    message: string;
  } | null>(null);

  /**
   * Resets form values to their initial state.
   */
  const resetValues = () => {
    setValues(initialValues);
  };

  /**
   * Handles input value changes and performs validation
   * if the field has already been blurred.
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string,
  ) => {
    const value =
      e.target.type === 'checkbox'
        ? (e.target as HTMLInputElement).checked
        : e.target.value;
    setValues((prev) => ({ ...prev, [field]: value }));

    if (bluredFields.current[field]) {
      const error = validateField(field, value, fields[field].isRequired);
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  /**
   * Handles controlled select value changes.
   */
  const handleSelectChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Marks a field as blurred and validates it once the user leaves the field.
   */
  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string,
  ) => {
    if (
      bluredFields.current[field] === false &&
      (values[field] as string).length > 0
    ) {
      const error = validateField(
        field,
        e.target.value,
        fields[field].isRequired,
      );
      setErrors((prevState) => ({ ...prevState, [field]: error }));
      bluredFields.current[field] = true;
    }
  };

  /**
   * Validates all form fields and updates error state.
   *
   * @returns true if the form is valid, otherwise `false`
   */
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

  /**
   * Handles form submission, including validation,
   * async request, and response state management.
   */
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
