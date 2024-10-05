'use client'

import { useTranslation } from "react-i18next"

export default function NotningToPreview({ message }: { message: string }) {
    const { t } = useTranslation(['not-found']);
    return (
        <p className="text-muted-dark text-lg text-center">{t(message)}</p>
    )
}