'use client';

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordions/Accordion';
import Arrow from '@/components/ui/icons/Arrow';

export default function CookiesDetailsAccordion({
  typeName,
  typeDescription,
  typeToggleSwitch,
  details,
}: {
  typeName: string;
  typeDescription: string;
  typeToggleSwitch: React.ReactNode;
  details: React.ReactNode;
}) {
  return (
    <Accordion
      type="single"
      collapsible
      className="border-muted-light border-b"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className="justify-left gap-3 p-3">
          <div className="flex-1">
            <div className="mb-2 flex items-center justify-between">
              <p className="font-semibold text-black">
                <Arrow className="mr-2 inline-block -rotate-90 transition-transform group-data-[state=open]/accordion-trigger:rotate-90" />
                {typeName}
              </p>
              {typeToggleSwitch}
            </div>
            <p className="text-left">{typeDescription}</p>
          </div>
        </AccordionTrigger>
        <AccordionContent className="space-y-2 p-3">{details}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
