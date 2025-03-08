'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import useOverlay from '@/hooks/useOverlay';

type SidebarMenuContextType = {
    isSidebarMenuMounted: boolean;
    isSidebarMenuTransitioning: boolean;
    openSidebarMenu: () => void;
    closeSidebarMenu: () => void;
    handleSidebarMenuTransitionEnd: () => void;
    sidebarMenuRef: React.RefObject<HTMLDivElement>;
};

const SidebarMenuContext = createContext<SidebarMenuContextType | undefined>(undefined);

export const SidebarMenuProvider = ({ children }: { children: ReactNode }) => {
    const {
        isMounted: isSidebarMenuMounted,
        isTransitioning: isSidebarMenuTransitioning,
        open: openSidebarMenu,
        close: closeSidebarMenu,
        handleTransitionEnd: handleSidebarMenuTransitionEnd,
        overlayRef: sidebarMenuRef,
    } = useOverlay();

    return (
        <SidebarMenuContext.Provider
            value={{
                isSidebarMenuMounted,
                isSidebarMenuTransitioning,
                openSidebarMenu,
                closeSidebarMenu,
                handleSidebarMenuTransitionEnd,
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
