import { useEffect, useState, useCallback } from 'react';
import Tab from '@/components/ui/tabs/Tab';
import React from 'react';

export default function Tabs({
    name,
    tabs,
    children,
}: {
    name: string;
    tabs: string[];
    children: React.ReactNode;
}) {
    const [activeTabId, setActiveTabId] = useState(`${name}-tab-1`);

    const handleTabClick = (event: React.MouseEvent<HTMLLIElement>) => {
        const tabElement = event.currentTarget as HTMLLIElement;
        setActiveTabId(tabElement.getAttribute('id')!);
    };

    const getTabId = useCallback((index: number) => `${name}-tab-${index + 1}`, [name]);
    const getTabPanelId = (index: number) => `${name}-tabpanel-${index + 1}`;

    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (event.key === 'ArrowLeft') {
                const currentIndex = tabs.findIndex((tab) => getTabId(tabs.indexOf(tab)) === activeTabId);
                const newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
                setActiveTabId(getTabId(newIndex));
            } else if (event.key === 'ArrowRight') {
                const currentIndex = tabs.findIndex((tab) => getTabId(tabs.indexOf(tab)) === activeTabId);
                const newIndex = (currentIndex + 1) % tabs.length;
                setActiveTabId(getTabId(newIndex));
            }
        },
        [activeTabId, getTabId, tabs],
    );

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [activeTabId, handleKeyDown]);

    return (
        <div>
            <div role="tablist">
                <ul className="flex border-b border-b-muted">
                    {tabs.map((tab, index) => {
                        return (
                            <Tab
                                key={tab}
                                tabId={getTabId(index)}
                                tabPanelId={getTabPanelId(index)}
                                isActive={getTabId(index) === activeTabId}
                                handleTabClick={handleTabClick}
                            >
                                {tab}
                            </Tab>
                        );
                    })}
                </ul>
            </div>
            {React.Children.map(children, (child, index) => {
                if (React.isValidElement<{ tabId: string; tabPanelId: string; isActive: boolean }>(child)) {
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
