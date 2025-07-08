import ToggleSwitch from '@/components/ui/form/fields/toggle/ToggleSwitch';
import { useTranslations } from 'next-intl';
import React from 'react';
import CookieDetails from '@/components/ui/cookies/CookieDetails';
import CookiesDetailsAccordion from '@/components/ui/cookies/CookiesDetailsAccordion';

export default function CookiesPreferencesSection({
  preferences,
  togglePreference,
}: {
  preferences: { [key: string]: boolean };
  togglePreference: (cookiesType: string) => void;
}) {
  const t = useTranslations('Cookies');

  const details = {
    necessary: {
      ADDRESS: {
        description: t('attributes.description.address'),
        domain: 'netihind.ee',
        policy: '/policy',
        maxAge: t('attributes.maxAge.session'),
        type: t('attributes.type.http'),
      },
      _ga: {
        description: t('attributes.description.maaametGa'),
        domain: 'maamaet.ee',
        policy:
          'https://geoportaal.maaamet.ee/docs/aadress/In-ADS_kasutustingimused.pdf',
        maxAge: t('attributes.maxAge.twoYears'),
        type: t('attributes.type.http'),
      },
      _ga_470HYMSPJ6: {
        description: t('attributes.description.maaametGaId'),
        domain: 'maamaet.ee',
        policy:
          'https://geoportaal.maaamet.ee/docs/aadress/In-ADS_kasutustingimused.pdf',
        maxAge: t('attributes.maxAge.twoYears'),
        type: t('attributes.type.http'),
      },
      COOKIE_CONSENT: {
        description: t('attributes.description.cookieConsent'),
        domain: 'netihind.ee',
        policy: '/policy',
        maxAge: t('attributes.maxAge.oneYear'),
        type: t('attributes.type.http'),
      },
    },
    statistics: {
      _ga: {
        description: t('attributes.description.localGa'),
        domain: 'netihind.ee',
        policy: '/policy',
        maxAge: t('attributes.maxAge.twoYears'),
        type: t('attributes.type.http'),
      },
      _ga_34TYLS6VTB: {
        description: t('attributes.description.localGaId'),
        domain: 'netihind.ee',
        policy: '/policy',
        maxAge: t('attributes.maxAge.twoYears'),
        type: t('attributes.type.http'),
      },
    },
  };

  const renderCookieDetails = (cookies: {
    [key: string]: {
      description: string;
      domain: string;
      policy: string;
      maxAge: string;
      type: string;
    };
  }) => {
    return Object.entries(cookies).map(
      ([name, { description, domain, policy, maxAge, type }]) => (
        <CookieDetails
          key={name}
          name={name}
          description={description}
          domain={domain}
          policy={policy}
          maxAge={maxAge}
          type={type}
          className="bg-primary-light [&:not(:last-child)]:mb-1.5"
        />
      ),
    );
  };

  return (
    <div>
      <CookiesDetailsAccordion
        typeName={t('types.necessary.name')}
        typeDescription={t('types.necessary.description')}
        typeToggleSwitch={
          <ToggleSwitch
            name="cookie-necessary"
            size="lg"
            isChecked={preferences.necessary === true}
            required={true}
            disabled={true}
          />
        }
        details={renderCookieDetails(details.necessary)}
      />
      <CookiesDetailsAccordion
        typeName={t('types.statistics.name')}
        typeDescription={t('types.statistics.description')}
        typeToggleSwitch={
          <ToggleSwitch
            name="cookie-statistics"
            size="lg"
            label={t('types.statistics.switchLabel', {
              state: t(
                `types.statistics.switchState.${preferences.statistics === true}`,
              ),
            })}
            isChecked={preferences.statistics === true}
            handleChange={() => togglePreference('statistics')}
          />
        }
        details={renderCookieDetails(details.statistics)}
      />
    </div>
  );
}
