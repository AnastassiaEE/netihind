import { useCallback, useEffect, useRef, useState } from 'react';

export default function useTabs(name: string, tabs: string[]) {
  const [activeTabId, setActiveTabId] = useState(`${name}-tab-1`);
  const tabsRef = useRef<(HTMLElement | null)[]>([]);

  const handleTabClick = (event: React.MouseEvent<HTMLElement>) => {
    const tabElement = event.currentTarget as HTMLElement;
    setActiveTabId(tabElement.getAttribute('id')!);
  };

  const getTabId = useCallback(
    (index: number) => `${name}-tab-${index + 1}`,
    [name],
  );
  const getTabPanelId = (index: number) => `${name}-tabpanel-${index + 1}`;

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const currentIndex = tabs.findIndex(
        (_, i) => getTabId(i) === activeTabId,
      );
      let newIndex = currentIndex;

      if (event.key === 'ArrowLeft') {
        newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      } else if (event.key === 'ArrowRight') {
        newIndex = (currentIndex + 1) % tabs.length;
      }
      if (newIndex !== currentIndex) {
        setActiveTabId(getTabId(newIndex));

        requestAnimationFrame(() => {
          tabsRef.current[newIndex]?.focus();
        });
      }
    },
    [activeTabId, getTabId, tabs],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return {
    activeTabId,
    handleTabClick,
    getTabId,
    getTabPanelId,
    tabsRef,
  };
}
