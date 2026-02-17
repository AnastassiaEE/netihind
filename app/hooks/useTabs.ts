import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Manages tab state and keyboard navigation for an accessible tab interface.
 *
 * This hook handles the currently active tab, supports left/right arrow
 * navigation, and provides IDs and refs to connect tabs with tab panels
 * according to WAI-ARIA guidelines.
 *
 * @param name - Base name for generating unique tab and tabpanel IDs
 * @param tabs - Array of tab labels used to determine number of tabs
 *
 * @returns An object containing:
 *  - activeTabId: currently active tab's ID
 *  - handleTabClick: click handler to activate a tab
 *  - getTabId: function to get a tab ID by index
 *  - getTabPanelId: function to get the corresponding tabpanel ID
 *  - tabsRef: ref array to store tab elements for focus management
 */
export default function useTabs(name: string, tabs: string[]) {
  const [activeTabId, setActiveTabId] = useState(`${name}-tab-1`);
  const tabsRef = useRef<HTMLElement[]>([]);

  /**
   * Activates a tab when clicked and updates the active tab state.
   */
  const handleTabClick = (event: React.MouseEvent<HTMLElement>) => {
    const tabElement = event.currentTarget;
    setActiveTabId(tabElement.getAttribute('id')!);
  };

  /**
   * Generates a unique ID for a tab by its index.
   */
  const getTabId = useCallback(
    (index: number) => `${name}-tab-${index + 1}`,
    [name],
  );

  /**
   * Generates a unique ID for the corresponding tabpanel by index.
   */
  const getTabPanelId = (index: number) => `${name}-tabpanel-${index + 1}`;

  /**
   * Handles left/right arrow key navigation to move focus between tabs.
   */
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

        // Move focus to the newly active tab
        requestAnimationFrame(() => {
          tabsRef.current[newIndex]?.focus();
        });
      }
    },
    [activeTabId, getTabId, tabs],
  );

  /**
   * Attaches global keydown listener for arrow navigation between tabs.
   */
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
