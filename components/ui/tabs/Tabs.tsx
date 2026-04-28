import Tab from '@/components/ui/tabs/Tab';
import React from 'react';
import useTabs from '@/hooks/useTabs';

export default function Tabs({
  name,
  tabs,
  children,
}: {
  name: string;
  tabs: string[];
  children: React.ReactNode;
}) {
  const { activeTabId, handleTabClick, getTabId, getTabPanelId, tabsRef } =
    useTabs(name, tabs);

  return (
    <>
      <ul role="tablist" className="flex border-b border-b-muted-light">
        {tabs.map((tab, index) => {
          return (
            <Tab
              key={tab}
              id={getTabId(index)}
              panelId={getTabPanelId(index)}
              isActive={getTabId(index) === activeTabId}
              onClick={handleTabClick}
              tabRef={(el: HTMLLIElement) => {
                tabsRef.current[index] = el;
              }}
            >
              {tab}
            </Tab>
          );
        })}
      </ul>

      {React.Children.map(children, (child, index) => {
        if (
          React.isValidElement<{
            tabId?: string;
            id?: string;
            isActive?: boolean;
          }>(child)
        ) {
          return React.cloneElement(child, {
            tabId: getTabId(index),
            id: getTabPanelId(index),
            isActive: getTabId(index) === activeTabId,
          });
        }
        return child;
      })}
    </>
  );
}
