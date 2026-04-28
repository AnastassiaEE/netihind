'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import useOverlay from '@/hooks/useOverlay';

type SidebarMenuContextType = {
  isSidebarMenuMounted: boolean;
  isSidebarMenuVisible: boolean;
  openSidebarMenu: () => void;
  closeSidebarMenu: () => void;
  sidebarMenuRef: React.RefObject<HTMLDivElement | null>;
};

const SidebarMenuContext = createContext<SidebarMenuContextType | undefined>(
  undefined,
);

export const SidebarMenuProvider = ({ children }: { children: ReactNode }) => {
  const {
    isMounted: isSidebarMenuMounted,
    isVisible: isSidebarMenuVisible,
    open: openSidebarMenu,
    close: closeSidebarMenu,
    overlayRef: sidebarMenuRef,
  } = useOverlay();

  return (
    <SidebarMenuContext.Provider
      value={{
        isSidebarMenuMounted: isSidebarMenuMounted,
        isSidebarMenuVisible: isSidebarMenuVisible,
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
    throw new Error(
      'useSidebarMenuContext must be used within a SidebarMenuProvider',
    );
  }
  return context;
};
