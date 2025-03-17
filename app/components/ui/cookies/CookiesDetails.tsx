import Accordion from '@/components/ui/accordion/Accordion';
import AccordionItem from '@/components/ui/accordion/AccordionItem';
import AccordionItemBody from '@/components/ui/accordion/AccordionItemBody';
import AccordionItemHeader from '@/components/ui/accordion/AccordionItemHeader';
import ToggleSwitch from '@/components/ui/form/fields/toggle/ToggleSwitch';
import { useTranslations } from 'next-intl';
import React from 'react';

export default function CookiesDetails({
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
        maxAge: t('attributes.maxAge.session'),
        type: t('attributes.type.http'),
      },
      _ga: {
        description: t('attributes.description.maaametGa1'),
        domain: 'maamaet.ee',
        maxAge: t('attributes.maxAge.twoYears'),
        type: t('attributes.type.http'),
      },
      _ga_470HYMSPJ6: {
        description: t('attributes.description.maaametGa2'),
        domain: 'maamaet.ee',
        maxAge: t('attributes.maxAge.twoYears'),
        type: t('attributes.type.http'),
      },
      COOKIE_CONSENT: {
        description: t('attributes.description.cookieConsent'),
        domain: 'netihind.ee',
        maxAge: t('attributes.maxAge.oneYear'),
        type: t('attributes.type.http'),
      },
    },
    preferences: {
      NEXT_LOCALE: {
        description: t('attributes.description.maaametGa2'),
        domeen: 'maamaet.ee',
        maxAge: t('attributes.maxAge.twoYears'),
        type: t('attributes.type.http'),
      },
    },
  };

  return (
    <Accordion border="bottom" size="md" arrowPosition="left">
      <AccordionItem>
        <AccordionItemHeader>
          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="font-semibold text-black">
                {t('details.necessary.name')}
              </p>
              <ToggleSwitch
                name="cookie-required"
                size="lg"
                isChecked={cookies.necessary === true}
                required={true}
                disabled={true}
              />
            </div>
            <p>{t('details.necessary.description')}</p>
          </div>
        </AccordionItemHeader>
        <AccordionItemBody>
          {Object.entries(details.necessary).map(([name, details]) => (
            <React.Fragment key={name}>
              <p>{name}</p>
              <p>{details.description}</p>
              <p>{details.domain}</p>
              <p>{details.maxAge}</p>
              <p>{details.type}</p>
            </React.Fragment>
          ))}
        </AccordionItemBody>
      </AccordionItem>
      <AccordionItem>
        <AccordionItemHeader>
          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="font-semibold text-black">
                {t('details.preferences.name')}
              </p>
              <ToggleSwitch
                name="cookie-preferences"
                size="lg"
                isChecked={cookies.preferences === true}
                handleChange={() => handleCookieChange('preferences')}
              />
            </div>
            <p>{t('details.preferences.description')}</p>
          </div>
        </AccordionItemHeader>
        <AccordionItemBody>rtgrtgrtg</AccordionItemBody>
      </AccordionItem>
    </Accordion>
  );
}
