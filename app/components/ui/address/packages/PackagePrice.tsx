import { useTranslations } from "next-intl";

export default function PackagePrice({ value }: { value: string }) {
    const t = useTranslations("Packages");
    return (
        <p className="text-xl md:text-2xl tracking-tight text-muted-dark rounded-lg bg-primary-light w-max px-2 py-1">
            <span className="font-extrabold">{value} €</span> / {t('units.month')}
        </p>
    );
}
