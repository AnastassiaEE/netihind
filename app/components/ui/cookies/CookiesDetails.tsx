import Accordion from '@/components/ui/accordion/Accordion';
import AccordionItem from '@/components/ui/accordion/AccordionItem';
import AccordionItemBody from '@/components/ui/accordion/AccordionItemBody';
import AccordionItemHeader from '@/components/ui/accordion/AccordionItemHeader';
import ToggleSwitch from '@/components/ui/form/fields/toggle/ToggleSwitch';
import { useTranslations } from 'next-intl';

export default function CookiesDetails({
  cookies,
  handleCookieChange,
}: {
  cookies: { [key: string]: boolean };
  handleCookieChange: (cookie: string) => void;
}) {
  const t = useTranslations('Cookies');
  return (
    <Accordion border="bottom" size="md" arrowPosition="left">
      <AccordionItem>
        <AccordionItemHeader>
          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="font-semibold text-black">
                {t('details.required.name')}
              </p>
              <ToggleSwitch
                name="cookie-required"
                size="lg"
                isChecked={true}
                required={true}
                disabled={true}
              />
            </div>
            <p>{t('details.required.description')}</p>
          </div>
        </AccordionItemHeader>
        <AccordionItemBody>rwfwefwfff</AccordionItemBody>
      </AccordionItem>
      <AccordionItem>
        <AccordionItemHeader>
          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="font-semibold text-black">
                {t('details.preferenced.name')}
              </p>
              <ToggleSwitch
                name="cookie-preferences"
                size="lg"
                isChecked={cookies.preferenced === true}
                handleChange={() => handleCookieChange('preferenced')}
              />
            </div>
            <p>{t('details.preferenced.description')}</p>
          </div>
        </AccordionItemHeader>
        <AccordionItemBody>rwfwefwfff</AccordionItemBody>
      </AccordionItem>
    </Accordion>
  );
}
