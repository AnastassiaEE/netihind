import Accordion from '@/components/ui/accordion/Accordion';
import AccordionItem from '@/components/ui/accordion/AccordionItem';
import AccordionItemBody from '@/components/ui/accordion/AccordionItemBody';
import AccordionItemHeader from '@/components/ui/accordion/AccordionItemHeader';
import ToggleSwitch from '@/components/ui/form/fields/toggle/ToggleSwitch';
import { useTranslations } from 'next-intl';
import React from 'react';
import CookieDetails from '@/components/ui/cookies/CookieDetails';

export default function CookiesDetailsSection({
  cookies,
  handleCookieChange,
}: {
  cookies: { [key: string]: boolean };
  handleCookieChange: (cookie: string) => void;
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
        description: t('attributes.description.maaametGa1'),
        domain: 'maamaet.ee',
        policy:
          'https://geoportaal.maaamet.ee/docs/aadress/In-ADS_kasutustingimused.pdf',
        maxAge: t('attributes.maxAge.twoYears'),
        type: t('attributes.type.http'),
      },
      _ga_470HYMSPJ6: {
        description: t('attributes.description.maaametGa2'),
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
    preferences: {
      NEXT_LOCALE: {
        description: t('attributes.description.nextLocale'),
        domain: 'netihind.ee',
        policy: '/policy',
        maxAge: t('attributes.maxAge.oneYear'),
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
    <Accordion border="bottom" size="md" arrowPosition="left">
      <AccordionItem>
        <AccordionItemHeader>
          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="font-semibold text-black">
                {t('types.necessary.name')}
              </p>
              <ToggleSwitch
                name="cookie-required"
                size="lg"
                isChecked={cookies.necessary === true}
                required={true}
                disabled={true}
              />
            </div>
            <p>{t('types.necessary.description')}</p>
          </div>
        </AccordionItemHeader>
        <AccordionItemBody>
          {renderCookieDetails(details.necessary)}
        </AccordionItemBody>
      </AccordionItem>
      <AccordionItem>
        <AccordionItemHeader>
          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="font-semibold text-black">
                {t('types.preferences.name')}
              </p>
              <ToggleSwitch
                name="cookie-preferences"
                size="lg"
                isChecked={cookies.preferences === true}
                handleChange={() => handleCookieChange('preferences')}
              />
            </div>
            <p>{t('types.preferences.description')}</p>
          </div>
        </AccordionItemHeader>
        <AccordionItemBody>
          {renderCookieDetails(details.preferences)}
        </AccordionItemBody>
      </AccordionItem>
    </Accordion>
  );
}
