'use client';
import { createContext, useContext } from 'react';

const NonceContext = createContext<string>('');

export const NonceProvider = ({
    nonce,
    children,
}: {
    nonce: string;
    children: React.ReactNode;
}) => {
    return <NonceContext.Provider value={nonce}>{children}</NonceContext.Provider>;
};

export const useNonceContext = () => {
    const context = useContext(NonceContext);
    if (!context) {
        throw new Error('useNonceContext must be used within a NonceProvider');
    }
    return context;
};
