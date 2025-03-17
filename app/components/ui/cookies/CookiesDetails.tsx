import Accordion from '@/components/ui/accordion/Accordion';
import AccordionItem from '@/components/ui/accordion/AccordionItem';
import AccordionItemBody from '@/components/ui/accordion/AccordionItemBody';
import AccordionItemHeader from '@/components/ui/accordion/AccordionItemHeader';
import ToggleSwitch from '@/components/ui/form/fields/toggle/ToggleSwitch';

export default function CookiesDetails({
  cookies,
  handleCookieChange,
}: {
  cookies: { [key: string]: boolean };
  handleCookieChange: (cookie: string) => void;
}) {
  return (
    <Accordion border="bottom" size="md" arrowPosition="left">
      <AccordionItem>
        <AccordionItemHeader>
          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="font-semibold text-black">Vajalik</p>
              <ToggleSwitch
                name="cookie-required"
                size="lg"
                isChecked={true}
                required={true}
                disabled={true}
              />
            </div>
            <p>
              Vajalikud küpsised võimaldavad meie veebilehe põhifunktsioonide
              toimimise, ilma nendeta leht ei tööta.
            </p>
          </div>
        </AccordionItemHeader>
        <AccordionItemBody>rwfwefwfff</AccordionItemBody>
      </AccordionItem>
      <AccordionItem>
        <AccordionItemHeader>
          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="font-semibold text-black">Eelistused</p>
              <ToggleSwitch
                name="cookie-preferences"
                size="lg"
                isChecked={cookies.preferenced === true}
                handleChange={() => handleCookieChange('preferenced')}
              />
            </div>
            <p>
              Eelistuste küpsised aitavad meil meeles pidada Teie kui kasutaja
              eelistusi meie veebilehte külastades, salvestades Teie
              kasutajaeelistusi, näiteks kasutajanimi, keelevalik jms.
              Eelistuste küpsised on vajalikud, muutmaks meie veebilehte
              kasutajamugavamaks.
            </p>
          </div>
        </AccordionItemHeader>
        <AccordionItemBody>rwfwefwfff</AccordionItemBody>
      </AccordionItem>
    </Accordion>
  );
}
