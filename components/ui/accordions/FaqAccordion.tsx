'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordions/Accordion';
import Arrow from '@/components/ui/icons/Arrow';
import classNames from 'classnames';

/**
 * FAQ Accordion Icon Component
 *
 * Circular arrow icon that changes color and rotates on accordion state change.
 */
function FaqAccordionIcon() {
  return (
    <span
      className={classNames(
        'flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full font-semibold transition-colors',
        'group-data-[state=open]/accordion-trigger:bg-primary group-data-[state=open]/accordion-trigger:shadow-primary/50 group-data-[state=open]/accordion-trigger:text-white group-data-[state=open]/accordion-trigger:shadow-md',
        'group-data-[state=closed]/accordion-trigger:bg-primary-light',
      )}
    >
      <span className="flex items-center justify-center transition-transform group-data-[state=open]/accordion-trigger:rotate-180">
        <Arrow direction="down" />
      </span>
    </span>
  );
}

/**
 * FAQ Accordion Component
 *
 * Pre-styled accordion for FAQ sections with rounded borders,
 * custom icon, and FAQ-specific styling.
 */
export function FaqAccordion({
  items,
}: {
  items: Array<{ question: string; answer: React.ReactNode }>;
}) {
  return (
    <Accordion type="multiple">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          value={`item-${index}`}
          className="border-muted-light border-x not-last:border-b first:rounded-t-md first:border-t last:rounded-b-md last:border-b"
        >
          <AccordionTrigger
            icon={<FaqAccordionIcon />}
            className="border-muted-light p-6 data-[state=open]:border-b"
          >
            <span className="font-semibold">{item.question}</span>
          </AccordionTrigger>
          <AccordionContent className="p-6">
            <div className="text-muted-dark text-sm">{item.answer}</div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
