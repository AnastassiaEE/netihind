'use client';

import Checkbox from '@/components/ui/form/fields/Checkbox';
import useCheckboxFilter from '@/hooks/useCheckboxFilter';

export default function CheckboxFilter({
    name,
    options,
    selected,
}: {
    name: string;
    options: { value: string; label: string }[];
    selected: { value: string; label: string }[];
}) {
    const { selectedOptions, handleChange } = useCheckboxFilter(name, options, selected);

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
