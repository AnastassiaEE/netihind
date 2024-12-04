import useBoolean from '@/hooks/useBoolean';

export default function usePopover(initialVisible = false) {
  const { value: isVisible, setTrue, setFalse, toggle } = useBoolean(initialVisible);

  const show = () => setTrue();
  const hide = () => setFalse();

  return {
    isVisible,
    show,
    hide,
    toggle,
  };
}
