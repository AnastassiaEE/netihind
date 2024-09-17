'use client';

import useContactForm from '@/hooks/useContactForm';
import FormResponse from './FormResponse';
import LoopIcon from '@mui/icons-material/Loop';
import AddIcon from '@mui/icons-material/Add';
import IconInput from './IconInput';
import Checkbox from './Checkbox';
import Textarea from './Textarea';
import Button from './Button';
import Input from './Input';
import Link from 'next/link';
import { Trans, useTranslation } from 'react-i18next';

export default function ContactForm() {
    const { t } = useTranslation(['form']);

    const {
        errors,
        values,
        isLoading,
        response,
        handleChange,
        handleCheck,
        handleBlur,
        handleSubmit,
    } = useContactForm();

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
                    error={t(errors.name)}
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
                    error={t(errors.email)}
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
                    error={t(errors.phone)}
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
                    isValid={errors.message === ''}
                    error={t(errors.message)}
                />
            </div>
            <div className="mb-6">
                <Checkbox
                    name="policy"
                    handleCheck={(e) => handleCheck(e, 'policy')}
                    isChecked={values.policy as boolean}
                    isValid={errors.policy === ''}
                >
                    <Trans
                        i18nKey={t('checkboxes.privacy-policy')}
                        components={{
                            a: (
                                <Link
                                    href="/privacy-policy"
                                    className="transition-colors hover:text-primary font-semibold"
                                />
                            ),
                        }}
                    />
                </Checkbox>
            </div>
            <Button type="submit" size="lg" disabled={isLoading}>
                {isLoading ? (
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <LoopIcon />
                    </svg>
                ) : (
                    <>{t('buttons.send')}</>
                )}
            </Button>
            {!isLoading && (
                <FormResponse type={response?.type}> {response && t(response.message)} </FormResponse>
            )}
        </form>
    );
}
