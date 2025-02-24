import Checkbox from '@/components/ui/form/fields/Checkbox';

export default function CheckboxFilter({
    name,
    options,
    selected,
    handleChange,
}: {
    name: string;
    options: { value: string; label: string }[];
    selected: { value: string; label: string }[];
    handleChange: (name: string, value: string, checked: boolean) => void;
}) {
    return (
        <>
            {options.map((option) => (
                <div key={option.value} className="py-0.5">
                    <Checkbox
                        name={name}
                        isChecked={selected.some((opt) => opt.value.toString() === option.value.toString())}
                        handleChange={(e) => handleChange(name, option.value, e.target.checked)}
                        value={option.value}
                    >
                        {option.label}
                    </Checkbox>
                </div>
            ))}
        </>
    );
}
