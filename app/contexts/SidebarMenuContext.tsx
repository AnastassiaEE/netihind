'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import useModal from '@/hooks/useModal';

type SidebarMenuContextType = ReturnType<typeof useModal>;
const SidebarMenuContext = createContext<SidebarMenuContextType | undefined>(undefined);

export const SidebarMenuProvider = ({ children }: { children: ReactNode }) => {
    const { modalRef, isModalVisible, openModal, closeModal } = useModal();
    return (
        <SidebarMenuContext.Provider value={{ modalRef, isModalVisible, openModal, closeModal }}>
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
