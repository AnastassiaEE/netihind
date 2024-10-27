'use client'

import Script from 'next/script';
import { useEffect, useRef } from 'react';

export default function MaaAmetForm() {
    const formAdded = useRef(false);
    useEffect(() => {
        if (formAdded.current) return;
        if (typeof window !== 'undefined' && typeof window.InAadress === 'function') {
            const inAadress = new window.InAadress({ "container": "in-address", "mode": 3, "ihist": "0", "appartment": 1, "lang": "et" });
            formAdded.current = true;
        }
    }, [])

    return (
        <div>
            <div id="in-address"></div>
            <Script src="https://inaadress.maaamet.ee/inaadress/js/inaadress.min.js?d=20220510" strategy="beforeInteractive" />
        </div>
    )
}