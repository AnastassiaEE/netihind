import { useTranslations } from "next-intl"

export default function SomethingWentWrongError() {
    const t = useTranslations('Errors');
    return <p className="text-base">{t('somethingWentWrong')}</p>
}