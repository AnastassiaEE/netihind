'use client';
import FormResponse from './FormResponse';
import LoopIcon from '@mui/icons-material/Loop';
import AddIcon from '@mui/icons-material/Add';
import IconInput from './fields/IconInput';
import Checkbox from './Checkbox';
import Textarea from './Textarea';
import Button from './buttons/Button';
import Input from './fields/Input';
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
        handleCheck,
        handleBlur,
        handleSubmit,
    } = useForm(fields, 'contact');

    return (
        <form action="" noValidate onSubmit={handleSubmit}>
            <div className="mb-6">
                <Input
                    name="name"
                    label={t('labels.name')}
                    handleChange={(e) => handleChange(e, 'name')}
                    handleBlur={(e) => handleBlur(e, 'name')}
                    value={values.name as string}
                    isValid={errors.name === ''}
                    error={errors.name === '' ? '' : t(errors.name)}
                />
            </div>
            <div className="mb-6">
                <Input
                    name="email"
                    type="email"
                    inputmode="email"
                    label={t('labels.email')}
                    handleChange={(e) => handleChange(e, 'email')}
                    handleBlur={(e) => handleBlur(e, 'email')}
                    value={values.email as string}
                    isValid={errors.email === ''}
                    error={errors.email === '' ? '' : t(errors.email)}
                />
            </div>
            <div className="mb-6">
                <IconInput
                    name="phone"
                    type="tel"
                    inputmode="tel"
                    label={t('labels.phone')}
                    handleChange={(e) => handleChange(e, 'phone')}
                    handleBlur={(e) => handleBlur(e, 'phone')}
                    value={values.phone as string}
                    isValid={errors.phone === ''}
                    error={errors.phone === '' ? '' : t(errors.phone)}
                    icon={{ Icon: AddIcon, isVisible: true }}
                />
            </div>
            <div className="mb-6">
                <Textarea
                    name="message"
                    label={t('labels.message')}
                    handleChange={(e) => handleChange(e, 'message')}
                    handleBlur={(e) => handleBlur(e, 'message')}
                    value={values.message as string}
                />
            </div>
            <div className="mb-6">
                <Checkbox
                    name="policy"
                    handleCheck={(e) => handleCheck(e, 'policy')}
                    isChecked={values.policy as boolean}
                    isValid={errors.policy === ''}
                >
                    {t.rich('checkboxes.privacyPolicy', {
                        a: (chunks) => (
                            <a
                                href="/policy"
                                target="_blank"
                                className="transition-colors hover:text-primary font-semibold"
                            >
                                {chunks}
                            </a>
                        ),
                    })}
                </Checkbox>
            </div>
            <Button type="submit" size="lg" disabled={isSending} className="w-full">
                {isSending ? (
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <LoopIcon />
                    </svg>
                ) : (
                    <>{t('buttons.send')}</>
                )}
            </Button>
            {!isSending && (
                <FormResponse type={response?.type}> {response && t(response.message)} </FormResponse>
            )}
        </form>
    );
}
