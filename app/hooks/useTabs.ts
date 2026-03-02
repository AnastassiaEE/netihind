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
 *  - `activeTabId`: currently active tab's ID
 *  - `handleTabClick`: click handler to activate a tab
 *  - `getTabId`: function to get a tab ID by index
 *  - `getTabPanelId`: function to get the corresponding tabpanel ID
 *  - `tabsRef`: ref array to store tab elements for focus management
 */
export default function useTabs(name: string, tabs: string[]) {
  const [activeTabId, setActiveTabId] = useState(`${name}-tab-1`);
  const tabsRef = useRef<HTMLElement[]>([]);

  /**
   * Activates a tab when clicked and updates the active tab state.
   *
   * @param event - The mouse click event triggered on the tab element.
   */
  const handleTabClick = (event: React.MouseEvent<HTMLElement>) => {
    const tabElement = event.currentTarget;
    setActiveTabId(tabElement.getAttribute('id')!);
  };

  /**
   * Generates a unique ID for a tab based on its index.
   *
   * @param index - The zero-based index of the tab.
   * @returns A string representing the unique ID of the tab.
   *
   * @example getTabId(0) // profile-tab-1 (name="profile")
   */
  const getTabId = useCallback(
    (index: number) => `${name}-tab-${index + 1}`,
    [name],
  );

  /**
   * Generates a unique ID for the corresponding tab panel based on its index.
   *
   * @param index - The zero-based index of the tab panel.
   * @returns A string representing the unique ID of the tab panel.
   *
   * @example getTabPanelId(0) // profile-tabpanel-1 (name="profile")
   */
  const getTabPanelId = (index: number) => `${name}-tabpanel-${index + 1}`;

  /**
   * Handles keyboard navigation between tabs using the left and right arrow keys.
   *
   * @param event - The keyboard event triggered when a key is pressed while a tab is focused.
   *
   * Behavior:
   * - `ArrowLeft`: moves focus to the previous tab (wraps around to last tab if at the first tab).
   * - `ArrowRight`: moves focus to the next tab (wraps around to first tab if at the last tab).
   * - Updates the `activeTabId` state to the newly focused tab.
   * - Moves focus programmatically to the new tab element.
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
