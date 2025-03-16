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
    <div>
      <div role="tablist">
        <ul className="flex border-b border-b-muted-light">
          {tabs.map((tab, index) => {
            return (
              <Tab
                key={tab}
                tabId={getTabId(index)}
                tabPanelId={getTabPanelId(index)}
                isActive={getTabId(index) === activeTabId}
                handleTabClick={handleTabClick}
                tabRef={(el: HTMLElement | null) =>
                  (tabsRef.current[index] = el)
                }
              >
                {tab}
              </Tab>
            );
          })}
        </ul>
      </div>
      {React.Children.map(children, (child, index) => {
        if (
          React.isValidElement<{
            tabId: string;
            tabPanelId: string;
            isActive: boolean;
          }>(child)
        ) {
          return React.cloneElement(child, {
            tabId: getTabId(index),
            tabPanelId: getTabPanelId(index),
            isActive: getTabId(index) === activeTabId,
          });
        }
        return child;
      })}
    </div>
  );
}
