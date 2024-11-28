import useBoolean from '@/hooks/useBoolean';

export default function useSlidePanel() {
  const {
    value: isSlidePanelOpened,
    setTrue: openSlidePanel,
    setFalse: closeSlidePanel,
  } = useBoolean(false);

  const handleSlidePanel = (state: boolean) => {
    if (state) {
      openSlidePanel();
      document.body.style.cssText = 'overflow: hidden';
    } else {
      closeSlidePanel();
      document.body.style.cssText = 'overflow-y: scroll';
    }
  };

  return {
    isSlidePanelOpened,
    handleSlidePanel,
  };
}
