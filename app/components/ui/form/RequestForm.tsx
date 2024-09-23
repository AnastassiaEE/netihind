'use client';

import FormResponse from './FormResponse';
import LoopIcon from '@mui/icons-material/Loop';
import AddIcon from '@mui/icons-material/Add';
import IconInput from './fields/IconInput';
import Checkbox from './Checkbox';
import Textarea from './Textarea';
import Button from './buttons/Button';
import Input from './fields/Input';
import Link from 'next/link';
import { Trans, useTranslation } from 'react-i18next';
import useForm from '@/hooks/useForm';
import Select from './fields/Select';

export default function RequestForm() {
    const { t } = useTranslation(['form']);

    const fields = {
        name: {
            initialValue: '',
            isRequired: true,
        },
        address: {
            initialValue: '',
            isRequired: true,
        },
        phone: {
            initialValue: '',
            isRequired: true,
        },
        time: {
            initialValue: '9-11',
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
    } = useForm(fields, 'request');

    return (
        <form noValidate onSubmit={handleSubmit}>
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
                    name="address"
                    label={t('labels.address')}
                    handleChange={(e) => handleChange(e, 'address')}
                    handleBlur={(e) => handleBlur(e, 'address')}
                    value={values.address as string}
                    isValid={errors.address === ''}
                    error={t(errors.address)}
                />
            </div>
            <div className="md:flex">
                <div className="basis-6/12 mb-6">
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
                <div className="grow mb-6">
                    <Select
                        name="time"
                        label={t('labels.time')}
                        handleChange={(e) => handleChange(e, 'time')}
                        value={values.time as string}
                    >
                        <option value="9-11">09:00 - 11:00</option>
                        <option value="11-13">11:00 - 13:00</option>
                        <option value="13-15">13:00 - 15:00</option>
                        <option value="15-17">15:00 - 17:00</option>
                        <option value="17-19">17:00 - 19:00</option>
                        <option value="19-21">19:00 - 21:00</option>
                    </Select>
                </div>
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
