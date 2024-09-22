import useScrollPosition from './useScrollPosition';

export default function useScrollTopButton() {
  const y = useScrollPosition();

  const isBrowser = () => typeof window !== 'undefined';

  const handleClick = () => {
    if (!isBrowser()) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return {
    y,
    handleClick,
  };
}
