import Checkbox from '@/components/ui/form/fields/checkbox/Checkbox';

export default function CheckboxGroup({
  name,
  options,
  selected,
  checkboxSize = 'sm',
  handleChange,
  // test
}: {
  name: string;
  options: { value: string; label: string }[];
  selected: { value: string; label: string }[];
  checkboxSize?: 'sm' | 'lg';
  handleChange: (name: string, value: string, checked: boolean) => void;
}) {
  return (
    <>
      {options.map((option) => (
        <div key={option.value} className="py-0.5">
          <Checkbox
            name={name}
            isChecked={selected.some(
              (opt) => opt.value.toString() === option.value.toString(),
            )}
            handleChange={(e) =>
              handleChange(name, option.value, e.target.checked)
            }
            value={option.value}
            size={checkboxSize}
          >
            {option.label}
          </Checkbox>
        </div>
      ))}
    </>
  );
}
