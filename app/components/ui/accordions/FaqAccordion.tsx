'use client';

import classNames from 'classnames';
import useAccordion from '@/hooks/useAccordion';
import CircleArrow from '@/components/ui/icons/CircleArrow';

export default function FaqAccordion({
  question,
}: {
  question: { question: string; answer: React.ReactNode };
}) {
  const {
    isClosed,
    isVisible,
    collapsibleRef,
    getButtonProps,
    getPanelProps,
    getArrowProps,
  } = useAccordion();

  const arrowClasses = classNames(
    'transition-colors',
    isClosed
      ? 'bg-primary-light'
      : 'bg-primary text-white shadow-md shadow-primary/50',
  );

  return (
    <div className="border-x border-muted-light first:rounded-t-md first:border-t last:rounded-b-md last:border-b [&:not(:last-child)]:border-b">
      <button
        type="button"
        {...getButtonProps()}
        className="flex w-full flex-row-reverse items-center justify-between border-muted-light p-6 text-left transition-all [&:not(:last-child)]:border-b"
      >
        <CircleArrow {...getArrowProps()} className={arrowClasses} />
        <span className="font-semibold">{question.question}</span>
      </button>
      {isVisible && (
        <div {...getPanelProps()}>
          <div ref={collapsibleRef} className="p-6">
            <p className="text-sm">{question.answer}</p>
          </div>
        </div>
      )}
    </div>
  );
}
