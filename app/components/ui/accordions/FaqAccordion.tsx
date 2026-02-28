'use client';

import classNames from 'classnames';
import useAccordion from '@/hooks/useAccordion';
import CircleArrow from '@/components/ui/icons/CircleArrow';

export default function FaqAccordion({
  question,
  answer,
}: {
  question: string;
  answer: React.ReactNode;
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
      : 'bg-primary shadow-primary/50 text-white shadow-md',
  );

  return (
    <div className="border-muted-light border-x not-last:border-b first:rounded-t-md first:border-t last:rounded-b-md last:border-b">
      <button
        type="button"
        {...getButtonProps()}
        className="border-muted-light flex w-full flex-row-reverse items-center justify-between p-6 text-left transition-all not-last:border-b"
      >
        <CircleArrow {...getArrowProps()} className={arrowClasses} />
        <span className="font-semibold">{question}</span>
      </button>
      {isVisible && (
        <div {...getPanelProps()}>
          <div ref={collapsibleRef} className="p-6">
            <p className="text-sm">{answer}</p>
          </div>
        </div>
      )}
    </div>
  );
}
