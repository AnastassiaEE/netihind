'use client';

import FormResponse from '@/components/ui/form/forms/FormResponse';
import IconInput from '@/components/ui/form/fields/input/IconInput';
import Checkbox from '@/components/ui/form/fields/checkbox/Checkbox';
import Textarea from '@/components/ui/form/fields/input/Textarea';
import Input from '@/components/ui/form/fields/input/Input';
import useForm from '@/hooks/useForm';
import { useTranslations } from 'next-intl';
import { Add } from '@mui/icons-material';
import { Package, PackageAction } from '@/types/packages.types';
import SendButton from '@/components/ui/buttons/SendButton';

export default function PackageForm({
  action = 'connection',
  address,
  packageData,
}: {
  action?: PackageAction;
  address: string;
  packageData?: Package;
}) {
  const t = useTranslations('Form');
  //const timeOptions = ['hour', '9-11', '11-13', '13-15', '15-17', '17-20'];

  const filteredPackageData = {
    'Paketi ID': packageData?.id ?? '',
    'Paketi nimi': packageData?.name ?? '',
    'Teenuse pakkuja': packageData?.provider.name ?? '',
    Tehnoloogia: packageData?.technology.name ?? '',
    Kiirused: packageData
      ? `${packageData.speed.download} / ${packageData.speed.upload}`
      : '',
    'Paketi hind': packageData?.price ?? '',
    ...(packageData?.discount && {
      'Paketi soodushind': packageData.discount.price,
    }),
    ...(packageData?.discount_campaigns &&
      packageData?.discount_campaigns.length > 0 && {
        Kampaania: packageData.discount_campaigns
          .map((campaign) => campaign.description)
          .join(', '),
      }),
  };

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
    // 'call-time': {
    //   initialValue: 'hour',
    //   isRequired: false,
    // },
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
  } = useForm(fields, action, { address: address, ...filteredPackageData });

  return (
    <form onSubmit={handleSubmit} autoComplete="on" noValidate>
      <div className="mb-6">
        <Input
          name="name"
          label={{ value: t('labels.name'), className: 'font-semibold' }}
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
          inputMode="email"
          label={{ value: t('labels.email'), className: 'font-semibold' }}
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
          inputMode="tel"
          label={{ value: t('labels.phone'), className: 'font-semibold' }}
          onChange={(e) => handleChange(e, 'phone')}
          onBlur={(e) => handleBlur(e, 'phone')}
          value={values.phone as string}
          isValid={!errors.phone}
          error={errors.phone ? t(errors.phone as any) : ''}
          icon={{ Icon: Add, isVisible: true }}
          required={fields['phone'].isRequired}
        />
      </div>
      <div className="mb-3">
        <Textarea
          name="message"
          label={{ value: t('labels.message'), className: 'font-semibold' }}
          onChange={(e) => handleChange(e, 'message')}
          onBlur={(e) => handleBlur(e, 'message')}
          value={values.message as string}
          required={fields['message'].isRequired}
        />
      </div>
      {/* <div className="mb-6">
        <Select
          variant="labeled"
          name="call-time"
          label={t('labels.time')}
          selected={t(`selectOptions.${values['call-time'] as string}` as any)}
          openDirection="top"
          onChange={handleSelectChange}
          className="p-0!"
        >
          {timeOptions.map((option) => (
            <SelectOption
              key={option}
              value={option}
              isSelected={values['call-time'] === option}
            >
              {t(`selectOptions.${option}` as any)}
            </SelectOption>
          ))}
        </Select>
      </div> */}
      <div className="mb-6">
        <Checkbox
          name="policy"
          onChange={(e) => handleChange(e, 'policy')}
          checked={values.policy as boolean}
          isValid={!errors.policy}
          required={fields['policy'].isRequired}
        >
          {t.rich('checkboxes.privacyPolicy', {
            a: (chunks) => (
              <a
                href="/policy"
                target="_blank"
                className="hover:text-primary font-semibold transition-colors"
              >
                {chunks}
              </a>
            ),
          })}
        </Checkbox>
      </div>
      <SendButton size="lg" isSending={isSending} className="w-full">
        {t('buttons.send')}
      </SendButton>
      {!isSending && response && (
        <FormResponse type={response.type}>
          {t(response.message as any)}
        </FormResponse>
      )}
    </form>
  );
}
