'use client';

import useAccordion from '@/hooks/useAccordion';
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
  const {
    isVisible,
    collapsibleRef,
    getButtonProps,
    getPanelProps,
    getArrowProps,
  } = useAccordion(false);
  return (
    <div className={className}>
      <button
        type="button"
        {...getButtonProps()}
        className="mb-2 flex w-full flex-row-reverse items-center justify-between text-left text-muted-dark transition-all"
      >
        <Arrow {...getArrowProps()} />
        <span className="text-sm font-semibold">{filterName}</span>
      </button>
      {isVisible && (
        <div {...getPanelProps()}>
          <div ref={collapsibleRef}>{children}</div>
        </div>
      )}
    </div>
  );
}
