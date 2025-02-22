'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import useOverlay from '@/hooks/useOverlay';

type SidebarMenuContextType = {
    sidebarMenuRef: React.RefObject<HTMLDivElement>;
    isSidebarMenuOpened: boolean;
    openSidebarMenu: () => void;
    closeSidebarMenu: () => void;
};

const SidebarMenuContext = createContext<SidebarMenuContextType | undefined>(undefined);

export const SidebarMenuProvider = ({ children }: { children: ReactNode }) => {
    const { overlayRef, isOverlayVisible, openOverlay, closeOverlay } = useOverlay();

    return (
        <SidebarMenuContext.Provider
            value={{
                sidebarMenuRef: overlayRef,
                isSidebarMenuOpened: isOverlayVisible,
                openSidebarMenu: openOverlay,
                closeSidebarMenu: closeOverlay,
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
