import { useEffect, useState, useCallback } from 'react';
import Tab from '@/components/ui/tabs/Tab';
import React from 'react';

export default function Tabs({ name, tabs, children }: { name: string; tabs: string[], children: React.ReactNode }) {
    const [activeTabId, setActiveTabId] = useState(`${name}-tab-1`);
    const [underlinePosition, setUnderlinePosition] = useState({ left: 0, width: 0 });

    const handleTabClick = (event: React.MouseEvent<HTMLLIElement>) => {
        const tabElement = event.currentTarget as HTMLLIElement;
        setActiveTabId(tabElement.getAttribute('id')!);
    };

    const updateUnderlinePosition = useCallback(() => {
        const activeTab = document.getElementById(activeTabId);
        if (activeTab) {
            const left = activeTab.offsetLeft;
            const { width } = activeTab.getBoundingClientRect();
            setUnderlinePosition({ left, width });
        }
    }, [activeTabId]);

    const getTabId = (index: number) => `${name}-tab-${index + 1}`;
    const getTabPanelId = (index: number) => `${name}-tabpanel-${index + 1}`;

    useEffect(() => {
        updateUnderlinePosition();
        const handleResize = () => {
            updateUnderlinePosition();
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [activeTabId, updateUnderlinePosition]);

    return (
        <div>
            <div role="tablist" className="relative">
                <ul className="flex">
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
                <div className="absolute h-1 w-full rounded-md bg-muted-light"></div>
                <div
                    className={`absolute  h-1 rounded-md bg-primary transition-all`}
                    style={{ width: underlinePosition.width + 'px', left: underlinePosition.left + 'px' }}
                ></div>
            </div>
            <div className="w-[700px] p-4">
                {React.Children.map(children, (child, index) => {
                    if (
                        React.isValidElement<{ tabId: string; tabPanelId: string; isActive: boolean }>(child)
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
        </div>
    );
}
