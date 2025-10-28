'use client';
import FormResponse from '@/components/ui/form/forms/FormResponse';
import { Loop, Add } from '@mui/icons-material';
import IconInput from '@/components/ui/form/fields/input/IconInput';
import Checkbox from '@/components/ui/form/fields/checkbox/Checkbox';
import Textarea from '@/components/ui/form/fields/input/Textarea';
import Button from '@/components/ui/form/buttons/Button';
import Input from '@/components/ui/form/fields/input/Input';
import useForm from '@/hooks/useForm';
import { useTranslations } from 'next-intl';

export default function ContactForm() {
  const t = useTranslations('Form');

  const fields = {
    name: {
      initialValue: '',
      isRequired: true,
    },
    email: {
      initialValue: '',
      isRequired: true,
    },
    phone: {
      initialValue: '',
      isRequired: true,
    },
    message: {
      initialValue: '',
      isRequired: false,
    },
    policy: {
      initialValue: false,
      isRequired: true,
    },
  };

  const {
    errors,
    values,
    isSending,
    response,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm(fields, 'contact');

  return (
    <form onSubmit={handleSubmit} autoComplete="on" noValidate>
      <div className="mb-6">
        <Input
          name="name"
          label={t('labels.name')}
          onChange={(e) => handleChange(e, 'name')}
          onBlur={(e) => handleBlur(e, 'name')}
          value={values.name as string}
          isValid={!errors.name}
          error={errors.name ? t(errors.name as any) : ''}
          required={fields['name'].isRequired}
        />
      </div>
      <div className="mb-6">
        <Input
          name="email"
          type="email"
          inputmode="email"
          label={t('labels.email')}
          onChange={(e) => handleChange(e, 'email')}
          onBlur={(e) => handleBlur(e, 'email')}
          value={values.email as string}
          isValid={!errors.email}
          error={errors.email ? t(errors.email as any) : ''}
          required={fields['email'].isRequired}
        />
      </div>
      <div className="mb-6">
        <IconInput
          name="phone"
          type="tel"
          inputmode="tel"
          label={t('labels.phone')}
          onChange={(e) => handleChange(e, 'phone')}
          onBlur={(e) => handleBlur(e, 'phone')}
          value={values.phone as string}
          isValid={!errors.phone}
          error={errors.phone ? t(errors.phone as any) : ''}
          required={fields['phone'].isRequired}
          icon={{ Icon: Add, isVisible: true }}
        />
      </div>
      <div className="mb-6">
        <Textarea
          name="message"
          label={t('labels.message')}
          onChange={(e) => handleChange(e, 'message')}
          onBlur={(e) => handleBlur(e, 'message')}
          value={values.message as string}
          required={fields['message'].isRequired}
        />
      </div>
      <div className="mb-6">
        <Checkbox
          name="policy"
          onChange={(e) => handleChange(e, 'policy')}
          isChecked={values.policy as boolean}
          isValid={!errors.policy}
          required={fields['policy'].isRequired}
        >
          {t.rich('checkboxes.privacyPolicy', {
            a: (chunks) => (
              <a
                href="/policy"
                target="_blank"
                className="font-semibold transition-colors hover:text-primary"
              >
                {chunks}
              </a>
            ),
          })}
        </Checkbox>
      </div>
      <Button type="submit" size="lg" disabled={isSending} className="w-full">
        {isSending ? (
          <Loop className="mx-auto animate-spin" />
        ) : (
          <>{t('buttons.send')}</>
        )}
      </Button>
      {!isSending && response && (
        <FormResponse type={response.type}>
          {t(response.message as any)}
        </FormResponse>
      )}
    </form>
  );
}
