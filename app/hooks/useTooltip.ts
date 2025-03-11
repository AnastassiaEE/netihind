import useBoolean from '@/hooks/useBoolean';

export default function useTooltip() {
  const { value: isVisible, setTrue, setFalse, toggle } = useBoolean(false);

  const show = () => setTrue();
  const hide = () => setFalse();

  return {
    isVisible,
    show,
    hide,
    toggle,
  };
}
