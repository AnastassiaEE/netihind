'use client';

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordions/Accordion';
import Arrow from '@/components/ui/icons/Arrow';

export default function PackagesFilterAccordion({
  filterName,
  className,
  children,
}: {
  filterName: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Accordion type="single" collapsible defaultValue="filter">
      <AccordionItem value="filter" className={className}>
        <AccordionTrigger
          className="text-muted-dark mb-2 flex w-full items-center justify-between text-left transition-all"
          icon={
            <Arrow className="-rotate-90 transition-transform group-data-[state=open]/accordion-trigger:rotate-90" />
          }
        >
          <span className="text-sm font-semibold">{filterName}</span>
        </AccordionTrigger>
        <AccordionContent className="space-y-1">{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
