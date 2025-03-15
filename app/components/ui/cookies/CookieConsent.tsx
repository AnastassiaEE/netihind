'use client';

import { useEffect, useState } from 'react';
import CookieButton from '@/components/ui/cookies/CookieButton';
import Dialogue from '@/components/ui/overlay/Dialog';
import useOverlay from '@/hooks/useOverlay';
import Tabs from '@/components/ui/tabs/Tabs';
import TabPanel from '@/components/ui/tabs/TabPanel';
import { useTranslations } from 'next-intl';

export default function CookieConsent() {
    const tabs = ['Nõusolek', 'Üksikasjad', 'Teave'];
    const t = useTranslations('Buttons')
    const {
        isOpened: isCookiesOpened,
        open: openCookies,
        close: closeCookies,
        overlayRef: cookesRef
    } = useOverlay(true);


    // useEffect(() => {
    //     const consent = localStorage.getItem('cookieConsent');
    //     if (!consent) {
    //         setIsVisible(true);
    //     }
    // }, []);

    // const acceptCookies = () => {
    //     localStorage.setItem('cookieConsent', 'true');
    //     setIsVisible(false);
    // };

    // if (!isVisible) return null;

    return (
        <>
            <CookieButton label={t('cookies.open')} handleClick={openCookies} />
            <Dialogue
                type="modal"
                name="cookies"
                title="Cookies"
                isOpened={isCookiesOpened}
                handleClose={closeCookies}
                dialogRef={cookesRef}
            >
                <Tabs name="cookies" tabs={tabs}>
                    <TabPanel> Content 1</TabPanel>
                    <TabPanel> Content 2</TabPanel>
                    <TabPanel> Content 3</TabPanel>
                </Tabs>
            </Dialogue>
        </>
    );
}
