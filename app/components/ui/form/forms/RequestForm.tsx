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

export default function RequestForm({
    type = 'connection',
    address,
    packageData,
}: {
    type?: 'connection' | 'consultation';
    address: string;
    packageData: { [key: string]: string } | null;
}) {
    const t = useTranslations('Form');
    const timeOptions = ['hour', '9-11', '11-13', '13-15', '15-17', '17-20'];

    const filteredPackageData = packageData
        ? Object.fromEntries(
            Object.entries(packageData).filter(
                ([key]) => !['internet_technology_description', 'provider_img_url'].includes(key),
            ),
        )
        : null;

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

    const {
        errors,
        values,
        isSending,
        response,
        handleChange,
        handleSelectChange,
        handleBlur,
        handleSubmit,
    } = useForm(fields, type, { address: address, ...filteredPackageData });

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
            <div className="mb-3">
                <Textarea
                    name="message"
                    label={t('labels.message')}
                    handleChange={(e) => handleChange(e, 'message')}
                    handleBlur={(e) => handleBlur(e, 'message')}
                    value={values.message as string}
                />
            </div>
            <div className="mb-6">
                <Select
                    name="time"
                    selected={t(('selectOptions.' + values.time) as string)}
                    variant="flat"
                    openDirection="top"
                    handleChange={handleSelectChange}
                    className="!p-0"
                >
                    {timeOptions.map((option) => (
                        <Option key={option} value={option} isSelected={values.time === option}>
                            {t(`selectOptions.${option}`)}
                        </Option>
                    ))}
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
                {isSending ? <Loop className="animate-spin" /> : <>{t('buttons.send')}</>}
            </Button>
            {!isSending && response && (
                <FormResponse type={response.type}>{t(response.message)}</FormResponse>
            )}
        </form>
    );
}
