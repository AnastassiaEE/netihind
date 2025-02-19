'use client';

import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import Checkbox from '@/components/ui/form/fields/Checkbox';
import { useParams, useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '@/i18n/routing';

export default function CheckboxFilter({
    name,
    options,
    selected,
}: {
    name: string;
    options: { value: string; label: string }[];
    selected: { value: string; label: string }[];
}) {
    const router = useRouter();
    const pathname = usePathname();
    const params = useParams();
    const searchParams = useSearchParams();
    const [selectedOptions, setSelectedOptions] = useState(selected);

    useEffect(() => {
        setSelectedOptions(selected);
    }, [selected]);

    useEffect(() => {
        const updateUrlParams = (selectedOptions: { value: string; label: string }[]) => {
            const newSearchParams = new URLSearchParams(searchParams);

            selectedOptions.length > 0
                ? newSearchParams.set(name, selectedOptions.map((opt) => opt.label).join(','))
                : newSearchParams.delete(name);

            const searchParamsObject = Object.fromEntries(newSearchParams.entries());

            router.replace(
                // @ts-expect-error
                { pathname, params, query: searchParamsObject },
                { scroll: false },
            );
        };
        updateUrlParams(selectedOptions);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedOptions]);

    const handleChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const { value, checked } = e.target;
            setSelectedOptions((prevSelected) => {
                const optionToAdd = options.find((opt) => opt.value.toString() === value);
                if (checked && optionToAdd) {
                    return [...prevSelected, optionToAdd];
                } else {
                    return prevSelected.filter((opt) => opt.value.toString() !== value);
                }
            });
        },
        [options]
    );

    return (
        <>
            {options.map((option) => (
                <div key={option.value} className="py-0.5">
                    <Checkbox
                        name={name}
                        isChecked={selectedOptions.some(
                            (opt) => opt.value.toString() === option.value.toString(),
                        )}
                        handleChange={handleChange}
                        value={option.value}
                    >
                        {option.label}
                    </Checkbox>
                </div>
            ))}
        </>
    );
}
