import CheckboxFilter from '@/components/ui/sorting/CheckboxFilter';

export default function PackagesFilter({
    providerOptions,
    selectedProviderOptions,
}: {
    providerOptions: { value: string, label: string }[]
    selectedProviderOptions: { value: string, label: string }[];
}) {
    return (
        <>
            <p> Фильтры </p>
            <p> Провайдеры </p>
            <CheckboxFilter
                name="providers"
                options={providerOptions}
                selected={selectedProviderOptions}
            />
        </>
    );
}
