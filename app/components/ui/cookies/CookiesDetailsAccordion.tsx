import useAccordion from '@/hooks/useAccordion';
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
  const {
    isClosed,
    isVisible,
    collapsibleRef,
    getButtonProps,
    getPanelProps,
    getArrowProps,
  } = useAccordion();

  return (
    <div className="border-b border-muted-light">
      <button
        type="button"
        {...getButtonProps()}
        className="justify-left flex w-full items-center gap-3 p-3 text-left transition-all"
      >
        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="font-semibold text-black">
              <Arrow {...getArrowProps()} className="mr-2" />
              {typeName}
            </p>
            {typeToggleSwitch}
          </div>
          <p>{typeDescription}</p>
        </div>
      </button>
      {isVisible && (
        <div {...getPanelProps()}>
          <div ref={collapsibleRef} className="p-3">
            {details}
          </div>
        </div>
      )}
    </div>
  );
}
