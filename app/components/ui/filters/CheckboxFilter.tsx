import useCheckboxFilter from '@/hooks/useCheckboxFilter';
import { Filter, Filters } from '@/types/filters';
import Checkbox from '@/components/ui/form/fields/checkbox/Checkbox';
import { CheckboxSize } from '@/types/sizes';

export default function CheckboxFilter({
  name,
  size = 'sm',
  filter,
  setFilters,
  onUserChange,
}: {
  name: string;
  size?: CheckboxSize;
  filter: Filter;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  onUserChange?: () => void;
}) {
  const { handleChange } = useCheckboxFilter(name, setFilters, onUserChange);

  return (
    <div className="flex flex-col gap-1">
      {filter.options.map((option) => (
        <Checkbox
          key={option.value}
          name={name}
          value={option.value}
          isChecked={filter.selected.some(
            (opt) => opt.value.toString() === option.value.toString(),
          )}
          handleChange={(e) => handleChange(option.value, e.target.checked)}
          size={size}
        >
          {option.label}
        </Checkbox>
      ))}
    </div>
  );
}
