'use client';

import FormResponse from '@/components/ui/form/forms/FormResponse';
import IconInput from '@/components/ui/form/fields/input/IconInput';
import Checkbox from '@/components/ui/form/fields/checkbox/Checkbox';
import Textarea from '@/components/ui/form/fields/input/Textarea';
import Button from '@/components/ui/form//buttons/Button';
import Input from '@/components/ui/form/fields/input/Input';
import Select from '@/components/ui/form/fields/select/Select';
import Option from '@/components/ui/form/fields/select/Option';
import useForm from '@/hooks/useForm';
import { useTranslations } from 'next-intl';
import { Loop, Add } from '@mui/icons-material';

export default function RequestForm() {
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
        time: {
            initialValue: 'hour',
            isRequired: false,
        },
        policy: {
            initialValue: false,
            isRequired: true,
        },
    };

    const { errors, values, isSending, response, handleChange, handleBlur, handleSubmit } = useForm(
        fields,
        'request',
    );

    return (
        <form onSubmit={handleSubmit} autoComplete="on" noValidate>
            <div className="mb-6">
                <Input
                    name="name"
                    label={t('labels.name')}
                    handleChange={(e) => handleChange(e, 'name')}
                    handleBlur={(e) => handleBlur(e, 'name')}
                    value={values.name as string}
                    isValid={!errors.name}
                    error={errors.name ? t(errors.name) : ''}
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
                    isValid={!errors.email}
                    error={errors.email ? t(errors.email) : ''}
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
                    isValid={!errors.phone}
                    error={errors.phone ? t(errors.phone) : ''}
                    icon={{ Icon: Add, isVisible: true }}
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
                <Select name="time" selected={'hour'} variant="flat" openDirection="top" className="!p-0">
                    <Option value="hour" isSelected={true} handleClick={() => null}>
                        Перезвоним в течение часа
                    </Option>
                    <Option value="9-11" isSelected={false} handleClick={() => null}>
                        09:00 - 11:00
                    </Option>
                    <Option value="11-13" isSelected={false} handleClick={() => null}>
                        11:00 - 13:00
                    </Option>
                    <Option value="13-15" isSelected={false} handleClick={() => null}>
                        13:00 - 15:00
                    </Option>
                    <Option value="15-17" isSelected={false} handleClick={() => null}>
                        15:00 - 17:00
                    </Option>
                    <Option value="17-20" isSelected={false} handleClick={() => null}>
                        17:00 - 20:00
                    </Option>
                </Select>
            </div>
            <div className="mb-6">
                <Checkbox
                    name="policy"
                    handleChange={(e) => handleChange(e, 'policy')}
                    isChecked={values.policy as boolean}
                    isValid={!errors.policy}
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
                    <svg className="size-5 animate-spin" viewBox="0 0 24 24">
                        <Loop />
                    </svg>
                ) : (
                    <>{t('buttons.send')}</>
                )}
            </Button>
            {!isSending && (
                <FormResponse type={response?.type}> {response && response.message} </FormResponse>
            )}
        </form>
    );
}
