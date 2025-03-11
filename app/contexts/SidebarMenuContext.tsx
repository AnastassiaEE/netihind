'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import useOverlay from '@/hooks/useOverlay';

type SidebarMenuContextType = {
    isSidebarMenuOpened: boolean;
    openSidebarMenu: () => void;
    closeSidebarMenu: () => void;
    sidebarMenuRef: React.RefObject<HTMLDivElement>;
};

const SidebarMenuContext = createContext<SidebarMenuContextType | undefined>(undefined);

export const SidebarMenuProvider = ({ children }: { children: ReactNode }) => {
    const {
        isOpened: isSidebarMenuOpened,
        open: openSidebarMenu,
        close: closeSidebarMenu,
        overlayRef: sidebarMenuRef,
    } = useOverlay();

    return (
        <SidebarMenuContext.Provider
            value={{
                isSidebarMenuOpened,
                openSidebarMenu,
                closeSidebarMenu,
                sidebarMenuRef,
            }}
        >
            {children}
        </SidebarMenuContext.Provider>
    );
};

export const useSidebarMenuContext = () => {
    const context = useContext(SidebarMenuContext);
    if (!context) {
        throw new Error('useSidebarMenuContext must be used within a SidebarMenuProvider');
    }
    return context;
};
